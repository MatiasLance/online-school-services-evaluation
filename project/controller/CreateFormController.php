<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Only POST requests allowed']);
    exit;
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['success' => false, 'error' => 'Invalid JSON: ' . json_last_error_msg()]);
    exit;
}

if (empty($data['title'])) {
    echo json_encode(['success' => false, 'error' => 'Form title is required']);
    exit;
}

$appsScriptUrl = 'https://script.google.com/macros/s/AKfycbw3-Hhc__rx1veOjfgATiObFizkOF5mmYGmBRxX0m8xmMWVBiB_uiJ2xnyhzBP4Uqi7eQ/exec';

$jsonData = json_encode($data);
if ($jsonData === false) {
    echo json_encode(['success' => false, 'error' => 'Failed to encode data: ' . json_last_error_msg()]);
    exit;
}

$ch = curl_init($appsScriptUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($jsonData)
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_MAXREDIRS, 5);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($response === false) {
    echo json_encode(['success' => false, 'error' => 'cURL failed: ' . $error]);
    exit;
}

if ($httpCode !== 200) {
    error_log("Google Apps Script returned HTTP $httpCode: " . substr($response, 0, 200));
}

echo $response;