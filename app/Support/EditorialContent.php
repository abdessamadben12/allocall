<?php

namespace App\Support;

use App\Models\Article;

class EditorialContent
{
    public static function page(string $logical, string $locale): ?array
    {
        if ($logical === '/articles') {
            return [
                'kind' => 'index',
                'title' => $locale === 'en' ? 'Practical guides for your Canadian business' : 'Des conseils pratiques pour votre PME au Québec et au Canada',
                'summary' => self::metadata($locale)['/articles']['description'],
                'articles' => self::articles($locale),
            ];
        }
        if ($logical === '/faq') {
            return [
                'kind' => 'faq',
                'title' => $locale === 'en' ? 'Your questions, answered' : 'Les réponses à vos questions',
                'summary' => self::metadata($locale)['/faq']['description'],
            ];
        }
        if ($logical === '/villes') {
            return [
                'kind' => 'locations',
                'title' => $locale === 'en' ? 'Call answering across Quebec' : 'Réception d’appels partout au Québec',
                'summary' => self::metadata($locale)['/villes']['description'],
                'articles' => self::locations($locale),
            ];
        }
        if (str_starts_with($logical, '/villes/')) {
            $location = collect(self::locations($locale))->firstWhere('key', substr($logical, strlen('/villes/')));
            if ($location) {
                return ['kind' => 'location', 'title' => $location['title'], 'summary' => $location['summary'], 'article' => $location];
            }
        }
        if (str_starts_with($logical, '/articles/')) {
            $article = self::article(substr($logical, strlen('/articles/')), $locale);
            if ($article) {
                return ['kind' => 'article', 'title' => $article['title'], 'summary' => $article['summary'], 'article' => $article];
            }
        }

        return null;
    }

    public static function articles(string $locale): array
    {
        $articles = config('editorial.articles');
        foreach (Article::publishedArticles() as $article) {
            $articles[$article->editorialKey()] = [
                ...$article->content, 'image' => $article->image, 'service' => $article->service,
                'updated' => $article->updated_at->format('Y-m-d'),
            ];
        }

        return collect($articles)->map(function ($article, $key) use ($locale) {
            $rich = isset($article[$locale]['body']) ? RichArticleContent::render($article[$locale]['body']) : null;

            return [
                ...$article[$locale],
                'bodyHtml' => $rich['html'] ?? null,
                'headings' => $rich['headings'] ?? null,
                'key' => $key,
                'path' => PublicRoutes::path('/articles/'.$key, $locale),
                'image' => $article['image'],
                'updated' => $article['updated'],
                'relatedService' => PublicRoutes::path($article['service'], $locale),
                // Articles created in the dashboard have no keywords field, so they inherit their service's keywords.
                'keywords' => $article[$locale]['keywords'] ?? self::serviceKeywords($article['service'], $locale),
            ];
        })->values()->all();
    }

    public static function locations(string $locale): array
    {
        return collect(config('editorial.locations'))->map(fn ($location, $key) => [
            ...$location[$locale],
            'category' => $location[$locale]['city'],
            'key' => $key,
            'path' => PublicRoutes::path('/villes/'.$key, $locale),
            'image' => $location['image'],
            'updated' => $location['updated'],
            'relatedService' => PublicRoutes::path($location['service'], $locale),
        ])->values()->all();
    }

    private static function serviceKeywords(string $service, string $locale): array
    {
        return config($locale === 'en' ? 'seo.english_pages' : 'seo.pages')[$service]['keywords']
            ?? config('seo.pages')[$service]['keywords'] ?? [];
    }

    public static function article(string $key, string $locale): ?array
    {
        return collect(self::articles($locale))->firstWhere('key', $key);
    }

    public static function faqs(string $logical, string $locale): array
    {
        return collect(config('editorial.faqs'))
            ->filter(fn ($faq) => $logical === '/faq' || in_array($logical, $faq['pages'], true))
            ->map(fn ($faq) => $faq[$locale])->values()->all();
    }

    public static function metadata(string $locale): array
    {
        $english = $locale === 'en';
        $pages = [
            '/articles' => [
                'title' => $english ? 'Customer service guides for Canadian businesses | ALLO CALL' : 'Conseils en service à la clientèle pour les PME | ALLO CALL',
                'description' => $english ? 'Practical guides to bilingual call answering, appointment scheduling and AI-assisted customer service for businesses in Quebec and Canada.' : 'Des guides pratiques pour les PME du Québec et du Canada : réception d’appels, accueil bilingue, rendez-vous et IA en service à la clientèle.',
                'image' => '/images/hero/gestion-leads.webp',
                'keywords' => $english
                    ? ['customer service guides', 'call centre tips Canada', 'bilingual customer service', 'appointment scheduling', 'AI customer service']
                    : ['conseils service à la clientèle', 'guides centre d’appels', 'service client bilingue', 'prise de rendez-vous PME', 'IA relation client'],
                'pageType' => 'CollectionPage',
            ],
            '/faq' => [
                'title' => $english ? 'Call answering and customer service FAQ | ALLO CALL Canada' : 'FAQ : réception d’appels et service à la clientèle | ALLO CALL',
                'description' => $english ? 'Answers about bilingual service, coverage hours, quotes, appointments and working with AlloCall for your Canadian business.' : 'Nos réponses sur le service bilingue, les horaires, les soumissions, les rendez-vous et l’accompagnement des entreprises québécoises et canadiennes.',
                'image' => '/images/hero/allocall-contact.webp',
                'keywords' => $english
                    ? ['call centre FAQ', 'call answering questions', 'bilingual customer service Canada', 'call centre pricing', 'outsourced customer service']
                    : ['FAQ centre d’appels', 'questions réception d’appels', 'service client bilingue Canada', 'soumission centre d’appels', 'externalisation service à la clientèle'],
            ],
        ];
        $pages['/villes'] = [
            'title' => $english ? 'Call centre in Montreal, Quebec City, Laval, Gatineau | ALLO CALL' : 'Centre d’appels à Montréal, Québec, Laval et Gatineau | ALLO CALL',
            'description' => $english
                ? 'Bilingual call answering, customer service and appointment setting for businesses in Montreal, Quebec City, Laval, Gatineau and across Quebec.'
                : 'Réception d’appels, service à la clientèle bilingue et prise de rendez-vous pour les PME de Montréal, Québec, Laval, Gatineau et de tout le Québec.',
            'keywords' => $english
                ? ['call centre Quebec', 'call centre Montreal', 'call centre Quebec City', 'call centre Laval', 'call centre Gatineau']
                : ['centre d’appels Québec', 'centre d’appels Montréal', 'centre d’appels Laval', 'centre d’appels Gatineau', 'réception d’appels Québec'],
            'image' => '/images/hero/allocall-contact.webp',
            'pageType' => 'CollectionPage',
        ];
        foreach (self::locations($locale) as $location) {
            $pages['/villes/'.$location['key']] = [
                'title' => $location['seoTitle'].' | ALLO CALL',
                'description' => $location['description'],
                'keywords' => $location['keywords'],
                'image' => $location['image'],
                'city' => $location['city'],
                'preloadImage' => true,
            ];
        }
        foreach (self::articles($locale) as $article) {
            $pages['/articles/'.$article['key']] = [
                // Keep titles short enough to avoid truncation in search results.
                'title' => mb_strlen($article['seoTitle']) > 52 ? $article['seoTitle'] : $article['seoTitle'].' | ALLO CALL',
                'description' => $article['description'],
                'keywords' => $article['keywords'],
                'image' => $article['image'],
                'preloadImage' => true,
            ];
        }

        return $pages;
    }
}
