import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/navbar';
import Services from '@/components/pages/services';
import SeoHead from '@/components/seo-head';
import { router } from '@inertiajs/react';

export default function ServicesPage() {
    return (
        <div className="text-alidade-navy flex min-h-screen flex-col bg-[#fafafa]">
            <SeoHead />
            <Navbar />
            <main className="public-content flex-grow">
                <Services onQuoteWithService={(serviceName) => router.visit(`/devis?service=${encodeURIComponent(serviceName)}`)} />
            </main>
            <Footer />
        </div>
    );
}
