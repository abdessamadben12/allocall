<?php

namespace App\Support;

use App\Models\Article;

class PublicRoutes
{
    public static function all(): array
    {
        $paths = config('editorial.paths');
        foreach (Article::publishedArticles() as $article) {
            $paths['/articles/'.$article->editorialKey()] = $article->publicPaths();
        }

        return $paths;
    }

    public static function path(string $logical, string $locale = 'fr'): string
    {
        return self::all()[$logical][$locale] ?? $logical;
    }

    public static function logical(string $path): string
    {
        $path = '/'.trim($path, '/');
        foreach (self::all() as $logical => $languages) {
            if (in_array($path, $languages, true)) {
                return $logical;
            }
        }

        return preg_replace('#^/en(?=/|$)#', '', $path) ?: '/';
    }
}
