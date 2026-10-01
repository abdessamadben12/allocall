<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\ArticleController;
use App\Support\EditorialContent;
use App\Support\PublicRoutes;
use App\Support\SeoMetadata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

$components = [
    '/' => 'welcome', '/services' => 'services/index', '/industries' => 'industries/index',
    '/solutions-ia' => 'solutions-ia', '/apropos' => 'propos', '/contact' => 'contact', '/devis' => 'devis',
];
$names = ['/' => 'home', '/devis' => 'quote', '/apropos' => 'apropos'];

foreach (config('editorial.paths') as $logical => $languages) {
    foreach ($languages as $locale => $path) {
        $name = ($locale === 'en' ? 'en.' : '').($names[$logical] ?? str_replace('/', '.', trim($logical, '/')));
        Route::get($path, function () use ($logical, $locale, $components) {
            $props = [];
            $editorial = EditorialContent::page($logical, $locale);
            if ($editorial) {
                return Inertia::render('articles/index', ['editorial' => $editorial]);
            }
            $component = $components[$logical] ?? null;
            if (! $component && preg_match('#^/(services|industries)/([^/]+)$#', $logical, $matches)) {
                $component = $matches[1].'/show';
                $props['slug'] = $matches[2];
            }
            abort_unless($component, 404);
            if (in_array($logical, ['/contact', '/devis'], true)) {
                $props['submissionStatus'] = ['success' => session('success'), 'error' => session('error')];
                $props['requestType'] = $logical === '/contact' ? 'contact' : 'quote';
            }

            return Inertia::render($component, $props);
        })->name($name);

        $legacy = $locale === 'en' ? '/en'.($logical === '/' ? '' : $logical) : $logical;
        if ($legacy !== $path) {
            Route::get($legacy, function (Request $request) use ($path) {
                return redirect($path.($request->getQueryString() ? '?'.$request->getQueryString() : ''), 301);
            });
        }
        if (in_array($logical, ['/contact', '/devis'], true)) {
            Route::post($path, [ContactController::class, 'submit'])->name($name.'.submit');
            if ($legacy !== $path) {
                Route::post($legacy, [ContactController::class, 'submit']);
            }
        }
    }
}

foreach (['fr' => '', 'en' => '/en'] as $locale => $prefix) {
    foreach (array_keys(config('editorial.paths')) as $logical) {
        if ($logical !== '/services' && ! str_starts_with($logical, '/services/')) {
            continue;
        }
        Route::get($prefix.str_replace('/services', '/savoir-faire', $logical), function (Request $request) use ($logical, $locale) {
            return redirect(PublicRoutes::path($logical, $locale).($request->getQueryString() ? '?'.$request->getQueryString() : ''), 301);
        });
    }
}

Route::get('sitemap.xml', function () {
    $base = SeoMetadata::baseUrl();
    $urls = collect(PublicRoutes::all())->flatMap(function ($languages) use ($base) {
        return collect($languages)->map(function ($path) use ($base, $languages) {
            $alternates = collect($languages)->map(fn ($alternate, $locale) => sprintf(
                '<xhtml:link rel="alternate" hreflang="%s-CA" href="%s"/>',
                $locale, htmlspecialchars($base.$alternate, ENT_XML1 | ENT_QUOTES, 'UTF-8')
            ))->implode('');

            return '<url><loc>'.htmlspecialchars($base.$path, ENT_XML1 | ENT_QUOTES, 'UTF-8').'</loc>'.$alternates.'</url>';
        })->values();
    })->implode('');

    return response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'.$urls.'</urlset>', 200, ['Content-Type' => 'application/xml; charset=UTF-8']);
})->name('sitemap');

Route::get('robots.txt', fn () => response("User-agent: *\nAllow: /\n\nSitemap: ".SeoMetadata::baseUrl()."/sitemap.xml\n", 200, ['Content-Type' => 'text/plain; charset=UTF-8']))->name('robots');

// Keep existing utility pages outside the indexable content catalog.
Route::get('articles/{slug}', [ArticleController::class, 'show'])->name('articles.dynamic');
Route::get('en/articles/{slug}', [ArticleController::class, 'show'])->name('en.articles.dynamic');

Route::get('galerie', fn () => redirect('/', 302))->name('galerie');
Route::get('configurateur', fn () => Inertia::render('configurateur'))->name('configurateur');
Route::get('etude-de-projet', fn () => Inertia::render('etude-de-projet'))->name('etude-de-projet');
