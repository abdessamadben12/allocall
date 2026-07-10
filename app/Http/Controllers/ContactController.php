<?php

namespace App\Http\Controllers;

use App\Mail\ContactSubmitted;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('contact', [
            'requestType' => 'contact',
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
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:40',
            'project_type' => 'nullable|string|max:255',
            'message' => 'required|string|min:10',
            'attachment' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png,webp|max:10240',
        ]);

        if ($request->hasFile('attachment')) {
            $attachment = $request->file('attachment');

            $validated['attachment_path'] = $attachment->store('contact-attachments');
            $validated['attachment_original_name'] = $attachment->getClientOriginalName();
            $validated['attachment_size'] = $attachment->getSize();
        }

        unset($validated['attachment']);

        $contactMessage = ContactMessage::create($validated);

        Mail::to(env('CONTACT_MAIL_TO', 'enquiries@alidad.com'))->send(new ContactSubmitted($contactMessage));

        return back()->with('success', 'Votre message a ete envoye avec succes !');
    }

    public function dashboard(Request $request): Response
    {
        $filters = $request->validate([
            'type' => 'nullable|in:contact,quote',
            'date_from' => 'nullable|date',
            'date_to' => 'nullable|date|after_or_equal:date_from',
        ]);

        $messages = ContactMessage::latest()
            ->when($filters['type'] ?? null, fn ($query, $type) => $query->where('request_type', $type))
            ->when($filters['date_from'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '>=', $date))
            ->when($filters['date_to'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '<=', $date))
            ->limit(100)
            ->get();

        return Inertia::render('dashboard', [
            'contactMessages' => $messages,
            'filters' => [
                'type' => $filters['type'] ?? '',
                'date_from' => $filters['date_from'] ?? '',
                'date_to' => $filters['date_to'] ?? '',
            ],
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
        if ($contactMessage->attachment_path) {
            Storage::delete($contactMessage->attachment_path);
        }

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
