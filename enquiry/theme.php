<?php
declare(strict_types=1);

/**
 * Garage Door Repairs Melbourne email theme.
 *
 * Tokens taken from the site's own tailwind.config.ts so the emails read as the same brand as
 * the site: cobalt on a white canvas, Space Grotesk display, Space Mono labels.
 *
 * Declared in full rather than as an override of a kit theme, because this brand shares nothing
 * with merlin's green. The kit ships no gdrm theme; this file is the single source.
 */

return [
    // Surfaces: white canvas, the alternating wash, and the page behind the card.
    'surface' => '#FFFFFF',
    'surface_deep' => '#F6F7F9',
    'page' => '#F0F2F5',

    'ink' => '#111111',
    'muted' => '#565B63',
    'on_dark' => '#FFFFFF',

    // Cobalt. `brand` is the fill; `brand_deep` is the AA-safe shade the site already reserves
    // for small text on white (8.43:1).
    'brand' => '#2D5BFF',
    'brand_deep' => '#1B3CC4',
    'accent' => '#2D5BFF',
    'line' => '#E6E8EC',

    // Secondary text on the dark bands.
    'caption' => '#D3D7DD',
    'caption_soft' => '#E6E8EC',
    'divider' => '#D3D7DD',

    // Emergency CTA. The site's default accent #E5484D is only 3.91:1 against white and fails
    // AA for the button's bold ~16px text; tailwind.config.ts already defines accent-dark
    // #C13438 for exactly this, and it passes at 5.50:1.
    'emergency_bg' => '#C13438',
    'emergency_border' => '#C13438',
    'emergency_text' => '#FFFFFF',

    'display_font' => "'Space Grotesk','Segoe UI',Arial,sans-serif",
    'body_font' => "'Inter Tight','Segoe UI',Arial,sans-serif",
    'mono_font' => "'Space Mono',Consolas,'Courier New',monospace",

    // The site's own logo is an SVG, which Gmail and Outlook will not render. The square
    // PWA icon is the email-safe mark, sized like .org's square logo.
    'site_logo_url' => 'https://garagedoorrepairsmelbourne.net.au/android-chrome-512x512.png',
    'site_logo_width' => '50',
    'site_logo_height' => '50',
    'partner_logo_url' => 'https://garagedoorrepairsmelbourne.net.au/Powered_by_AGGDoors.png',

    'site_name' => 'Garage Door Repairs',
    'site_name_line2' => 'Melbourne',
    'strapline' => 'Springs, cables, motors & doors across Melbourne',
    'footer_credit' => 'Garage Door Repairs Melbourne · a division of AGG Doors',

    'phone' => '03 8789 3253',
    'phone_emergency' => '03 8789 3254',
    // Bare host: the footer template renders href="https://{site_url}".
    'site_url' => 'garagedoorrepairsmelbourne.net.au',
];
