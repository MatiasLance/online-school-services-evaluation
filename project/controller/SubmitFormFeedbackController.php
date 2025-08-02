<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

$errors = [];

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "messages" => ["Method not allowed."]
    ]);
    exit();
}

$input = file_get_contents("php://input");
if (!$input) {
    echo json_encode([
        "status" => "error",
        "messages" => ["No data received."]
    ]);
    exit();
}

$data = json_decode($input, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode([
        "status" => "error",
        "messages" => ["Invalid JSON input: " . json_last_error_msg()]
    ]);
    exit();
}

$student_id = isset($data['student_id']) ? filter_var($data['student_id'], FILTER_VALIDATE_INT) : null;
$form_response = json_decode($data['form_response']) ?? null;

if ($student_id === null || $student_id < 1) {
    $errors[] = "Valid Student ID is required.";
}

if (!is_array($form_response) || empty($form_response)) {
    $errors[] = "Form response must be a non-empty JSON object.";
} else {
  $encoded_response = json_encode($form_response, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    if (json_last_error() !== JSON_ERROR_NONE) {
        $errors[] = "Form response contains invalid data (cannot encode to JSON).";
    }
}

if (!empty($errors)) {
    echo json_encode([
        "status" => "error",
        "messages" => $errors
    ]);
    exit();
}

$final_form_response = $encoded_response ?? json_encode($form_response);

$is_submitted = 1;

$sql = "INSERT INTO forms (student_id, form_response, is_submitted)
        VALUES (?, ?, ?)";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode([
        "status" => "error",
        "messages" => ["Failed to process request. Please try again later."]
    ]);
    exit();
}

$stmt->bind_param("isi", $student_id, $final_form_response, $is_submitted);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Feedback submitted successfully.",
        "student_id" => $student_id,
        "is_submitted" => (bool)$is_submitted,
        "feedback_id" => $stmt->insert_id
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "messages" => ["Failed to save feedback. Please try again."]
    ]);
}

$stmt->close();
$conn->close();