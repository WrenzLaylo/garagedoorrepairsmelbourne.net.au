# Garage Door Repairs Melbourne

Marketing landing site for **Garage Door Repairs Melbourne** — powered by **AGG Doors Pty Ltd**.
Repairs-led single-page site: hero, services, before/after sliders, "how it works", an
interactive Leaflet service-area map, a **Parts** section that redirects to the AGG Doors shop,
reviews, FAQ, and a spam-protected quote form.

## Stack

- React 19 + TypeScript + Vite 5
- Tailwind CSS 3 (custom design tokens in `tailwind.config.ts`)
- `lucide-react` icons, `leaflet` (lazy-loaded) for the coverage map
- Cloudflare Turnstile on both quote forms (section form + floating widget)

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs static site to dist/
npm run preview   # serve the production build
```

## Configuration (`.env.local`)

```ini
VITE_QUOTE_FORM_ENDPOINT=/quote-submit.php
VITE_TURNSTILE_SITE_KEY=0x4AAAAAADW3k29cgfInNEg6
```

- **`VITE_TURNSTILE_SITE_KEY`** — Cloudflare Turnstile *site* key. The matching *secret* key
  must be verified **server-side** in `quote-submit.php`. Until a real key is set the forms show
  a "spam protection not configured" notice and block live submissions.
- **`VITE_QUOTE_FORM_ENDPOINT`** — backend that accepts the quote `FormData`. The payload is
  Elementor-Pro compatible (`form_fields[...]`, `cf-turnstile-response`, honeypot `company`,
  `_form_started_at`) and matches the other AGG Doors sites, so the same handler can be reused.

## Deploy

`npm run build` produces a fully static `dist/` (HTML, hashed JS/CSS, `/assets`, `robots.txt`,
`sitemap.xml`). Upload the contents of `dist/` to the web root (e.g. cPanel `public_html`) and
ensure `quote-submit.php` (with the Turnstile secret) sits alongside it.

## Regenerate the social/OG card

`public/assets/twitter-card.jpg` (1200×630) is generated from the hero photo:

```bash
npm install sharp --no-save
node scripts/make-og.mjs
```

## Notes

- Brand/contact/content live in `src/constants.ts`. The site logo is `public/assets/agg-doors-logo.png`.
- Phone: `03 8789 9377` · Emergency: `03 8789 9378` · email `enquiries@aggdoors.com.au`.
- A pre-rewrite backup of the previous (SSR/prerender) version is at
  `../garagedoorrepairsmelbourne.backup`.
