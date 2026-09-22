<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Maquette extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'client',
        'surface_area',
        'dimensions',
        'wall_count',
        'salon',
        'edition',
        'maquette_pdf_path',
        'maquette_pdf_original_name',
        'maquette_pdf_size',
        'source_file_path',
        'source_file_original_name',
        'source_file_size',
        'designer_3d',
        'realized',
        'facebook_url',
    ];

    protected $casts = [
        'surface_area' => 'decimal:2',
        'wall_count' => 'integer',
        'realized' => 'boolean',
    ];

    protected $appends = [
        'maquette_pdf_url',
        'maquette_pdf_size_label',
        'source_file_url',
        'source_file_size_label',
    ];

    public function getMaquettePdfUrlAttribute(): ?string
    {
        return $this->maquette_pdf_path ? route('maquettes.pdf', $this) : null;
    }

    public function getSourceFileUrlAttribute(): ?string
    {
        return $this->source_file_path ? route('maquettes.source', $this) : null;
    }

    public function getMaquettePdfSizeLabelAttribute(): ?string
    {
        return $this->formatSize($this->maquette_pdf_size);
    }

    public function getSourceFileSizeLabelAttribute(): ?string
    {
        return $this->formatSize($this->source_file_size);
    }

    private function formatSize(?int $size): ?string
    {
        if (! $size) {
            return null;
        }

        if ($size >= 1048576) {
            return round($size / 1048576, 1).' Mo';
        }

        return max(1, round($size / 1024)).' Ko';
    }
}
