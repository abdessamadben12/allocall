import App from '@/components/pages/app';
import SeoHead from '@/components/seo-head';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Welcome() {
    const { appUrl } = usePage<SharedData>().props;
    const siteUrl = appUrl.replace(/\/$/, '');

    return (
        <>
            <SeoHead
                title="Alidade | Rénovation, agencement et menuiserie au Maroc"
                description="Alidade réalise vos projets de rénovation, agencement intérieur, menuiserie, aluminium et finition à Casablanca et partout au Maroc."
                keywords={[
                    'rénovation Casablanca',
                    'agencement intérieur Maroc',
                    'menuiserie bois',
                    'travaux aluminium',
                    'aménagement commercial',
                    'Alidade',
                ]}
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'HomeAndConstructionBusiness',
                    name: 'Alidade',
                    url: siteUrl,
                    image: `${siteUrl}/images/bannieres/menuiserie-Bois2-final.webp`,
                    areaServed: ['Casablanca', 'Maroc'],
                    serviceType: ['Rénovation', 'Agencement intérieur', 'Menuiserie', 'Travaux aluminium'],
                }}
            />
            <div>
                <App />
            </div>
        </>
    );
}
