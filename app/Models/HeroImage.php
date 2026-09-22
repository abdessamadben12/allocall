<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class HeroImage extends Model
{
    /**
     * Les 6 slots hero disponibles.
     * Clé   → identifiant BDD
     * Valeur → chemin de l'image statique par défaut (depuis /public)
     */
    public const SLOTS = [
        'large_1'  => ['label' => 'Slide 1 — Grande image',  'default' => '/images/hero/renovation.webp'],
        'grid1_1'  => ['label' => 'Slide 1 — Image 2',       'default' => '/images/faux-plafon/faux-plafon-5.webp'],
        'grid2_1'  => ['label' => 'Slide 1 — Image 3',       'default' => '/images/revetement-sol/revetement-sol-1.webp'],
        'large_2'  => ['label' => 'Slide 2 — Grande image',  'default' => '/images/hero/alidade-Travaux-de-bois-1.webp'],
        'grid1_2'  => ['label' => 'Slide 2 — Image 2',       'default' => '/images/hero/alidade-Travaux-de-bois-2.webp'],
        'grid2_2'  => ['label' => 'Slide 2 — Image 3',       'default' => '/images/hero/alidade-Travaux-de-bois-3.webp'],
    ];

    protected $fillable = [
        'slot',
        'path',
        'disk',
        'original_name',
        'size',
    ];

    protected $appends = ['url', 'size_label'];

    /**
     * URL publique de l'image (via Storage).
     */
    public function getUrlAttribute(): string
    {
        return Storage::disk($this->disk)->url($this->path);
    }

    /**
     * Taille lisible par l'humain.
     */
    public function getSizeLabelAttribute(): ?string
    {
        if (! $this->size) {
            return null;
        }
        if ($this->size >= 1_048_576) {
            return round($this->size / 1_048_576, 1).' Mo';
        }

        return max(1, round($this->size / 1024)).' Ko';
    }

    /**
     * Retourne les images pour les 6 slots.
     * Pour chaque slot : l'image BDD si elle existe, sinon l'image statique par défaut.
     *
     * @return array<string, array{slot: string, label: string, url: string, id: int|null, original_name: string|null, size_label: string|null}>
     */
    public static function resolvedSlots(): array
    {
        /** @var array<string, self> $bySlot */
        $bySlot = self::all()->keyBy('slot');

        $result = [];
        foreach (self::SLOTS as $key => $meta) {
            $record = $bySlot->get($key);
            $result[$key] = [
                'slot'          => $key,
                'label'         => $meta['label'],
                'url'           => $record ? $record->url : $meta['default'],
                'is_custom'     => $record !== null,
                'id'            => $record?->id,
                'original_name' => $record?->original_name,
                'size_label'    => $record?->size_label,
            ];
        }

        return $result;
    }
}
