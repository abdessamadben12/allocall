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
        $path = '/'.trim($request->path(), '/');
        $english = $request->is('en', 'en/*');
        $path = $english ? (substr($path, 3) ?: '/') : $path;
        $catalog = config($english ? 'seo.english_pages' : 'seo.pages');
        $page = $catalog[$path] ?? null;
        if ($page && $english) {
            $page = array_replace(config('seo.pages')[$path], $page);
        }
        $article = null;
        if ($path === '/articles') {
            $page = ArticleCatalog::indexPage($english ? 'en' : 'fr');
        } elseif (str_starts_with($path, '/articles/')) {
            $article = ArticleCatalog::find(substr($path, strlen('/articles/')), $english ? 'en' : 'fr');
            $page = $article ? [
                // Keep titles short enough to avoid truncation in search results.
                'title' => mb_strlen($article['seoTitle']) > 52 ? $article['seoTitle'] : $article['seoTitle'].' | ALLO CALL',
                'description' => $article['description'],
                'keywords' => $article['keywords'],
                'image' => $article['image'],
                'preloadImage' => true,
            ] : null;
        }
        $language = $english ? 'en-CA' : 'fr-CA';
        $base = self::baseUrl();
        $localizedBase = $base.($english ? '/en' : '');
        $canonical = $localizedBase.($english && $path === '/' ? '' : $path);
        $title = $page['title'] ?? 'ALLO CALL';
        $description = $page['description'] ?? 'ALLO CALL accompagne votre entreprise dans la gestion des appels et de la relation client.';
        $image = $base.($page['image'] ?? '/images/hero/allocall-call-cnter.webp');
        $name = explode(' | ', $title)[0];
        $organization = [
            '@type' => ['Organization', 'LocalBusiness'],
            '@id' => $base.'/#organization',
            'name' => 'ALLO CALL',
            'alternateName' => ['AlloCall', 'Allocall'],
            'url' => $base.'/',
            'logo' => $base.'/images/logo-allocall.png',
            'image' => $base.'/images/logo-allocall.png',
            'email' => 'contact@allocall.ma',
            'telephone' => '+212522484425',
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => '3, Avenue 2 Mars Residence Marwa 5eme etage',
                'addressLocality' => 'Casablanca',
                'addressCountry' => 'MA',
            ],
            'areaServed' => ['Canada', 'Quebec', 'Maroc', 'France'],
            'contactPoint' => [
                [
                    '@type' => 'ContactPoint',
                    'telephone' => '+212522484425',
                    'contactType' => 'customer service',
                    'email' => 'contact@allocall.ma',
                    'areaServed' => ['MA', 'CA', 'FR'],
                    'availableLanguage' => ['French', 'English'],
                ],
            ],
        ];
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
            $graph[] = ['@type' => 'Service', '@id' => $canonical.'#service', 'name' => $name, 'description' => $description, 'url' => $canonical, 'image' => $image, 'provider' => ['@id' => $organization['@id']]];
            $graph[2]['mainEntity'] = ['@id' => $canonical.'#service'];
        }
        if ($article) {
            $graph[] = [
                '@type' => 'BlogPosting', '@id' => $canonical.'#article', 'mainEntityOfPage' => ['@id' => $canonical.'#webpage'],
                'headline' => $article['title'], 'description' => $article['description'], 'image' => $image,
                'datePublished' => $article['published'], 'dateModified' => $article['updated'], 'inLanguage' => $language,
                'articleSection' => $article['category'], 'keywords' => implode(', ', $article['keywords']),
                'author' => ['@id' => $organization['@id']], 'publisher' => ['@id' => $organization['@id']],
            ];
            $graph[2]['mainEntity'] = ['@id' => $canonical.'#article'];
        }
        if ($page && $path !== '/') {
            $crumbs = [['@type' => 'ListItem', 'position' => 1, 'name' => $english ? 'Home' : 'Accueil', 'item' => $english ? $localizedBase : $base.'/']];
            $parent = '/'.explode('/', trim($path, '/'))[0];
            if ($parent !== $path && (isset(config('seo.pages')[$parent]) || $parent === '/articles')) {
                $crumbs[] = ['@type' => 'ListItem', 'position' => 2, 'name' => ucfirst(trim($parent, '/')), 'item' => $localizedBase.$parent];
            }
            $crumbs[] = ['@type' => 'ListItem', 'position' => count($crumbs) + 1, 'name' => $name, 'item' => $canonical];
            $graph[] = ['@type' => 'BreadcrumbList', '@id' => $canonical.'#breadcrumb', 'itemListElement' => $crumbs];
            $graph[2]['breadcrumb'] = ['@id' => $canonical.'#breadcrumb'];
        }

        return [
            'language' => $language,
            'ogLocale' => str_replace('-', '_', $language),
            // Article slugs differ per language, so their alternates come from the article itself.
            'alternates' => $article
                ? ['fr-CA' => $base.$article['alternates']['fr'], 'en-CA' => $base.$article['alternates']['en'], 'x-default' => $base.$article['alternates']['fr']]
                : ($page ? ['fr-CA' => $base.$path, 'en-CA' => $base.'/en'.($path === '/' ? '' : $path), 'x-default' => $base.$path] : []),
            'ogType' => $article ? 'article' : 'website',
            'title' => $title, 'description' => $description, 'keywords' => $page['keywords'] ?? [],
            'canonical' => $canonical, 'image' => $image, 'indexable' => $page !== null,
            'robots' => $page ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex, nofollow',
            'preloadImage' => ($page['preloadImage'] ?? false) ? $page['image'] : null,
            'schema' => ['@context' => 'https://schema.org', '@graph' => $graph],
        ];
    }
}
