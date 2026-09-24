<!DOCTYPE html>
@php
    $seo = $page['props']['seo'] ?? \App\Support\SeoMetadata::forRequest(request());
@endphp

<html lang="{{ $seo['language'] }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#0d1a2d">
        <meta name="color-scheme" content="light">
        <meta name="application-name" content="ALLO CALL">
        <meta name="apple-mobile-web-app-title" content="ALLO CALL">
        <meta name="author" content="ALLO CALL">

        @inertiaHead

        @if (!$__inertiaSsrResponse)
            <title inertia>{{ $seo['title'] }}</title>
            <meta inertia="description" name="description" content="{{ $seo['description'] }}">
            <meta inertia="keywords" name="keywords" content="{{ implode(', ', $seo['keywords']) }}">
            <meta inertia="robots" name="robots" content="{{ $seo['robots'] }}">
            <link inertia="canonical" rel="canonical" href="{{ $seo['canonical'] }}">

            @foreach ($seo['alternates'] as $language => $url)
                <link inertia="alternate:{{ $language }}" rel="alternate" hreflang="{{ $language }}" href="{{ $url }}">
            @endforeach
            <meta inertia="og:locale" property="og:locale" content="{{ $seo['ogLocale'] }}">
            <meta inertia="og:type" property="og:type" content="website">
            <meta inertia="og:site_name" property="og:site_name" content="ALLO CALL">
            <meta inertia="og:title" property="og:title" content="{{ $seo['title'] }}">
            <meta inertia="og:description" property="og:description" content="{{ $seo['description'] }}">
            <meta inertia="og:url" property="og:url" content="{{ $seo['canonical'] }}">
            <meta inertia="og:image" property="og:image" content="{{ $seo['image'] }}">
            <meta inertia="og:image:alt" property="og:image:alt" content="{{ $seo['title'] }}">

            <meta inertia="twitter:card" name="twitter:card" content="summary_large_image">
            <meta inertia="twitter:title" name="twitter:title" content="{{ $seo['title'] }}">
            <meta inertia="twitter:description" name="twitter:description" content="{{ $seo['description'] }}">
            <meta inertia="twitter:image" name="twitter:image" content="{{ $seo['image'] }}">

            <script inertia="schema" type="application/ld+json">
                {!! json_encode($seo['schema'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) !!}
            </script>
        @endif

        <link rel="preload" href="/fonts/outfit-latin.woff2" as="font" type="font/woff2" crossorigin>

        @if ($seo['preloadImage'])
            <link rel="preload" href="{{ $seo['preloadImage'] }}" as="image" fetchpriority="high">
        @endif

        <link rel="icon" type="image/png" href="/images/logo-allocall.png">
        <link rel="apple-touch-icon" href="/images/logo-allocall.png">


        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18466130455"></script>
        <script>
            window.dataLayer = window.dataLayer || [];

            function gtag() {
                dataLayer.push(arguments);
            }

            gtag('js', new Date());
            gtag('config', 'AW-18466130455');
        </script>


        @routes
        @viteReactRefresh
        @vite('resources/js/app.tsx')
    </head>

    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
