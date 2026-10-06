<?php

use App\Support\EditorialContent;
use App\Support\PublicRoutes;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->withoutVite();
    config(['seo.url' => 'https://allocall.ca', 'inertia.ssr.enabled' => false]);
});

it('serves canonical Canadian URLs and redirects legacy URLs without losing query parameters', function () {
    $seen = [];
    foreach (config('editorial.paths') as $logical => $languages) {
        foreach ($languages as $locale => $path) {
            expect($seen)->not->toContain($path);
            $seen[] = $path;
            $this->get($path)->assertOk()->assertInertia(fn (Assert $page) => $page
                ->where('locale', $locale)
                ->where('seo.canonical', 'https://allocall.ca'.$path)
                ->where('seo.alternates.fr-CA', 'https://allocall.ca'.$languages['fr'])
                ->where('seo.alternates.en-CA', 'https://allocall.ca'.$languages['en'])
                ->where('seo.indexable', true)
            );
            $legacy = $locale === 'en' ? '/en'.($logical === '/' ? '' : $logical) : $logical;
            if ($legacy !== $path) {
                $this->get($legacy.'?service=test&utm_source=example')->assertStatus(301)
                    ->assertRedirect($path.'?service=test&utm_source=example');
            }
        }
    }
});

it('renders six complete bilingual articles and their FAQ answers in HTML without JavaScript', function () {
    expect(config('editorial.articles'))->toHaveCount(6);
    foreach (['fr', 'en'] as $locale) {
        foreach (EditorialContent::articles($locale) as $article) {
            $response = $this->get($article['path'])->assertOk();
            $document = new DOMDocument;
            @$document->loadHTML('<?xml encoding="UTF-8">'.$response->getContent());
            $xpath = new DOMXPath($document);
            expect($xpath->query('//main//h1'))->toHaveCount(1);
            expect($xpath->evaluate('string(//main//h1)'))->toBe($article['title']);
            $body = $xpath->evaluate('string(//main)');
            foreach ($article['sections'] as $section) {
                expect($body)->toContain($section['heading']);
                foreach ($section['paragraphs'] as $paragraph) {
                    expect($body)->toContain($paragraph);
                }
            }
            expect(str_word_count($body))->toBeGreaterThan(250);
            $schema = json_decode($xpath->evaluate('string(//script[@type="application/ld+json"])'), true, flags: JSON_THROW_ON_ERROR);
            $posting = collect($schema['@graph'])->firstWhere('@type', 'BlogPosting');
            expect($posting['headline'])->toBe($article['title']);
            expect($posting['dateModified'])->toBe($article['updated']);
            expect($posting['inLanguage'])->toBe($locale.'-CA');
            $faq = collect($schema['@graph'])->firstWhere('@type', 'FAQPage');
            expect($faq['mainEntity'])->not->toBeEmpty();
            foreach ($faq['mainEntity'] as $question) {
                expect($body)->toContain($question['name'], $question['acceptedAnswer']['text']);
            }
            expect($xpath->evaluate('string(//meta[@property="og:type"]/@content)'))->toBe('article');
        }
    }
});

it('lists articles and all customer questions with crawlable links and visible answers', function () {
    foreach (['fr', 'en'] as $locale) {
        $listing = $this->get(PublicRoutes::path('/articles', $locale))->assertOk();
        foreach (EditorialContent::articles($locale) as $article) {
            $listing->assertSee('href="'.$article['path'].'"', false);
        }
        $faq = $this->get(PublicRoutes::path('/faq', $locale))->assertOk();
        foreach (EditorialContent::faqs('/faq', $locale) as $question) {
            $faq->assertSee(e($question['question']), false)->assertSee(e($question['answer']), false);
        }
    }
    foreach (['/articles/inconnu', '/en/articles/unknown', '/services/inconnu'] as $path) {
        $this->get($path)->assertNotFound();
    }
});

it('uses the Canadian contact number without inventing a Canadian business address', function () {
    $this->get('/services/centre-appels-ecommerce-quebec')->assertInertia(fn (Assert $page) => $page
        ->component('services/show')
        ->where('slug', 'commerce-electronique')
        ->where('seo.schema.@graph.0.@type', 'Organization')
        ->where('seo.schema.@graph.0.telephone', '+15148509092')
        ->where('seo.schema.@graph.0.address.addressCountry', 'MA')
        ->where('seo.schema.@graph.3.@type', 'Service')
        ->has('faqs')
    );
});

it('accepts the localized quote endpoints with validation in the selected language', function () {
    $this->postJson('/soumission', ['request_type' => 'quote'])->assertUnprocessable()
        ->assertJsonPath('errors.email.0', 'Le champ courriel est obligatoire.');
    $this->postJson('/en/quote', ['request_type' => 'quote'])->assertUnprocessable()
        ->assertJsonPath('errors.email.0', 'The email field is required.');
});
