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
    $formStmt = $conn->prepare("SELECT id, department_id FROM forms WHERE id = ?");
    if (!$formStmt) {
        throw new Exception("Failed to prepare statement for forms.");
    }

    $formStmt->bind_param("i", $form_id);
    $formStmt->execute();
    $result = $formStmt->get_result();

    if ($result->num_rows === 0) {
        throw new Exception("Form not found.");
    }

    $form = $result->fetch_assoc();
    $formStmt->close();

    $deptStmt = $conn->prepare("SELECT id, department FROM departments WHERE id = ?");
    if (!$deptStmt) {
        throw new Exception("Failed to prepare statement for departments.");
    }

    $department_id = $form['department_id'];
    $deptStmt->bind_param("i", $department_id);
    $deptStmt->execute();
    $deptResult = $deptStmt->get_result();

    if ($deptResult->num_rows === 0) {
        throw new Exception("Department not found for this form.");
    }

    $department = $deptResult->fetch_assoc();
    $deptStmt->close();
    $conn->close();

    echo json_encode([
        'status' => 'success',
        'data' => [
            'form' => [
                'form_id' => $form['id']
            ],
            'department' => $department
        ]
    ]);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}