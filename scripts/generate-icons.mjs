/**
 * scripts/generate-icons.mjs
 *
 * Generates public/icon-192.png, public/icon-512.png, public/favicon-32x32.png,
 * and public/favicon.ico from an inline SVG using the canonical Bloqr 3-bar
 * descending mark.
 * Uses sharp (already in devDependencies).
 *
 * Run: node scripts/generate-icons.mjs
 */

import sharp from 'sharp';
import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// Bloqr canonical mark: dark navy background + three descending horizontal bars
// (bar 1=white, bar 2=cyan, bar 3=orange), scaled proportionally by icon size.
const svgTemplate = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.1875)}" fill="#070B14"/>
  <rect
    x="${Math.round(size * 0.117)}"
    y="${Math.round(size * 0.342)}"
    width="${Math.round(size * 0.625)}"
    height="${Math.round(size * 0.09)}"
    rx="${Math.round(size * 0.016)}"
    fill="#F1F5F9"
  />
  <rect
    x="${Math.round(size * 0.117)}"
    y="${Math.round(size * 0.463)}"
    width="${Math.round(size * 0.469)}"
    height="${Math.round(size * 0.09)}"
    rx="${Math.round(size * 0.016)}"
    fill="#00D4FF"
  />
  <rect
    x="${Math.round(size * 0.117)}"
    y="${Math.round(size * 0.584)}"
    width="${Math.round(size * 0.254)}"
    height="${Math.round(size * 0.09)}"
    rx="${Math.round(size * 0.016)}"
    fill="#FF5500"
  />
</svg>
`;

async function generateIcon(size, filename) {
  const svgBuffer = Buffer.from(svgTemplate(size));
  const outputPath = join(publicDir, filename);
  await sharp(svgBuffer)
    .png()
    .toFile(outputPath);
  console.log(`✓ Generated ${filename} (${size}×${size})`);
}

async function generateFaviconIco() {
  const svgBuffer = Buffer.from(svgTemplate(32));
  const pngBuffer = await sharp(svgBuffer).png().toBuffer();
  const iconDirSize = 6;
  const iconEntrySize = 16;
  const imageOffset = iconDirSize + iconEntrySize;
  const iconBuffer = Buffer.alloc(imageOffset + pngBuffer.length);

  // ICONDIR header
  iconBuffer.writeUInt16LE(0, 0); // reserved
  iconBuffer.writeUInt16LE(1, 2); // type = ICO
  iconBuffer.writeUInt16LE(1, 4); // images count

  // ICONDIRENTRY
  iconBuffer.writeUInt8(32, 6); // width
  iconBuffer.writeUInt8(32, 7); // height
  iconBuffer.writeUInt8(0, 8); // color count
  iconBuffer.writeUInt8(0, 9); // reserved
  iconBuffer.writeUInt16LE(1, 10); // color planes
  iconBuffer.writeUInt16LE(32, 12); // bits per pixel
  iconBuffer.writeUInt32LE(pngBuffer.length, 14); // image data size
  iconBuffer.writeUInt32LE(imageOffset, 18); // image data offset
  pngBuffer.copy(iconBuffer, imageOffset);

  const outputPath = join(publicDir, 'favicon.ico');
  await writeFile(outputPath, iconBuffer);
  console.log('✓ Generated favicon.ico (32×32)');
}

await generateIcon(192, 'icon-192.png');
await generateIcon(512, 'icon-512.png');
await generateIcon(32, 'favicon-32x32.png');
await generateFaviconIco();

console.log('Icons generated successfully.');
