import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { type FormEvent } from 'react';

type Locale = 'fr' | 'en';
type Section = { heading: string; paragraphs: string[] };
type Content = { title: string; seoTitle: string; description: string; summary: string; category: string; sections: Section[] };
type ArticleForm = { slug_fr: string; slug_en: string; image: string; service: string; published: boolean; content: Record<Locale, Content> };
type Article = ArticleForm & { id: number };
const emptyContent = (): Content => ({ title: '', seoTitle: '', description: '', summary: '', category: '', sections: [{ heading: '', paragraphs: [''] }] });
const inputClass = 'mt-2 w-full rounded-md border border-input bg-background px-3 py-2';

export default function ArticleEditor({ article, services, images }: { article: Article | null; services: { value: string; label: string }[]; images: string[] }) {
    const form = useForm<ArticleForm>({
        slug_fr: article?.slug_fr ?? '', slug_en: article?.slug_en ?? '',
        image: article?.image ?? images[0], service: article?.service ?? services[0]?.value ?? '',
        published: article?.published ?? false,
        content: article?.content ?? { fr: emptyContent(), en: emptyContent() },
    });
    const errors = form.errors as Record<string, string>;
    const error = (name: string) => errors[name] ? <p role="alert" className="mt-1 text-sm text-red-600">{errors[name]}</p> : null;
    const updateContent = (locale: Locale, patch: Partial<Content>) => form.setData('content', { ...form.data.content, [locale]: { ...form.data.content[locale], ...patch } });
    const updateSection = (locale: Locale, index: number, patch: Partial<Section>) => updateContent(locale, {
        sections: form.data.content[locale].sections.map((section, current) => current === index ? { ...section, ...patch } : section),
    });
    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (article) form.put(`/admin/articles/${article.id}`);
        else form.post('/admin/articles');
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Articles', href: '/admin/articles' }, { title: article ? 'Modifier' : 'Ajouter', href: article ? `/admin/articles/${article.id}/edit` : '/admin/articles/create' }]}>
            <Head title={article ? 'Modifier un article' : 'Ajouter un article'} />
            <main className="mx-auto w-full max-w-6xl space-y-6 p-6">
                <h1 className="text-2xl font-bold">{article ? 'Modifier un article' : 'Ajouter un article'}</h1>
                <p>Complétez les deux langues. Le contenu est affiché comme du texte, sans HTML. Les URL restent fixes après la création.</p>
                <form onSubmit={submit} className="space-y-8">
                    {Object.keys(errors).length > 0 && <div role="alert" className="rounded-lg border border-red-600 p-4"><p className="font-semibold">Vérifiez les champs suivants :</p><ul className="list-disc pl-5">{Object.entries(errors).map(([key, message]) => <li key={key}>{key} : {message}</li>)}</ul></div>}
                    <div className="grid gap-6 lg:grid-cols-2">
                        {(['fr', 'en'] as const).map((locale) => (
                            <fieldset key={locale} className="min-w-0 space-y-5 rounded-xl border p-5">
                                <legend className="px-2 text-xl font-semibold">{locale === 'fr' ? 'Français québécois' : 'Anglais canadien'}</legend>
                                <label className="block">URL — {locale === 'fr' ? '/articles/' : '/en/articles/'}
                                    <input required readOnly={!!article} pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength={160} className={inputClass} value={form.data[`slug_${locale}`]} onChange={(event) => form.setData(`slug_${locale}`, event.target.value)} placeholder="mon-guide-service-client" />
                                    <span className="mt-1 block text-xs text-muted-foreground">Lettres minuscules sans accent, chiffres et traits d’union.</span>
                                    {error(`slug_${locale}`)}
                                </label>
                                {([{ key: 'title', label: 'Titre de l’article', max: 180 }, { key: 'category', label: 'Catégorie', max: 100 }, { key: 'summary', label: 'Introduction', max: 1000 }, { key: 'seoTitle', label: 'Titre SEO', max: 180 }, { key: 'description', label: 'Description SEO et résumé dans la liste', max: 320 }] as const).map(({ key, label, max }) => (
                                    <label key={key} className="block">{label}
                                        <textarea required rows={key === 'summary' ? 4 : 2} maxLength={max} className={inputClass} value={form.data.content[locale][key]} onChange={(event) => updateContent(locale, { [key]: event.target.value })} />
                                        {error(`content.${locale}.${key}`)}
                                    </label>
                                ))}
                                {form.data.content[locale].sections.map((section, index) => (
                                    <div key={index} className="space-y-3 rounded-lg border p-4">
                                        <label className="block">Titre de la section {index + 1}<input required maxLength={180} className={inputClass} value={section.heading} onChange={(event) => updateSection(locale, index, { heading: event.target.value })} />{error(`content.${locale}.sections.${index}.heading`)}</label>
                                        <label className="block">Paragraphes (séparez-les par une ligne vide)
                                            <textarea required rows={10} className={inputClass} value={section.paragraphs.join('\n\n')} onChange={(event) => updateSection(locale, index, { paragraphs: event.target.value.split('\n\n') })} />
                                        </label>
                                        {form.data.content[locale].sections.length > 1 && <button type="button" className="text-sm underline" onClick={() => updateContent(locale, { sections: form.data.content[locale].sections.filter((_, current) => current !== index) })}>Retirer cette section</button>}
                                    </div>
                                ))}
                                <button type="button" disabled={form.data.content[locale].sections.length >= 30} className="rounded-md border px-4 py-2" onClick={() => updateContent(locale, { sections: [...form.data.content[locale].sections, { heading: '', paragraphs: [''] }] })}>Ajouter une section</button>
                            </fieldset>
                        ))}
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        <label className="block">Photo du site<select className={inputClass} value={form.data.image} onChange={(event) => form.setData('image', event.target.value)}>{images.map((image) => <option key={image} value={image}>{image.split('/').pop()}</option>)}</select>{error('image')}<img src={form.data.image} alt="Aperçu de la photo choisie" className="mt-3 aspect-video w-64 rounded-lg object-cover" /></label>
                        <label className="block">Service associé<select className={inputClass} value={form.data.service} onChange={(event) => form.setData('service', event.target.value)}>{services.map((service) => <option key={service.value} value={service.value}>{service.label}</option>)}</select>{error('service')}</label>
                    </div>
                    <label className="flex items-center gap-3"><input type="checkbox" checked={form.data.published} onChange={(event) => form.setData('published', event.target.checked)} />Publier sur le site (décochez pour conserver un brouillon ou retirer la publication)</label>
                    <div className="flex items-center gap-6"><button disabled={form.processing} type="submit" className="rounded-lg bg-[#74B946] px-6 py-3 font-semibold text-black disabled:opacity-50">{form.processing ? 'Enregistrement…' : form.data.published ? 'Enregistrer et publier' : 'Enregistrer le brouillon'}</button><Link href="/admin/articles" className="underline">Annuler</Link></div>
                </form>
            </main>
        </AppLayout>
    );
}
