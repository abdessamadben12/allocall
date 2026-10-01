<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Support\EditorialContent;
use App\Support\PublicRoutes;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/articles/index', [
            'articles' => Article::latest()->get()->map(fn ($article) => [
                'id' => $article->id, 'title' => $article->content['fr']['title'],
                'published' => $article->published, 'paths' => $article->publicPaths(),
            ]),
            'existingArticles' => collect(EditorialContent::articles('fr'))
                ->reject(fn ($article) => str_starts_with($article['key'], 'article-'))->values(),
            'status' => session('status'),
        ]);
    }

    public function create()
    {
        return $this->form();
    }

    public function edit(Article $article)
    {
        return $this->form($article);
    }

    private function form(?Article $article = null)
    {
        return Inertia::render('admin/articles/form', [
            'article' => $article,
            'services' => collect(config('seo.pages'))->filter(fn ($page, $path) => str_starts_with($path, '/services/'))
                ->map(fn ($page, $path) => ['value' => $path, 'label' => explode(' | ', $page['title'])[0]])->values(),
            'images' => collect(config('editorial.articles'))->pluck('image')->unique()->values(),
        ]);
    }

    public function store(Request $request)
    {
        Article::create($this->validated($request));

        return to_route('admin.articles.index')->with('status', 'Article enregistré.');
    }

    public function update(Request $request, Article $article)
    {
        $article->update($this->validated($request, $article));

        return to_route('admin.articles.index')->with('status', 'Article mis à jour.');
    }

    private function validated(Request $request, ?Article $article = null): array
    {
        $rules = [
            'published' => ['required', 'boolean'],
            'image' => ['required', Rule::in(collect(config('editorial.articles'))->pluck('image')->unique()->all())],
            'service' => ['required', Rule::in(array_filter(array_keys(config('editorial.paths')), fn ($path) => str_starts_with($path, '/services/')))],
            'content' => ['required', 'array:fr,en'],
        ];
        foreach (['fr', 'en'] as $locale) {
            $reserved = collect(config('editorial.paths'))->pluck($locale)
                ->filter(fn ($path) => str_starts_with($path, $locale === 'fr' ? '/articles/' : '/en/articles/'))
                ->map(fn ($path) => basename($path))->all();
            $rules['slug_'.$locale] = ['required', 'string', 'max:160', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('articles', 'slug_'.$locale)->ignore($article), Rule::notIn($reserved)];
            if ($article) {
                // Stable URLs avoid breaking already shared or indexed links.
                $rules['slug_'.$locale][] = Rule::in([$article->{'slug_'.$locale}]);
            }
            $base = 'content.'.$locale;
            $rules[$base] = ['required', 'array:title,seoTitle,description,summary,category,sections'];
            foreach (['title' => 180, 'seoTitle' => 180, 'description' => 320, 'summary' => 1000, 'category' => 100] as $field => $max) {
                $rules[$base.'.'.$field] = ['required', 'string', 'max:'.$max];
            }
            $rules[$base.'.sections'] = ['required', 'array', 'min:1', 'max:30'];
            $rules[$base.'.sections.*'] = ['required', 'array:heading,paragraphs'];
            $rules[$base.'.sections.*.heading'] = ['required', 'string', 'max:180'];
            $rules[$base.'.sections.*.paragraphs'] = ['required', 'array', 'min:1', 'max:50'];
            $rules[$base.'.sections.*.paragraphs.*'] = ['required', 'string', 'max:10000'];
        }

        return $request->validate($rules);
    }

    public function show(string $slug)
    {
        $locale = request()->is('en/*') ? 'en' : 'fr';
        $article = Article::where('published', true)->where('slug_'.$locale, $slug)->firstOrFail();

        return Inertia::render('articles/index', [
            'editorial' => EditorialContent::page('/articles/'.$article->editorialKey(), $locale),
        ]);
    }
}
