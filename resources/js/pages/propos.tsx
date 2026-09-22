import About from '@/components/pages/About';
import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/navbar';
import SeoHead from '@/components/seo-head';

export default function AproposPage() {
    return (
        <div className="text-alidade-navy flex min-h-screen flex-col bg-[#fafafa]">
            <SeoHead
                title="À propos d'Alidade | Expertise travaux et agencement"
                description="Découvrez Alidade, son atelier, ses artisans et son savoir-faire en rénovation, menuiserie et agencement sur mesure au Maroc."
                keywords={['entreprise rénovation Maroc', 'artisan menuisier Casablanca', 'atelier agencement', 'Alidade Maroc']}
                image="/images/qui-sommes-nous/atelier-finition.webp"
            />
            <Navbar />
            <main className="public-content flex-grow">
                <About />
            </main>
            <Footer />
        </div>
    );
}
