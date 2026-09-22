<?php

namespace App\Http\Controllers;

use App\Models\HeroImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HeroImageController extends Controller
{
    /**
     * Affiche la page de gestion des photos Hero.
     */
    public function index(): Response
    {
        return Inertia::render('hero-images', [
            'slots' => HeroImage::resolvedSlots(),
        ]);
    }

    /**
     * Upload d'une image pour un slot donné.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'slot'  => ['required', 'string', 'in:'.implode(',', array_keys(HeroImage::SLOTS))],
            'image' => ['required', 'image', 'max:8192'], // 8 Mo max
        ]);

        $file = $request->file('image');
        $path = $file->store('hero-images', 'public');

        // Supprime l'ancienne image si elle existe
        $existing = HeroImage::where('slot', $validated['slot'])->first();
        if ($existing) {
            Storage::disk($existing->disk)->delete($existing->path);
            $existing->delete();
        }

        HeroImage::create([
            'slot'          => $validated['slot'],
            'path'          => $path,
            'disk'          => 'public',
            'original_name' => $file->getClientOriginalName(),
            'size'          => $file->getSize(),
        ]);

        return back()->with('success', 'Image mise à jour avec succès.');
    }

    /**
     * Supprime une image hero (retour au fallback statique).
     */
    public function destroy(HeroImage $heroImage): RedirectResponse
    {
        Storage::disk($heroImage->disk)->delete($heroImage->path);
        $heroImage->delete();

        return back()->with('success', 'Image supprimée. L\'image par défaut est restaurée.');
    }
}
