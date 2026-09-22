import Footer from '@/components/pages/Footer';
import Gallery from '@/components/pages/Gallery';
import Navbar from '@/components/pages/navbar';
import SeoHead from '@/components/seo-head';

export default function GaleriePage() {
    return (
        <div className="text-alidade-navy flex min-h-screen flex-col bg-[#fafafa]">
            <SeoHead
                title="Galerie Alidade | Nos réalisations en images"
                description="Cuisines modernes, dressings, agencements et menuiseries fines : découvrez les réalisations d'Alidade à Casablanca et partout au Maroc."
                keywords={['réalisations menuiserie Casablanca', 'galerie agencement Maroc', 'cuisine moderne sur mesure', 'Alidade réalisations']}
            />
            <Navbar />
            <main className="public-content flex-grow">
                <Gallery />
            </main>
            <Footer />
        </div>
    );
}
