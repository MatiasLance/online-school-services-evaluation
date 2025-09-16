<?php

require_once __DIR__ . '/../helper/helper.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (empty($input) || !is_array($input)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid or empty JSON payload']);
    exit;
}

$title = $input['title'] ?? '';
$gwa = $input['gwa'] ?? [];
$mca = $input['mca'] ?? 'No';

if (!is_array($gwa) || empty($gwa)) {
    http_response_code(400);
    echo json_encode(['error' => 'GWA feedback data is missing or invalid']);
    exit;
}

$feedbackText = "Survey Feedback for \"$title\":\n\n";
$feedbackText .= "MCA Status: " . ($mca === 'Yes' ? 'Approved' : 'Not Approved') . "\n\n";

$ratings = [];
foreach ($gwa as $question => $rating) {
    $feedbackText .= "- \"$question\" → Rating: " . number_format($rating, 2) . "\n";
    $ratings[] = (float)$rating;
}

$average = count($ratings) > 0 ? round(array_sum($ratings) / count($ratings), 2) : 0;
$feedbackText .= "\nAverage Rating: " . $average . "/5";


try {
    $summary = summarizeWithGemini($title, $feedbackText);
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'summary' => $summary,
        'original_feedback' => $feedbackText,
        'average_rating' => $average
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to generate summary',
        'details' => $e->getMessage()
    ]);
}