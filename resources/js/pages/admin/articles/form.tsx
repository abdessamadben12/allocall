import ArticleRichEditor from '@/components/article-rich-editor';
import AppLayout from '@/layouts/app-layout';
import { legacyDocument, uploadArticleMedia, type ArticleSection } from '@/lib/article-editor';
import { Head, Link, useForm } from '@inertiajs/react';
import type { JSONContent } from '@tiptap/react';
import { ArrowLeft, FileText, Globe, ImagePlus, Save } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';

type Locale = 'fr' | 'en';
type Content = {
    title: string;
    seoTitle: string;
    description: string;
    summary: string;
    category: string;
    sections: ArticleSection[];
    body?: JSONContent;
};
type ArticleForm = { slug_fr: string; slug_en: string; image: string; service: string; published: boolean; content: Record<Locale, Content> };
type Article = ArticleForm & { id: number };
const emptyContent = (): Content => ({ title: '', seoTitle: '', description: '', summary: '', category: '', sections: [], body: legacyDocument() });
const inputClass =
    'mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-[#74B946] focus:outline-none focus:ring-2 focus:ring-[#74B946]/20';
const slugify = (title: string) =>
    title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/œ/g, 'oe')
        .replace(/æ/g, 'ae')
        .replace(/[^a-z0-9]+/g, '-')
        .slice(0, 160)
        .replace(/^-+|-+$/g, '');

