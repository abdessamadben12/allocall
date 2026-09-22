<?php

namespace App\Http\Controllers;

use App\Models\Maquette;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;
use ZipArchive;

class MaquetteController extends Controller
{
    public function index(Request $request): Response
    {
        $filters = self::filtersFrom($request);
        $maquettes = self::filteredQuery($filters)
            ->latest()
            ->paginate(25)
            ->withQueryString();

        return Inertia::render('maquettes/index', [
            'maquettes' => $maquettes,
            'filters' => array_merge(self::emptyFilters(), $filters),
        ]);
    }

    public static function emptyFilters(): array
    {
        return [
            'maquette_client' => '',
            'maquette_designer_3d' => '',
            'maquette_realized' => '',
            'maquette_has_pdf' => '',
            'maquette_has_source' => '',
            'maquette_has_facebook' => '',
            'maquette_surface_min' => '',
            'maquette_surface_max' => '',
            'maquette_wall_count' => '',
            'maquette_salon' => '',
            'maquette_edition' => '',
        ];
    }

    public static function filtersFrom(Request $request): array
    {
        return $request->validate([
            'maquette_client' => 'nullable|string|max:255',
            'maquette_designer_3d' => 'nullable|string|max:255',
            'maquette_realized' => 'nullable|in:yes,no',
            'maquette_has_pdf' => 'nullable|in:yes,no',
            'maquette_has_source' => 'nullable|in:yes,no',
            'maquette_has_facebook' => 'nullable|in:yes,no',
            'maquette_surface_min' => 'nullable|numeric|min:0',
            'maquette_surface_max' => 'nullable|numeric|min:0',
            'maquette_wall_count' => 'nullable|integer|min:0|max:65535',
            'maquette_salon' => 'nullable|string|max:255',
            'maquette_edition' => 'nullable|string|max:255',
        ]);
    }

    public static function filteredQuery(array $filters)
    {
        return Maquette::query()
            ->when($filters['maquette_client'] ?? null, fn ($query, $value) => $query->where('client', 'like', "%{$value}%"))
            ->when($filters['maquette_designer_3d'] ?? null, fn ($query, $value) => $query->where('designer_3d', 'like', "%{$value}%"))
            ->when($filters['maquette_realized'] ?? null, fn ($query, $value) => $query->where('realized', $value === 'yes'))
            ->when($filters['maquette_has_pdf'] ?? null, fn ($query, $value) => $value === 'yes'
                ? $query->whereNotNull('maquette_pdf_path')
                : $query->whereNull('maquette_pdf_path'))
            ->when($filters['maquette_has_source'] ?? null, fn ($query, $value) => $value === 'yes'
                ? $query->where(fn ($inner) => $inner->whereNotNull('source_file_original_name')->where('source_file_original_name', '!=', ''))
                : $query->where(fn ($inner) => $inner->whereNull('source_file_original_name')->orWhere('source_file_original_name', '')))
            ->when($filters['maquette_has_facebook'] ?? null, fn ($query, $value) => $value === 'yes'
                ? $query->whereNotNull('facebook_url')->where('facebook_url', '!=', '')
                : $query->where(fn ($inner) => $inner->whereNull('facebook_url')->orWhere('facebook_url', '')))
            ->when($filters['maquette_surface_min'] ?? null, fn ($query, $value) => $query->where('surface_area', '>=', $value))
            ->when($filters['maquette_surface_max'] ?? null, fn ($query, $value) => $query->where('surface_area', '<=', $value))
            ->when($filters['maquette_wall_count'] ?? null, fn ($query, $value) => $query->where('wall_count', $value))
            ->when($filters['maquette_salon'] ?? null, fn ($query, $value) => $query->where('salon', 'like', "%{$value}%"))
            ->when($filters['maquette_edition'] ?? null, fn ($query, $value) => $query->where('edition', 'like', "%{$value}%"));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validatedPayload($request);

        if ($request->hasFile('maquette_pdf')) {
            $file = $request->file('maquette_pdf');
            $validated['maquette_pdf_path'] = $file->store('maquettes/pdf');
            $validated['maquette_pdf_original_name'] = $file->getClientOriginalName();
            $validated['maquette_pdf_size'] = $file->getSize();
        }

        Maquette::create($validated);

        return redirect()->route('maquettes.index')->with('success', 'Maquette ajoutee avec succes.');
    }

