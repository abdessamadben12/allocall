<?php

namespace App\Http\Middleware;

use App\Support\SeoMetadata;
use Closure;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Symfony\Component\HttpFoundation\Response;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    public function handle(Request $request, Closure $next): Response
    {
        app()->setLocale($request->is('en', 'en/*') ? 'en' : 'fr');
        $response = parent::handle($request, $next);
        $response->headers->set('Content-Language', app()->getLocale());
        if (str_contains($response->headers->get('Content-Type', ''), 'text/html')) {
            $seo = SeoMetadata::forRequest($request);
            $response->headers->set('X-Robots-Tag', $response->getStatusCode() >= 400 ? 'noindex, nofollow' : $seo['robots']);
        }

        return $response;
    }

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'appUrl' => rtrim(config('app.url'), '/'),
            'locale' => $request->is('en', 'en/*') ? 'en' : 'fr',
            'seo' => fn () => SeoMetadata::forRequest($request),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
        ];
    }
}
