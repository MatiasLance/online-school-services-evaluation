<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        $formCategoryStatement = $conn->prepare("SELECT id, category_id FROM forms");

        if (!$formCategoryStatement) {
            throw new Exception("Failed to prepare statement.");
        }

        $formCategoryStatement->execute();
        $result = $formCategoryStatement->get_result();

        $categoryId = [];
        $formId = [];
        while ($row = $result->fetch_assoc()) {
            $categoryId[] = $row['category_id'];
            $formId[] = $row['id'];
        }
        $formCategoryStatement->close();

        $selectCategoryStatement = $conn->prepare("SELECT id, name FROM categories WHERE id = ?");

        if (!$selectCategoryStatement) {
            throw new Exception("Failed to prepare the statement for fetching category.");
        }

        $category = [];

        $selectCategoryStatement->bind_param('i', $categoryId[1]);
        $selectCategoryStatement->execute();
        $result = $selectCategoryStatement->get_result();
        if($result->num_rows === 0){
            throw new Exception("No category found.");
        }else{
            $category[] = $result->fetch_assoc();
        }

        $selectCategoryStatement->close();
        
        $conn->close();

        if (empty($category)) {
            echo json_encode(['status' => 'error', 'message' => 'No category found.']);
        } else {
            echo json_encode(['status' => 'success', 'category' => $category, 'form_id' => $formId]);
        }
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}