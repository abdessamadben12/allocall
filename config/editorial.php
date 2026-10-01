<?php

return [
    'paths' => json_decode(file_get_contents(resource_path('content/paths.json')), true, 512, JSON_THROW_ON_ERROR),
    'articles' => json_decode(file_get_contents(resource_path('content/articles.json')), true, 512, JSON_THROW_ON_ERROR),
    'faqs' => json_decode(file_get_contents(resource_path('content/faqs.json')), true, 512, JSON_THROW_ON_ERROR),
];
