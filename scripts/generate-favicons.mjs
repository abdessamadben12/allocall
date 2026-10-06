import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

// The favicon is the green "CALL" speech bubble from the brand logo (public/logo.png).
const bubble = { left: 477, top: 0, width: 739, height: 517 };
const { data, info } = await sharp(await readFile(new URL('../public/logo.png', import.meta.url)))
    .extract(bubble)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

const { width, height } = info;
const isGreen = (i) => data[i + 3] > 128 && data[i + 1] > 150 && data[i] < 150 && data[i + 2] < 120;

// Flood-fill from the edges through non-green pixels: what is reached lies outside the bubble
// (including the grey "O" overlapping the tail); everything else that is not green is lettering.
const outside = new Uint8Array(width * height);
const stack = [];
for (let x = 0; x < width; x++) stack.push(x, (height - 1) * width + x);
for (let y = 0; y < height; y++) stack.push(y * width, y * width + width - 1);
while (stack.length) {
    const p = stack.pop();
    if (outside[p] || isGreen(p * 4)) continue;
    outside[p] = 1;
    const x = p % width;
    if (x > 0) stack.push(p - 1);
    if (x < width - 1) stack.push(p + 1);
    if (p >= width) stack.push(p - width);
    if (p < width * (height - 1)) stack.push(p + width);
}
for (let p = 0; p < width * height; p++) {
    const i = p * 4;
    if (outside[p]) data.fill(0, i, i + 4);
    else if (!isGreen(i)) data.set([255, 255, 255, 255], i);
}

const side = Math.round(width * 1.04);
const square = await sharp(data, { raw: { width, height, channels: 4 } })
    .extend({
        top: Math.floor((side - height) / 2),
        bottom: Math.ceil((side - height) / 2),
        left: Math.floor((side - width) / 2),
        right: Math.ceil((side - width) / 2),
        background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

const png = (size) => sharp(square).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
await writeFile(new URL('../public/favicon-96x96.png', import.meta.url), await png(96));
// iOS renders transparency as black, so the home-screen icon gets a white background.
const apple = await sharp(square).resize(150, 150).extend({ top: 15, bottom: 15, left: 15, right: 15, background: '#ffffff' }).flatten({ background: '#ffffff' }).png().toBuffer();
await writeFile(new URL('../public/apple-touch-icon.png', import.meta.url), apple);
const svgImage = (await png(128)).toString('base64');
await writeFile(
    new URL('../public/favicon.svg', import.meta.url),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">\n  <title>ALLO CALL</title>\n  <image width="64" height="64" href="data:image/png;base64,${svgImage}"/>\n</svg>\n`,
);
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
console.log('Favicons generated from the logo bubble: SVG, PNG 96, Apple 180, ICO 16/32/48/64.');
