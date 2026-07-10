import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/navbar';
import Services from '@/components/pages/services';
import SeoHead from '@/components/seo-head';
import { router } from '@inertiajs/react';

export default function ServicesPage() {
    return (
        <div className="text-alidade-navy flex min-h-screen flex-col bg-[#fafafa]">
            <SeoHead
                title="Savoir-faire Alidade | Rénovation, menuiserie, aluminium et finition"
                description="Six corps de métier, un seul interlocuteur : rénovation, agencement, menuiserie bois, aluminium, peinture et revêtements à Casablanca et au Maroc."
                keywords={['services rénovation Casablanca', 'menuiserie bois Maroc', 'travaux aluminium', 'agencement intérieur', 'Alidade services']}
            />
            <Navbar />
            <main className="flex-grow">
                <Services onQuoteWithService={(serviceName) => router.visit(`/devis?service=${encodeURIComponent(serviceName)}`)} />
            </main>
            <Footer />
        </div>
    );
}
