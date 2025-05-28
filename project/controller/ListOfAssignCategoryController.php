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
    $formStmt = $conn->prepare("SELECT id, category_id FROM forms WHERE id = ?");
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

    $categoryStmt = $conn->prepare("SELECT id, name FROM categories WHERE id = ?");
    if (!$categoryStmt) {
        throw new Exception("Failed to prepare statement for categories.");
    }

    $category_id = $form['category_id'];
    $categoryStmt->bind_param("i", $category_id);
    $categoryStmt->execute();
    $categoryResult = $categoryStmt->get_result();

    if ($categoryResult->num_rows === 0) {
        throw new Exception("Category not found for this form.");
    }

    $category = $categoryResult->fetch_assoc();
    $categoryStmt->close();
    $conn->close();

    echo json_encode([
        'status' => 'success',
        'data' => [
            'form_id' => $form['id'],
            'category' => $category
        ]
    ]);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}