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
];
