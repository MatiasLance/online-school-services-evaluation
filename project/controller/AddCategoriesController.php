<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json'); // Ensure JSON response

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize Inputs
    $categoryName = sanitizeData($_POST['category_name']);

    // Validate Category Name (required, at least 3 characters)
    if (empty($categoryName) || strlen($categoryName) < 3) {
        $errors[] = "Category name is required and must be at least 3 characters.";
    }

    // If validation fails, return errors as JSON
    if (!empty($errors)) {
        echo json_encode(["status" => "error", "messages" => $errors]);
        exit();
    }

    // Insert data using Prepared Statement
    $sql = "INSERT INTO categories (name) VALUES (?)";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("s", $categoryName);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Category added successfully."]);
        } else {
            echo json_encode(["status" => "error", "messages" => ["Failed to add category. Please try again."]]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "messages" => ["Database error. Please contact support."]]);
    }

    // Close connection
    $conn->close();
}
