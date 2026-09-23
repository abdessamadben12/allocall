<?php

return [
    'url' => env('SEO_SITE_URL'),
    'pages' => json_decode(file_get_contents(resource_path('seo/pages.json')), true, 512, JSON_THROW_ON_ERROR),
    'english_pages' => json_decode(file_get_contents(resource_path('seo/pages.en.json')), true, 512, JSON_THROW_ON_ERROR),
];
