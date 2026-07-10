<?php

namespace App\Mail;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class ContactSubmitted extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public ContactMessage $contactMessage)
    {
    }

    public function envelope(): Envelope
    {
        $type = $this->contactMessage->request_type === 'quote' ? 'demande de devis' : 'message de contact';

        return new Envelope(
            subject: 'Nouvelle '.$type.' - '.$this->contactMessage->first_name.' '.$this->contactMessage->last_name,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.contact-submitted',
        );
    }

    /**
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        if (! $this->contactMessage->attachment_path || ! Storage::exists($this->contactMessage->attachment_path)) {
            return [];
        }

        $attachment = Attachment::fromPath(Storage::path($this->contactMessage->attachment_path));

        if ($this->contactMessage->attachment_original_name) {
            $attachment->as($this->contactMessage->attachment_original_name);
        }

        return [$attachment];
    }
}
