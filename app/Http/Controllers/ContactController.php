<?php

namespace App\Http\Controllers;

use App\Mail\ContactSubmitted;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class ContactController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('contact', [
            'requestType' => 'contact',
            'submissionStatus' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function quote(): Response
    {
        return Inertia::render('contact', [
            'requestType' => 'quote',
        ]);
    }

    public function submit(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'request_type' => 'required|in:contact,quote',
            'full_name' => 'exclude_unless:request_type,contact|required|string|max:255',
            'first_name' => 'exclude_if:request_type,contact|required|string|max:255',
            'last_name' => 'exclude_if:request_type,contact|required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required_if:request_type,contact|nullable|string|max:40',
            'project_type' => 'exclude_if:request_type,contact|nullable|string|max:255',
            'message' => 'required|string|min:10',
            'attachment' => 'exclude_if:request_type,contact|nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png,webp|max:10240',
        ]);

        if ($validated['request_type'] === 'contact') {
            // Preserve the complete name in the existing storage and dashboard format.
            $validated['first_name'] = $validated['full_name'];
            $validated['last_name'] = '';
            unset($validated['full_name']);
        }

        if (isset($validated['attachment'])) {
            $attachment = $request->file('attachment');

            $validated['attachment_path'] = $attachment->store('contact-attachments');
            $validated['attachment_original_name'] = $attachment->getClientOriginalName();
            $validated['attachment_size'] = $attachment->getSize();
        }

        unset($validated['attachment']);

        $contactMessage = ContactMessage::create($validated);
        $recipient = config('mail.contact_to', env('CONTACT_MAIL_TO', 'contact@allocall.ma'));
        $recipient2 = config('allocallmaroc@gmail.com', env('CONTACT_MAIL_TO', 'contact@allocall.ma'));
        

        try {
            $this->logMailAttempt($contactMessage->id, $recipient);

            Mail::to($recipient)->send(new ContactSubmitted($contactMessage));

            Log::info('Contact email sent successfully.', [
                'contact_message_id' => $contactMessage->id,
                'recipient' => $recipient,
                'mailer' => config('mail.default'),
            ]);

            return back()->with('success', __('contact.sent'));
        } catch (Throwable $e) {
            $errorId = (string) str()->uuid();

            Log::error('Contact email failed.', [
                'error_id' => $errorId,
                'contact_message_id' => $contactMessage->id,
                'recipient' => $recipient,
                'mailer' => config('mail.default'),
                'mail_host' => config('mail.mailers.smtp.host'),
                'mail_port' => config('mail.mailers.smtp.port'),
                'mail_encryption' => config('mail.mailers.smtp.encryption'),
                'mail_username_present' => filled(config('mail.mailers.smtp.username')),
                'mail_from_address' => config('mail.from.address'),
                'exception_class' => $e::class,
                'exception_message' => $e->getMessage(),
                'exception_file' => $e->getFile(),
                'exception_line' => $e->getLine(),
            ]);

            return back()
                ->with('error', __('contact.mail_error', ['reference' => $errorId]))
                ->with('mail_error_id', $errorId);
        }
    }

    private function logMailAttempt(int $contactMessageId, string $recipient): void
    {
        Log::info('Contact email sending attempt.', [
            'contact_message_id' => $contactMessageId,
            'recipient' => $recipient,
            'mailer' => config('mail.default'),
            'mail_host' => config('mail.mailers.smtp.host'),
            'mail_port' => config('mail.mailers.smtp.port'),
            'mail_encryption' => config('mail.mailers.smtp.encryption'),
            'mail_username_present' => filled(config('mail.mailers.smtp.username')),
            'mail_password_present' => filled(config('mail.mailers.smtp.password')),
            'mail_from_address' => config('mail.from.address'),
        ]);

        if (config('mail.default') === 'log') {
            Log::warning('MAIL_MAILER is set to log, so emails are written to logs and not delivered.', [
                'contact_message_id' => $contactMessageId,
            ]);
        }
    }

    public function dashboard(): Response
    {
        $messages = ContactMessage::latest()
            ->limit(100)
            ->get();

        return Inertia::render('dashboard', [
            'contactMessages' => $messages,
        ]);
    }

    public function showMessage(ContactMessage $contactMessage): Response
    {
        return Inertia::render('messages/show', [
            'message' => array_merge($contactMessage->toArray(), [
                'attachment_exists' => $contactMessage->attachment_path
                    ? Storage::exists($contactMessage->attachment_path)
                    : false,
            ]),
        ]);
    }

    public function destroyMessage(ContactMessage $contactMessage): RedirectResponse
    {
        $contactMessage->delete();

        return redirect()->route('dashboard')->with('success', 'Message supprime avec succes.');
    }

    public function attachment(ContactMessage $contactMessage)
    {
        abort_unless($contactMessage->attachment_path && Storage::exists($contactMessage->attachment_path), 404);

        return Storage::download(
            $contactMessage->attachment_path,
            $contactMessage->attachment_original_name ?: basename($contactMessage->attachment_path)
        );
    }
}