    public function update(Request $request, Maquette $maquette): RedirectResponse
    {
        $validated = $this->validatedPayload($request);

        if ($request->hasFile('maquette_pdf')) {
            if ($maquette->maquette_pdf_path) {
                Storage::delete($maquette->maquette_pdf_path);
            }

            $file = $request->file('maquette_pdf');
            $validated['maquette_pdf_path'] = $file->store('maquettes/pdf');
            $validated['maquette_pdf_original_name'] = $file->getClientOriginalName();
            $validated['maquette_pdf_size'] = $file->getSize();
        }

        $maquette->update($validated);

        return redirect()->route('maquettes.index')->with('success', 'Maquette mise a jour avec succes.');
    }

    private function validatedPayload(Request $request): array
    {
        $validated = $request->validate([
            'client' => 'nullable|string|max:255',
            'surface_area' => 'nullable|numeric|min:0|max:99999999.99',
            'dimensions' => 'nullable|string|max:255',
            'wall_count' => 'nullable|integer|min:0|max:65535',
            'salon' => 'nullable|string|max:255',
            'edition' => 'nullable|string|max:255',
            'maquette_pdf' => 'nullable|file|mimes:pdf|max:20480',
            'source_file' => 'nullable|string|max:255',
            'designer_3d' => 'nullable|string|max:255',
            'realized' => 'nullable',
            'facebook_url' => 'nullable|url|max:2048',
        ]);

        $validated['source_file_original_name'] = $validated['source_file'] ?? null;
        $validated['realized'] = $request->boolean('realized');

        unset($validated['maquette_pdf'], $validated['source_file']);

        return $validated;
    }

