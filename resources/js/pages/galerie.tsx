import Footer from '@/components/pages/Footer';
import Gallery from '@/components/pages/Gallery';
import Navbar from '@/components/pages/navbar';
import SeoHead from '@/components/seo-head';

export default function GaleriePage() {
    return (
        <div className="text-alidade-navy flex min-h-screen flex-col bg-[#fafafa]">
            <SeoHead />
            <Navbar />
            <main className="public-content flex-grow">
                <Gallery />
            </main>
            <Footer />
        </div>
    );
}
