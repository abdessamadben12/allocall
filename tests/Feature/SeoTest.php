<?php

use App\Support\PublicRoutes;
use App\Support\SeoMetadata;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    config(['seo.url' => 'https://allocall.example', 'inertia.ssr.enabled' => false]);
});

it('renders unique ALLO CALL metadata before JavaScript on every public page', function () {
    foreach (config('seo.pages') as $path => $metadata) {
        $canonicalPath = PublicRoutes::path($path);
        $response = $this->get($canonicalPath)->assertOk();
        $document = new DOMDocument;
        @$document->loadHTML($response->getContent());
        $xpath = new DOMXPath($document);
        $head = $xpath->query('//head')->item(0);

        expect($xpath->query('//head/title'))->toHaveCount(1);
        expect($xpath->evaluate('string(//head/title)'))->toBe($metadata['title']);
        expect($xpath->query('//head/meta[@name="description"]'))->toHaveCount(1);
        expect($xpath->evaluate('string(//head/meta[@name="description"]/@content)'))->toBe($metadata['description']);
        expect($xpath->evaluate('string(//head/meta[@name="keywords"]/@content)'))->toBe(implode(', ', $metadata['keywords']));
        expect($xpath->query('//head/link[@rel="canonical"]'))->toHaveCount(1);
        expect($xpath->evaluate('string(//head/link[@rel="canonical"]/@href)'))->toBe('https://allocall.example'.$canonicalPath);
        expect($xpath->evaluate('string(//head/meta[@property="og:image"]/@content)'))->toBe('https://allocall.example'.$metadata['image']);
        expect($document->saveHTML($head))->not->toContain('Alidade', 'alidade.ma', 'fonts.googleapis.com', 'fonts.gstatic.com');
        expect($xpath->query('//head/script[@type="application/ld+json"]'))->toHaveCount(1);
        $schema = json_decode($xpath->evaluate('string(//head/script[@type="application/ld+json"])'), true, flags: JSON_THROW_ON_ERROR);
        expect($schema['@graph'][0]['name'])->toBe('ALLO CALL');
        expect($schema['@graph'][2]['url'])->toBe('https://allocall.example'.$canonicalPath);
        expect(file_exists(public_path($metadata['image'])))->toBeTrue();
        $response->assertHeader('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }
});

it('uses the same canonical metadata during Inertia navigation and strips query parameters', function () {
    $this->get('/services/adjoint-virtuel-quebec?utm_source=test')
        ->assertInertia(fn (Assert $page) => $page
            ->component('services/show')
            ->where('seo.canonical', 'https://allocall.example/services/adjoint-virtuel-quebec')
            ->where('seo.title', config('seo.pages')['/services/assistants-virtuels']['title'])
            ->where('seo.schema.@graph.3.@type', 'Service')
        );
});

it('publishes only canonical public URLs in the sitemap and robots file', function () {
    $response = $this->get('/sitemap.xml')->assertOk();
    $xml = simplexml_load_string($response->getContent());
    $urls = array_map(fn ($url) => (string) $url->loc, iterator_to_array($xml->url, false));
    $paths = collect(config('editorial.paths'))->flatMap(fn ($languages) => array_values($languages))->all();
    expect($urls)->toBe(array_map(fn ($path) => 'https://allocall.example'.$path, $paths));
    expect($response->getContent())->not->toContain('lastmod', '/login', '/dashboard', '/savoir-faire', 'alidade');
    $this->get('/robots.txt')->assertOk()->assertSee('Sitemap: https://allocall.example/sitemap.xml', false);
    expect(file_exists(public_path('robots.txt')))->toBeFalse();
});

it('redirects duplicate service URLs permanently and rejects unknown slugs', function () {
    $this->get('/savoir-faire')->assertStatus(301)->assertRedirect('/services');
    $this->get('/savoir-faire/assistants-virtuels')->assertStatus(301)->assertRedirect('/services/adjoint-virtuel-quebec');
    foreach (['/services/inconnu', '/industries/inconnu', '/savoir-faire/inconnu'] as $path) {
        $this->get($path)->assertNotFound();
    }
});

it('keeps account and legacy pages out of search results', function () {
    foreach (['/login', '/configurateur', '/etude-de-projet'] as $path) {
        $this->get($path)->assertOk()->assertHeader('X-Robots-Tag', 'noindex, nofollow');
    }
});

it('falls back to the configured app URL without inventing a public domain', function () {
    config(['seo.url' => null, 'app.url' => 'https://configured.example/']);
    expect(SeoMetadata::baseUrl())->toBe('https://configured.example');
    $this->get('/robots.txt')->assertSee('https://configured.example/sitemap.xml', false);
});

it('advertises the live sitemap and keeps administration out of crawler paths', function () {
    $this->get('/robots.txt')->assertOk()
        ->assertSee('Sitemap: https://allocall.example/sitemap.xml', false)
        ->assertSee('Disallow: /admin/', false)->assertSee('Disallow: /dashboard', false)
        ->assertDontSee('Disallow: /articles', false)->assertDontSee('Disallow: /favicon', false);
    expect(file_exists(public_path('sitemap.xml')))->toBeFalse();
});

it('declares square favicons with browser and Apple fallbacks', function () {
    $this->withoutVite();
    $this->get('/')->assertOk()->assertSee('href="/favicon.ico"', false)
        ->assertSee('href="/favicon.svg"', false)->assertSee('href="/favicon-96x96.png"', false)
        ->assertSee('href="/apple-touch-icon.png"', false);
    foreach (['favicon-96x96.png' => 96, 'apple-touch-icon.png' => 180] as $file => $size) {
        $image = getimagesize(public_path($file));
        expect($image[0])->toBe($size)->and($image[1])->toBe($size);
    }
    expect(file_get_contents(public_path('favicon.svg')))->toContain('viewBox="0 0 64 64"');
    expect(substr(file_get_contents(public_path('favicon.ico')), 0, 4))->toBe("\x00\x00\x01\x00");
});
