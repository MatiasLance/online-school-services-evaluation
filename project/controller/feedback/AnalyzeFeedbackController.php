<?php
require_once __DIR__ . '/../../helper/helper.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
if (!$raw) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'No data received']);
    exit;
}

$input = json_decode($raw, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
    exit;
}

if (!isset($input['feedbacks']) || !is_array($input['feedbacks'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing "feedbacks" array']);
    exit;
}

$title = !empty($input['title']) ? trim($input['title']) : 'User Feedback';

try {
    $result = analyzeFeedbackRatings($title, $input['feedbacks']);
    
    echo json_encode([
        'success' => true,
        'data' => $result
    ]);
} catch (Exception $e) {
    error_log('Unexpected error in feedback analysis: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Internal analysis error'
    ]);
}