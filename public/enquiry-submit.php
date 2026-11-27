<?php
declare(strict_types=1);

ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

$result = ['status' => 503, 'body' => ['ok' => false, 'error' => 'unavailable']];
$bootstrapPath = getenv('ENQUIRY_BOOTSTRAP_PATH');
$docroot = realpath($_SERVER['DOCUMENT_ROOT'] ?? '');
$isAbsolute = is_string($bootstrapPath) && (
    str_starts_with($bootstrapPath, '/') ||
    preg_match('/^[A-Za-z]:[\\\\\/]/', $bootstrapPath) === 1
);
$realBootstrap = $isAbsolute ? realpath($bootstrapPath) : false;
$normalise = static fn(string $path): string => strtolower(str_replace('\\', '/', rtrim($path, '/\\')));

if (
    $docroot !== false &&
    $realBootstrap !== false &&
    is_file($realBootstrap) &&
    !str_starts_with($normalise($realBootstrap) . '/', $normalise($docroot) . '/')
) {
    require $realBootstrap;
    return;
}

http_response_code($result['status']);
echo json_encode($result['body'], JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
