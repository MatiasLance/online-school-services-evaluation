<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json'); // Ensure JSON response

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize Inputs
    $userId = isset($_POST['id']) ? intval($_POST['id']) : 0;
    $firstname = sanitizeData($_POST['firstname']);
    $lastname = sanitizeData($_POST['lastname']);
    $email = sanitizeData($_POST['email']);
    $password = sanitizeData($_POST['password']);
    $userType = sanitizeData($_POST['user_type']);

    // Validation
    if ($userId <= 0) {
        $errors[] = "Invalid user ID.";
    }
    if (empty($firstname) || strlen($firstname) < 2) {
        $errors[] = "First name must be at least 2 characters.";
    }
    if (empty($lastname) || strlen($lastname) < 2) {
        $errors[] = "Last name must be at least 2 characters.";
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }
    // if (!empty($password) && strlen($password) < 6) {
    //     $errors[] = "Password must be at least 6 characters.";
    // }

    // If validation fails, return errors as JSON
    if (!empty($errors)) {
        echo json_encode(["error" => true, "messages" => $errors]);
        exit();
    }

    // Hash password if provided
    $passwordHash = !empty($password) ? password_hash($password, PASSWORD_DEFAULT) : null;

    // Update query using Prepared Statement
    $sql = "UPDATE users SET firstname = ?, lastname = ?, email = ?, user_type = ?";
    $params = ["ssss", $firstname, $lastname, $email, $userType];

    if ($passwordHash) {
        $sql .= ", password = ?";
        $params[0] .= "s"; // Add password type to the parameter types
        $params[] = $passwordHash;
    }

    $sql .= " WHERE id = ?";
    $params[0] .= "i";
    $params[] = $userId;

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param(...$params);

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode(["status" => "success", "message" => "User account updated successfully."]);
            } else {
                echo json_encode(["status" => "error", "message" => "No changes made or user not found."]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to update user account. Please try again."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Database error. Please contact support."]);
    }

    // Close connection
    $conn->close();
}
?>
