<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
    exit;
}

$formId = isset($_POST['form_id']) ? intval($_POST['form_id']) : null;
$studentId = isset($_POST['student_id']) ? intval($_POST['student_id']) : null;

if (!$formId || !$studentId) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing required parameters: form_id and/or student_id'
    ]);
    exit;
}

try {
    $sql = "SELECT id, form_id, form_version, student_id, submission_data, submitted_at
            FROM form_submissions
            WHERE form_id = ? AND student_id = ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $formId, $studentId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode([
            'status' => 'success',
            'found' => false,
            'message' => 'No submission found for this student and form.',
            'data' => []
        ]);
        $stmt->close();
        exit;
    }

    $submissions = [];
    while ($row = $result->fetch_assoc()) {
        $row['submission_data'] = json_decode($row['submission_data'], true);
        $submissions[] = $row;
    }

    $stmt->close();

    echo json_encode([
        'status' => 'success',
        'found' => true,
        'message' => 'Submission(s) found successfully.',
        'data' => $submissions
    ]);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}

$conn->close();