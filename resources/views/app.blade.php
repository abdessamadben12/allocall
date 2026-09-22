<!DOCTYPE html>
@php
    $appUrl = rtrim(config('app.url', 'https://www.alidade.ma'), '/');
    $requestPath = request()->getPathInfo();
    $canonicalUrl = $appUrl . ($requestPath === '/' ? '/' : $requestPath);
    $socialImageUrl = $appUrl . '/images/alidade-social-card.png';
@endphp
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="theme-color" content="#0d1a2d">
        <meta name="color-scheme" content="light">
        <meta name="description" content="Alidade, entreprise de travaux au Maroc : renovation, agencement interieur, menuiserie bois, aluminium, peinture et finitions pour particuliers et professionnels.">
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        <link rel="canonical" href="{{ $canonicalUrl }}">

        <title inertia>{{ config('app.name', 'Alidade') }}</title>

        <meta property="og:locale" content="fr_MA">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="Alidade">
        <meta property="og:title" content="Alidade | Renovation, agencement et menuiserie au Maroc">
        <meta property="og:description" content="Entreprise de travaux au Maroc : renovation, agencement interieur, menuiserie bois, aluminium, peinture et finitions avec suivi professionnel.">
        <meta property="og:url" content="{{ $canonicalUrl }}">
        <meta property="og:image" content="{{ $socialImageUrl }}">
        <meta property="og:image:secure_url" content="{{ $socialImageUrl }}">
        <meta property="og:image:type" content="image/png">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:image:alt" content="Alidade - travaux, renovation et agencement au Maroc">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Alidade | Renovation, agencement et menuiserie au Maroc">
        <meta name="twitter:description" content="Entreprise de travaux au Maroc : renovation, agencement interieur, menuiserie bois, aluminium, peinture et finitions.">
        <meta name="twitter:image" content="{{ $socialImageUrl }}">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" sizes="16x16 32x32 48x48 180x180 192x192 512x512">
        <link rel="icon" type="image/png" sizes="16x16" href="/images/icons/icon-16.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/images/icons/icon-32.png">
        <link rel="icon" type="image/png" sizes="48x48" href="/images/icons/icon-48.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/images/icons/icon-180.png">
        <link rel="manifest" href="/site.webmanifest">

        @routes
        @viteReactRefresh
        @vite('resources/js/app.tsx')
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
