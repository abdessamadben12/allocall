<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Support\ArticleCatalog;
use App\Support\RichArticleContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
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
            'services' => ArticleCatalog::services(),
            'images' => ArticleCatalog::siteImages(),
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

    public function destroy(Article $article)
    {
        $article->delete();

        return to_route('admin.articles.index')->with('status', 'Article supprimé.');
    }

    private function validated(Request $request, ?Article $article = null): array
    {
        $rules = [
            'published' => ['required', 'boolean'],
            'image' => ['required', 'string', function ($attribute, $value, $fail) {
                $existing = in_array($value, ArticleCatalog::siteImages(), true);
                $uploaded = preg_match('~^/article-media/([a-zA-Z0-9]+\.(jpg|jpeg|png|webp|gif))$~', $value, $matches)
                    && Storage::disk('public')->exists('article-media/'.$matches[1]);
                if (! $existing && ! $uploaded) {
                    $fail('Choisissez une photo du site ou importez une image.');
                }
            }],
            'service' => ['required', Rule::in(array_column(ArticleCatalog::services(), 'value'))],
            'content' => ['required', 'array:fr,en'],
        ];
        foreach (['fr', 'en'] as $locale) {
            $rules['slug_'.$locale] = ['required', 'string', 'max:160', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('articles', 'slug_'.$locale)->ignore($article)];
            if ($article) {
                // Stable URLs avoid breaking already shared or indexed links.
                $rules['slug_'.$locale][] = Rule::in([$article->{'slug_'.$locale}]);
            }
            $base = 'content.'.$locale;
            $rules[$base] = ['required', 'array:title,seoTitle,description,summary,category,sections,body'];
            foreach (['title' => 180, 'seoTitle' => 180, 'description' => 320, 'summary' => 1000, 'category' => 100] as $field => $max) {
                $rules[$base.'.'.$field] = ['required', 'string', 'max:'.$max];
            }
            $rules[$base.'.body'] = ['nullable', 'array'];
            $rules[$base.'.sections'] = ['required_without:'.$base.'.body', 'array', 'max:30'];
            $rules[$base.'.sections.*'] = ['required', 'array:heading,paragraphs'];
            $rules[$base.'.sections.*.heading'] = ['required', 'string', 'max:180'];
            $rules[$base.'.sections.*.paragraphs'] = ['required', 'array', 'min:1', 'max:50'];
            $rules[$base.'.sections.*.paragraphs.*'] = ['required', 'string', 'max:10000'];
        }

        $validated = $request->validate($rules);
        foreach (['fr', 'en'] as $locale) {
            if (isset($validated['content'][$locale]['body'])) {
                try {
                    $validated['content'][$locale]['body'] = RichArticleContent::normalize($validated['content'][$locale]['body']);
                    $validated['content'][$locale]['sections'] = [];
                } catch (\InvalidArgumentException $exception) {
                    throw ValidationException::withMessages(['content.'.$locale.'.body' => $exception->getMessage()]);
                }
            }
        }

        return $validated;
    }

    public function preview(Request $request)
    {
        $data = $request->validate(['body' => ['required', 'array']]);
        try {
            return response()->json(RichArticleContent::render(RichArticleContent::normalize($data['body'])));
        } catch (\InvalidArgumentException $exception) {
            throw ValidationException::withMessages(['body' => $exception->getMessage()]);
        }
    }

    public function list()
    {
        $locale = request()->is('en', 'en/*') ? 'en' : 'fr';

        return Inertia::render('articles/index', ['articles' => ArticleCatalog::articles($locale)]);
    }

    public function show(string $slug)
    {
        $locale = request()->is('en/*') ? 'en' : 'fr';
        $article = ArticleCatalog::find($slug, $locale);
        abort_unless($article, 404);

        return Inertia::render('articles/index', [
            'article' => $article,
            'related' => collect(ArticleCatalog::articles($locale))->where('slug', '!=', $slug)->take(3)->values(),
        ]);
    }
}
