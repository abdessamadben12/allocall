<?php

namespace App\Support;

use InvalidArgumentException;

/** A small, explicit publishing schema: user HTML is never accepted or rendered. */
class RichArticleContent
{
    private const BLOCKS = ['paragraph', 'heading', 'bulletList', 'orderedList', 'blockquote', 'codeBlock', 'horizontalRule', 'image', 'video', 'embed', 'table'];

    public static function normalize(array $document): array
    {
        if (($document['type'] ?? null) !== 'doc' || strlen(json_encode($document)) > 500000) {
            throw new InvalidArgumentException('Le contenu est invalide ou dépasse 500 Ko.');
        }
        $count = 0;
        $clean = self::node($document, 0, $count);
        $html = self::render($clean)['html'];
        if (trim(html_entity_decode(strip_tags($html))) === '' && ! preg_match('/<(img|video|iframe)\b/', $html)) {
            throw new InvalidArgumentException('Ajoutez du texte, une image ou une vidéo à l’article.');
        }

        return $clean;
    }

    public static function url(mixed $value, bool $link = false): string
    {
        if (! is_string($value) || strlen($value) > 2048 || preg_match('/[\x00-\x20\\\\]/', $value)) {
            return '';
        }
        if (preg_match('~^/(?!/)~', $value) || ($link && preg_match('/^#[a-zA-Z0-9_-]+$/', $value))) {
            return $value;
        }
        $scheme = strtolower(parse_url($value, PHP_URL_SCHEME) ?? '');
        if (in_array($scheme, ['http', 'https'], true) && filter_var($value, FILTER_VALIDATE_URL)) {
            return $value;
        }
        if ($link && in_array($scheme, ['mailto', 'tel'], true) && strlen($value) > strlen($scheme) + 1) {
            return $value;
        }

        return '';
    }

    private static function node(array $node, int $depth, int &$count): array
    {
        if ($depth > 20 || ++$count > 5000) {
            throw new InvalidArgumentException('Le document contient trop de blocs ou de niveaux imbriqués.');
        }
        $type = $node['type'] ?? '';
        $children = match ($type) {
            'doc', 'blockquote', 'listItem', 'tableCell', 'tableHeader' => self::BLOCKS,
            'paragraph', 'heading' => ['text', 'hardBreak'],
            'codeBlock' => ['text'],
            'bulletList', 'orderedList' => ['listItem'],
            'table' => ['tableRow'],
            'tableRow' => ['tableCell', 'tableHeader'],
            'text', 'hardBreak', 'horizontalRule', 'image', 'video', 'embed' => [],
            default => throw new InvalidArgumentException('Un bloc de contenu n’est pas pris en charge.'),
        };
        $result = ['type' => $type];
        $attrs = $node['attrs'] ?? [];
        if (! is_array($attrs) || ! is_array($node['content'] ?? []) || ! is_array($node['marks'] ?? [])) {
            throw new InvalidArgumentException('La structure du document est invalide.');
        }
        if ($type === 'text') {
            if (! is_string($node['text'] ?? null) || $node['text'] === '') {
                throw new InvalidArgumentException('Un bloc de texte est invalide.');
            }
            $result['text'] = $node['text'];
            foreach ($node['marks'] ?? [] as $mark) {
                if (! is_array($mark) || ! is_array($mark['attrs'] ?? [])) {
                    throw new InvalidArgumentException('Une mise en forme est invalide.');
                }
                $markType = $mark['type'] ?? '';
                $clean = ['type' => $markType];
                if ($markType === 'link') {
                    $url = self::url($mark['attrs']['href'] ?? '', true);
                    if (! $url) {
                        throw new InvalidArgumentException('Un lien est invalide. Utilisez http, https, mailto, tel ou un chemin du site.');
                    }
                    $clean['attrs'] = ['href' => $url, 'target' => ($mark['attrs']['target'] ?? '') === '_blank' ? '_blank' : null, 'rel' => 'noopener noreferrer'];
                } elseif (in_array($markType, ['textStyle', 'highlight'], true)) {
                    $color = $mark['attrs']['color'] ?? '';
                    if (! is_string($color) || ! preg_match('/^#[0-9a-fA-F]{6}$/', $color)) {
                        continue;
                    }
                    $clean['attrs'] = ['color' => $color];
                } elseif (! in_array($markType, ['bold', 'italic', 'underline', 'strike', 'code'], true)) {
                    throw new InvalidArgumentException('Une mise en forme n’est pas prise en charge.');
                }
                $result['marks'][] = $clean;
            }
        }
        if ($type === 'heading') {
            $result['attrs']['level'] = max(1, min(6, (int) ($attrs['level'] ?? 2)));
        }
        if (in_array($type, ['heading', 'paragraph'], true) && in_array($attrs['textAlign'] ?? '', ['left', 'center', 'right', 'justify'], true)) {
            $result['attrs']['textAlign'] = $attrs['textAlign'];
        }
        if ($type === 'orderedList') {
            $result['attrs']['start'] = max(1, min(10000, (int) ($attrs['start'] ?? 1)));
        }
        if (in_array($type, ['tableCell', 'tableHeader'], true)) {
            $result['attrs'] = ['colspan' => max(1, min(20, (int) ($attrs['colspan'] ?? 1))), 'rowspan' => max(1, min(100, (int) ($attrs['rowspan'] ?? 1)))];
        }
        if (in_array($type, ['image', 'video', 'embed'], true)) {
            $src = self::url($attrs['src'] ?? '');
            if (! $src || ($type === 'embed' && ! preg_match('~^https://(?:www\.youtube-nocookie\.com/embed/[a-zA-Z0-9_-]{11}|player\.vimeo\.com/video/[0-9]+)$~', $src))) {
                throw new InvalidArgumentException('L’adresse du média est invalide.');
            }
            $result['attrs'] = ['src' => $src];
            foreach (['alt', 'title'] as $attribute) {
                $result['attrs'][$attribute] = is_string($attrs[$attribute] ?? null) ? mb_substr($attrs[$attribute], 0, 500) : '';
            }
            if ($type === 'image') {
                $result['attrs']['width'] = in_array($attrs['width'] ?? '', ['25%', '50%', '75%', '100%'], true) ? $attrs['width'] : '100%';
            }
        }
        foreach ($node['content'] ?? [] as $child) {
            if (! is_array($child) || ! in_array($child['type'] ?? '', $children, true)) {
                throw new InvalidArgumentException('L’organisation des blocs est invalide.');
            }
            $result['content'][] = self::node($child, $depth + 1, $count);
        }
        if (in_array($type, ['doc', 'bulletList', 'orderedList', 'listItem', 'table', 'tableRow', 'tableCell', 'tableHeader'], true) && empty($result['content'])) {
            throw new InvalidArgumentException('Un bloc obligatoire est vide.');
        }

        return $result;
    }

