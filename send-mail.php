<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function respond(bool $success, string $message = '', int $statusCode = 200): void
{
    http_response_code($statusCode);
    $response = ['success' => $success];

    if (!$success && $message !== '') {
        $response['message'] = $message;
    }

    echo json_encode($response);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(false, 'Method not allowed.', 405);
}

function post_value(string $key): string
{
    $value = $_POST[$key] ?? '';
    return is_string($value) ? trim(strip_tags($value)) : '';
}

function header_value(string $value): string
{
    return trim(str_replace(["\r", "\n"], '', $value));
}

$website = post_value('website');

// Honeypot submissions receive a successful response but are not sent.
if ($website !== '') {
    respond(true);
}

$timestamp = post_value('timestamp');
if ($timestamp === '' || !ctype_digit($timestamp) || (time() - (int) $timestamp) < 3) {
    respond(false, 'Please wait a moment before submitting the form.', 400);
}

$name = header_value(post_value('name'));
$business = post_value('business');
$email = header_value(post_value('email'));
$phone = post_value('phone');
$message = post_value('message');
$enquiryType = header_value(post_value('subject'));
$product = post_value('product');
$pageUrl = post_value('page_url');

if ($pageUrl === '') {
    $pageUrl = isset($_SERVER['HTTP_REFERER']) ? trim(strip_tags((string) $_SERVER['HTTP_REFERER'])) : 'Not provided';
}

if ($name === '' || $email === '' || $message === '') {
    respond(false, 'Name, email and message are required.', 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.', 422);
}

date_default_timezone_set('Australia/Sydney');

$to = 'info@hkwholesaleaccessories.com.au';
$subject = 'New website enquiry from ' . $name;
$bodyLines = [
    'Name: ' . $name,
    'Business Name: ' . ($business !== '' ? $business : 'Not provided'),
    'Email: ' . $email,
    'Phone: ' . ($phone !== '' ? $phone : 'Not provided'),
];

if ($enquiryType !== '') {
    $bodyLines[] = 'Enquiry Type: ' . $enquiryType;
}

if ($product !== '') {
    $bodyLines[] = 'Product: ' . $product;
}

$bodyLines[] = '';
$bodyLines[] = 'Message:';
$bodyLines[] = $message;
$bodyLines[] = '';
$bodyLines[] = 'Date/Time: ' . date('Y-m-d H:i:s T');
$bodyLines[] = 'Page URL: ' . $pageUrl;

$headers = [
    'From: HK Wholesale Website <info@hkwholesaleaccessories.com.au>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail($to, $subject, implode("\r\n", $bodyLines), implode("\r\n", $headers));

if (!$sent) {
    respond(false, 'Unable to send the enquiry at this time.', 500);
}

respond(true);
