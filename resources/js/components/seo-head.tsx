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

const siteName = 'ALLO CALL';
const brandDescription =
    'ALLO CALL accompagne les entreprises dans la gestion des appels, la relation client, la televente, la prise de rendez-vous, la gestion de leads et les solutions de centre d appels propulsees par l IA.';
const defaultImage = '/images/hero/allocall-call-center.webp';
const fallbackBaseUrl = 'https://www.allocall.ma/';

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
    const robots = noIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
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

    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': absoluteUrl('/#entreprise', baseUrl),
        name: siteName,
        url: absoluteUrl('/', baseUrl),
        logo: absoluteUrl('/images/logo-allocall.png', baseUrl),
        image: absoluteUrl(defaultImage, baseUrl),
        description: brandDescription,
        telephone: '+212522484425',
        email: site.email,
        address: {
            '@type': 'PostalAddress',
            streetAddress: '3, Avenue 2 Mars',
            addressLocality: 'Casablanca',
            addressCountry: 'MA',
        },
        areaServed: ['Quebec', 'Canada', 'Maroc', 'France'],
        serviceType: [
            'Reception telephonique',
            'Televente',
            'Prise de rendez-vous',
            'Gestion de leads',
            'Service a la clientele',
            'Support technique niveau 1',
            'Centre d appels IA',
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
            <link rel="canonical" href={canonicalUrl} />
            <link rel="alternate" hrefLang="fr-CA" href={canonicalUrl} />
            <meta property="og:locale" content="fr_CA" />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:secure_url" content={imageUrl} />
            <meta property="og:image:alt" content={`${siteName} - ${title}`} />
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
                    inLanguage: 'fr-CA',
                })}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(localBusinessSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Head>
    );
}
