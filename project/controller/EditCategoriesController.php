<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json'); // Ensure JSON response

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize Inputs
    $categoryId = isset($_POST['id']) ? intval($_POST['id']) : 0;
    $categoryName = sanitizeData($_POST['category_name']);

    // Validation
    if ($categoryId <= 0) {
        $errors[] = "Invalid category ID.";
    }

    if (empty($categoryName) || strlen($categoryName) < 3) {
        $errors[] = "Category name is required and must be at least 3 characters.";
    }

    // If validation fails, return errors as JSON
    if (!empty($errors)) {
        echo json_encode(["error" => true, "messages" => $errors]);
        exit();
    }

    // Update query using Prepared Statement
    $sql = "UPDATE categories SET name = ? WHERE id = ?";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("si", $categoryName, $categoryId);

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode(["status" => "success", "message" => "Category updated successfully."]);
            } else {
                echo json_encode(["status" => "error", "message" => "No changes made or category not found."]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to update category. Please try again."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Database error. Please contact support."]);
    }

    // Close connection
    $conn->close();
}
?>
