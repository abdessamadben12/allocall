import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

interface SeoHeadProps {
    noIndex?: boolean;
}

export default function SeoHead({ noIndex = false }: SeoHeadProps) {
    // The server catalog also powers the initial HTML and sitemap.
    const { seo } = usePage<SharedData>().props;
    useEffect(() => {
        document.documentElement.lang = seo.language;
    }, [seo.language]);

    return (
        <Head title={seo.title}>
            <meta head-key="description" name="description" content={seo.description} />
            <meta head-key="keywords" name="keywords" content={seo.keywords.join(', ')} />
            <meta head-key="robots" name="robots" content={noIndex ? 'noindex, nofollow' : seo.robots} />
            <link head-key="canonical" rel="canonical" href={seo.canonical} />
            {Object.entries(seo.alternates).map(([language, href]) => (
                <link key={language} head-key={`alternate:${language}`} rel="alternate" hrefLang={language} href={href} />
            ))}
            <meta head-key="og:locale" property="og:locale" content={seo.ogLocale} />
            <meta head-key="og:type" property="og:type" content="website" />
            <meta head-key="og:site_name" property="og:site_name" content="ALLO CALL" />
            <meta head-key="og:title" property="og:title" content={seo.title} />
            <meta head-key="og:description" property="og:description" content={seo.description} />
            <meta head-key="og:url" property="og:url" content={seo.canonical} />
            <meta head-key="og:image" property="og:image" content={seo.image} />
            <meta head-key="og:image:alt" property="og:image:alt" content={seo.title} />
            <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
            <meta head-key="twitter:title" name="twitter:title" content={seo.title} />
            <meta head-key="twitter:description" name="twitter:description" content={seo.description} />
            <meta head-key="twitter:image" name="twitter:image" content={seo.image} />
            <script head-key="schema" type="application/ld+json">
                {JSON.stringify(seo.schema).replace(/</g, '\\u003c')}
            </script>
        </Head>
    );
}
