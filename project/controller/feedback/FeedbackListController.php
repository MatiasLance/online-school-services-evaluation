<?php
session_start();

require_once __DIR__ . '/../../config/db_connection.php';

header('Content-Type: application/json');

try {
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
    $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
    $targetOffice = isset($_GET['office']) ? trim($_GET['office']) : null;

    $offset = max(0, ($page - 1) * $limit);

    $totalStmt = $conn->prepare("SELECT COUNT(*) AS total FROM form_feedbacks WHERE deleted_at IS NULL");
    $totalStmt->execute();
    $totalResult = $totalStmt->get_result();
    $totalRow = $totalResult->fetch_assoc();
    $totalActiveFeedback = (int)$totalRow['total'];
    $totalStmt->close();

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

    if ($totalActiveFeedback > 0 && !empty($offices)) {
        $diff = 100 - $sumPercentages;
        if ($diff !== 0) {
            $offices[count($offices) - 1]['percentage'] += $diff;
        }
    }

    $total_offices = count($offices);

    echo json_encode([
        'success' => true,
        'data' => $offices,
        'total_offices' => $total_offices,
        'total_active_feedback' => $totalActiveFeedback,
        'total_percentage' => 100,
        'is_paginated' => false,
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to retrieve feedback analytics.'
    ]);
}

$conn->close();