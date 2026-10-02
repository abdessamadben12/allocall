<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ArticleMediaController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HeroImageController;
use App\Http\Controllers\MaquetteController;
use Illuminate\Support\Facades\Route;

require __DIR__.'/public.php';
Route::get('article-media/{filename}', [ArticleMediaController::class, 'show'])->name('article-media.show');

Route::middleware(['auth'])->group(function () {
    Route::post('admin/article-media', [ArticleMediaController::class, 'store'])->middleware('throttle:30,1')->name('admin.article-media.store');
    Route::post('admin/articles/preview', [ArticleController::class, 'preview'])->name('admin.articles.preview');
    Route::resource('admin/articles', ArticleController::class)->except(['show', 'destroy'])->names('admin.articles');
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

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
