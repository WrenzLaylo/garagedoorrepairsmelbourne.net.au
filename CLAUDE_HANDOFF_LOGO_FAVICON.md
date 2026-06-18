# Claude Handoff: Header/Footer Logo + Favicon Cleanup

Project folder:

`C:\Users\OASIS\Documents\AGG Doors\garagedoorrepairsmelbourne`

## User request

The user supplied two PNG logo assets and clarified their intended usage:

1. Header/footer icon source:
   - `C:\Users\OASIS\Downloads\ChatGPT Image Jun 16, 2026, 02_33_34 PM.png`

2. Favicon source:
   - `C:\Users\OASIS\Downloads\ChatGPT Image Jun 16, 2026, 02_36_12 PM.png`

The user noticed the blue garage-door/curtain bands looked low quality. Root cause: the supplied ChatGPT raster PNGs contained AI texture/noise artifacts inside the blue shapes. When downscaled into nav/footer/favicons, those artifacts became visible and made the mark look dirty/fuzzy.

## What was done

### 1. Cleaned and generated local self-contained assets

A Python/Pillow script was used to:

- Crop the supplied header/footer source to the garage-door mark.
- Remove the white background.
- Recolor the mark into flat brand colors to eliminate noisy AI texture artifacts.
- Crop the favicon source to the left garage-door mark only, excluding the full text lockup.
- Generate standard favicon/app-icon sizes.

Generated/updated files:

- `public/assets/gdrm-header-footer-logo.png`
- `public/assets/gdrm-favicon-source.png`
- `public/favicon.ico`
- `public/favicon-16x16.png`
- `public/favicon-32x32.png`
- `public/apple-touch-icon.png`
- `public/android-chrome-192x192.png`
- `public/android-chrome-512x512.png`

Approx final sizes after cleanup:

- `public/assets/gdrm-header-footer-logo.png`: 19,262 bytes
- `public/assets/gdrm-favicon-source.png`: 30,833 bytes
- `public/favicon.ico`: 6,773 bytes
- `public/favicon-32x32.png`: 1,256 bytes
- `public/favicon-16x16.png`: 575 bytes
- `public/apple-touch-icon.png`: 8,872 bytes
- `public/android-chrome-192x192.png`: 9,319 bytes
- `public/android-chrome-512x512.png`: 30,833 bytes

### 2. Updated business logo reference

File:

`src/constants.ts`

Changed:

```ts
logo: "/favicon-mark.svg",
```

To:

```ts
logo: "/assets/gdrm-header-footer-logo.png",
```

This makes the navbar and footer brand area use the cleaned header/footer mark.

### 3. Updated favicon link

File:

`index.html`

Changed the SVG favicon link to point at the PNG favicon instead:

```html
<link rel="icon" type="image/png" href="/favicon-32x32.png" />
```

Existing icon links remain:

```html
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

`site.webmanifest` already points to:

```json
/android-chrome-192x192.png
/android-chrome-512x512.png
```

Those files were regenerated from the cleaned favicon source.

### 4. Footer powered-by badge adjustment

File:

`src/components/layout/Footer.tsx`

The footer “Powered by AGG Doors” section was adjusted from a full-width dark row to a compact dark badge so it does not visually dominate the footer.

Current intended structure/classes:

```tsx
<div className="mt-8 flex flex-col items-center gap-3 text-center">
  <p className="text-[10px] font-semibold uppercase tracking-label text-ink-light">
    Powered by
  </p>
  <a
    href={BUSINESS.parentBrandUrl}
    className="group inline-flex w-fit items-center rounded-2xl bg-ink px-6 py-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Powered by AGG Doors - open AGG Doors website"
  >
    <img
      src="/assets/powered-by-aggdoors.png"
      alt="Powered by AGG Doors"
      className="h-10 w-auto"
      draggable={false}
    />
  </a>
  <p className="max-w-3xl text-xs leading-6 text-ink-light">
    {PARENT_BRAND.legalName} &bull; ABN {PARENT_BRAND.abn} &bull;{" "}
    {PARENT_BRAND.address} &bull;{" "}
    <a
      href={PARENT_BRAND.shopUrl}
      className="font-semibold text-brand-deep transition-colors duration-300 hover:text-brand"
      target="_blank"
      rel="noopener noreferrer"
    >
      AGG Doors Shop
    </a>
  </p>
</div>
```

## Verification already run

Commands run from project root:

```bash
npm run typecheck
npm run build
```

Both passed.

Latest build output summary:

```txt
vite v5.4.21 building for production...
✓ 1546 modules transformed.
✓ built in 6.06s
```

Browser preview was started with:

```bash
npm run preview -- --port 4173
```

Browser verification at:

`http://127.0.0.1:4173/`

Result:

- No broken images.
- Header logo loads from `/assets/gdrm-header-footer-logo.png`.
- Favicon links point to the new PNG/ICO assets.
- Footer powered-by link still points to `https://www.aggdoors.com.au/`.
- Footer powered-by badge measured approximately `168px x 72px` in preview.

Browser probe used:

```js
({
  brokenImages: Array.from(document.images)
    .filter(img => !img.complete || img.naturalWidth === 0)
    .map(img => img.src),
  headerLogo: document.querySelector('header img')?.src,
  faviconLinks: Array.from(document.querySelectorAll('link[rel*=icon]'))
    .map(l => ({ href: l.href, type: l.type, sizes: l.sizes?.value })),
  footerPoweredHref: Array.from(document.querySelectorAll('footer a'))
    .find(a => a.querySelector('img[alt="Powered by AGG Doors"]'))?.href
})
```

## Important notes for Claude

1. Do not revert to `favicon-mark.svg` for the active favicon or navbar/footer logo unless the user specifically asks. The old SVG is not the user-supplied final asset.

2. The cleaned PNGs are intentionally flat-color to remove the low-quality curtain/noise artifacts from the AI-generated originals.

3. If improving further, the best next step is to recreate the mark as a true SVG/vector from the cleaned shape. That would be sharper than any PNG and ideal for nav/footer/favicons.

4. Be careful with `Footer.tsx`: a formatting tool or previous agent may have reformatted more of the file than the functional change requires. Avoid unnecessary churn.

5. The user prefers direct implementation with real build/browser verification, not just recommendations.

## Suggested next steps if asked to refine

- Convert the cleaned mark into a proper SVG vector and use it for header/footer.
- Keep PNG favicon fallbacks for browser compatibility.
- Check the logo at mobile widths: the current header displays the icon at about `h-11 w-11` top-of-page and `h-9 w-9` when scrolled.
- If the icon feels too small next to the text, adjust only the displayed CSS size, not the asset dimensions.
