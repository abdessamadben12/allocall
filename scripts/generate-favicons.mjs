import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const source = await readFile(new URL('../public/favicon.svg', import.meta.url));
const png = (size) => sharp(source).resize(size, size).png().toBuffer();
await writeFile(new URL('../public/favicon-96x96.png', import.meta.url), await png(96));
await writeFile(new URL('../public/apple-touch-icon.png', import.meta.url), await png(180));
const sizes = [16, 32, 48, 64];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((image, index) => {
    const entry = 6 + index * 16;
    header.writeUInt8(sizes[index], entry);
    header.writeUInt8(sizes[index], entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(image.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += image.length;
});
await writeFile(new URL('../public/favicon.ico', import.meta.url), Buffer.concat([header, ...images]));
console.log('Favicons generated: SVG, PNG 96, Apple 180, ICO 16/32/48/64.');
