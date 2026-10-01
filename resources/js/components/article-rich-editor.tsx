import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { editorRequest, embedUrl, safeEditorUrl, uploadArticleMedia } from '@/lib/article-editor';
import { Node, mergeAttributes } from '@tiptap/core';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import { TableKit } from '@tiptap/extension-table';
import TextAlign from '@tiptap/extension-text-align';
import { Color, TextStyle } from '@tiptap/extension-text-style';
import { EditorContent, useEditor, type JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    Code,
    Eraser,
    Eye,
    ImagePlus,
    Italic,
    Link2,
    List,
    ListOrdered,
    Maximize2,
    Minimize2,
    Minus,
    Quote,
    Redo2,
    Strikethrough,
    Table2,
    Trash2,
    Underline,
    Undo2,
    Unlink,
    Video,
} from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

const ArticleImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            width: {
                default: '100%',
                parseHTML: (element) => element.style.width || '100%',
                renderHTML: (attributes) => ({ style: `width:${attributes.width}` }),
            },
        };
    },
});
const VideoNode = Node.create({
    name: 'video',
    group: 'block',
    atom: true,
    draggable: true,
    addAttributes() {
        return { src: { default: '' }, title: { default: '' } };
    },
    parseHTML() {
        return [{ tag: 'video[src]' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['video', mergeAttributes(HTMLAttributes, { controls: true, preload: 'metadata' })];
    },
});
const EmbedNode = Node.create({
    name: 'embed',
    group: 'block',
    atom: true,
    draggable: true,
    addAttributes() {
        return { src: { default: '' }, title: { default: 'Vidéo' } };
    },
    parseHTML() {
        return [
            {
                tag: 'iframe[src]',
                getAttrs: (element) => {
                    const src = embedUrl((element as HTMLElement).getAttribute('src') ?? '');
                    return src ? { src } : false;
                },
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ['iframe', mergeAttributes(HTMLAttributes, { allowfullscreen: true, loading: 'lazy', allow: 'fullscreen; picture-in-picture' })];
    },
});

function Tool({
    title,
    active = false,
    disabled = false,
    onClick,
    children,
}: {
    title: string;
    active?: boolean;
    disabled?: boolean;
    onClick: () => void;
    children: ReactNode;
}) {
    return (
        <button
            type="button"
            title={title}
            aria-label={title}
            aria-pressed={active}
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onClick}
            className={`inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm transition-colors disabled:opacity-30 ${active ? 'bg-[#74B946]/20 text-[#487e2e] ring-1 ring-[#74B946]' : 'hover:bg-muted'}`}
        >
            {children}
        </button>
    );
}

export default function ArticleRichEditor({
    value,
    onChange,
    onBusyChange,
    label,
}: {
    value: JSONContent;
    onChange: (value: JSONContent) => void;
    onBusyChange: (busy: boolean) => void;
    label: string;
}) {
    const changeRef = useRef(onChange);
    useEffect(() => {
        changeRef.current = onChange;
    }, [onChange]);
    const [dialog, setDialog] = useState<'link' | 'image' | 'video' | null>(null);
    const [url, setUrl] = useState('');
    const [alt, setAlt] = useState('');
    const [caption, setCaption] = useState('');
    const [width, setWidth] = useState('100%');
    const [newTab, setNewTab] = useState(true);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [fullscreen, setFullscreen] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ link: { openOnClick: false, defaultProtocol: 'https' } }),
            ArticleImage,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            TextStyle,
            Color,
            Highlight.configure({ multicolor: true }),
            TableKit,
            VideoNode,
            EmbedNode,
        ],
        content: value,
        immediatelyRender: false,
        shouldRerenderOnTransaction: true,
        editorProps: {
            attributes: {
                class: 'article-prose min-h-[460px] p-6 outline-none sm:p-10',
                'aria-label': label,
                role: 'textbox',
                'aria-multiline': 'true',
            },
        },
        onUpdate: ({ editor: current }) => changeRef.current(current.getJSON()),
    });
    useEffect(() => {
        if (!fullscreen) return;
        const close = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setFullscreen(false);
        };
        document.addEventListener('keydown', close);
        return () => document.removeEventListener('keydown', close);
    }, [fullscreen]);
    if (!editor) return <div className="rounded-xl border p-10">Chargement de l’éditeur…</div>;
    const open = (kind: 'link' | 'image' | 'video') => {
        setError('');
        setDialog(kind);
        const attrs = editor.getAttributes(kind === 'video' && editor.isActive('embed') ? 'embed' : kind);
        setUrl(attrs.href ?? attrs.src ?? '');
        setAlt(attrs.alt ?? '');
        setCaption(attrs.title ?? '');
        setWidth(attrs.width ?? '100%');
        setNewTab(attrs.target !== null);
    };
    const insert = () => {
        if (!safeEditorUrl(url, dialog === 'link')) {
            setError('Saisissez une adresse valide (https://… ou /chemin-du-site).');
            return;
        }
        if (dialog === 'link') {
            if (editor.state.selection.empty && !editor.isActive('link')) {
                editor
                    .chain()
                    .focus()
                    .insertContent({ type: 'text', text: url, marks: [{ type: 'link', attrs: { href: url, target: newTab ? '_blank' : null } }] })
                    .run();
            } else
                editor
                    .chain()
                    .focus()
                    .extendMarkRange('link')
                    .setLink({ href: url, target: newTab ? '_blank' : null })
                    .run();
        } else if (dialog === 'image') {
            const attrs = { src: url, alt, title: caption, width };
            if (editor.isActive('image')) editor.chain().focus().updateAttributes('image', attrs).run();
            else editor.chain().focus().insertContent({ type: 'image', attrs }).run();
        } else {
            const embed = embedUrl(url);
            if (!embed && !/\.(mp4|webm)(\?.*)?$/i.test(url)) {
                setError('Utilisez un lien YouTube, Vimeo, MP4 ou WebM.');
                return;
            }
            editor
                .chain()
                .focus()
                .insertContent({ type: embed ? 'embed' : 'video', attrs: { src: embed ?? url, title: caption || 'Vidéo' } })
                .run();
        }
        setDialog(null);
    };
    const upload = async (file?: File) => {
        if (!file) return;
        setBusy(true);
        onBusyChange(true);
        setError('');
        try {
            const media = await uploadArticleMedia(file);
            setUrl(media.url);
        } catch (failure) {
            setError((failure as Error).message);
        } finally {
            setBusy(false);
            onBusyChange(false);
        }
    };
    const showPreview = async () => {
        setBusy(true);
        setError('');
        try {
            const result = await editorRequest<{ html: string }>('/admin/articles/preview', { body: editor.getJSON() });
            setPreview(result.html);
        } catch (failure) {
            setError((failure as Error).message);
        } finally {
            setBusy(false);
        }
    };
    const text = editor.getText().trim();
    const words = text ? text.split(/\s+/).length : 0;
    return (
        <div className={fullscreen ? 'bg-background fixed inset-0 z-40 overflow-y-auto p-4 sm:p-10' : ''}>
            <div className="bg-background overflow-hidden rounded-xl border shadow-sm">
                <div
                    role="toolbar"
                    aria-label="Mise en forme"
                    className="bg-background sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b p-2"
                >
                    <Tool title="Annuler (Ctrl+Z)" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>
                        <Undo2 size={17} />
                    </Tool>
                    <Tool title="Rétablir (Ctrl+Maj+Z)" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>
                        <Redo2 size={17} />
                    </Tool>
                    <select
                        aria-label="Style du paragraphe"
                        className="bg-background h-9 rounded-md border px-2 text-sm"
                        value={editor.isActive('heading') ? String(editor.getAttributes('heading').level) : 'p'}
                        onChange={(event) => {
                            if (event.target.value === 'p') editor.chain().focus().setParagraph().run();
                            else
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: Number(event.target.value) as 1 | 2 | 3 | 4 | 5 | 6 })
                                    .run();
                        }}
                    >
                        <option value="p">Paragraphe</option>
                        {[1, 2, 3, 4, 5, 6].map((level) => (
                            <option key={level} value={level}>
                                Titre H{level}
                            </option>
                        ))}
                    </select>
                    <Tool title="Gras" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
                        <Bold size={17} />
                    </Tool>
                    <Tool title="Italique" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
                        <Italic size={17} />
                    </Tool>
                    <Tool title="Souligner" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
                        <Underline size={17} />
                    </Tool>
                    <Tool title="Barrer" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
                        <Strikethrough size={17} />
                    </Tool>
                    <label title="Couleur du texte" className="flex h-9 items-center gap-1 rounded-md border px-2 text-xs">
                        A
                        <input
                            aria-label="Couleur du texte"
                            type="color"
                            className="h-5 w-5 cursor-pointer"
                            value={editor.getAttributes('textStyle').color ?? '#111827'}
                            onChange={(event) => editor.chain().focus().setColor(event.target.value).run()}
                        />
                    </label>
                    <Tool
                        title="Surligner"
                        active={editor.isActive('highlight')}
                        onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()}
                    >
                        ▰
                    </Tool>
                    <Tool
                        title="Aligner à gauche"
                        active={editor.isActive({ textAlign: 'left' })}
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    >
                        <AlignLeft size={17} />
                    </Tool>
                    <Tool
                        title="Centrer"
                        active={editor.isActive({ textAlign: 'center' })}
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    >
                        <AlignCenter size={17} />
                    </Tool>
                    <Tool
                        title="Aligner à droite"
                        active={editor.isActive({ textAlign: 'right' })}
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    >
                        <AlignRight size={17} />
                    </Tool>
                    <Tool
                        title="Justifier"
                        active={editor.isActive({ textAlign: 'justify' })}
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    >
                        <AlignJustify size={17} />
                    </Tool>
                    <Tool
                        title="Liste à puces"
                        active={editor.isActive('bulletList')}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                    >
                        <List size={17} />
                    </Tool>
                    <Tool
                        title="Liste numérotée"
                        active={editor.isActive('orderedList')}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    >
                        <ListOrdered size={17} />
                    </Tool>
                    <Tool title="Citation" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                        <Quote size={17} />
                    </Tool>
                    <Tool title="Bloc de code" active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
                        <Code size={17} />
                    </Tool>
                    <Tool title="Séparateur" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                        <Minus size={17} />
                    </Tool>
                    <Tool title="Ajouter ou modifier un lien" active={editor.isActive('link')} onClick={() => open('link')}>
                        <Link2 size={17} />
                    </Tool>
                    <Tool
                        title="Retirer le lien"
                        disabled={!editor.isActive('link')}
                        onClick={() => editor.chain().focus().extendMarkRange('link').unsetLink().run()}
                    >
                        <Unlink size={17} />
                    </Tool>
                    <Tool title="Ajouter ou modifier une image" active={editor.isActive('image')} onClick={() => open('image')}>
                        <ImagePlus size={17} />
                    </Tool>
                    <Tool title="Ajouter une vidéo" onClick={() => open('video')}>
                        <Video size={17} />
                    </Tool>
                    <Tool
                        title="Insérer un tableau"
                        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                    >
                        <Table2 size={17} />
                    </Tool>
                    <Tool title="Effacer la mise en forme" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
                        <Eraser size={17} />
                    </Tool>
                    <Tool title="Aperçu du contenu" disabled={busy} onClick={showPreview}>
                        <Eye size={17} />
                    </Tool>
                    <Tool title={fullscreen ? 'Quitter le plein écran' : 'Plein écran'} onClick={() => setFullscreen(!fullscreen)}>
                        {fullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
                    </Tool>
                </div>
                {editor.isActive('table') && (
                    <div className="bg-muted/40 flex flex-wrap gap-1 border-b p-2">
                        <Tool title="Ajouter une ligne" onClick={() => editor.chain().focus().addRowAfter().run()}>
                            + Ligne
                        </Tool>
                        <Tool title="Ajouter une colonne" onClick={() => editor.chain().focus().addColumnAfter().run()}>
                            + Colonne
                        </Tool>
                        <Tool title="Supprimer la ligne" onClick={() => editor.chain().focus().deleteRow().run()}>
                            − Ligne
                        </Tool>
                        <Tool title="Supprimer la colonne" onClick={() => editor.chain().focus().deleteColumn().run()}>
                            − Colonne
                        </Tool>
                        <Tool title="Fusionner ou séparer les cellules" onClick={() => editor.chain().focus().mergeOrSplit().run()}>
                            Fusionner / séparer
                        </Tool>
                        <Tool title="Supprimer le tableau" onClick={() => editor.chain().focus().deleteTable().run()}>
                            <Trash2 size={17} />
                        </Tool>
                    </div>
                )}
                {(editor.isActive('image') || editor.isActive('video') || editor.isActive('embed')) && (
                    <div className="flex items-center gap-3 border-b p-2 text-sm">
                        <span>Média sélectionné</span>
                        <Tool title="Supprimer le média" onClick={() => editor.chain().focus().deleteSelection().run()}>
                            <Trash2 size={17} />
                        </Tool>
                    </div>
                )}
                <EditorContent editor={editor} />
                <div className="text-muted-foreground flex flex-wrap justify-between gap-2 border-t px-4 py-2 text-xs">
                    <span>
                        {words} mots · {text.length} caractères · {Math.max(1, Math.ceil(words / 200))} min de lecture
                    </span>
                    <span>Ctrl+B : gras · Ctrl+I : italique · Tab : cellule suivante</span>
                </div>
            </div>
            {error && !dialog && (
                <p role="alert" className="mt-2 text-sm text-red-600">
                    {error}
                </p>
            )}
            <Dialog
                open={dialog !== null}
                onOpenChange={(open) => {
                    if (!open && !busy) setDialog(null);
                }}
            >
                <DialogContent onCloseAutoFocus={(event) => event.preventDefault()} className="max-h-[90vh] overflow-y-auto">
                    <DialogTitle>
                        {dialog === 'link' ? 'Insérer un lien' : dialog === 'image' ? 'Image de l’article' : 'Vidéo de l’article'}
                    </DialogTitle>
                    <DialogDescription>
                        {dialog === 'link'
                            ? 'Sélectionnez un texte pour y appliquer le lien.'
                            : dialog === 'image'
                              ? 'Importez une image (8 Mo max.) ou utilisez son adresse.'
                              : 'Importez un MP4/WebM (30 Mo max.) ou collez un lien YouTube/Vimeo.'}
                    </DialogDescription>
                    {dialog !== 'link' && (
                        <label className="space-y-2 text-sm">
                            Importer un fichier
                            <input
                                type="file"
                                disabled={busy}
                                accept={dialog === 'image' ? 'image/jpeg,image/png,image/webp,image/gif' : 'video/mp4,video/webm'}
                                className="block w-full rounded-md border p-2"
                                onChange={(event) => {
                                    void upload(event.target.files?.[0]);
                                    event.target.value = '';
                                }}
                            />
                        </label>
                    )}
                    <label className="space-y-2 text-sm">
                        Adresse URL
                        <input
                            type="text"
                            value={url}
                            onChange={(event) => setUrl(event.target.value.trim())}
                            className="bg-background block w-full rounded-md border p-2"
                            placeholder="https://…"
                        />
                    </label>
                    {dialog === 'link' ? (
                        <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" checked={newTab} onChange={(event) => setNewTab(event.target.checked)} />
                            Ouvrir dans un nouvel onglet
                        </label>
                    ) : (
                        <>
                            {dialog === 'image' && (
                                <>
                                    <label className="space-y-2 text-sm">
                                        Texte alternatif (accessibilité)
                                        <input
                                            maxLength={500}
                                            value={alt}
                                            onChange={(event) => setAlt(event.target.value)}
                                            className="bg-background block w-full rounded-md border p-2"
                                        />
                                    </label>
                                    <label className="space-y-2 text-sm">
                                        Largeur
                                        <select
                                            value={width}
                                            onChange={(event) => setWidth(event.target.value)}
                                            className="bg-background block w-full rounded-md border p-2"
                                        >
                                            {['25%', '50%', '75%', '100%'].map((size) => (
                                                <option key={size}>{size}</option>
                                            ))}
                                        </select>
                                    </label>
                                </>
                            )}
                            <label className="space-y-2 text-sm">
                                Titre du média
                                <input
                                    maxLength={500}
                                    value={caption}
                                    onChange={(event) => setCaption(event.target.value)}
                                    className="bg-background block w-full rounded-md border p-2"
                                />
                            </label>
                        </>
                    )}
                    {busy && <p role="status">Envoi du fichier en cours…</p>}
                    {error && (
                        <p role="alert" className="text-sm text-red-600">
                            {error}
                        </p>
                    )}
                    <button
                        type="button"
                        disabled={busy || !url}
                        onClick={insert}
                        className="rounded-lg bg-[#74B946] px-4 py-2 font-semibold text-black disabled:opacity-50"
                    >
                        Insérer / appliquer
                    </button>
                </DialogContent>
            </Dialog>
            <Dialog
                open={preview !== null}
                onOpenChange={(open) => {
                    if (!open) setPreview(null);
                }}
            >
                <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
                    <DialogTitle>Aperçu du contenu publié</DialogTitle>
                    <DialogDescription>Rendu du corps de l’article avec ses images, liens et vidéos.</DialogDescription>
                    <div className="article-prose" dangerouslySetInnerHTML={{ __html: preview ?? '' }} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
