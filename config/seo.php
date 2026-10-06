<?php

$pages = json_decode(file_get_contents(resource_path('seo/pages.json')), true, 512, JSON_THROW_ON_ERROR);
$english = json_decode(file_get_contents(resource_path('seo/pages.en.json')), true, 512, JSON_THROW_ON_ERROR);
$copy = json_decode(file_get_contents(resource_path('content/page-copy.json')), true, 512, JSON_THROW_ON_ERROR);
foreach ($copy as $path => $languages) {
    $pages[$path] = array_replace($pages[$path] ?? [], $languages['fr']);
    $english[$path] = array_replace($english[$path] ?? [], $languages['en']);
}
$ecommerce = json_decode(file_get_contents(resource_path('content/ecommerce.json')), true, 512, JSON_THROW_ON_ERROR);
foreach (['fr', 'en'] as $locale) {
    $metadata = [
        'title' => $ecommerce[$locale]['seoTitle'],
        'description' => $ecommerce[$locale]['seoDescription'],
        'keywords' => $ecommerce[$locale]['keywords'],
        'image' => '/images/services/service-clientele.webp',
        'pageType' => 'WebPage',
    ];
    if ($locale === 'fr') {
        $pages['/services/commerce-electronique'] = $metadata;
    } else {
        $english['/services/commerce-electronique'] = $metadata;
    }
}

return [
    'url' => env('SEO_SITE_URL', 'https://allocall.ca'),
    'pages' => $pages,
    'english_pages' => $english,
    // Local business details for structured data. Leave BUSINESS_STREET empty until a real
    // Quebec address exists: the schema then keeps the head-office address as an Organization.
    'business' => [
        'street' => env('BUSINESS_STREET', ''),
        'locality' => env('BUSINESS_LOCALITY', ''),
        'region' => env('BUSINESS_REGION', 'QC'),
        'postal_code' => env('BUSINESS_POSTAL_CODE', ''),
        'latitude' => env('BUSINESS_LATITUDE'),
        'longitude' => env('BUSINESS_LONGITUDE'),
        // Comma-separated schema.org values, e.g. "Mo-Fr 08:00-18:00,Sa 09:00-13:00".
        'hours' => array_values(array_filter(array_map('trim', explode(',', env('BUSINESS_HOURS', ''))))),
        // Comma-separated profile URLs: Google Business Profile, LinkedIn, Facebook, Pages Jaunes…
        'same_as' => array_values(array_filter(array_map('trim', explode(',', env('BUSINESS_SAME_AS', ''))))),
        'price_range' => env('BUSINESS_PRICE_RANGE', ''),
    ],
    'service_areas' => ['Montréal', 'Laval', 'Québec', 'Gatineau', 'Longueuil', 'Lévis', 'Sherbrooke', 'Trois-Rivières'],
];
