import MarketingContentPage from '@/components/pages/marketing-content-page';
import { industryDetails } from '@/data/industry-pages';
import SeoHead from '@/components/seo-head';
import Navbar from '@/components/pages/navbar';
import Footer from '@/components/pages/Footer';
import { Link } from '@inertiajs/react';

interface IndustryShowProps {
    slug: string;
}

export default function IndustryShowPage({ slug }: IndustryShowProps) {
    const page = industryDetails[slug];

    if (!page) {
        return (
            <div className="flex min-h-screen flex-col bg-white">
                <SeoHead
                    title="Industrie introuvable | ALLO CALL"
                    description="Cette page industrie n existe pas ou a ete deplacee."
                    keywords={['ALLO CALL', 'industries']}
                />
                <Navbar />
                <main className="mx-auto max-w-3xl flex-grow px-4 py-24 text-center">
                    <h1 className="text-4xl font-extrabold text-[#111827]">
                        Industrie introuvable
                    </h1>
                    <Link
                        href="/industries"
                        className="mt-8 inline-flex rounded-md bg-[#74B946] px-6 py-3 text-sm font-bold text-white uppercase"
                    >
                        Voir les industries
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return <MarketingContentPage page={page} />;
}
