<?php

namespace App\Support;

use App\Models\Article;
use Illuminate\Support\Facades\File;

class ArticleCatalog
{
    public static function articles(string $locale): array
    {
        return Article::publishedArticles()->map(fn (Article $article) => self::present($article, $locale))->values()->all();
    }

    public static function find(string $slug, string $locale): ?array
    {
        return collect(self::articles($locale))->firstWhere('slug', $slug);
    }

    public static function present(Article $article, string $locale): array
    {
        $content = $article->content[$locale];
        $rich = isset($content['body']) ? RichArticleContent::render($content['body']) : null;
        $paths = $article->publicPaths();

        return [
            ...$content,
            'bodyHtml' => $rich['html'] ?? null,
            'headings' => $rich['headings'] ?? null,
            'slug' => $article->{'slug_'.$locale},
            'path' => $paths[$locale],
            'alternates' => $paths,
            'image' => $article->image,
            'published' => $article->created_at->format('Y-m-d'),
            'updated' => $article->updated_at->format('Y-m-d'),
            'relatedService' => ($locale === 'en' ? '/en' : '').$article->service,
            // Articles inherit their service's keywords so the meta keywords stay relevant.
            'keywords' => config($locale === 'en' ? 'seo.english_pages' : 'seo.pages')[$article->service]['keywords']
                ?? config('seo.pages')[$article->service]['keywords'] ?? [],
        ];
    }

    public static function indexPage(string $locale): array
    {
        $english = $locale === 'en';

        return [
            'title' => $english ? 'Customer service and call centre guides | ALLO CALL' : 'Conseils centre d’appels et relation client | ALLO CALL',
            'description' => $english
                ? 'Practical guides on call answering, customer service outsourcing, lead management and AI-assisted customer relations.'
                : 'Des guides pratiques sur la réception d’appels, l’externalisation du service client, la gestion des leads et l’IA en relation client.',
            'image' => '/images/hero/gestion-leads.webp',
            'keywords' => $english
                ? ['customer service guides', 'call centre tips', 'outsourced customer service', 'lead management', 'AI customer service']
                : ['conseils relation client', 'guides centre d’appels', 'externalisation service client', 'gestion des leads', 'IA relation client'],
            'pageType' => 'CollectionPage',
        ];
    }

    public static function services(): array
    {
        return collect(config('seo.pages'))
            ->filter(fn ($page, $path) => str_starts_with($path, '/services/'))
            ->map(fn ($page, $path) => ['value' => $path, 'label' => explode(' | ', $page['title'])[0]])
            ->values()->all();
    }

    public static function siteImages(): array
    {
        return collect(['hero', 'articles'])
            ->flatMap(fn ($directory) => collect(File::glob(public_path('images/'.$directory.'/*.webp')))
                ->map(fn ($file) => '/images/'.$directory.'/'.basename($file)))
            ->values()->all();
    }
}
