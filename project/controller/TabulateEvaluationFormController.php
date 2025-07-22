<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';

header('Content-Type: application/json');

try {
    $analytics = [
        'total_submissions_analyzed' => 0,
        'recommendation_responses' => [
            'question' => "Would you recommend St. Mary's College to others?",
            'responses' => []
        ],
        'extracurricular_responses' => [
            'question' => "Which extracurricular activities have you participated in? (Select all that apply)",
            'responses' => []
        ],
        'satisfaction_responses' => [
            'question' => "How satisfied are you with school facilities (library, labs, etc.)?",
            'responses' => []
        ],
        'text_responses' => [
            'question_one' => [
                'question' => "What do you think about St. Mary's College of Bansalan, Inc?",
                'responses' => []
            ],
            'question_two' => [
                'question' => "How would you rate the quality of teaching and learning environment?",
                'responses' => []
            ]
        ]
    ];

    $recommendationCounts = ['yes' => 0, 'no' => 0, 'maybe' => 0, 'unknown' => 0];
    $activities = ['sports' => 0, 'arts-culture' => 0, 'scouts' => 0, 'academic-clubs' => 0];
    $satisfactionLevels = ['very_satisfied' => 0, 'satisfied' => 0, 'neutral' => 0, 'dissatisfied' => 0, 'very_dissatisfied' => 0, 'unknown' => 0];

    $validAnswersFive = ['yes', 'no', 'maybe'];
    $satisfactionMap = [
        'verysatisfied' => 'very_satisfied',
        'very satisfied' => 'very_satisfied',
        'satisfied' => 'satisfied',
        'neutral' => 'neutral',
        'dissatisfied' => 'dissatisfied',
        'verydissatisfied' => 'very_dissatisfied',
        'very dissatisfied' => 'very_dissatisfied'
    ];

    $textResponses = [];

    $sql = "SELECT student_id, form_response FROM forms WHERE is_submitted = TRUE ORDER BY submitted_at DESC";
    $result = $conn->query($sql);

    if (!$result) {
        throw new Exception("Database query failed.");
    }

    $totalAnalyzed = 0;

    while ($row = $result->fetch_assoc()) {
        $response = json_decode($row['form_response'], true);
        if (!is_array($response)) continue;

        $hasAnyResponse = false;
        $entry = ['student_id' => (int)$row['student_id'], 'answer_one' => '', 'answer_two' => ''];

        foreach ($response as $item) {
            if (!isset($item['name']) || !isset($item['value'])) continue;

            $name = strtolower(trim($item['name']));
            $value = trim($item['value']);
            $cleanValue = strtolower(str_replace(['_', '-'], ' ', $value));

            if ($name === 'answer_five') {
                $key = in_array($cleanValue, $validAnswersFive) ? $cleanValue : 'unknown';
                $recommendationCounts[$key]++;
                $hasAnyResponse = true;
            }

            if ($name === 'answer_four' && in_array($cleanValue, array_keys($activities))) {
                $activities[$cleanValue]++;
                $hasAnyResponse = true;
            }

            if ($name === 'answer_three') {
                $matched = false;
                foreach ($satisfactionMap as $variant => $level) {
                    if (strpos($cleanValue, $variant) !== false) {
                        $satisfactionLevels[$level]++;
                        $matched = true;
                        break;
                    }
                }
                if (!$matched) $satisfactionLevels['unknown']++;
                $hasAnyResponse = true;
            }

            if ($name === 'answer_one' && !empty($value)) {
                $entry['answer_one'] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
                $hasAnyResponse = true;
            }

            if ($name === 'answer_two' && !empty($value)) {
                $entry['answer_two'] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
                $hasAnyResponse = true;
            }
        }

        if ($hasAnyResponse) {
            $totalAnalyzed++;
            $textResponses[] = $entry;
        }
    }

    $format = function($count, $total) {
        return [
            'count' => (int)$count,
            'percentage' => $total > 0 ? round(($count / $total) * 100, 1) : 0
        ];
    };

    $recTotal = array_sum($recommendationCounts);
    $analytics['recommendation_responses']['responses'] = [
        'yes' => $format($recommendationCounts['yes'], $recTotal),
        'no' => $format($recommendationCounts['no'], $recTotal),
        'maybe' => $format($recommendationCounts['maybe'], $recTotal),
        'unknown' => $format($recommendationCounts['unknown'], $recTotal)
    ];

    $actTotal = array_sum($activities);
    $analytics['extracurricular_responses']['responses'] = [
        'sports' => $format($activities['sports'], $actTotal),
        'arts_culture' => $format($activities['arts-culture'], $actTotal),
        'scouts' => $format($activities['scouts'], $actTotal),
        'academic_clubs' => $format($activities['academic-clubs'], $actTotal)
    ];

    $satTotal = array_sum($satisfactionLevels);
    $analytics['satisfaction_responses']['responses'] = [
        'very_satisfied' => $format($satisfactionLevels['very_satisfied'], $satTotal),
        'satisfied' => $format($satisfactionLevels['satisfied'], $satTotal),
        'neutral' => $format($satisfactionLevels['neutral'], $satTotal),
        'dissatisfied' => $format($satisfactionLevels['dissatisfied'], $satTotal),
        'very_dissatisfied' => $format($satisfactionLevels['very_dissatisfied'], $satTotal),
        'unknown' => $format($satisfactionLevels['unknown'], $satTotal)
    ];

    $analytics['text_responses']['question_one']['responses'] = array_filter($textResponses, fn($r) => !empty($r['answer_one']));
    $analytics['text_responses']['question_two']['responses'] = array_filter($textResponses, fn($r) => !empty($r['answer_two']));

    echo json_encode([
        'status' => 'success',
        'data' => array_merge(['total_submissions_analyzed' => $totalAnalyzed], $analytics)
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Unable to generate analytics.' . $e->getMessage()
    ]);
}

$conn->close();