<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $formId = isset($_POST['id']) ? intval($_POST['id']) : 0;
    $password = sanitizeData($_POST['password']);

    if ($formId <= 0) {
        $errors[] = "Invalid form ID.";
    }

    if (empty($password)) {
        $errors[] = "Password is required.";
    }

    if (!empty($errors)) {
        echo json_encode(["status" => "error", "messages" => $errors]);
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

    $conn->begin_transaction();

    try {
        $deleteSubmissionsSQL = "DELETE FROM form_submissions WHERE form_id = ?";
        if ($stmt = $conn->prepare($deleteSubmissionsSQL)) {
            $stmt->bind_param("i", $formId);
            $stmt->execute();
            $stmt->close();
        } else {
            throw new Exception("Failed to delete form submissions.");
        }

        $deleteVersionsSQL = "DELETE FROM form_versions WHERE form_id = ?";
        if ($stmt = $conn->prepare($deleteVersionsSQL)) {
            $stmt->bind_param("i", $formId);
            $stmt->execute();
            $stmt->close();
        } else {
            throw new Exception("Failed to delete form versions.");
        }

        $deleteFormSQL = "DELETE FROM forms WHERE id = ?";
        if ($stmt = $conn->prepare($deleteFormSQL)) {
            $stmt->bind_param("i", $formId);

            if ($stmt->execute()) {
                if ($stmt->affected_rows > 0) {
                    $conn->commit();
                    echo json_encode(["status" => "success", "message" => "Form deleted successfully."]);
                } else {
                    throw new Exception("Form not found or already deleted.");
                }
            } else {
                throw new Exception("Failed to delete form. Please try again.");
            }

            $stmt->close();
        } else {
            throw new Exception("Database error. Please contact support.");
        }
    } catch (Exception $e) {
        $conn->rollback(); 
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }

    $conn->close();
}
?>