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
const defaultImage = '/images/bannieres/menuiserie-Bois2-final.webp';

function absoluteUrl(path: string, baseUrl: string) {
    return new URL(path.replace(/^\//, ''), baseUrl).toString();
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
    const baseUrl = props.appUrl.endsWith('/') ? props.appUrl : `${props.appUrl}/`;
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

    return (
        <Head title={title}>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords.join(', ')} />
            <meta name="robots" content={robots} />
            <link rel="canonical" href={canonicalUrl} />
            <meta property="og:locale" content="fr_FR" />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:alt" content={`${siteName} - ${title}`} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Head>
    );
}
