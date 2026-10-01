<?php

use App\Models\Article;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Support\RichArticleContent;

beforeEach(function () {
    $this->withoutVite();
    config(['inertia.ssr.enabled' => false]);
});

function articlePayload(): array
{
    $source = collect(config('editorial.articles'))->first();

    return [
        'slug_fr' => 'nouveau-guide-test', 'slug_en' => 'new-test-guide',
        'image' => $source['image'], 'service' => $source['service'], 'published' => false,
        'content' => collect(['fr', 'en'])->mapWithKeys(fn ($locale) => [$locale => [
            'title' => 'Test '.$locale, 'seoTitle' => 'SEO '.$locale, 'description' => 'Description '.$locale,
            'summary' => 'Introduction '.$locale, 'category' => 'Conseils',
            'sections' => [['heading' => 'Section', 'paragraphs' => ['Premier paragraphe.', 'Second paragraphe.']]],
        ]])->all(),
    ];
}

it('requires authentication to manage articles', function () {
    $article = Article::create(articlePayload());
    foreach (['/admin/articles', '/admin/articles/create', '/admin/articles/'.$article->id.'/edit'] as $path) {
        $this->get($path)->assertRedirect('/login');
    }
    $this->post('/admin/articles', articlePayload())->assertRedirect('/login');
    $this->put('/admin/articles/'.$article->id, articlePayload())->assertRedirect('/login');
});

it('opens the editor and saves a private bilingual draft', function () {
    $this->actingAs(User::factory()->create());
    $this->get('/admin/articles/create')->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('admin/articles/form')->has('services')->has('images'));
    $this->post('/admin/articles', articlePayload())->assertRedirect('/admin/articles')->assertSessionHasNoErrors();
    $article = Article::sole();
    expect($article->content['en']['title'])->toBe('Test en');
    $this->get('/admin/articles')->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('admin/articles/index')->has('articles', 1)->where('articles.0.published', false));
    foreach ($article->publicPaths() as $path) {
        $this->get($path)->assertNotFound();
        $this->get('/sitemap.xml')->assertDontSee($path);
    }
});

it('publishes both languages and can withdraw publication', function () {
    $this->actingAs(User::factory()->create());
    $payload = articlePayload();
    $payload['published'] = true;
    $this->post('/admin/articles', $payload)->assertRedirect('/admin/articles')->assertSessionHasNoErrors();
    $article = Article::sole();
    foreach ($article->publicPaths() as $locale => $path) {
        $this->get($path)->assertOk()->assertInertia(fn (Assert $page) => $page
            ->component('articles/index')->where('editorial.article.title', 'Test '.$locale));
        $this->get($locale === 'fr' ? '/articles' : '/en/articles')->assertOk()->assertSee($path);
        $this->get('/sitemap.xml')->assertSee($path);
    }
    $payload['published'] = false;
    $this->put('/admin/articles/'.$article->id, $payload)->assertRedirect('/admin/articles')->assertSessionHasNoErrors();
    foreach ($article->publicPaths() as $path) {
        $this->get($path)->assertNotFound();
        $this->get('/sitemap.xml')->assertDontSee($path);
    }
});

it('rejects incomplete translations and duplicate or reserved URLs', function () {
    $this->actingAs(User::factory()->create());
    $payload = articlePayload();
    $payload['content']['en']['title'] = '';
    $this->post('/admin/articles', $payload)->assertSessionHasErrors('content.en.title');
    $this->assertDatabaseCount('articles', 0);
    Article::create(articlePayload());
    $this->post('/admin/articles', articlePayload())->assertSessionHasErrors(['slug_fr', 'slug_en']);
    $payload = articlePayload();
    $reserved = collect(config('editorial.paths'))->first(fn ($paths) => str_starts_with($paths['fr'], '/articles/'));
    $payload['slug_fr'] = basename($reserved['fr']);
    $this->post('/admin/articles', $payload)->assertSessionHasErrors('slug_fr');
});

it('updates content while preserving established URLs', function () {
    $this->actingAs(User::factory()->create());
    $article = Article::create(articlePayload());
    $payload = articlePayload();
    $payload['content']['fr']['title'] = 'Titre modifié';
    $this->put('/admin/articles/'.$article->id, $payload)->assertSessionHasNoErrors();
    expect($article->fresh()->content['fr']['title'])->toBe('Titre modifié');
    $payload['slug_fr'] = 'autre-url';
    $this->put('/admin/articles/'.$article->id, $payload)->assertSessionHasErrors('slug_fr');
    expect($article->fresh()->slug_fr)->toBe('nouveau-guide-test');
});

