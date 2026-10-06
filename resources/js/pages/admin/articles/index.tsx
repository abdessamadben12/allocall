import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

interface ArticleRow {
    id: number;
    title: string;
    published: boolean;
    paths: { fr: string; en: string };
}

export default function ArticlesAdmin({ articles, status }: { articles: ArticleRow[]; status?: string }) {
    const destroy = (article: ArticleRow) => {
        if (confirm(`Supprimer définitivement « ${article.title} » ?`)) router.delete(`/admin/articles/${article.id}`);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Articles', href: '/admin/articles' }]}>
            <Head title="Administration des articles" />
            <main className="space-y-6 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold">Articles</h1>
                    <Link href="/admin/articles/create" className="rounded-lg bg-[#74B946] px-5 py-3 font-semibold text-black">
                        Ajouter un article
                    </Link>
                </div>
                {status && (
                    <p role="status" className="rounded-lg border border-green-600 p-4">
                        {status}
                    </p>
                )}
                <p>Les brouillons restent privés. Les articles publiés apparaissent dans la rubrique Articles en français et en anglais.</p>
                {articles.length === 0 && <p className="rounded-lg border p-6">Vous n’avez pas encore ajouté d’article.</p>}
                <ul className="space-y-3">
                    {articles.map((article) => (
                        <li key={article.id} className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-5">
                            <div>
                                <h2 className="font-semibold">{article.title}</h2>
                                <p className="text-sm">{article.published ? 'Publié' : 'Brouillon'}</p>
                            </div>
                            <div className="flex flex-wrap gap-5">
                                <Link href={`/admin/articles/${article.id}/edit`} className="underline">
                                    Modifier
                                </Link>
                                {article.published && (
                                    <>
                                        <a href={article.paths.fr} className="underline">
                                            Voir en français
                                        </a>
                                        <a href={article.paths.en} className="underline">
                                            Voir en anglais
                                        </a>
                                    </>
                                )}
                                <button type="button" onClick={() => destroy(article)} className="text-red-600 underline">
                                    Supprimer
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </AppLayout>
    );
}
