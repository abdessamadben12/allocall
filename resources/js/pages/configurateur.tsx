import Configurator from '@/components/pages/Configurator';
import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/navbar';
import SeoHead from '@/components/seo-head';
import { router } from '@inertiajs/react';

export default function ConfigurateurPage() {
    const handleSendToQuote = (configSummary: string, calculatedCost: number) => {
        sessionStorage.setItem('allocall_prefill_summary', configSummary);
        sessionStorage.setItem('allocall_prefill_cost', String(calculatedCost));
        router.visit('/devis');
    };

    return (
        <div className="text-alidade-navy flex min-h-screen flex-col bg-[#fafafa]">
            <SeoHead />
            <Navbar />
            <main className="public-content flex-grow">
                <Configurator onSendToQuote={handleSendToQuote} />
            </main>
            <Footer />
        </div>
    );
}
