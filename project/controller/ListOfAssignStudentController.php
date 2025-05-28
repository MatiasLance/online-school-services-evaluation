<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    exit;
}

if (!isset($_GET['form_id']) || !is_numeric($_GET['form_id']) || intval($_GET['form_id']) <= 0) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid or missing form ID.']);
    exit;
}

$form_id = intval($_GET['form_id']);

try {
    // Step 1: Get all student_ids for the given form_id
    $stmt = $conn->prepare("SELECT student_id FROM form_student WHERE form_id = ?");
    if (!$stmt) {
        throw new Exception("Failed to prepare statement.");
    }

    $stmt->bind_param("i", $form_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $studentIds = [];
    while ($row = $result->fetch_assoc()) {
        $studentIds[] = $row['student_id'];
    }
    $stmt->close();

    if (empty($studentIds)) {
        echo json_encode([
            'status' => 'success',
            'students' => [],
            'form_id' => $form_id,
            'message' => 'No students found for this form.'
        ]);
        exit;
    }

    $placeholders = implode(',', array_fill(0, count($studentIds), '?'));
    $types = str_repeat('i', count($studentIds));

    $studentQuery = "SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM students WHERE id IN ($placeholders)";
    $studentStmt = $conn->prepare($studentQuery);

    if (!$studentStmt) {
        throw new Exception("Failed to fetch student names.");
    }

    $studentStmt->bind_param($types, ...$studentIds);
    $studentStmt->execute();
    $studentResult = $studentStmt->get_result();

    $students = [];
    while ($row = $studentResult->fetch_assoc()) {
        $students[] = [
            'id' => $row['id'],
            'full_name' => $row['full_name']
        ];
    }
    $studentStmt->close();
    $conn->close();

    echo json_encode([
        'status' => 'success',
        'students' => $students,
        'form_id' => $form_id
    ]);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}