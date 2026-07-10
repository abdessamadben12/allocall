<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('contact', [ContactController::class, 'show'])->name('contact');
Route::post('contact', [ContactController::class, 'submit'])->name('contact.submit');

Route::get('devis', function () {
    return Inertia::render('devis');
})->name('quote');

// Page galerie masquée temporairement — redirige vers l'accueil.
// Pour la réactiver : rétablir Inertia::render('galerie'), le lien navbar et l'entrée sitemap.
Route::get('galerie', function () {
    return redirect('/', 302);
})->name('galerie');

Route::get('configurateur', function () {
    return Inertia::render('configurateur');
})->name('configurateur');

Route::get('apropos', function () {
    return Inertia::render('propos');
})->name('apropos');

Route::get('services', function () {
    return Inertia::render('services/index');
})->name('services');

Route::get('services/{service}', function (string $service) {
    return Inertia::render('services/show', ['slug' => $service]);
})->name('services.show');

Route::get('savoir-faire', function () {
    return Inertia::render('services/index');
})->name('savoir-faire');

Route::get('savoir-faire/{service}', function (string $service) {
    return Inertia::render('services/show', ['slug' => $service]);
})->name('savoir-faire.show');

Route::get('sitemap.xml', function () {
    $paths = [
        '/',
        '/apropos',
        '/services',
        '/savoir-faire',
        '/services/aluminium',
        '/services/renovation',
        '/services/peinture',
        '/services/sol',
        '/services/plafond',
        '/services/amenagement',
        '/services/menuiserie-bois',
        '/configurateur',
        '/devis',
        '/contact',
    ];
    $lastModified = now()->toAtomString();
    $urls = collect($paths)
        ->map(fn (string $path) => sprintf(
            '<url><loc>%s</loc><lastmod>%s</lastmod></url>',
            e(url($path)),
            $lastModified
        ))
        ->implode('');

    return response(
        '<?xml version="1.0" encoding="UTF-8"?>'
        . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        . $urls
        . '</urlset>',
        200,
        ['Content-Type' => 'application/xml; charset=UTF-8']
    );
})->name('sitemap');


Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [ContactController::class, 'dashboard'])->name('dashboard');

    Route::get('messages/{contactMessage}', [ContactController::class, 'showMessage'])->name('messages.show');
    Route::delete('messages/{contactMessage}', [ContactController::class, 'destroyMessage'])->name('messages.destroy');
    Route::get('messages/{contactMessage}/attachment', [ContactController::class, 'attachment'])->name('messages.attachment');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
