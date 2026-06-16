<?php
// Copy this to `quote-form-config.php` (ONE directory ABOVE public_html, git-ignored)
// and fill in the real secrets. The proxy (public/quote-submit.php) reads it at runtime.
return [
    // Cloudflare Turnstile secret key (NOT the site key — that lives in .env.local as VITE_TURNSTILE_SITE_KEY)
    'turnstile_secret' => 'YOUR-CLOUDFLARE-TURNSTILE-SECRET',

    // AGG Doors WordPress/Elementor admin-ajax endpoint that receives the lead
    'elementor_endpoint' => 'https://www.aggdoors.com.au/wp-admin/admin-ajax.php',

    // Origins allowed to POST the form
    'allowed_origins' => [
        'https://garagedoorrepairsmelbourne.net.au',
        'https://www.garagedoorrepairsmelbourne.net.au',
    ],
];
