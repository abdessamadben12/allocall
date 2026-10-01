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
            return [
                ...$article[$locale],
                'key' => $key,
                'path' => PublicRoutes::path('/articles/'.$key, $locale),
                'image' => $article['image'],
                'updated' => $article['updated'],
                'relatedService' => PublicRoutes::path($article['service'], $locale),
            ];
        })->values()->all();
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
                'keywords' => [],
                'pageType' => 'CollectionPage',
            ],
            '/faq' => [
                'title' => $english ? 'Call answering and customer service FAQ | ALLO CALL Canada' : 'FAQ : réception d’appels et service à la clientèle | ALLO CALL',
                'description' => $english ? 'Answers about bilingual service, coverage hours, quotes, appointments and working with AlloCall for your Canadian business.' : 'Nos réponses sur le service bilingue, les horaires, les soumissions, les rendez-vous et l’accompagnement des entreprises québécoises et canadiennes.',
                'image' => '/images/hero/allocall-contact.webp',
                'keywords' => [],
            ],
        ];
        foreach (self::articles($locale) as $article) {
            $pages['/articles/'.$article['key']] = [
                'title' => $article['seoTitle'].' | ALLO CALL',
                'description' => $article['description'],
                'keywords' => [],
                'image' => $article['image'],
                'preloadImage' => true,
            ];
        }

        return $pages;
    }
}
