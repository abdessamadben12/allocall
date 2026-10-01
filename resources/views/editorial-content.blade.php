@php
    $english = $page['props']['locale'] === 'en';
    $locale = $english ? 'en' : 'fr';
    $article = $editorial['article'] ?? null;
    $publicPath = fn ($path) => \App\Support\PublicRoutes::path($path, $locale);
@endphp
<div class="company-page min-h-screen bg-[#fafafa] text-alidade-navy">
    <header class="border-b border-gray-100 bg-white px-6 py-5">
        <nav aria-label="{{ $english ? 'Main navigation' : 'Navigation principale' }}" class="mx-auto flex max-w-7xl flex-wrap items-center gap-6">
            <a href="{{ $publicPath('/') }}"><img src="/images/logo-allocall.png" alt="ALLO CALL" class="h-12 w-auto"></a>
            <a href="{{ $publicPath('/services') }}">Services</a>
            <a href="{{ $publicPath('/articles') }}">Articles</a>
            <a href="{{ $publicPath('/faq') }}">FAQ</a>
            <a href="{{ $publicPath('/contact') }}">Contact</a>
            <a href="{{ $seo['alternates']['fr-CA'] }}" hreflang="fr-CA" lang="fr-CA">FR</a>
            <a href="{{ $seo['alternates']['en-CA'] }}" hreflang="en-CA" lang="en-CA">EN</a>
        </nav>
    </header>
    <main class="public-content">
        <section class="company-hero">
            <img src="{{ $article['image'] ?? '/images/hero/gestion-leads.webp' }}" alt="" fetchpriority="high">
            <div class="company-container">
                <h1>{{ $editorial['title'] }}</h1>
                <p>{{ $editorial['summary'] }}</p>
                @if ($article)
                    <p>{{ $english ? 'By the ALLO CALL team · Updated ' : 'Par l’équipe ALLO CALL · Mis à jour le ' }}<time datetime="{{ $article['updated'] }}">{{ $article['updated'] }}</time></p>
                @endif
            </div>
        </section>
        @if ($editorial['kind'] === 'index')
            <section class="company-container grid gap-8 py-16 md:grid-cols-2">
                @foreach ($editorial['articles'] as $item)
                    <article class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <img src="{{ $item['image'] }}" alt="" loading="lazy" class="aspect-[16/9] w-full object-cover">
                        <div class="p-7">
                            <p>{{ $item['category'] }}</p>
                            <h2 class="mt-3 text-2xl font-bold"><a href="{{ $item['path'] }}">{{ $item['title'] }}</a></h2>
                            <p class="mt-4 leading-7 text-gray-600">{{ $item['description'] }}</p>
                            <a class="mt-6 inline-block font-semibold text-[#487e2e]" href="{{ $item['path'] }}">{{ $english ? 'Read the guide' : 'Lire le guide' }}</a>
                        </div>
                    </article>
                @endforeach
            </section>
        @endif
        @if ($article)
            <article class="company-container py-14">
                <nav aria-label="{{ $english ? 'In this guide' : 'Dans ce guide' }}" class="mb-10 rounded-xl border border-gray-200 bg-white p-6">
                    <ol class="list-decimal space-y-3 pl-5">
                        @foreach ($article['sections'] as $section)
                            <li><a href="#section-{{ $loop->iteration }}">{{ $section['heading'] }}</a></li>
                        @endforeach
                    </ol>
                </nav>
                @foreach ($article['sections'] as $section)
                    <section id="section-{{ $loop->iteration }}" class="mb-12 max-w-4xl">
                        <h2 class="text-2xl font-bold">{{ $section['heading'] }}</h2>
                        @foreach ($section['paragraphs'] as $paragraph)
                            <p class="mt-5 text-base leading-8 text-gray-700">{{ $paragraph }}</p>
                        @endforeach
                        @if (!empty($section['items']))
                            <ul class="mt-5 list-disc space-y-3 pl-6">
                                @foreach ($section['items'] as $item)
                                    <li>{{ $item }}</li>
                                @endforeach
                            </ul>
                        @endif
                    </section>
                @endforeach
                <div class="flex flex-wrap gap-6 rounded-xl bg-[#111827] p-7 text-white">
                    <a href="{{ $article['relatedService'] }}">{{ $english ? 'Explore the service' : 'Découvrir le service' }}</a>
                    <a href="{{ $publicPath('/devis') }}">{{ $english ? 'Request a quote' : 'Demander une soumission' }}</a>
                    <a href="{{ $publicPath('/articles') }}">{{ $english ? 'All articles' : 'Tous les articles' }}</a>
                </div>
            </article>
        @endif
        @if ($faqs)
            <section id="faq" class="mx-auto max-w-4xl px-6 py-16">
                <h2 class="mb-8 text-3xl font-bold">{{ $english ? 'Clear answers for your business' : 'Des réponses claires pour votre entreprise' }}</h2>
                @foreach ($faqs as $faq)
                    <details class="border-b border-gray-200 py-5">
                        <summary class="cursor-pointer font-semibold">{{ $faq['question'] }}</summary>
                        <p class="mt-4 leading-8 text-gray-600">{{ $faq['answer'] }}</p>
                    </details>
                @endforeach
                <a href="{{ $publicPath('/contact') }}" class="mt-6 inline-block text-[#487e2e] underline">{{ $english ? 'Contact our team.' : 'Communiquez avec notre équipe.' }}</a>
            </section>
        @endif
    </main>
    <footer class="bg-[#111827] px-6 py-10 text-white">
        <nav class="mx-auto flex max-w-7xl flex-wrap gap-6">
            <a href="tel:+15148509092">+1 514-850-9092</a>
            <a href="mailto:contact@allocall.ma">contact@allocall.ma</a>
            <a href="{{ $publicPath('/articles') }}">Articles</a>
            <a href="{{ $publicPath('/faq') }}">FAQ</a>
        </nav>
    </footer>
</div>
