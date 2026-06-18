<?php
/**
 * shop-sync.php — cPanel cron worker that keeps the "Popular parts" section fresh.
 *
 * WHAT IT DOES
 *   Server-side (no browser CORS limits), it pulls live data for each curated product
 *   from shop.aggdoors.com.au, refreshes the product image, and writes shop-products.json
 *   next to this file. The React site fetches that JSON same-origin and renders the cards
 *   + structured data from it — so the live page updates with NO rebuild and NO re-upload.
 *
 * SET-AND-FORGET ON cPANEL
 *   1. Upload this file to your site root (same folder as index.html), alongside the
 *      /assets/shop/ image folder.
 *   2. cPanel → "Cron Jobs" → add (weekly, 4am Monday shown):
 *        0 4 * * 1  /usr/local/bin/php /home/USERNAME/public_html/shop-sync.php >/dev/null 2>&1
 *      (Adjust the php path + site path to your account. Many hosts also accept just `php`.)
 *   3. To curate which products appear, edit the $CURATION list below (handle = the slug in
 *      the shop product URL). Everything else (price, stock, title, image) auto-updates.
 *
 * SAFE TO RUN: only reads from the shop + writes local files. Browser runs are blocked
 * unless you pass ?token=... matching SYNC_TOKEN (change it). CLI/cron runs always allowed.
 */

const SYNC_TOKEN = 'iloveaggdoors';
const SHOP_BASE = 'https://shop.aggdoors.com.au/products/';
const IMG_SIZE = '_600x'; // Shopify CDN size suffix
const OUT_JSON = __DIR__ . '/shop-products.json';
const IMG_DIR = __DIR__ . '/assets/shop';

// --- Curation: the editorial choices you control. Volatile fields auto-fill from the shop. ---
$CURATION = [
  ['ref' => 'RC-E970M', 'handle' => 'merlin-e970m-2-remotes', 'file' => 'remote-merlin-e970m.jpg', 'category' => 'Remotes', 'fits' => 'Merlin Security+ 2.0'],
  ['ref' => 'KP-SEC20', 'handle' => 'merlin-wireless-security-keypad-security-2-0', 'file' => 'keypad-merlin-security.png', 'category' => 'Keypads', 'fits' => 'Security+ 2.0 openers'],
  ['ref' => 'WB-WTX6', 'handle' => 'ata-wtx-6-triocode-premium-wireless-wall-button', 'file' => 'wallbutton-ata-wtx6.jpg', 'category' => 'Wall controls', 'fits' => 'ATA TrioCode systems'],
  ['ref' => 'MT-MS105', 'handle' => 'merlin-commander-elite-ms105myq', 'file' => 'opener-merlin-ms105.png', 'category' => 'Openers', 'fits' => 'Sectional / panel-lift'],
  ['ref' => 'MT-R1000', 'handle' => 'liftpro-r1000-roller-door-opener', 'file' => 'opener-liftpro-r1000.jpg', 'category' => 'Openers', 'fits' => 'Roller doors'],
  ['ref' => 'RX-E8003', 'handle' => 'merlin-e8003-receiver', 'file' => 'receiver-merlin-e8003.jpg', 'category' => 'Receivers', 'fits' => 'Merlin openers'],
  ['ref' => 'SP-J90', 'handle' => 'tilt-door-j70-j90-jamb-type-spring', 'file' => 'spring-tilt-jamb.jpg', 'category' => 'Springs', 'fits' => 'J-series tilt doors'],
  ['ref' => 'RL-W220', 'handle' => 'b-d-sectional-panel-door-wheel-220mm', 'file' => 'roller-bd-wheel-220.jpg', 'category' => 'Rollers', 'fits' => 'B&D Panelift'],
  ['ref' => 'WS-S23', 'handle' => 'b-d-series-2-3-weatherstrip-universal-series-2-3', 'file' => 'seal-bd-weatherstrip.jpg', 'category' => 'Weather seals', 'fits' => 'B&D Series 2 / 3'],
];

