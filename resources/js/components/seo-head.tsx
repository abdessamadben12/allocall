import { site } from '@/data/site';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

interface SeoHeadProps {
    title: string;
    description: string;
    keywords: string[];
    image?: string;
    type?: 'website' | 'article';
    noIndex?: boolean;
    structuredData?: Record<string, unknown>;
}

const siteName = 'Alidade';
const brandDescription =
    'Alidade accompagne les particuliers et professionnels dans leurs projets de rénovation, agencement intérieur, menuiserie bois, aluminium, peinture et finitions au Maroc.';
const defaultImage = '/images/alidade-social-card.png';
const fallbackBaseUrl = 'https://www.alidade.ma/';

function normalizeBaseUrl(value: unknown) {
    if (typeof value === 'string' && value.trim() !== '') {
        try {
            return new URL(value).toString();
        } catch {
            // Fall through to browser/public fallback.
        }
    }

    if (typeof window !== 'undefined' && window.location.origin) {
        return `${window.location.origin}/`;
    }

    return fallbackBaseUrl;
}

function absoluteUrl(path: string, baseUrl: string) {
    try {
        return new URL(path, baseUrl).toString();
    } catch {
        return new URL(path.replace(/^\//, ''), fallbackBaseUrl).toString();
    }
}

export default function SeoHead({
    title,
    description,
    keywords,
    image = defaultImage,
    type = 'website',
    noIndex = false,
    structuredData,
}: SeoHeadProps) {
    const { url, props } = usePage<SharedData>();
    const baseUrl = normalizeBaseUrl(props.appUrl);
    const canonicalUrl = absoluteUrl(url.split('?')[0], baseUrl);
    const imageUrl = absoluteUrl(image, baseUrl);
    const robots = noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    const schema = structuredData ?? {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description,
        url: canonicalUrl,
        isPartOf: {
            '@type': 'WebSite',
            name: siteName,
            url: absoluteUrl('/', baseUrl),
        },
    };

    // Fiche entreprise locale (SEO local) émise sur toutes les pages publiques.
    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'HomeAndConstructionBusiness',
        '@id': absoluteUrl('/#entreprise', baseUrl),
        name: siteName,
        url: absoluteUrl('/', baseUrl),
        logo: absoluteUrl('/images/logo-alidade-traveaux-de-renovation-alimunium.png', baseUrl),
        image: absoluteUrl(defaultImage, baseUrl),
        description: brandDescription,
        telephone: '+212522484425',
        email: site.email,
        address: {
            '@type': 'PostalAddress',
            streetAddress: '3, Avenue 2 Mars, Résidence Marwa, 5ème étage',
            addressLocality: 'Casablanca',
            addressCountry: 'MA',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 33.5731,
            longitude: -7.5898,
        },
        areaServed: ['Casablanca', 'Maroc'],
        serviceType: [
            'Rénovation',
            'Agencement intérieur',
            'Aménagement de locaux commerciaux',
            'Menuiserie bois',
            'Menuiserie aluminium',
            'Peinture et finitions',
            'Faux plafonds',
            'Revêtements de sol',
        ],
        sameAs: Object.values(site.socials).filter((value) => value !== ''),
    };

    return (
        <Head title={title}>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords.join(', ')} />
            <meta name="robots" content={robots} />
            <meta name="author" content={siteName} />
            <meta name="application-name" content={siteName} />
            <meta name="format-detection" content="telephone=yes" />
            <meta name="geo.region" content="MA-06" />
            <meta name="geo.placename" content="Casablanca" />
            <link rel="canonical" href={canonicalUrl} />
            <link rel="alternate" hrefLang="fr-MA" href={canonicalUrl} />
            <meta property="og:locale" content="fr_FR" />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:secure_url" content={imageUrl} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:alt" content={`${siteName} - ${title}`} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
            <script type="application/ld+json">
                {JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebSite',
                    name: siteName,
                    url: absoluteUrl('/', baseUrl),
                    description: brandDescription,
                    inLanguage: 'fr-MA',
                })}
            </script>
            <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Head>
    );
}
