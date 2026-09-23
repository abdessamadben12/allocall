<?php

use App\Mail\ContactSubmitted;
use Illuminate\Support\Facades\Mail;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    config(['seo.url' => 'https://allocall.example', 'inertia.ssr.enabled' => false]);
});

it('serves every English public page with translated metadata and reciprocal language links', function () {
    foreach (config('seo.english_pages') as $path => $metadata) {
        $englishPath = '/en'.($path === '/' ? '' : $path);
        $response = $this->get($englishPath)->assertOk()->assertHeader('Content-Language', 'en');
        $response->assertInertia(fn (Assert $page) => $page
            ->where('locale', 'en')
            ->where('seo.language', 'en-CA')
            ->where('seo.indexable', true)
            ->where('seo.title', $metadata['title'])
            ->where('seo.canonical', 'https://allocall.example'.$englishPath)
            ->where('seo.alternates.fr-CA', 'https://allocall.example'.$path)
            ->where('seo.alternates.en-CA', 'https://allocall.example'.$englishPath)
        );
        $document = new DOMDocument;
        @$document->loadHTML($response->getContent());
        $xpath = new DOMXPath($document);
        expect($xpath->evaluate('string(//html/@lang)'))->toBe('en-CA');
        expect($xpath->evaluate('string(//head/title)'))->toBe($metadata['title']);
        expect($xpath->evaluate('string(//head/meta[@name="description"]/@content)'))->toBe($metadata['description']);
        expect($xpath->query('//head/link[@rel="alternate"]'))->toHaveCount(3);
        $this->get($path)->assertHeader('Content-Language', 'fr')
            ->assertInertia(fn (Assert $page) => $page->where('locale', 'fr')->where('seo.language', 'fr-CA'));
    }
});

it('keeps English aliases and unknown slugs consistent', function () {
    $this->get('/en/savoir-faire')->assertStatus(301)->assertRedirect('/en/services');
    $this->get('/en/savoir-faire/assistants-virtuels')->assertStatus(301)->assertRedirect('/en/services/assistants-virtuels');
    $this->get('/en/services/unknown')->assertNotFound();
    $this->get('/en/industries/unknown')->assertNotFound();
    $this->get('/en/contact?utm_source=test')->assertInertia(fn (Assert $page) => $page->where('seo.canonical', 'https://allocall.example/en/contact'));
});

it('submits contacts in English and returns English confirmation', function () {
    Mail::fake();
    $this->from('/en/contact')->post('/en/contact', [
        'request_type' => 'contact', 'full_name' => 'Alex Smith',
        'phone' => '+1 514 555 0100', 'email' => 'alex@example.com',
        'message' => 'Please contact me about your call centre services.',
    ])->assertRedirect('/en/contact')->assertSessionHasNoErrors()
        ->assertSessionHas('success', 'Your message has been sent successfully!');
    Mail::assertSent(ContactSubmitted::class);
});

it('validates contact fields in the selected language without sending mail', function () {
    Mail::fake();
    $this->postJson('/en/contact', ['request_type' => 'contact'])->assertUnprocessable()
        ->assertJsonPath('errors.email.0', 'The email field is required.');
    $this->postJson('/contact', ['request_type' => 'contact'])->assertUnprocessable()
        ->assertJsonPath('errors.email.0', 'Le champ courriel est obligatoire.');
    Mail::assertNothingSent();
});

it('returns an English delivery error while retaining the contact', function () {
    Mail::shouldReceive('to')->once()->andReturnSelf();
    Mail::shouldReceive('send')->once()->andThrow(new RuntimeException('Test failure'));
    $this->from('/en/contact')->post('/en/contact', [
        'request_type' => 'contact', 'full_name' => 'Alex Smith',
        'phone' => '5145550100', 'email' => 'alex@example.com',
        'message' => 'Please contact me about your services.',
    ])->assertRedirect('/en/contact')->assertSessionHas('error', fn ($error) => str_starts_with($error, 'Your message was saved'));
    $this->assertDatabaseCount('contact_messages', 1);
});
