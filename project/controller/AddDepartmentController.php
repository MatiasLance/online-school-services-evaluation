<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $department = sanitizeData($_POST['department']);

    if (empty($department) || strlen($department) < 2) {
        $errors[] = "Department name is required and must be at least 2 characters.";
    }

    if (!empty($errors)) {
        echo json_encode(["error" => true, "messages" => $errors]);
        exit();
    }

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

    $conn->close();
}
