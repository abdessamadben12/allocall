import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/navbar';
import Services from '@/components/pages/services';
import SeoHead from '@/components/seo-head';
import { useLocale } from '@/lib/i18n';
import { router } from '@inertiajs/react';

export default function ServicesPage() {
    const { href, t } = useLocale();
    return (
        <div className="text-alidade-navy flex min-h-screen flex-col bg-[#fafafa]">
            <SeoHead />
            <Navbar />
            <main className="public-content flex-grow">
                <Services onQuoteWithService={(serviceName) => router.visit(href(`/devis?service=${encodeURIComponent(t(serviceName))}`))} />
            </main>
            <Footer />
        </div>
    );
}
