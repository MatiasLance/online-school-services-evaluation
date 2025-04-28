<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $categoryName = sanitizeData($_POST['category_name']);

    if (empty($categoryName) || strlen($categoryName) < 3) {
        $errors[] = "Category name is required and must be at least 3 characters.";
    }

    if (!empty($errors)) {
        echo json_encode(["status" => "error", "messages" => $errors]);
        exit();
    }

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

    $conn->close();
}
