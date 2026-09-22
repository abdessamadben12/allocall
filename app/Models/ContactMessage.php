<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactMessage extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'request_type',
        'first_name',
        'last_name',
        'email',
        'phone',
        'project_type',
        'attachment_path',
        'attachment_original_name',
        'attachment_size',
        'message',
    ];

    protected $appends = [
        'attachment_url',
        'attachment_size_label',
    ];

    public function getAttachmentUrlAttribute(): ?string
    {
        if (! $this->attachment_path) {
            return null;
        }

        return route('messages.attachment', $this);
    }

    public function getAttachmentSizeLabelAttribute(): ?string
    {
        if (! $this->attachment_size) {
            return null;
        }

        if ($this->attachment_size >= 1048576) {
            return round($this->attachment_size / 1048576, 1).' Mo';
        }

        return max(1, round($this->attachment_size / 1024)).' Ko';
    }
}
