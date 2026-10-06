import type { JSONContent } from '@tiptap/react';

export type ArticleSection = { heading: string; paragraphs: string[]; items?: string[] };

export function legacyDocument(sections: ArticleSection[] = []): JSONContent {
    const text = (value: string): JSONContent[] => (value ? [{ type: 'text', text: value }] : []);
    const content: JSONContent[] = sections.flatMap((section) => [
        ...(section.heading ? [{ type: 'heading', attrs: { level: 2 }, content: text(section.heading) }] : []),
        ...section.paragraphs.map((paragraph) => ({ type: 'paragraph', content: text(paragraph) })),
        ...(section.items?.length
            ? [
                  {
                      type: 'bulletList',
                      content: section.items.map((item) => ({ type: 'listItem', content: [{ type: 'paragraph', content: text(item) }] })),
                  },
              ]
            : []),
    ]);
    return { type: 'doc', content: content.length ? content : [{ type: 'paragraph' }] };
}

export async function editorRequest<T>(path: string, body: FormData | object): Promise<T> {
    const token = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('XSRF-TOKEN='))
        ?.slice(11);
    const response = await fetch(path, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-XSRF-TOKEN': decodeURIComponent(token ?? ''),
            ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        },
        body: body instanceof FormData ? body : JSON.stringify(body),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const errors = Object.values(data.errors ?? {}).flat();
        throw new Error(
            response.status === 413
                ? 'Ce fichier dépasse la limite autorisée par le serveur.'
                : response.status === 419 || response.status === 401
                  ? 'Votre session a expiré. Reconnectez-vous avant de réessayer.'
                  : String(errors[0] ?? data.message ?? 'Impossible de terminer cette opération. Réessayez.'),
        );
    }
    return data as T;
}

export async function uploadArticleMedia(file: File) {
    const image = file.type.startsWith('image/');
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm'].includes(file.type))
        throw new Error('Formats acceptés : JPG, PNG, WebP, GIF, MP4 et WebM.');
    if (file.size > (image ? 8 : 30) * 1024 * 1024)
        throw new Error(image ? 'La taille maximale d’une image est de 8 Mo.' : 'La taille maximale d’une vidéo est de 30 Mo.');
    const body = new FormData();
    body.append('file', file);
    return editorRequest<{ url: string; type: 'image' | 'video' }>('/admin/article-media', body);
}

export function safeEditorUrl(value: string, link = false): boolean {
    if (!value || /[\s\\]/.test(value)) return false;
    if (/^\/(?!\/)/.test(value) || (link && /^#[\w-]+$/.test(value))) return true;
    try {
        return (link ? ['http:', 'https:', 'mailto:', 'tel:'] : ['http:', 'https:']).includes(new URL(value).protocol);
    } catch {
        return false;
    }
}

export function embedUrl(value: string): string | null {
    try {
        const url = new URL(value);
        const host = url.hostname.replace(/^www\./, '');
        if (['youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'youtu.be'].includes(host)) {
            const id =
                host === 'youtu.be' ? url.pathname.slice(1) : (url.searchParams.get('v') ?? url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1]);
            if (id && /^[\w-]{11}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}`;
        }
        if (['vimeo.com', 'player.vimeo.com'].includes(host)) {
            const id = url.pathname.match(/\/(\d+)$/)?.[1];
            if (id) return `https://player.vimeo.com/video/${id}`;
        }
    } catch {
        /* Invalid URL is reported by the dialog. */
    }
    return null;
}
