<?php

use App\Mail\ContactSubmitted;
use App\Models\ContactMessage;
use Illuminate\Support\Facades\Mail;

beforeEach(function () {
    config(['mail.contact_to' => 'contact@allocall.ma']);
    Mail::fake();
});

it('stores and emails a contact with only the four visible fields', function () {
    $this->from('/contact')->post(route('contact.submit'), [
        'request_type' => 'contact',
        'full_name' => 'Marie Anne Le Roy',
        'phone' => '+1 514 555 0100',
        'email' => 'marie@example.com',
        'message' => 'Je souhaite discuter de la gestion de nos appels.',
    ])->assertRedirect('/contact')->assertSessionHasNoErrors()->assertSessionHas('success');

    $message = ContactMessage::sole();
    expect($message->first_name)->toBe('Marie Anne Le Roy')
        ->and($message->last_name)->toBe('')
        ->and($message->phone)->toBe('+1 514 555 0100')
        ->and($message->project_type)->toBeNull()
        ->and($message->attachment_path)->toBeNull();

    Mail::assertSent(ContactSubmitted::class, fn ($mail) => $mail->hasTo('contact@allocall.ma') && $mail->contactMessage->is($message)
    );
});

it('requires all four contact fields', function () {
    $this->post(route('contact.submit'), ['request_type' => 'contact'])
        ->assertSessionHasErrors(['full_name', 'phone', 'email', 'message']);

    $this->assertDatabaseCount('contact_messages', 0);
    Mail::assertNothingSent();
});

it('validates the email and message before storing the contact', function () {
    $this->post(route('contact.submit'), [
        'request_type' => 'contact', 'full_name' => 'Camille',
        'phone' => '5145550100', 'email' => 'invalid', 'message' => 'Court',
    ])->assertSessionHasErrors(['email', 'message']);
    $this->assertDatabaseCount('contact_messages', 0);
});

it('keeps the quote submission format compatible', function () {
    $this->from('/devis')->post(route('contact.submit'), [
        'request_type' => 'quote', 'first_name' => 'Jean', 'last_name' => 'Martin',
        'email' => 'jean@example.com', 'project_type' => 'Reception telephonique',
        'message' => 'Je souhaite recevoir une soumission pour mon entreprise.',
    ])->assertRedirect('/devis')->assertSessionHasNoErrors();

    expect(ContactMessage::sole()->last_name)->toBe('Martin');
    Mail::assertSent(ContactSubmitted::class);
});

it('reports a mail failure without losing the stored contact', function () {
    Mail::shouldReceive('to')->once()->andReturnSelf();
    Mail::shouldReceive('send')->once()->andThrow(new RuntimeException('Test mail failure'));

    $this->from('/contact')->post(route('contact.submit'), [
        'request_type' => 'contact', 'full_name' => 'Camille Dupont',
        'phone' => '5145550100', 'email' => 'camille@example.com',
        'message' => 'Je souhaite discuter de mon projet avec votre equipe.',
    ])->assertRedirect('/contact')->assertSessionHas('error')->assertSessionMissing('success');
    $this->assertDatabaseCount('contact_messages', 1);
});
