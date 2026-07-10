// Convertit en WebP (q80, max 1920px) toutes les images référencées par le code
// pesant plus de 300 Ko, met à jour les références, et déplace les originaux
// vers _originals-backup/ (hors public/, non déployé).
// Usage : node scripts/convert-webp.mjs
import { existsSync, mkdirSync, readFileSync, renameSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const ROOT = join(import.meta.dirname, '..');
const PUBLIC = join(ROOT, 'public');
const BACKUP = join(ROOT, '_originals-backup');
const THRESHOLD = 300 * 1024;

const SOURCE_FILES = [
    'resources/js/image/index.ts',
    'resources/js/components/pages/Hero.tsx',
    'resources/js/data/services.ts',
    'resources/js/data/gallery.ts',
];

// 1. Collecter les chemins référencés
const refs = new Set();
for (const file of SOURCE_FILES) {
    const content = readFileSync(join(ROOT, file), 'utf8');
    for (const match of content.matchAll(/\/images\/[^'"`]+?\.(?:png|jpe?g)/gi)) {
        refs.add(match[0]);
    }
}

// 2. Convertir celles qui dépassent le seuil
const mapping = new Map();
let before = 0;
let after = 0;

for (const ref of refs) {
    const abs = join(PUBLIC, ref);
    if (!existsSync(abs)) {
        console.warn(`ABSENT   ${ref}`);
        continue;
    }
    const size = statSync(abs).size;
    if (size < THRESHOLD) continue;

    const webpRef = ref.replace(/\.(png|jpe?g)$/i, '.webp');
    const webpAbs = join(PUBLIC, webpRef);

    await sharp(abs)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(webpAbs);

    const newSize = statSync(webpAbs).size;
    before += size;
    after += newSize;
    mapping.set(ref, webpRef);

    // Déplacer l'original vers le backup
    const backupAbs = join(BACKUP, ref);
    mkdirSync(dirname(backupAbs), { recursive: true });
    renameSync(abs, backupAbs);

    console.log(`${(size / 1048576).toFixed(2)} Mo -> ${(newSize / 1024).toFixed(0)} Ko  ${ref}`);
}

// 3. Mettre à jour les références dans le code
for (const file of SOURCE_FILES) {
    const path = join(ROOT, file);
    let content = readFileSync(path, 'utf8');
    let touched = false;
    for (const [oldRef, newRef] of mapping) {
        if (content.includes(oldRef)) {
            content = content.split(oldRef).join(newRef);
            touched = true;
        }
    }
    if (touched) writeFileSync(path, content);
}

console.log(`\n${mapping.size} images converties : ${(before / 1048576).toFixed(1)} Mo -> ${(after / 1048576).toFixed(1)} Mo`);
console.log(`Originaux déplacés vers ${BACKUP}`);
