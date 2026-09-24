<?php

use App\Mail\ContactSubmitted;
use App\Models\ContactMessage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    config(['mail.contact_to' => 'contact@allocall.ma', 'mail.contact_to_secondary' => 'allocallmaroc@gmail.com']);
    Mail::fake();
    Storage::fake();
});

function quotePayload(): array
{
    return [
        'request_type' => 'quote', 'full_name' => 'Marie Anne Le Roy',
        'phone' => '+1 514 555 0100', 'email' => 'marie@example.com',
        'project_type' => 'Virtual assistant', 'budget' => '2500 CAD/month',
        'message' => 'We need a team to handle our calls and appointments.',
    ];
}

it('stores and sends both public forms to the two configured recipients', function (string $path, string $type) {
    $payload = quotePayload();
    $payload['request_type'] = $type;
    $this->from($path)->post($path, $payload)->assertRedirect($path)->assertSessionHasNoErrors()->assertSessionHas('success');

    $message = ContactMessage::sole();
    expect($message->first_name)->toBe('Marie Anne Le Roy')
        ->and($message->last_name)->toBe('')
        ->and($message->request_type)->toBe($type);
    if ($type === 'quote') {
        expect($message->message)->toContain('Budget: 2500 CAD/month');
    } else {
        expect($message->message)->not->toContain('Budget:');
        expect($message->project_type)->toBeNull();
    }
    Mail::assertSentCount(1);
    Mail::assertSent(ContactSubmitted::class, fn ($mail) => count($mail->to) === 2
        && $mail->hasTo('contact@allocall.ma') && $mail->hasTo('allocallmaroc@gmail.com')
        && $mail->contactMessage->is($message)
        && $mail->envelope()->replyTo[0]->address === 'marie@example.com');
})->with([['/devis', 'quote'], ['/en/devis', 'quote'], ['/contact', 'contact'], ['/en/contact', 'contact']]);

it('stores a quote attachment privately and includes it in the notification', function () {
    $payload = quotePayload();
    $payload['attachment'] = UploadedFile::fake()->create('brief.pdf', 25, 'application/pdf');
    $this->from('/devis')->post('/devis', $payload)->assertSessionHasNoErrors();
    $message = ContactMessage::sole();
    Storage::assertExists($message->attachment_path);
    expect($message->attachment_original_name)->toBe('brief.pdf');
    Mail::assertSent(ContactSubmitted::class, fn ($mail) => count($mail->attachments()) === 1 && $mail->attachments()[0]->as === 'brief.pdf');
    $this->get(route('messages.attachment', $message))->assertRedirect(route('login'));
});

it('rejects invalid quotes and files without sending mail', function () {
    $this->post('/devis', ['request_type' => 'quote'])->assertSessionHasErrors(['full_name', 'email', 'message']);
    $payload = quotePayload();
    $payload['attachment'] = UploadedFile::fake()->create('large.pdf', 10241, 'application/pdf');
    $this->post('/devis', $payload)->assertSessionHasErrors('attachment');
    $payload['attachment'] = UploadedFile::fake()->create('script.exe', 1, 'application/x-msdownload');
    $this->post('/devis', $payload)->assertSessionHasErrors('attachment');
    $this->assertDatabaseCount('contact_messages', 0);
    Mail::assertNothingSent();
});

it('does not send duplicates or allow visitors to choose recipients', function () {
    config(['mail.contact_to_secondary' => ' contact@allocall.ma ']);
    $payload = quotePayload();
    $payload['recipient'] = 'untrusted@example.com';
    $this->post('/devis', $payload)->assertSessionHasNoErrors();
    Mail::assertSent(ContactSubmitted::class, fn ($mail) => count($mail->to) === 1 && $mail->hasTo('contact@allocall.ma') && ! $mail->hasTo('untrusted@example.com'));
});

it('keeps the quote and displays an error when SMTP fails', function () {
    Mail::shouldReceive('to')->once()->with(['contact@allocall.ma', 'allocallmaroc@gmail.com'])->andReturnSelf();
    Mail::shouldReceive('send')->once()->andThrow(new RuntimeException('Test SMTP failure'));
    $this->from('/en/devis')->post('/en/devis', quotePayload())->assertRedirect('/en/devis')
        ->assertSessionHas('error', fn ($error) => str_starts_with($error, 'Your message was saved'))
        ->assertSessionMissing('success');
    $this->assertDatabaseCount('contact_messages', 1);
    $this->get('/en/devis')->assertInertia(fn ($page) => $page->component('devis')->has('submissionStatus.error'));
});

it('does not claim success when recipients are misconfigured', function () {
    config(['mail.contact_to_secondary' => 'not-an-email']);
    $this->from('/devis')->post('/devis', quotePayload())->assertSessionHas('error')->assertSessionMissing('success');
    $this->assertDatabaseCount('contact_messages', 1);
    Mail::assertNothingSent();
});
