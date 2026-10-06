import FaqSection from '@/components/faq-section';
import { Link } from '@/components/localized-link';
import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/navbar';
import SeoHead from '@/components/seo-head';
import { useLocale } from '@/lib/i18n';
import { ArrowRight } from 'lucide-react';
import '../../../css/company.css';

interface Article {
    title: string;
    description: string;
    summary: string;
    category: string;
    path: string;
    image: string;
    updated: string;
    relatedService: string;
    sections: { heading: string; paragraphs: string[]; items?: string[] }[];
    bodyHtml?: string | null;
    headings?: { id: string; heading: string; level: number }[] | null;
}

interface Editorial {
    kind: 'index' | 'article' | 'faq' | 'locations' | 'location';
    title: string;
    summary: string;
    articles?: Article[];
    article?: Article;
}

export default function ArticlesPage({ editorial }: { editorial: Editorial }) {
    const { locale } = useLocale();
    const english = locale === 'en';
    const article = editorial.article;
    const local = editorial.kind === 'location' || editorial.kind === 'locations';
    const areasLabel = english ? 'Service areas' : 'Régions desservies';
    const headings =
        article?.headings ?? article?.sections.map((section, index) => ({ id: `section-${index + 1}`, heading: section.heading, level: 2 })) ?? [];
    const updated = article
        ? new Intl.DateTimeFormat(english ? 'en-CA' : 'fr-CA', { dateStyle: 'long', timeZone: 'UTC' }).format(
              new Date(`${article.updated}T12:00:00Z`),
          )
        : '';

    return (
        <div className="company-page text-alidade-navy min-h-screen bg-[#fafafa]">
            <SeoHead />
            <Navbar />
            <main className="public-content">
                <section className="company-hero">
                    <img src={article?.image ?? '/images/hero/gestion-leads.webp'} alt="" fetchPriority="high" />
                    <div className="company-container">
                        <nav aria-label={english ? 'Breadcrumb' : 'Fil d’Ariane'} className="mb-6 flex flex-wrap gap-2 text-sm text-white/80">
                            <Link href="/">{english ? 'Home' : 'Accueil'}</Link>
                            <span aria-hidden="true">/</span>
                            {editorial.kind === 'location' && article ? (
                                <>
                                    <Link href="/villes">{areasLabel}</Link>
                                    <span aria-hidden="true">/</span>
                                    <span>{article.category}</span>
                                </>
                            ) : editorial.kind === 'locations' ? (
                                <span>{areasLabel}</span>
                            ) : article ? (
                                <>
                                    <Link href="/articles">Articles</Link>
                                    <span aria-hidden="true">/</span>
                                    <span>{article.category}</span>
                                </>
                            ) : (
                                <span>{editorial.kind === 'faq' ? 'FAQ' : 'Articles'}</span>
                            )}
                        </nav>
                        <h1>{editorial.title}</h1>
                        <p className="max-w-3xl">{editorial.summary}</p>
                        {article && !local && (
                            <p className="mt-6 text-sm">
                                {english ? 'By the ALLO CALL team · Updated ' : 'Par l’équipe ALLO CALL · Mis à jour le '}
                                <time dateTime={article.updated}>{updated}</time>
                            </p>
                        )}
                    </div>
                </section>

                {(editorial.kind === 'index' || editorial.kind === 'locations') && (
                    <section aria-label={local ? areasLabel : english ? 'Our guides' : 'Nos guides'} className="company-container py-16">
                        <div className="grid gap-8 md:grid-cols-2">
                            {editorial.articles?.map((item) => (
                                <article key={item.path} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                                    <Link href={item.path} tabIndex={-1} aria-hidden="true">
                                        <img src={item.image} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
                                    </Link>
                                    <div className="p-7">
                                        <p className="text-xs font-bold tracking-widest text-[#487e2e] uppercase">{item.category}</p>
                                        <h2 className="mt-3 text-lg leading-snug font-semibold">
                                            <Link href={item.path}>{item.title}</Link>
                                        </h2>
                                        <p className="mt-4 leading-7 text-gray-600">{item.description}</p>
                                        <Link href={item.path} className="mt-6 inline-flex items-center gap-2 font-semibold text-[#487e2e]">
                                            {local
                                                ? english
                                                    ? 'See local services'
                                                    : 'Voir les services locaux'
                                                : english
                                                  ? 'Read the guide'
                                                  : 'Lire le guide'}
                                            <ArrowRight size={17} aria-hidden="true" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {article && (
                    <article className="company-container grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_280px]">
                        <div className="min-w-0">
                            {article.bodyHtml ? (
                                <div className="article-prose mb-12" dangerouslySetInnerHTML={{ __html: article.bodyHtml }} />
                            ) : (
                                article.sections.map((section, index) => (
                                    <section key={section.heading} id={`section-${index + 1}`} className="mb-12 scroll-mt-8">
                                        <h2 className="text-2xl leading-snug font-bold sm:text-3xl">{section.heading}</h2>
                                        {section.paragraphs.map((paragraph) => (
                                            <p key={paragraph} className="mt-5 text-base leading-8 text-gray-700">
                                                {paragraph}
                                            </p>
                                        ))}
                                        {section.items && (
                                            <ul className="mt-5 list-disc space-y-3 pl-6 text-base leading-7 text-gray-700 marker:text-[#487e2e]">
                                                {section.items.map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </section>
                                ))
                            )}
                            <div className="rounded-xl bg-[#111827] p-7 text-white">
                                <h2 className="text-2xl font-bold">{english ? 'Apply this to your business' : 'Passons à votre réalité'}</h2>
                                <p className="mt-4 leading-7 text-white/80">
                                    {english
                                        ? 'Share your call volume, service languages and coverage needs so we can discuss the right scope.'
                                        : 'Présentez-nous votre volume d’appels, vos langues de service et vos heures de couverture pour discuter du périmètre qui vous convient.'}
                                </p>
                                <div className="mt-6 flex flex-wrap gap-4">
                                    <Link href={article.relatedService} className="rounded-md bg-[#74B946] px-5 py-3 font-semibold text-[#111827]">
                                        {english ? 'Explore the service' : 'Découvrir le service'}
                                    </Link>
                                    <Link href="/devis" className="rounded-md border border-white/40 px-5 py-3 font-semibold">
                                        {english ? 'Request a quote' : 'Demander une soumission'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <aside className="order-first h-fit rounded-xl border border-gray-200 bg-white p-6 lg:sticky lg:top-8 lg:order-last">
                            <h2 className="font-bold">
                                {local ? (english ? 'On this page' : 'Sur cette page') : english ? 'In this guide' : 'Dans ce guide'}
                            </h2>
                            <ol className="mt-4 list-decimal space-y-4 pl-5 text-sm leading-6">
                                {headings.map((section) => (
                                    <li key={section.id}>
                                        <a className="hover:text-[#487e2e] hover:underline" href={`#${section.id}`}>
                                            {section.heading}
                                        </a>
                                    </li>
                                ))}
                            </ol>
                            <a href="#faq" className="mt-5 block text-sm font-semibold text-[#487e2e]">
                                {english ? 'Frequently asked questions' : 'Questions fréquentes'}
                            </a>
                            <Link href={local ? '/villes' : '/articles'} className="mt-5 block border-t border-gray-100 pt-4 text-sm font-semibold">
                                {local ? (english ? 'All service areas' : 'Toutes les régions') : english ? 'All articles' : 'Tous les articles'}
                            </Link>
                        </aside>
                    </article>
                )}
                <FaqSection />
            </main>
            <Footer showFaq={false} />
        </div>
    );
}
