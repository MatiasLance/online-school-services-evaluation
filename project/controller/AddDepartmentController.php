<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json'); // Ensure JSON response

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize Inputs
    $department = sanitizeData($_POST['department']);

    // Validate Category Name (required, at least 3 characters)
    if (empty($department) || strlen($department) < 2) {
        $errors[] = "Department name is required and must be at least 2 characters.";
    }

    // If validation fails, return errors as JSON
    if (!empty($errors)) {
        echo json_encode(["error" => true, "messages" => $errors]);
        exit();
    }

    // Insert data using Prepared Statement
    $sql = "INSERT INTO departments (department) VALUES (?)";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("s", $department);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Department added successfully."]);
        } else {
            echo json_encode(["status" => "error", "messages" => ["Failed to add department. Please try again."]]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "messages" => ["Database error. Please contact support."]]);
    }

    // Close connection
    $conn->close();
}
