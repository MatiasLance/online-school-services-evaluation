<?php

require_once __DIR__ . '/../helper/helper.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $text = trim($input['text'] ?? '');

    if (empty($text)) {
        http_response_code(400);
        echo json_encode(['error' => 'No text provided']);
        exit;
    }

    $summary = summarizeWithGemini($text);
    echo json_encode(['summary' => $summary]);
    exit;
}