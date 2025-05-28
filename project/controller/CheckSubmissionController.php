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
$formVersion = isset($_POST['form_version']) ? intval($_POST['form_version']) : null;
$studentId = isset($_POST['student_id']) ? intval($_POST['student_id']) : null;

if (!$formId || !$formVersion || !$studentId) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing required parameters: form_id, form_version, student_id'
    ]);
    exit;
}

try {
    $sql = "SELECT form_id, student_id FROM form_submissions 
            WHERE form_id = ? AND form_version = ? AND student_id = ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iii", $formId, $formVersion, $studentId);
    $stmt->execute();
    $stmt->store_result();

    $submitted = $stmt->num_rows > 0;
    $submissionData = [];

    if ($submitted) {
        $stmt->bind_result($id, $student_id);
        $stmt->fetch();
        $submissionData = [
            'form_id' => $id,
            'student_id' => $student_id
        ];
    }

    echo json_encode([
        'status' => 'success',
        'submitted' => $submitted,
        'data' => $submissionData,
        'message' => $submitted ? 'Student has already submitted feedback.' : 'Student has not submitted feedback yet.'
    ]);

    $stmt->close();
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}

$conn->close();