export default function ArticleEditor({
    article,
    services,
    images,
}: {
    article: Article | null;
    services: { value: string; label: string }[];
    images: string[];
}) {
    const [locale, setLocale] = useState<Locale>('fr');
    const [uploads, setUploads] = useState({ fr: false, en: false, cover: false });
    const [uploadError, setUploadError] = useState('');
    const form = useForm<ArticleForm>({
        slug_fr: article?.slug_fr ?? '',
        slug_en: article?.slug_en ?? '',
        image: article?.image ?? images[0] ?? '',
        service: article?.service ?? services[0]?.value ?? '',
        published: article?.published ?? false,
        content: {
            fr: article
                ? { ...article.content.fr, body: article.content.fr.body ?? legacyDocument(article.content.fr.sections), sections: [] }
                : emptyContent(),
            en: article
                ? { ...article.content.en, body: article.content.en.body ?? legacyDocument(article.content.en.sections), sections: [] }
                : emptyContent(),
        },
    });
    const busy = Object.values(uploads).some(Boolean);
    const errors = form.errors as Record<string, string>;
    const error = (name: string) =>
        errors[name] ? (
            <p role="alert" className="mt-1 text-sm text-red-600">
                {errors[name]}
            </p>
        ) : null;
    const updateContent = (language: Locale, patch: Partial<Content>) =>
        form.setData((current) => ({ ...current, content: { ...current.content, [language]: { ...current.content[language], ...patch } } }));
    useEffect(() => {
        const warn = (event: BeforeUnloadEvent) => {
            if (form.isDirty || busy) event.preventDefault();
        };
        window.addEventListener('beforeunload', warn);
        return () => window.removeEventListener('beforeunload', warn);
    }, [form.isDirty, busy]);
    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (busy || form.processing) return;
        const options = {
            onError: (validation: Record<string, string>) => {
                const language = (['fr', 'en'] as const).find((lang) =>
                    Object.keys(validation).some((key) => key.startsWith(`content.${lang}.`) || key === `slug_${lang}`),
                );
                if (language) setLocale(language);
            },
        };
        if (article) form.put(`/admin/articles/${article.id}`, options);
        else form.post('/admin/articles', options);
    };
    const fillTitleDefaults = (language: Locale) => {
        if (article) return;
        form.setData((current) => {
            const content = current.content[language];
            return {
                ...current,
                [`slug_${language}`]: current[`slug_${language}`] || slugify(content.title),
                content: { ...current.content, [language]: { ...content, seoTitle: content.seoTitle || content.title } },
            };
        });
    };
    const uploadCover = async (file?: File) => {
        if (!file) return;
        setUploads((current) => ({ ...current, cover: true }));
        setUploadError('');
        try {
            const media = await uploadArticleMedia(file);
            form.setData('image', media.url);
        } catch (failure) {
            setUploadError((failure as Error).message);
        } finally {
            setUploads((current) => ({ ...current, cover: false }));
        }
    };
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Articles', href: '/admin/articles' },
                { title: article ? 'Modifier' : 'Ajouter', href: article ? `/admin/articles/${article.id}/edit` : '/admin/articles/create' },
            ]}
        >
            <Head title={article ? 'Modifier un article' : 'Studio de rédaction'} />
            <form onSubmit={submit} noValidate className="mx-auto w-full max-w-[1500px] space-y-6 p-4 sm:p-6 lg:p-8">
                <header className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <Link
                            href="/admin/articles"
                            onClick={(event) => {
                                if ((form.isDirty || busy) && !confirm('Quitter sans enregistrer les modifications ?')) event.preventDefault();
                            }}
                            className="text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-2 text-sm"
                        >
                            <ArrowLeft size={16} />
                            Tous les articles
                        </Link>
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{article ? 'Modifier l’article' : 'Studio de rédaction'}</h1>
                        <p className="text-muted-foreground mt-2 text-sm">
                            Composez votre article, enrichissez-le et préparez sa publication en français et en anglais.
                        </p>
                    </div>
                    <button
                        disabled={form.processing || busy}
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#74B946] px-5 py-3 font-semibold text-black shadow-sm hover:bg-[#85c75a] disabled:opacity-50"
                    >
                        <Save size={18} />
                        {form.processing ? 'Enregistrement…' : form.data.published ? 'Enregistrer et publier' : 'Enregistrer le brouillon'}
                    </button>
                </header>
                {Object.keys(errors).length > 0 && (
                    <div role="alert" className="rounded-xl border border-red-400 bg-red-500/5 p-4">
                        <p className="font-semibold text-red-600">L’article n’a pas été enregistré. Vérifiez les champs indiqués.</p>
                        <ul className="mt-2 list-disc pl-5 text-sm">
                            {Object.entries(errors).map(([key, message]) => (
                                <li key={key}>
                                    {key.startsWith('content.fr') ? 'Français : ' : key.startsWith('content.en') ? 'Anglais : ' : ''}
                                    {message}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
                    <section className="min-w-0 space-y-5">
                        <div className="bg-muted/30 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-2">
                            <div role="tablist" aria-label="Langue de l’article" className="flex gap-1">
                                {(['fr', 'en'] as const).map((language) => (
                                    <button
                                        type="button"
                                        key={language}
                                        id={`tab-${language}`}
                                        aria-controls={`panel-${language}`}
                                        role="tab"
                                        aria-selected={locale === language}
                                        onClick={() => setLocale(language)}
                                        className={`rounded-lg px-4 py-2 text-sm font-semibold ${locale === language ? 'bg-background ring-border shadow-sm ring-1' : 'text-muted-foreground hover:text-foreground'}`}
                                    >
                                        {language === 'fr' ? 'Français' : 'English'}
                                        {Object.keys(errors).some((key) => key.startsWith(`content.${language}`)) && (
                                            <span className="ml-2 text-red-600">!</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                            <span className="text-muted-foreground px-2 text-xs">
                                {form.isDirty ? 'Modifications non enregistrées' : 'Prêt à rédiger'}
                            </span>
                        </div>
                        {(['fr', 'en'] as const).map((language) => (
                            <div
                                key={language}
                                role="tabpanel"
                                id={`panel-${language}`}
                                aria-labelledby={`tab-${language}`}
                                hidden={locale !== language}
                                className="space-y-5"
                            >
                                <div className="space-y-4 rounded-xl border p-5">
                                    <label className="block text-sm font-medium">
                                        Titre de l’article
                                        <input
                                            maxLength={180}
                                            className={`${inputClass} text-xl font-semibold`}
                                            placeholder={
                                                language === 'fr' ? 'Un titre qui donne envie de lire…' : 'Give your article a compelling title…'
                                            }
                                            value={form.data.content[language].title}
                                            onChange={(event) => updateContent(language, { title: event.target.value })}
                                            onBlur={() => fillTitleDefaults(language)}
                                        />
                                        {error(`content.${language}.title`)}
                                    </label>
                                    <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
                                        <label className="block text-sm font-medium">
                                            Catégorie
                                            <input
                                                maxLength={100}
                                                className={inputClass}
                                                value={form.data.content[language].category}
                                                onChange={(event) => updateContent(language, { category: event.target.value })}
                                                placeholder="Conseils, actualités…"
                                            />
                                            {error(`content.${language}.category`)}
                                        </label>
                                        <label className="block text-sm font-medium">
                                            Introduction
                                            <textarea
                                                rows={3}
                                                maxLength={1000}
                                                className={inputClass}
                                                value={form.data.content[language].summary}
                                                onChange={(event) => updateContent(language, { summary: event.target.value })}
                                                placeholder="Présentez le sujet en quelques phrases."
                                            />
                                            {error(`content.${language}.summary`)}
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-3 flex items-center gap-2 font-semibold">
                                        <FileText size={18} />
                                        Corps de l’article
                                    </div>
                                    <ArticleRichEditor
                                        value={form.data.content[language].body!}
                                        onChange={(body) => updateContent(language, { body })}
                                        onBusyChange={(uploading) => setUploads((current) => ({ ...current, [language]: uploading }))}
                                        label={`Contenu de l’article en ${language === 'fr' ? 'français' : 'anglais'}`}
                                    />
                                    {error(`content.${language}.body`)}
                                </div>
                                <details className="rounded-xl border p-5" open>
                                    <summary className="cursor-pointer font-semibold">Référencement et adresse de l’article</summary>
                                    <div className="mt-4 space-y-4">
                                        <label className="block text-sm font-medium">
                                            URL — {language === 'fr' ? '/articles/' : '/en/articles/'}
                                            <input
                                                readOnly={!!article}
                                                maxLength={160}
                                                className={inputClass}
                                                value={form.data[`slug_${language}`]}
                                                onChange={(event) => form.setData(`slug_${language}`, event.target.value)}
                                            />
                                            <span className="text-muted-foreground mt-1 block text-xs">
                                                {article
                                                    ? 'Adresse conservée pour préserver les liens existants.'
                                                    : 'Préremplie depuis le titre. Minuscules, chiffres et traits d’union.'}
                                            </span>
                                            {error(`slug_${language}`)}
                                        </label>
                                        <label className="block text-sm font-medium">
                                            Titre SEO
                                            <input
                                                maxLength={180}
                                                className={inputClass}
                                                value={form.data.content[language].seoTitle}
                                                onChange={(event) => updateContent(language, { seoTitle: event.target.value })}
                                            />
                                            {error(`content.${language}.seoTitle`)}
                                        </label>
                                        <label className="block text-sm font-medium">
                                            Description SEO et résumé de la carte
                                            <textarea
                                                rows={3}
                                                maxLength={320}
                                                className={inputClass}
                                                value={form.data.content[language].description}
                                                onChange={(event) => updateContent(language, { description: event.target.value })}
                                            />
                                            {error(`content.${language}.description`)}
                                        </label>
                                    </div>
                                </details>
                            </div>
                        ))}
                    </section>
                    <aside className="space-y-5 xl:sticky xl:top-6">
                        <section className="space-y-4 rounded-xl border p-5">
                            <h2 className="flex items-center gap-2 font-semibold">
                                <Globe size={18} />
                                Publication
                            </h2>
                            <label className="bg-muted/50 flex cursor-pointer items-start gap-3 rounded-lg p-3 text-sm">
                                <input
                                    type="checkbox"
                                    className="mt-1"
                                    checked={form.data.published}
                                    onChange={(event) => form.setData('published', event.target.checked)}
                                />
                                <span>
                                    <strong className="block">Publier sur le site</strong>
                                    <span className="text-muted-foreground mt-1 block">
                                        Décochez pour conserver un brouillon ou retirer la publication.
                                    </span>
                                </span>
                            </label>
                            <p className="text-muted-foreground text-xs">Les deux langues doivent être complétées.</p>
                            {error('published')}
                        </section>
                        <section className="space-y-4 rounded-xl border p-5">
                            <h2 className="flex items-center gap-2 font-semibold">
                                <ImagePlus size={18} />
                                Image de couverture
                            </h2>
                            {form.data.image && (
                                <img src={form.data.image} alt="Aperçu de la couverture" className="aspect-video w-full rounded-lg object-cover" />
                            )}
                            <label className="block text-sm">
                                Importer une image
                                <input
                                    type="file"
                                    disabled={uploads.cover}
                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                    className="file:bg-background mt-2 block w-full text-xs file:mr-2 file:rounded-md file:border file:p-2"
                                    onChange={(event) => {
                                        void uploadCover(event.target.files?.[0]);
                                        event.target.value = '';
                                    }}
                                />
                            </label>
                            <p className="text-muted-foreground text-xs">JPG, PNG, WebP ou GIF · 8 Mo maximum.</p>
                            {uploads.cover && (
                                <p role="status" className="text-sm">
                                    Envoi en cours…
                                </p>
                            )}
                            {uploadError && (
                                <p role="alert" className="text-sm text-red-600">
                                    {uploadError}
                                </p>
                            )}
                            <label className="block text-sm">
                                Ou choisir une photo du site
                                <select
                                    className={inputClass}
                                    value={form.data.image}
                                    onChange={(event) => form.setData('image', event.target.value)}
                                >
                                    {!images.includes(form.data.image) && <option value={form.data.image}>Image importée</option>}
                                    {images.map((image) => (
                                        <option key={image} value={image}>
                                            {image.split('/').pop()}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            {error('image')}
                        </section>
                        <section className="rounded-xl border p-5">
                            <label className="block text-sm font-semibold">
                                Service associé
                                <select
                                    className={inputClass}
                                    value={form.data.service}
                                    onChange={(event) => form.setData('service', event.target.value)}
                                >
                                    {services.map((service) => (
                                        <option key={service.value} value={service.value}>
                                            {service.label}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            {error('service')}
                        </section>
                    </aside>
                </div>
                <footer className="flex flex-wrap items-center justify-between gap-4 border-t pt-5 text-sm">
                    <span className="text-muted-foreground">
                        {busy
                            ? 'Attendez la fin de l’envoi des médias avant d’enregistrer.'
                            : 'Les changements sont conservés après l’enregistrement.'}
                    </span>
                    <button
                        type="submit"
                        disabled={form.processing || busy}
                        className="rounded-lg bg-[#74B946] px-5 py-3 font-semibold text-black disabled:opacity-50"
                    >
                        {form.processing ? 'Enregistrement…' : form.data.published ? 'Enregistrer et publier' : 'Enregistrer le brouillon'}
                    </button>
                </footer>
            </form>
        </AppLayout>
    );
}
