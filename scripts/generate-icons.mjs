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
  const outputPath = join(publicDir, 'favicon.ico');
  await sharp(svgBuffer).toFile(outputPath);
  console.log('✓ Generated favicon.ico (32×32)');
}

await generateIcon(192, 'icon-192.png');
await generateIcon(512, 'icon-512.png');
await generateIcon(32, 'favicon-32x32.png');
await generateFaviconIco();

console.log('Icons generated successfully.');
