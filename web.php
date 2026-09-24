<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\HeroImageController;
use App\Http\Controllers\MaquetteController;
use App\Models\HeroImage;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'heroImages' => HeroImage::resolvedSlots(),
    ]);
})->name('home');

Route::get("etude-de-projet", function () {
    return Inertia::render('etude-de-projet');
})->name('etude-de-projet');

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

Route::get('solutions-ia', function () {
    return Inertia::render('solutions-ia');
})->name('solutions-ia');

Route::get('industries', function () {
    return Inertia::render('industries/index');
})->name('industries');

Route::get('industries/{industry}', function (string $industry) {
    return Inertia::render('industries/show', ['slug' => $industry]);
})->name('industries.show');

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
        '/services/assistants-virtuels',
        '/services/televente-appels-sortants',
        '/services/gestion-leads',
        '/services/prise-rendez-vous',
        '/services/service-clientele',
        '/services/reception-telephonique',
        '/services/support-technique-niveau-1',
        '/services/confirmation-rappel-rendez-vous',
        '/solutions-ia',
        '/industries',
        '/industries/automobile',
        '/industries/sante',
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

    Route::get('maquettes', [MaquetteController::class, 'index'])->name('maquettes.index');
    Route::post('maquettes', [MaquetteController::class, 'store'])->name('maquettes.store');
    Route::put('maquettes/{maquette}', [MaquetteController::class, 'update'])->name('maquettes.update');
    Route::post('maquettes/import', [MaquetteController::class, 'import'])->name('maquettes.import');
    Route::post('maquettes/bulk-delete', [MaquetteController::class, 'bulkDestroy'])->name('maquettes.bulk-destroy');
    Route::delete('maquettes/{maquette}', [MaquetteController::class, 'destroy'])->name('maquettes.destroy');
    Route::get('maquettes/{maquette}/pdf', [MaquetteController::class, 'pdf'])->name('maquettes.pdf');
    Route::get('maquettes/{maquette}/source', [MaquetteController::class, 'source'])->name('maquettes.source');

    Route::get('hero-images', [HeroImageController::class, 'index'])->name('hero-images.index');
    Route::post('hero-images', [HeroImageController::class, 'store'])->name('hero-images.store');
    Route::delete('hero-images/{heroImage}', [HeroImageController::class, 'destroy'])->name('hero-images.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