    public function import(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'excel_file' => 'required|file|mimes:xlsx,csv,txt|max:10240',
        ]);

        $path = $validated['excel_file']->getRealPath();
        $extension = strtolower($validated['excel_file']->getClientOriginalExtension());
        if ($extension === 'xlsx' && ! class_exists(ZipArchive::class)) {
            throw ValidationException::withMessages([
                'excel_file' => "L'import XLSX requiert l'extension PHP zip. Utilisez un fichier CSV ou activez php-zip sur le serveur.",
            ]);
        }

        $rows = $extension === 'xlsx' ? $this->readXlsxRows($path) : $this->readCsvRows($path);

        if (count($rows) < 2) {
            return redirect()
                ->route('maquettes.index')
                ->with('error', 'Le fichier importe ne contient pas de donnees.');
        }

        $headers = $this->normalizeHeaders(array_shift($rows));
        $created = 0;

        foreach ($rows as $row) {
            $payload = $this->maquettePayloadFromRow($headers, $row);

            if ($this->isEmptyImportRow($payload)) {
                continue;
            }

            Maquette::create($payload);
            $created++;
        }

        return redirect()
            ->route('maquettes.index')
            ->with('success', "{$created} maquette(s) importee(s) avec succes.");
    }

    public function destroy(Maquette $maquette): RedirectResponse
    {
        $maquette->delete();

        return redirect()->back()->with('success', 'Maquette supprimee avec succes.');
    }

    public function bulkDestroy(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer|exists:maquettes,id',
        ]);

        $deleted = Maquette::whereIn('id', $validated['ids'])->delete();

        return redirect()->back()->with('success', "{$deleted} maquette(s) supprimee(s) avec succes.");
    }

    public function pdf(Maquette $maquette): StreamedResponse
    {
        abort_unless($maquette->maquette_pdf_path && Storage::exists($maquette->maquette_pdf_path), 404);

        return Storage::download(
            $maquette->maquette_pdf_path,
            $maquette->maquette_pdf_original_name ?: basename($maquette->maquette_pdf_path)
        );
    }

    public function source(Maquette $maquette): StreamedResponse
    {
        abort_unless($maquette->source_file_path && Storage::exists($maquette->source_file_path), 404);

        return Storage::download(
            $maquette->source_file_path,
            $maquette->source_file_original_name ?: basename($maquette->source_file_path)
        );
    }

    private function readCsvRows(string $path): array
    {
        $contents = (string) file_get_contents($path);

        // BOM UTF-8 (exports "CSV UTF-8" d'Excel / Google Sheets)
        if (str_starts_with($contents, "\xEF\xBB\xBF")) {
            $contents = substr($contents, 3);
        }

        // Exports Excel "CSV" classiques en ANSI (Windows-1252) : on convertit
        // en UTF-8 pour que les en-têtes accentués (Réalisé, m²…) soient reconnus.
        if (! mb_check_encoding($contents, 'UTF-8')) {
            $contents = mb_convert_encoding($contents, 'UTF-8', 'Windows-1252');
        }

        $path = tempnam(sys_get_temp_dir(), 'maquettes_csv_');
        file_put_contents($path, $contents);

        $rows = [];
        $file = new \SplFileObject($path);
        $file->setFlags(\SplFileObject::READ_CSV | \SplFileObject::SKIP_EMPTY);
        $file->setCsvControl($this->detectCsvDelimiter($path));

        foreach ($file as $row) {
            if (! is_array($row) || $row === [null]) {
                continue;
            }

            $rows[] = array_map(fn ($value) => is_string($value) ? trim($value) : $value, $row);
        }

        $file = null;
        @unlink($path);

        return $rows;
    }

    private function detectCsvDelimiter(string $path): string
    {
        $sample = (string) file_get_contents($path, false, null, 0, 2048);
        $delimiters = [',' => substr_count($sample, ','), ';' => substr_count($sample, ';'), "\t" => substr_count($sample, "\t")];

        arsort($delimiters);

        return (string) array_key_first($delimiters);
    }

    private function readXlsxRows(string $path): array
    {
        $zip = new ZipArchive();
        abort_unless($zip->open($path) === true, 422, 'Impossible de lire le fichier XLSX.');

        try {
            $sharedStrings = $this->readSharedStrings($zip);
            $sheetPath = $this->firstWorksheetPath($zip);
            $sheetXml = $zip->getFromName($sheetPath);
            abort_unless($sheetXml !== false, 422, 'Feuille Excel introuvable.');

            $sheet = simplexml_load_string($sheetXml);
            abort_unless($sheet !== false, 422, 'Feuille Excel illisible.');

            $rows = [];
            foreach ($sheet->sheetData->row as $xmlRow) {
                $row = [];
                foreach ($xmlRow->c as $cell) {
                    $attributes = $cell->attributes();
                    $reference = (string) ($attributes['r'] ?? '');
                    $columnIndex = $this->excelColumnIndex($reference);
                    $row[$columnIndex] = $this->xlsxCellValue($cell, $sharedStrings);
                }

                if ($row !== []) {
                    ksort($row);
                    $rows[] = array_values($row + array_fill(0, max(array_keys($row)) + 1, ''));
                }
            }

            return $rows;
        } finally {
            $zip->close();
        }
    }

    private function readSharedStrings(ZipArchive $zip): array
    {
        $xml = $zip->getFromName('xl/sharedStrings.xml');
        if ($xml === false) {
            return [];
        }

        $shared = simplexml_load_string($xml);
        if ($shared === false) {
            return [];
        }

        $strings = [];
        foreach ($shared->si as $item) {
            if (isset($item->t)) {
                $strings[] = (string) $item->t;
                continue;
            }

            $text = '';
            foreach ($item->r as $run) {
                $text .= (string) $run->t;
            }
            $strings[] = $text;
        }

        return $strings;
    }

    private function firstWorksheetPath(ZipArchive $zip): string
    {
        $workbookXml = $zip->getFromName('xl/workbook.xml');
        $relsXml = $zip->getFromName('xl/_rels/workbook.xml.rels');
        abort_unless($workbookXml !== false && $relsXml !== false, 422, 'Structure XLSX invalide.');

        $workbook = simplexml_load_string($workbookXml);
        $rels = simplexml_load_string($relsXml);
        abort_unless($workbook !== false && $rels !== false, 422, 'Structure XLSX illisible.');

        $workbook->registerXPathNamespace('r', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships');
        $sheet = $workbook->sheets->sheet[0] ?? null;
        abort_unless($sheet !== null, 422, 'Aucune feuille Excel trouvee.');

        $relationId = (string) $sheet->attributes('r', true)['id'];
        foreach ($rels->Relationship as $relationship) {
            if ((string) $relationship['Id'] === $relationId) {
                $target = ltrim((string) $relationship['Target'], '/');

                return str_starts_with($target, 'xl/') ? $target : 'xl/'.$target;
            }
        }

        return 'xl/worksheets/sheet1.xml';
    }

    private function xlsxCellValue(\SimpleXMLElement $cell, array $sharedStrings): string
    {
        $type = (string) ($cell->attributes()['t'] ?? '');

        if ($type === 'inlineStr') {
            return trim((string) ($cell->is->t ?? ''));
        }

        $value = trim((string) ($cell->v ?? ''));
        if ($type === 's') {
            return $sharedStrings[(int) $value] ?? '';
        }

        return $value;
    }

    private function excelColumnIndex(string $reference): int
    {
        preg_match('/^[A-Z]+/i', $reference, $matches);
        $letters = strtoupper($matches[0] ?? 'A');
        $index = 0;

        foreach (str_split($letters) as $letter) {
            $index = ($index * 26) + (ord($letter) - 64);
        }

        return max(0, $index - 1);
    }

    private function normalizeHeaders(array $headers): array
    {
        return array_map(fn ($header) => $this->normalizeHeader((string) $header), $headers);
    }

    private function normalizeHeader(string $header): string
    {
        $header = mb_strtolower(trim($header));
        $header = strtr($header, [
            'é' => 'e', 'è' => 'e', 'ê' => 'e', 'ë' => 'e',
            'à' => 'a', 'â' => 'a',
            'î' => 'i', 'ï' => 'i',
            'ô' => 'o',
            'ù' => 'u', 'û' => 'u',
            'ç' => 'c',
            '²' => '2',
        ]);

        return trim(preg_replace('/[^a-z0-9]+/', '_', $header) ?? '', '_');
    }

    private function maquettePayloadFromRow(array $headers, array $row): array
    {
        $data = [];
        foreach ($headers as $index => $header) {
            $data[$header] = trim((string) ($row[$index] ?? ''));
        }

        return [
            'client' => $this->textValue($this->firstValue($data, ['client'])),
            'surface_area' => $this->numericValue($this->firstValue($data, ['superficie_en_m2', 'superficie_m2', 'superficie_en_m', 'superficie', 'surface_area'])),
            'dimensions' => $this->textValue($this->firstValue($data, ['dimensions_en_m', 'dimensions'])),
            'wall_count' => $this->integerValue($this->firstValue($data, ['nombre_de_murs', 'murs', 'wall_count'])),
            'salon' => $this->textValue($this->firstValue($data, ['salon'])),
            'edition' => $this->textValue($this->firstValue($data, ['edition'])),
            'maquette_pdf_original_name' => $this->fileNameValue($this->firstValue($data, ['maquette_pdf', 'pdf'])),
            'source_file_original_name' => $this->fileNameValue($this->firstValue($data, ['fichier_source', 'source'])),
            'designer_3d' => $this->textValue($this->firstValue($data, ['3diste', 'designer_3d', 'diste'])),
            'realized' => $this->booleanValue($this->firstValue($data, ['realise', 'realized'])),
            'facebook_url' => $this->urlValue($this->firstValue($data, ['facebook', 'facebook_url'])),
        ];
    }

    private function firstValue(array $data, array $keys): ?string
    {
        foreach ($keys as $key) {
            if (($data[$key] ?? '') !== '') {
                return $data[$key];
            }
        }

        return null;
    }

    private function textValue(?string $value): ?string
    {
        if ($value === null || in_array(trim($value), ['?', '-'], true)) {
            return null;
        }

        return $value;
    }

    private function fileNameValue(?string $value): ?string
    {
        $value = $this->textValue($value);
        if ($value === null) {
            return null;
        }

        // Les colonnes "Maquette PDF" / "Fichier source" contiennent souvent
        // Oui/Non au lieu d'un nom de fichier : on ignore ces valeurs.
        return in_array(mb_strtolower(trim($value)), ['oui', 'non', 'yes', 'no', 'x', '0', '1'], true) ? null : $value;
    }

    private function numericValue(?string $value): ?float
    {
        if ($value === null) {
            return null;
        }

        $normalized = str_replace(',', '.', preg_replace('/[^0-9,.\-]/', '', $value) ?? '');

        return is_numeric($normalized) ? (float) $normalized : null;
    }

    private function integerValue(?string $value): ?int
    {
        $number = $this->numericValue($value);

        return $number === null ? null : (int) round($number);
    }

    private function booleanValue(?string $value): bool
    {
        if ($value === null) {
            return false;
        }

        return in_array(mb_strtolower(trim($value)), ['1', 'oui', 'yes', 'true', 'vrai', 'x'], true);
    }

    private function urlValue(?string $value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        return filter_var($value, FILTER_VALIDATE_URL) ? $value : null;
    }

    private function isEmptyImportRow(array $payload): bool
    {
        foreach ($payload as $key => $value) {
            if ($key === 'realized') {
                continue;
            }

            if ($value !== null && $value !== '') {
                return false;
            }
        }

        return true;
    }
}
