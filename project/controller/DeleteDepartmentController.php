<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $departmentId = isset($_POST['id']) ? intval($_POST['id']) : 0;
    $password = sanitizeData($_POST['password']);

    if ($departmentId <= 0) {
        $errors[] = "Invalid department ID.";
    }

    if (empty($password)) {
        $errors[] = "Password is required.";
    }

    if (!empty($errors)) {
        echo json_encode(["error" => true, "messages" => $errors]);
        exit();
    }

    $checkPasswordSQL = "SELECT password FROM users WHERE user_type = 'admin' LIMIT 1";

    if ($stmt = $conn->prepare($checkPasswordSQL)) {
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();

            if (!password_verify($password, $user['password'])) {
                echo json_encode(["status" => "error", "message" => "Incorrect password."]);
                exit();
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Admin account not found."]);
            exit();
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Database error during password check."]);
        exit();
    }

    $deleteSQL = "DELETE FROM departments WHERE id = ?";

    if ($stmt = $conn->prepare($deleteSQL)) {
        $stmt->bind_param("i", $departmentId);

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode(["status" => "success", "message" => "Department deleted successfully."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Department not found or already deleted."]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to delete department. Please try again."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Database error. Please contact support."]);
    }

    $conn->close();
}
?>
