<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;

class Article extends Model
{
    protected $fillable = ['slug_fr', 'slug_en', 'content', 'image', 'service', 'published'];

    protected function casts(): array
    {
        return ['content' => 'array', 'published' => 'boolean'];
    }

    public static function publishedArticles(): Collection
    {
        // Keep the existing public site available before the additive migration runs.
        return Schema::hasTable('articles') ? static::where('published', true)->latest()->get() : collect();
    }

    public function publicPaths(): array
    {
        return ['fr' => '/articles/'.$this->slug_fr, 'en' => '/en/articles/'.$this->slug_en];
    }

    public function editorialKey(): string
    {
        return 'article-'.$this->id;
    }
}
