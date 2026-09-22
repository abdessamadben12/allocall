import Configurator from '@/components/pages/Configurator';
import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/navbar';
import SeoHead from '@/components/seo-head';
import { router } from '@inertiajs/react';

export default function ConfigurateurPage() {
    const handleSendToQuote = (configSummary: string, calculatedCost: number) => {
        sessionStorage.setItem('alidade_prefill_summary', configSummary);
        sessionStorage.setItem('alidade_prefill_cost', String(calculatedCost));
        router.visit('/devis');
    };

    return (
        <div className="text-alidade-navy flex min-h-screen flex-col bg-[#fafafa]">
            <SeoHead
                title="Configurateur Alidade | Estimez votre projet de menuiserie"
                description="Configurez votre cuisine, dressing ou habillage mural sur mesure et obtenez une estimation immédiate avant votre demande de devis."
                keywords={['estimation menuiserie Casablanca', 'configurateur cuisine sur mesure', 'prix dressing Maroc']}
            />
            <Navbar />
            <main className="public-content flex-grow">
                <Configurator onSendToQuote={handleSendToQuote} />
            </main>
            <Footer />
        </div>
    );
}
