<?php

use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    config(['seo.url' => 'https://allocall.example', 'inertia.ssr.enabled' => false]);
});

it('publishes indexable city pages in both languages with a local Service schema', function () {
    $pages = [
        '/centre-appels-montreal' => 'Montréal', '/en/call-centre-montreal' => 'Montreal',
        '/centre-appels-quebec' => 'Québec', '/en/call-centre-quebec-city' => 'Quebec City',
        '/centre-appels-laval' => 'Laval', '/centre-appels-gatineau' => 'Gatineau',
    ];
    foreach ($pages as $path => $city) {
        $this->get($path)->assertOk()
            ->assertHeader('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
            ->assertInertia(fn (Assert $page) => $page
                ->component('articles/index')
                ->where('editorial.kind', 'location')
                ->where('seo.canonical', 'https://allocall.example'.$path)
                ->where('seo.schema.@graph.3.@type', 'Service')
                ->where('seo.schema.@graph.3.areaServed.name', $city)
                ->where('seo.schema.@graph.4.@type', 'BreadcrumbList')
                ->has('faqs', fn (Assert $faqs) => $faqs->etc())
            );
    }
    $this->get('/regions-desservies')->assertOk()->assertInertia(fn (Assert $page) => $page
        ->where('editorial.kind', 'locations')->has('editorial.articles', 4));
    $this->get('/sitemap.xml')->assertSee('https://allocall.example/centre-appels-montreal', false)
        ->assertSee('https://allocall.example/en/service-areas', false);
});

it('renders city content and the Quebec regulation guides without JavaScript', function () {
    $this->get('/centre-appels-gatineau')->assertOk()
        ->assertSee('Une clientèle des deux côtés de la rivière')
        ->assertSee('Pouvez-vous servir nos clients d’Ottawa en anglais?');
    $this->get('/articles/loi-25-centre-appels-renseignements-personnels')->assertOk()
        ->assertSee('Fournisseur à l’extérieur du Québec');
    $this->get('/en/articles/bill-96-french-customer-service')->assertOk()
        ->assertSee('What Bill 96 reinforces');
});

it('lists every Quebec service area in the organization schema', function () {
    $this->get('/')->assertInertia(fn (Assert $page) => $page
        ->where('seo.schema.@graph.0.areaServed.0', ['@type' => 'City', 'name' => 'Montréal'])
        ->where('seo.schema.@graph.0.knowsLanguage', ['fr-CA', 'en-CA'])
        ->missing('seo.schema.@graph.0.sameAs')
        ->missing('seo.schema.@graph.0.openingHours')
    );
});

it('becomes a local business once a real Quebec address is configured', function () {
    config(['seo.business' => [
        'street' => '1000 rue Exemple', 'locality' => 'Montréal', 'region' => 'QC', 'postal_code' => 'H3B 0A1',
        'latitude' => '45.5', 'longitude' => '-73.57', 'hours' => ['Mo-Fr 08:00-18:00'],
        'same_as' => ['https://www.linkedin.com/company/example'], 'price_range' => '$$',
    ]]);

    $this->get('/')->assertInertia(fn (Assert $page) => $page
        ->where('seo.schema.@graph.0.@type', 'ProfessionalService')
        ->where('seo.schema.@graph.0.address.addressCountry', 'CA')
        ->where('seo.schema.@graph.0.address.postalCode', 'H3B 0A1')
        ->where('seo.schema.@graph.0.geo.latitude', 45.5)
        ->where('seo.schema.@graph.0.openingHours', ['Mo-Fr 08:00-18:00'])
        ->where('seo.schema.@graph.0.sameAs', ['https://www.linkedin.com/company/example'])
    );
});
