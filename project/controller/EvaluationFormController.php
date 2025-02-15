<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json'); // Ensure JSON response

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize Inputs
    $fullname = sanitizeData($_POST['fullname']);
    $email = sanitizeData($_POST['email']);
    $serviceRate = $_POST['serviceRate'];
    $isRecommended = $_POST['isRecommended'];
    $comments = sanitizeData($_POST['comments']);

    // Validate Full Name (required, at least 3 characters)
    if (empty($fullname) || strlen($fullname) < 3) {
        $errors[] = "Full name is required and must be at least 3 characters.";
    }

    // Validate Email Format (must be @smcbi.edu.ph)
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !preg_match('/@smcbi\.edu\.ph$/', $email)) {
        $errors[] = "Invalid email address. Only @smcbi.edu.ph emails are allowed.";
    }

    // Validate Service Rating (allowed values only)
    $allowedRatings = ["excellent", "good", "fair", "poor"];
    if (!in_array($serviceRate, $allowedRatings)) {
        $errors[] = "Invalid service rating selected.";
    }

    // Validate Recommendation (must be Yes or No)
    if ($isRecommended !== "yes" && $isRecommended !== "no") {
        $errors[] = "Invalid recommendation selection.";
    }

    // Validate Comments (required, max 500 characters)
    if (empty($comments) || strlen($comments) > 500) {
        $errors[] = "Comments are required and must not exceed 500 characters.";
    }

    // If validation fails, return errors as JSON
    if (!empty($errors)) {
        echo json_encode(["status" => "error", "messages" => $errors]);
        exit();
    }

    // Insert data using Prepared Statement
    $sql = "INSERT INTO evaluation_form (full_name, email, service_rate, recommend_service, comments) 
            VALUES (?, ?, ?, ?, ?)";
    
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("sssss", $fullname, $email, $serviceRate, $isRecommended, $comments);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Evaluation form submitted successfully."]);
        } else {
            echo json_encode(["status" => "error", "messages" => ["Failed to submit the form. Please try again."]]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "messages" => ["Database error. Please contact support."]]);
    }

    // Close connection
    $conn->close();
}
