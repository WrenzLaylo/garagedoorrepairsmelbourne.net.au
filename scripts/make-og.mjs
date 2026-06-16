// One-off: generate an on-brand 1200x630 social/OG card for Garage Door Repairs Melbourne.
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const assets = join(root, "public", "assets");

const W = 1200, H = 630;

const hero = await sharp(join(assets, "hero-technician-branded.webp"))
  .resize(W, H, { fit: "cover", position: "right top" })
  .toBuffer();

const overlay = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"  stop-color="#0F1B2D" stop-opacity="0.97"/>
      <stop offset="45%" stop-color="#0F1B2D" stop-opacity="0.92"/>
      <stop offset="72%" stop-color="#0F1B2D" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#0F1B2D" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="6" fill="#E8622A"/>
  <text x="70" y="232" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="800" fill="#FFFFFF" letter-spacing="-1">Garage Door Repairs</text>
  <text x="70" y="312" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="800" fill="#E8622A" letter-spacing="-1">Melbourne</text>
  <text x="72" y="372" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="600" fill="#C7D0DC">Springs · Cables · Motors · Remotes · 24/7 Emergency</text>
  <rect x="70" y="408" width="300" height="64" rx="32" fill="#E8622A"/>
  <text x="220" y="450" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="800" fill="#FFFFFF" text-anchor="middle">03 8789 9377</text>
  <text x="392" y="450" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="600" fill="#8FA0B3">Most repairs in 1–2 hours</text>
  <text x="72" y="556" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="#9FB0C4">Powered by AGG Doors · in business since 1999</text>
</svg>`);

const logo = await sharp(join(assets, "agg-doors-logo.png")).resize(96, 96, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();

await sharp(hero)
  .composite([
    { input: overlay, left: 0, top: 0 },
    { input: logo, left: 70, top: 70 },
  ])
  .jpeg({ quality: 86 })
  .toFile(join(assets, "twitter-card.jpg"));

console.log("✓ wrote public/assets/twitter-card.jpg (1200x630)");
