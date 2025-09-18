<?php
session_start();

require_once __DIR__ . '/../../config/db_connection.php';

header('Content-Type: application/json');

try {
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

    while ($row = $result->fetch_assoc()) {
        $count = (int)$row['feedback_count'];
        $percentage = $totalActiveFeedback > 0 ? round(($count / $totalActiveFeedback) * 100) : 0;

        if ($count > 0 && $percentage === 0) {
            $percentage = 1;
        }

        $data[] = [
            'office' => $row['office'],
            'feedback_count' => $count,
            'percentage' => $percentage,
            'most_common_feedback' => $row['most_common_feedback'] ?? 'No feedback available'
        ];

        $sumPercentages += $percentage;
    }

    if ($totalActiveFeedback > 0 && !empty($data)) {
        $diff = 100 - $sumPercentages;
        if ($diff !== 0) {
            $data[count($data) - 1]['percentage'] += $diff;
        }
    }

    $total_offices = count($data);

    echo json_encode([
        'success' => true,
        'data' => $data,
        'total_offices' => $total_offices,
        'total_active_feedback' => $totalActiveFeedback,
        'total_percentage' => 100
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    error_log("Feedback analytics error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Failed to retrieve feedback analytics.'
    ]);
}

$conn->close();