import Footer from '@/components/pages/Footer';
import MyQuotes from '@/components/pages/MyQuotes';
import Navbar from '@/components/pages/navbar';
import QuoteRequest from '@/components/pages/QuoteRequest';
import SeoHead from '@/components/seo-head';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function DevisPage() {
    const [showMyQuotes, setShowMyQuotes] = useState(false);
    const [preFilledSummary, setPreFilledSummary] = useState('');
    const [preFilledCost, setPreFilledCost] = useState(0);

    useEffect(() => {
        // Pre-fill from a service page (/devis?service=...)
        const params = new URLSearchParams(window.location.search);
        const service = params.get('service');
        if (service) {
            setPreFilledSummary(
                `Bonjour,\n\nJe sollicite un devis gratuit pour la prestation de : ${service}.\n\nMerci de me recontacter pour planifier une visite de prise de cotes.`,
            );
            window.history.replaceState({}, '', '/devis');
            return;
        }

        // Pre-fill from the configurator (stored just before navigation)
        const summary = sessionStorage.getItem('alidade_prefill_summary');
        if (summary) {
            setPreFilledSummary(summary);
            const cost = sessionStorage.getItem('alidade_prefill_cost');
            setPreFilledCost(cost ? Number(cost) : 0);
            sessionStorage.removeItem('alidade_prefill_summary');
            sessionStorage.removeItem('alidade_prefill_cost');
        }
    }, []);

    return (
        <div className="text-alidade-navy flex min-h-screen flex-col bg-[#fafafa]">
            <SeoHead
                title="Demande de devis Alidade | Travaux, menuiserie et agencement"
                description="Décrivez votre projet de rénovation, menuiserie ou agencement et recevez un devis gratuit. Visite de prise de cotes à Casablanca et au Maroc."
                keywords={['devis rénovation Casablanca', 'devis menuiserie Maroc', 'devis gratuit travaux', 'Alidade devis']}
            />
            <Navbar />
            <main className="public-content flex-grow">
                {showMyQuotes ? (
                    <MyQuotes onNavigateToRequest={() => setShowMyQuotes(false)} />
                ) : (
                    <QuoteRequest
                        preFilledSummary={preFilledSummary}
                        preFilledCost={preFilledCost}
                        onClearPreFill={() => {
                            setPreFilledSummary('');
                            setPreFilledCost(0);
                        }}
                        onNavigateToContact={() => router.visit('/contact')}
                        onNavigateToMyQuotes={() => setShowMyQuotes(true)}
                    />
                )}
            </main>
            <Footer />
        </div>
    );
}
