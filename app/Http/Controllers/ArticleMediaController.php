<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleMediaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate(['file' => ['required', 'file', 'mimes:jpg,jpeg,png,webp,gif,mp4,webm', 'max:30720']]);
        $file = $request->file('file');
        if (str_starts_with($file->getMimeType(), 'image/')) {
            $request->validate(['file' => ['image', 'max:8192', 'dimensions:max_width=12000,max_height=12000']]);
        }
        $path = $file->store('article-media', 'public');
        abort_unless($path, 500, 'Le fichier n’a pas pu être enregistré.');

        return response()->json(['url' => '/article-media/'.basename($path), 'type' => str_starts_with($file->getMimeType(), 'image/') ? 'image' : 'video'], 201);
    }

    public function show(string $filename)
    {
        abort_unless(preg_match('/^[a-zA-Z0-9]+\.(jpg|jpeg|png|webp|gif|mp4|webm)$/', $filename), 404);
        $disk = Storage::disk('public');
        abort_unless($disk->exists('article-media/'.$filename), 404);

        return response()->file($disk->path('article-media/'.$filename), ['X-Content-Type-Options' => 'nosniff', 'Cache-Control' => 'public, max-age=31536000, immutable']);
    }
}
