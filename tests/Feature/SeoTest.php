<?php

use App\Support\SeoMetadata;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    config(['seo.url' => 'https://allocall.example', 'inertia.ssr.enabled' => false]);
});

it('renders unique ALLO CALL metadata before JavaScript on every public page', function () {
    foreach (config('seo.pages') as $path => $metadata) {
        $response = $this->get($path)->assertOk();
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
        expect($xpath->evaluate('string(//head/link[@rel="canonical"]/@href)'))->toBe('https://allocall.example'.$path);
        expect($xpath->evaluate('string(//head/meta[@property="og:image"]/@content)'))->toBe('https://allocall.example'.$metadata['image']);
        expect($document->saveHTML($head))->not->toContain('Alidade', 'alidade.ma', 'fonts.googleapis.com', 'fonts.gstatic.com');
        expect($xpath->query('//head/script[@type="application/ld+json"]'))->toHaveCount(1);
        $schema = json_decode($xpath->evaluate('string(//head/script[@type="application/ld+json"])'), true, flags: JSON_THROW_ON_ERROR);
        expect($schema['@graph'][0]['name'])->toBe('ALLO CALL');
        expect($schema['@graph'][2]['url'])->toBe('https://allocall.example'.$path);
        expect(file_exists(public_path($metadata['image'])))->toBeTrue();
        $response->assertHeader('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }
});

it('uses the same canonical metadata during Inertia navigation and strips query parameters', function () {
    $this->get('/services/assistants-virtuels?utm_source=test')
        ->assertInertia(fn (Assert $page) => $page
            ->component('services/show')
            ->where('seo.canonical', 'https://allocall.example/services/assistants-virtuels')
            ->where('seo.title', config('seo.pages')['/services/assistants-virtuels']['title'])
            ->where('seo.schema.@graph.3.@type', 'Service')
        );
});

it('publishes only canonical public URLs in the sitemap and robots file', function () {
    $response = $this->get('/sitemap.xml')->assertOk();
    $xml = simplexml_load_string($response->getContent());
    $urls = array_map(fn ($url) => (string) $url->loc, iterator_to_array($xml->url, false));
    expect($urls)->toBe(array_map(fn ($path) => 'https://allocall.example'.$path, array_keys(config('seo.pages'))));
    expect($response->getContent())->not->toContain('lastmod', '/login', '/dashboard', '/savoir-faire', 'alidade');
    $this->get('/robots.txt')->assertOk()->assertSee('Sitemap: https://allocall.example/sitemap.xml', false);
    expect(file_exists(public_path('robots.txt')))->toBeFalse();
});

it('redirects duplicate service URLs permanently and rejects unknown slugs', function () {
    $this->get('/savoir-faire')->assertStatus(301)->assertRedirect('/services');
    $this->get('/savoir-faire/assistants-virtuels')->assertStatus(301)->assertRedirect('/services/assistants-virtuels');
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