    public static function render(array $document): array
    {
        $headings = [];
        $html = self::html($document, $headings);

        return ['html' => $html, 'headings' => $headings];
    }

    private static function html(array $node, array &$headings): string
    {
        $type = $node['type'];
        $attrs = $node['attrs'] ?? [];
        $inner = '';
        foreach ($node['content'] ?? [] as $child) {
            $inner .= self::html($child, $headings);
        }
        if ($type === 'text') {
            $text = e($node['text']);
            foreach ($node['marks'] ?? [] as $mark) {
                $tag = ['bold' => 'strong', 'italic' => 'em', 'underline' => 'u', 'strike' => 's', 'code' => 'code'][$mark['type']] ?? null;
                if ($tag) {
                    $text = "<$tag>$text</$tag>";
                } elseif ($mark['type'] === 'link') {
                    $url = self::url($mark['attrs']['href'] ?? '', true);
                    $target = ($mark['attrs']['target'] ?? '') === '_blank' ? ' target="_blank"' : '';
                    $text = '<a href="'.e($url).'"'.$target.' rel="noopener noreferrer">'.$text.'</a>';
                } elseif (in_array($mark['type'], ['textStyle', 'highlight'], true) && preg_match('/^#[0-9a-fA-F]{6}$/', $mark['attrs']['color'] ?? '')) {
                    $property = $mark['type'] === 'highlight' ? 'background-color' : 'color';
                    $text = '<span style="'.$property.':'.$mark['attrs']['color'].'">'.$text.'</span>';
                }
            }

            return $text;
        }
        $style = in_array($attrs['textAlign'] ?? '', ['left', 'right', 'center', 'justify'], true) ? ' style="text-align:'.$attrs['textAlign'].'"' : '';
        if ($type === 'heading') {
            $level = max(1, min(6, (int) ($attrs['level'] ?? 2)));
            $id = 'article-heading-'.(count($headings) + 1);
            $headings[] = ['id' => $id, 'heading' => html_entity_decode(strip_tags($inner)), 'level' => $level];

            return '<h'.$level.' id="'.$id.'"'.$style.'>'.$inner.'</h'.$level.'>';
        }
        if (in_array($type, ['image', 'video', 'embed'], true)) {
            $src = e(self::url($attrs['src'] ?? ''));
            if ($type === 'image') {
                $width = in_array($attrs['width'] ?? '', ['25%', '50%', '75%', '100%'], true) ? $attrs['width'] : '100%';

                return '<img src="'.$src.'" alt="'.e($attrs['alt'] ?? '').'" title="'.e($attrs['title'] ?? '').'" style="width:'.$width.'" loading="lazy">';
            }
            if ($type === 'video') {
                return '<video src="'.$src.'" controls preload="metadata" title="'.e($attrs['title'] ?? 'Vidéo').'"></video>';
            }
            if (! preg_match('~^https://(?:www\.youtube-nocookie\.com/embed/[a-zA-Z0-9_-]{11}|player\.vimeo\.com/video/[0-9]+)$~', $attrs['src'] ?? '')) {
                return '';
            }

            return '<iframe src="'.$src.'" title="'.e($attrs['title'] ?: 'Vidéo').'" loading="lazy" allow="fullscreen; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>';
        }
        return match ($type) {
            'doc' => $inner,
            'paragraph' => '<p'.$style.'>'.$inner.'</p>',
            'hardBreak' => '<br>',
            'horizontalRule' => '<hr>',
            'bulletList' => '<ul>'.$inner.'</ul>',
            'orderedList' => '<ol start="'.max(1, (int) ($attrs['start'] ?? 1)).'">'.$inner.'</ol>',
            'listItem' => '<li>'.$inner.'</li>',
            'blockquote' => '<blockquote>'.$inner.'</blockquote>',
            'codeBlock' => '<pre><code>'.$inner.'</code></pre>',
            'table' => '<div class="article-table"><table><tbody>'.$inner.'</tbody></table></div>',
            'tableRow' => '<tr>'.$inner.'</tr>',
            'tableCell', 'tableHeader' => '<'.($type === 'tableCell' ? 'td' : 'th').' colspan="'.max(1, min(20, (int) ($attrs['colspan'] ?? 1))).'" rowspan="'.max(1, min(100, (int) ($attrs['rowspan'] ?? 1))).'">'.$inner.'</'.($type === 'tableCell' ? 'td' : 'th').'>',
            default => '',
        };
    }
}
