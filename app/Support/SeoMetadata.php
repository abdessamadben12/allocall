<?php

namespace App\Support;

use Illuminate\Http\Request;

class SeoMetadata
{
    public static function baseUrl(): string
    {
        return rtrim(config('seo.url') ?: config('app.url'), '/');
    }

    public static function forRequest(Request $request): array
    {
        $english = $request->is('en', 'en/*');
        $locale = $english ? 'en' : 'fr';
        $path = PublicRoutes::logical('/'.$request->path());
        $catalog = array_merge(config($english ? 'seo.english_pages' : 'seo.pages'), EditorialContent::metadata($locale));
        $page = $catalog[$path] ?? null;
        if ($page && $english && isset(config('seo.pages')[$path])) {
            $page = array_replace(config('seo.pages')[$path], $page);
        }
        $language = $english ? 'en-CA' : 'fr-CA';
        $base = self::baseUrl();
        $localizedBase = $base.($english ? '/en' : '');
        $canonical = $base.($page ? PublicRoutes::path($path, $locale) : '/'.trim($request->path(), '/'));
        $title = $page['title'] ?? 'ALLO CALL';
        $description = $page['description'] ?? 'ALLO CALL accompagne votre entreprise dans la gestion des appels et de la relation client.';
        $image = $base.($page['image'] ?? '/images/hero/allocall-call-cnter.webp');
        $name = explode(' | ', $title)[0];
        $business = config('seo.business');
        $local = filled($business['street'] ?? null);
        $areas = [
            ...array_map(fn ($city) => ['@type' => 'City', 'name' => $city], config('seo.service_areas', [])),
            ['@type' => 'AdministrativeArea', 'name' => 'Québec'],
            ['@type' => 'Country', 'name' => 'Canada'],
        ];
        $organization = [
            '@type' => $local ? 'ProfessionalService' : 'Organization',
            '@id' => $base.'/#organization',
            'name' => 'ALLO CALL',
            'alternateName' => ['AlloCall', 'Allocall'],
            'url' => $base.'/',
            'logo' => $base.'/images/logo-allocall.png',
            'image' => $base.'/images/logo-allocall.png',
            'email' => 'contact@allocall.ca',
            'telephone' => '+15148509092',
            'address' => $local ? array_filter([
                '@type' => 'PostalAddress',
                'streetAddress' => $business['street'],
                'addressLocality' => $business['locality'],
                'addressRegion' => $business['region'],
                'postalCode' => $business['postal_code'],
                'addressCountry' => 'CA',
            ]) : [
                '@type' => 'PostalAddress',
                'streetAddress' => '3, Avenue 2 Mars Residence Marwa 5eme etage',
                'addressLocality' => 'Casablanca',
                'addressCountry' => 'MA',
            ],
            'areaServed' => $areas,
            'knowsLanguage' => ['fr-CA', 'en-CA'],
            'contactPoint' => [
                [
                    '@type' => 'ContactPoint',
                    'telephone' => '+15148509092',
                    'contactType' => 'customer service',
                    'email' => 'contact@allocall.ca',
                    'areaServed' => ['CA'],
                    'availableLanguage' => ['French', 'English'],
                ],
            ],
        ];
        if ($local && filled($business['latitude']) && filled($business['longitude'])) {
            $organization['geo'] = ['@type' => 'GeoCoordinates', 'latitude' => (float) $business['latitude'], 'longitude' => (float) $business['longitude']];
        }
        if ($local && $business['hours']) {
            $organization['openingHours'] = $business['hours'];
        }
        if ($local && filled($business['price_range'])) {
            $organization['priceRange'] = $business['price_range'];
        }
        if ($business['same_as'] ?? []) {
            $organization['sameAs'] = $business['same_as'];
        }
        $graph = [
            $organization,
            [
                '@type' => 'WebSite',
                '@id' => $base.'/#website',
                'url' => $base.'/',
                'name' => 'ALLO CALL',
                'alternateName' => ['AlloCall', 'Allocall'],
                'inLanguage' => ['fr-CA', 'en-CA'],
                'publisher' => ['@id' => $organization['@id']],
            ],
            ['@type' => $page['pageType'] ?? 'WebPage', '@id' => $canonical.'#webpage', 'url' => $canonical, 'name' => $title, 'description' => $description, 'inLanguage' => $language, 'isPartOf' => ['@id' => $base.'/#website'], 'primaryImageOfPage' => ['@type' => 'ImageObject', 'url' => $image]],
        ];
        if ($page && str_starts_with($path, '/services/')) {
            $graph[] = ['@type' => 'Service', '@id' => $canonical.'#service', 'name' => $name, 'description' => $description, 'url' => $canonical, 'image' => $image, 'areaServed' => ['Canada', 'Québec'], 'provider' => ['@id' => $organization['@id']]];
            $graph[2]['mainEntity'] = ['@id' => $canonical.'#service'];
        }
        if ($page && isset($page['city'])) {
            $graph[] = ['@type' => 'Service', '@id' => $canonical.'#service', 'name' => $name, 'description' => $description, 'url' => $canonical, 'image' => $image, 'serviceType' => $english ? 'Call centre' : 'Centre d’appels', 'areaServed' => ['@type' => 'City', 'name' => $page['city']], 'availableLanguage' => ['French', 'English'], 'provider' => ['@id' => $organization['@id']]];
            $graph[2]['mainEntity'] = ['@id' => $canonical.'#service'];
        }
        if ($page && $path !== '/') {
            $crumbs = [['@type' => 'ListItem', 'position' => 1, 'name' => $english ? 'Home' : 'Accueil', 'item' => $english ? $localizedBase : $base.'/']];
            $parent = '/'.explode('/', trim($path, '/'))[0];
            if ($parent !== $path && isset($catalog[$parent])) {
                $crumbs[] = ['@type' => 'ListItem', 'position' => 2, 'name' => explode(' | ', $catalog[$parent]['title'])[0], 'item' => $base.PublicRoutes::path($parent, $locale)];
            }
            $crumbs[] = ['@type' => 'ListItem', 'position' => count($crumbs) + 1, 'name' => $name, 'item' => $canonical];
            $graph[] = ['@type' => 'BreadcrumbList', '@id' => $canonical.'#breadcrumb', 'itemListElement' => $crumbs];
            $graph[2]['breadcrumb'] = ['@id' => $canonical.'#breadcrumb'];
        }

        $article = str_starts_with($path, '/articles/') ? EditorialContent::article(substr($path, 10), $locale) : null;
        if ($article) {
            $graph[] = [
                '@type' => 'BlogPosting', '@id' => $canonical.'#article',
                'headline' => $article['title'], 'description' => $article['description'],
                'image' => [$image], 'inLanguage' => $language,
                'dateModified' => $article['updated'],
                'author' => ['@id' => $organization['@id']],
                'publisher' => ['@id' => $organization['@id']],
                'mainEntityOfPage' => ['@id' => $canonical.'#webpage'],
                'articleSection' => $article['category'],
            ];
            $graph[2]['mainEntity'] = ['@id' => $canonical.'#article'];
        }
        $faqs = $page ? EditorialContent::faqs($path, $locale) : [];
        if ($faqs) {
            $graph[] = [
                '@type' => 'FAQPage', '@id' => $canonical.'#faq',
                'inLanguage' => $language,
                'isPartOf' => ['@id' => $canonical.'#webpage'],
                'mainEntity' => array_map(fn ($faq) => [
                    '@type' => 'Question', 'name' => $faq['question'],
                    'acceptedAnswer' => ['@type' => 'Answer', 'text' => $faq['answer']],
                ], $faqs),
            ];
            $graph[2]['hasPart'] = ['@id' => $canonical.'#faq'];
        }

        return [
            'language' => $language,
            'ogLocale' => str_replace('-', '_', $language),
            'ogType' => $article ? 'article' : 'website',
            'alternates' => $page ? ['fr-CA' => $base.PublicRoutes::path($path, 'fr'), 'en-CA' => $base.PublicRoutes::path($path, 'en'), 'x-default' => $base.PublicRoutes::path($path, 'fr')] : [],
            'title' => $title, 'description' => $description, 'keywords' => $page['keywords'] ?? [],
            'canonical' => $canonical, 'image' => $image, 'indexable' => $page !== null,
            'robots' => $page ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex, nofollow',
            'preloadImage' => ($page['preloadImage'] ?? false) ? $page['image'] : null,
            'schema' => ['@context' => 'https://schema.org', '@graph' => $graph],
        ];
    }
}
