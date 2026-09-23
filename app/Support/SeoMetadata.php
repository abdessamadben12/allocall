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
        $page = config('seo.pages')[$path] ?? null;
        $base = self::baseUrl();
        $canonical = $base.$path;
        $title = $page['title'] ?? 'ALLO CALL';
        $description = $page['description'] ?? 'ALLO CALL accompagne votre entreprise dans la gestion des appels et de la relation client.';
        $image = $base.($page['image'] ?? '/images/hero/allocall-call-center.webp');
        $name = explode(' | ', $title)[0];
        $organization = [
            '@type' => 'Organization', '@id' => $base.'/#organization',
            'name' => 'ALLO CALL', 'url' => $base.'/',
            'logo' => $base.'/images/logo-allocall.png',
            'email' => 'contact@allocall.ma', 'telephone' => '+212522484425',
            'areaServed' => ['Canada', 'Quebec', 'Maroc', 'France'],
        ];
        $graph = [
            $organization,
            ['@type' => 'WebSite', '@id' => $base.'/#website', 'url' => $base.'/', 'name' => 'ALLO CALL', 'inLanguage' => 'fr-CA', 'publisher' => ['@id' => $organization['@id']]],
            ['@type' => $page['pageType'] ?? 'WebPage', '@id' => $canonical.'#webpage', 'url' => $canonical, 'name' => $title, 'description' => $description, 'inLanguage' => 'fr-CA', 'isPartOf' => ['@id' => $base.'/#website'], 'primaryImageOfPage' => ['@type' => 'ImageObject', 'url' => $image]],
        ];
        if ($page && str_starts_with($path, '/services/')) {
            $graph[] = ['@type' => 'Service', '@id' => $canonical.'#service', 'name' => $name, 'description' => $description, 'url' => $canonical, 'image' => $image, 'provider' => ['@id' => $organization['@id']]];
            $graph[2]['mainEntity'] = ['@id' => $canonical.'#service'];
        }
        if ($page && $path !== '/') {
            $crumbs = [['@type' => 'ListItem', 'position' => 1, 'name' => 'Accueil', 'item' => $base.'/']];
            $parent = '/'.explode('/', trim($path, '/'))[0];
            if ($parent !== $path && isset(config('seo.pages')[$parent])) {
                $crumbs[] = ['@type' => 'ListItem', 'position' => 2, 'name' => ucfirst(trim($parent, '/')), 'item' => $base.$parent];
            }
            $crumbs[] = ['@type' => 'ListItem', 'position' => count($crumbs) + 1, 'name' => $name, 'item' => $canonical];
            $graph[] = ['@type' => 'BreadcrumbList', '@id' => $canonical.'#breadcrumb', 'itemListElement' => $crumbs];
            $graph[2]['breadcrumb'] = ['@id' => $canonical.'#breadcrumb'];
        }

        return [
            'title' => $title, 'description' => $description, 'keywords' => $page['keywords'] ?? [],
            'canonical' => $canonical, 'image' => $image, 'indexable' => $page !== null,
            'robots' => $page ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex, nofollow',
            'preloadImage' => ($page['preloadImage'] ?? false) ? $page['image'] : null,
            'schema' => ['@context' => 'https://schema.org', '@graph' => $graph],
        ];
    }
}
