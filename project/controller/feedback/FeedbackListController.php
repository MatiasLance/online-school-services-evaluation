<?php
session_start();

require_once __DIR__ . '/../../config/db_connection.php';

header('Content-Type: application/json');

try {
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
    $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
    $targetOffice = isset($_GET['office']) ? trim($_GET['office']) : null;

    $offset = max(0, ($page - 1) * $limit);

    // Get total active feedback count
    $totalStmt = $conn->prepare("SELECT COUNT(*) AS total FROM form_feedbacks WHERE deleted_at IS NULL");
    $totalStmt->execute();
    $totalResult = $totalStmt->get_result();
    $totalRow = $totalResult->fetch_assoc();
    $totalActiveFeedback = (int)$totalRow['total'];
    $totalStmt->close();

    // Fetch office-wise summary
    $sql = "
        SELECT 
            office,
            COUNT(*) AS feedback_count,
            (
                SELECT f2.feedback
                FROM form_feedbacks f2
                WHERE f2.office = f1.office
                  AND f2.deleted_at IS NULL
                GROUP BY f2.feedback
                ORDER BY COUNT(*) DESC, LENGTH(f2.feedback) ASC
                LIMIT 1
            ) AS most_common_feedback
        FROM form_feedbacks f1
        WHERE f1.deleted_at IS NULL
        GROUP BY office
        ORDER BY feedback_count DESC, office ASC
    ";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();

    $data = [];
    $sumPercentages = 0;
    $offices = [];

    while ($row = $result->fetch_assoc()) {
        $count = (int)$row['feedback_count'];
        $percentage = $totalActiveFeedback > 0 ? round(($count / $totalActiveFeedback) * 100) : 0;

        if ($count > 0 && $percentage === 0) {
            $percentage = 1;
        }

        $offices[] = [
            'office' => $row['office'],
            'feedback_count' => $count,
            'percentage' => $percentage,
            'most_common_feedback' => $row['most_common_feedback'] ?? 'No feedback available'
        ];
    }
    $stmt->close();

    // Handle per-office detailed view
    if ($targetOffice) {
        $filteredOffice = null;
        foreach ($offices as &$office) {
            if ($office['office'] === $targetOffice) {
                $filteredOffice = &$office;
                break;
            }
        }

        if (!$filteredOffice) {
            throw new Exception("Office not found.");
        }

        $feedbacksStmt = $conn->prepare("
            SELECT id, feedback, created_at
            FROM form_feedbacks 
            WHERE office = ? AND deleted_at IS NULL 
            ORDER BY created_at DESC
            LIMIT ?, ?
        ");
        $feedbacksStmt->bind_param("sii", $targetOffice, $offset, $limit);
        $feedbacksStmt->execute();
        $feedbacksResult = $feedbacksStmt->get_result();

        $feedbacksList = [];
        while ($fRow = $feedbacksResult->fetch_assoc()) {
            $feedbacksList[] = [
                'id' => (int)$fRow['id'],
                'feedback' => $fRow['feedback'],
                'created_at' => $fRow['created_at']
            ];
        }
        $feedbacksStmt->close();

        $countStmt = $conn->prepare("SELECT COUNT(*) AS cnt FROM form_feedbacks WHERE office = ? AND deleted_at IS NULL");
        $countStmt->bind_param("s", $targetOffice);
        $countStmt->execute();
        $cntResult = $countStmt->get_result()->fetch_assoc();
        $totalForOffice = (int)$cntResult['cnt'];
        $countStmt->close();

        $filteredOffice['feedbacks'] = $feedbacksList;
        $filteredOffice['pagination'] = [
            'current_page' => $page,
            'limit' => $limit,
            'total' => $totalForOffice,
            'total_pages' => ceil($totalForOffice / $limit)
        ];

        echo json_encode([
            'success' => true,
            'data' => [$filteredOffice],
            'total_offices' => 1,
            'total_active_feedback' => $totalActiveFeedback,
            'total_percentage' => 100
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        exit;
    }

    // Global view: attach recent feedbacks (top 5 per office)
    foreach ($offices as &$office) {
        $officeName = $office['office'];

        $feedbacksStmt = $conn->prepare("
            SELECT id, feedback, created_at
            FROM form_feedbacks 
            WHERE office = ? AND deleted_at IS NULL 
            ORDER BY created_at DESC
            LIMIT 5
        ");
        $feedbacksStmt->bind_param("s", $officeName);
        $feedbacksStmt->execute();
        $feedbacksResult = $feedbacksStmt->get_result();

        $feedbacksList = [];
        while ($fRow = $feedbacksResult->fetch_assoc()) {
            $feedbacksList[] = [
                'id' => (int)$fRow['id'],
                'feedback' => $fRow['feedback'],
                'created_at' => $fRow['created_at']
            ];
        }
        $feedbacksStmt->close();

        $office['feedbacks'] = $feedbacksList;
        $office['has_more'] = $office['feedback_count'] > 5;
        $sumPercentages += $office['percentage'];
    }

    // Adjust last office percentage to ensure total = 100%
    if ($totalActiveFeedback > 0 && !empty($offices)) {
        $diff = 100 - $sumPercentages;
        if ($diff !== 0) {
            $offices[count($offices) - 1]['percentage'] += $diff;
        }
    }

    // ====== UPDATED: Top 5 Most Common Feedbacks + GWA + latest_created_at ======
   $topFeedbacksWeighted = [];
    $generalWeightedAverage = null;
    $generalWeightedPercentage = null;

    $topFeedbacksStmt = $conn->prepare("
        SELECT 
            feedback,
            COUNT(*) as frequency,
            MAX(created_at) as latest_created_at
        FROM form_feedbacks
        WHERE deleted_at IS NULL
        GROUP BY feedback
        ORDER BY frequency DESC, feedback ASC
        LIMIT 5
    ");
    $topFeedbacksStmt->execute();
    $topFeedbacksResult = $topFeedbacksStmt->get_result();

    $weightedSum = 0;
    $totalFreq = 0;
    $rank = 1;

    while ($fbRow = $topFeedbacksResult->fetch_assoc()) {
        $weight = 6 - $rank;
        $freq = (int)$fbRow['frequency'];

        $weightedSum += $freq * $weight;
        $totalFreq += $freq;

        $topFeedbacksWeighted[] = [
            'feedback' => $fbRow['feedback'],
            'frequency' => $freq,
            'rank' => $rank,
            'weight' => $weight,
            'latest_created_at' => $fbRow['latest_created_at']
        ];

        $rank++;
    }
    $topFeedbacksStmt->close();

    if ($totalFreq > 0) {
        $generalWeightedAverage = round($weightedSum / $totalFreq, 2);
        $generalWeightedPercentage = round(($generalWeightedAverage / 5) * 100, 1);
    }

    $total_offices = count($offices);

    $response = [
        'success' => true,
        'data' => $offices,
        'total_offices' => $total_offices,
        'total_active_feedback' => $totalActiveFeedback,
        'total_percentage' => 100,
        'is_paginated' => false,
        'top_feedbacks_weighted' => $topFeedbacksWeighted,
        'general_weighted_average' => $generalWeightedAverage,
        'general_weighted_percentage' => $generalWeightedPercentage
    ];

    echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to retrieve feedback analytics.'
    ]);
}

$conn->close();
?>