// Rasterise the brand vector art into the full favicon / PWA / social-card set.
// No AI — pure vector → raster. Re-run after editing the SVGs:  npm run gen:icons
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const assets = join(pub, "assets");

const markSvg = readFileSync(join(pub, "favicon-mark.svg"));
const ogSvg = readFileSync(join(pub, "og-card.svg"));

const png = (svg, size) =>
  sharp(svg, { density: 384 }).resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png();

const pngFiles = [
  ["favicon-16x16.png", 16],
  ["favicon-32x32.png", 32],
  ["apple-touch-icon.png", 180],
  ["android-chrome-192x192.png", 192],
  ["android-chrome-512x512.png", 512],
];

for (const [name, size] of pngFiles) {
  await png(markSvg, size).toFile(join(pub, name));
  console.log("✓", name);
}

// Brand mark PNG used in <head> logo references + navbar/footer fallback
await png(markSvg, 256).toFile(join(assets, "gdrm-logo.png"));
console.log("✓ assets/gdrm-logo.png");

// favicon.ico (16 + 32 + 48)
const icoSizes = await Promise.all([16, 32, 48].map((s) => png(markSvg, s).toBuffer()));
writeFileSync(join(pub, "favicon.ico"), await pngToIco(icoSizes));
console.log("✓ favicon.ico");

// Social cards (1200×630) — JPG (broad support) + WebP
const ogBase = sharp(ogSvg, { density: 192 }).resize(1200, 630, { fit: "cover" });
await ogBase.clone().jpeg({ quality: 88 }).toFile(join(pub, "og-image.jpg"));
await ogBase.clone().jpeg({ quality: 88 }).toFile(join(assets, "twitter-card.jpg"));
await ogBase.clone().webp({ quality: 86 }).toFile(join(pub, "og-image.webp"));
console.log("✓ og-image.jpg / assets/twitter-card.jpg / og-image.webp");

console.log("Done.");
