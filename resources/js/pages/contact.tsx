import Contact from '@/components/pages/Contact';
import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/navbar';
import SeoHead from '@/components/seo-head';
import { contactHeroImage } from '@/image';

export default function ContactPage() {
    return (
        <div className="text-alidade-navy flex min-h-screen flex-col bg-[#fafafa]">
            <SeoHead
                title="Contact Alidade | Demandez votre devis travaux"
                description="Contactez Alidade pour étudier votre projet de rénovation, agencement, menuiserie ou aluminium à Casablanca et au Maroc."
                keywords={['devis rénovation Casablanca', 'contact Alidade', 'devis agencement Maroc', 'entreprise travaux Casablanca']}
                image={contactHeroImage}
            />
            <Navbar />
            <main className="flex-grow">
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