function richArticleDocument(): array
{
    return ['type' => 'doc', 'content' => [
        ['type' => 'heading', 'attrs' => ['level' => 2], 'content' => [['type' => 'text', 'text' => 'Titre enrichi']]],
        ['type' => 'paragraph', 'attrs' => ['textAlign' => 'center'], 'content' => [
            ['type' => 'text', 'text' => 'Texte en gras', 'marks' => [['type' => 'bold']]],
            ['type' => 'text', 'text' => 'Un lien', 'marks' => [['type' => 'link', 'attrs' => ['href' => 'https://example.com', 'target' => '_blank']]]],
        ]],
        ['type' => 'image', 'attrs' => ['src' => '/images/test.webp', 'alt' => 'Photo du bureau', 'width' => '50%', 'onerror' => 'alert(1)']],
        ['type' => 'video', 'attrs' => ['src' => '/article-media/test.mp4', 'title' => 'Démonstration']],
        ['type' => 'embed', 'attrs' => ['src' => 'https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ', 'title' => 'Présentation']],
        ['type' => 'table', 'content' => [['type' => 'tableRow', 'content' => [['type' => 'tableCell', 'content' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Cellule']]]]]]]]],
    ]];
}

it('saves and renders rich content in both languages including the HTML fallback', function () {
    $this->actingAs(User::factory()->create());
    $payload = articlePayload();
    $payload['published'] = true;
    foreach (['fr', 'en'] as $locale) {
        $payload['content'][$locale]['body'] = richArticleDocument();
        $payload['content'][$locale]['sections'] = [];
    }
    $this->post('/admin/articles', $payload)->assertSessionHasNoErrors()->assertRedirect('/admin/articles');
    $article = Article::sole();
    expect($article->content['fr']['body']['content'][2]['attrs'])->not->toHaveKey('onerror');
    $this->get('/admin/articles/'.$article->id.'/edit')->assertInertia(fn (Assert $page) => $page
        ->where('article.content.fr.body.content.0.attrs.level', 2));
    foreach ($article->publicPaths() as $path) {
        $this->get($path)->assertOk()->assertSee('<strong>Texte en gras</strong>', false)
            ->assertSee('id="article-heading-1"', false)->assertSee('style="width:50%"', false)
            ->assertSee('<video ', false)->assertSee('<iframe ', false)->assertSee('<table>', false)
            ->assertDontSee('onerror=', false);
    }
    $payload['content']['fr']['body']['content'][0]['content'][0]['text'] = 'Titre révisé';
    $this->put('/admin/articles/'.$article->id, $payload)->assertSessionHasNoErrors();
    expect($article->fresh()->content['fr']['body']['content'][0]['content'][0]['text'])->toBe('Titre révisé');
});

it('previews rich content with escaped text and safe media attributes', function () {
    $this->actingAs(User::factory()->create());
    $document = richArticleDocument();
    $document['content'][] = ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '<script>alert(1)</script>']]];
    $response = $this->postJson('/admin/articles/preview', ['body' => $document])->assertOk();
    expect($response->json('html'))->toContain('&lt;script&gt;', 'rel="noopener noreferrer"')->not->toContain('<script>', 'onerror=');
    $response->assertJsonPath('headings.0.heading', 'Titre enrichi');
});

it('rejects unsafe URLs and unsupported embedded content', function (array $node) {
    $this->actingAs(User::factory()->create());
    $this->postJson('/admin/articles/preview', ['body' => ['type' => 'doc', 'content' => [$node]]])
        ->assertUnprocessable()->assertJsonValidationErrors('body');
})->with([
    'script link' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Lien', 'marks' => [['type' => 'link', 'attrs' => ['href' => 'javascript:alert(1)']]]]]]],
    'data image' => [['type' => 'image', 'attrs' => ['src' => 'data:image/svg+xml,<svg/>']]],
    'untrusted iframe' => [['type' => 'embed', 'attrs' => ['src' => 'https://example.com/embed/test']]],
    'raw HTML' => [['type' => 'html', 'text' => '<script>alert(1)</script>']],
    'malformed attributes' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Lien', 'marks' => [['type' => 'link', 'attrs' => 'invalid']]]]]],
]);

it('rejects an empty rich document without saving the article', function () {
    $this->actingAs(User::factory()->create());
    $payload = articlePayload();
    $payload['content']['fr']['body'] = ['type' => 'doc', 'content' => [['type' => 'paragraph']]];
    $payload['content']['fr']['sections'] = [];
    $this->post('/admin/articles', $payload)->assertSessionHasErrors('content.fr.body');
    $this->assertDatabaseCount('articles', 0);
});

it('uploads an image and uses it as the article cover', function () {
    Storage::fake('public');
    $this->actingAs(User::factory()->create());
    $response = $this->post('/admin/article-media', ['file' => UploadedFile::fake()->image('bureau.png')])->assertCreated();
    $url = $response->json('url');
    Storage::disk('public')->assertExists('article-media/'.basename($url));
    $this->get($url)->assertOk()->assertHeader('X-Content-Type-Options', 'nosniff');
    $payload = articlePayload();
    $payload['image'] = $url;
    $this->post('/admin/articles', $payload)->assertSessionHasNoErrors();
    expect(Article::sole()->image)->toBe($url);
});

it('requires authentication for uploads and preview and rejects dangerous or oversized files', function () {
    Storage::fake('public');
    $this->postJson('/admin/article-media')->assertUnauthorized();
    $this->postJson('/admin/articles/preview')->assertUnauthorized();
    $this->actingAs(User::factory()->create());
    foreach ([UploadedFile::fake()->create('attack.svg', 1, 'image/svg+xml'), UploadedFile::fake()->image('large.jpg')->size(8193), UploadedFile::fake()->create('large.mp4', 30721, 'video/mp4')] as $file) {
        $this->postJson('/admin/article-media', ['file' => $file])->assertUnprocessable()->assertJsonValidationErrors('file');
    }
    expect(Storage::disk('public')->allFiles())->toBeEmpty();
    $this->get('/article-media/missing.png')->assertNotFound();
});

it('uploads a video and serves byte ranges for playback', function () {
    Storage::fake('public');
    $this->actingAs(User::factory()->create());
    $response = $this->postJson('/admin/article-media', ['file' => UploadedFile::fake()->create('demo.mp4', 20, 'video/mp4')])->assertCreated();
    $response->assertJsonPath('type', 'video');
    $this->get($response->json('url'))->assertOk()->assertHeader('X-Content-Type-Options', 'nosniff');
});