// --- Access guard: CLI/cron always; web only with the token. ---
if (php_sapi_name() !== 'cli') {
  $tok = isset($_GET['token']) ? $_GET['token'] : '';
  if (!hash_equals(SYNC_TOKEN, $tok)) {
    http_response_code(403);
    exit('Forbidden');
  }
  header('Content-Type: text/plain; charset=utf-8');
}

function http_get($url, $binary = false)
{
  $ch = curl_init($url);
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_TIMEOUT => 20,
    CURLOPT_USERAGENT => 'GDRM-shop-sync/1.0 (+garagedoorrepairsmelbourne.net.au)',
    CURLOPT_HTTPHEADER => ['Accept: ' . ($binary ? '*/*' : 'application/json')],
  ]);
  $body = curl_exec($ch);
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  return ($body !== false && $code >= 200 && $code < 300) ? $body : null;
}

// Last-known good output, so a single failed product/image is never dropped.
$previous = [];
if (is_file(OUT_JSON)) {
  $old = json_decode((string) file_get_contents(OUT_JSON), true);
  if (isset($old['products']) && is_array($old['products'])) {
    foreach ($old['products'] as $p) {
      if (isset($p['ref']))
        $previous[$p['ref']] = $p;
    }
  }
}

if (!is_dir(IMG_DIR)) {
  @mkdir(IMG_DIR, 0755, true);
}

$products = [];
$log = [];
foreach ($CURATION as $c) {
  $href = SHOP_BASE . $c['handle'];
  // Use the theme ".js" AJAX endpoint: it (unlike "/products/<handle>.json") includes the
  // `available` flag, and returns `price` in CENTS. The product object is at the top level.
  $raw = http_get($href . '.js');
  $prev = isset($previous[$c['ref']]) ? $previous[$c['ref']] : null;

  if ($raw === null) {
    $log[] = "WARN  {$c['ref']} fetch failed — keeping last known";
    if ($prev) {
      $products[] = $prev;
    }
    continue;
  }

  $prod = json_decode($raw, true);
  if (!is_array($prod) || !isset($prod['title'])) {
    $log[] = "WARN  {$c['ref']} no product node — keeping last known";
    if ($prev) {
      $products[] = $prev;
    }
    continue;
  }

  $priceNum = isset($prod['price']) ? ((float) $prod['price']) / 100.0 : 0.0; // cents → dollars
  $available = !empty($prod['available']);
  $title = trim($prod['title']);

  // Refresh the image (best-effort; keep old file on failure). `.js` image fields are URL strings.
  $imgPath = '/assets/shop/' . $c['file'];
  $src = isset($prod['featured_image']) ? $prod['featured_image']
    : (isset($prod['images'][0]) ? $prod['images'][0] : '');
  if ($src) {
    if (strpos($src, '//') === 0)
      $src = 'https:' . $src;
    $sized = preg_replace('/(\.(jpg|jpeg|png|webp))(\?|$)/i', IMG_SIZE . '$1$3', $src);
    $bytes = http_get($sized, true);
    if ($bytes !== null && strlen($bytes) > 500) {
      file_put_contents(IMG_DIR . '/' . $c['file'], $bytes);
    } else {
      $log[] = "WARN  {$c['ref']} image refresh failed — keeping existing file";
    }
  }

  $products[] = [
    'ref' => $c['ref'],
    'title' => $title,
    'price' => ($available && $priceNum > 0) ? '$' . number_format($priceNum, 2) : '',
    'category' => $c['category'],
    'fits' => $c['fits'],
    'image' => $imgPath,
    'href' => $href,
    'available' => $available,
  ];
  $log[] = "OK    {$c['ref']}  " . ($available ? '$' . number_format($priceNum, 2) : 'OUT') . "  {$title}";
}

// Atomic write.
$payload = json_encode(
  ['synced_at' => gmdate('c'), 'products' => $products],
  JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
);
$tmp = OUT_JSON . '.tmp';
file_put_contents($tmp, $payload);
rename($tmp, OUT_JSON);

echo "shop-sync " . gmdate('c') . " — " . count($products) . " products\n";
echo implode("\n", $log) . "\n";
