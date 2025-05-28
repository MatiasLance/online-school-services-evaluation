<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

$errors = [];

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $formId = isset($_POST['form_id']) ? intval($_POST['form_id']) : null;
    $formVersion = isset($_POST['form_version_id']) ? intval($_POST['form_version_id']) : null;
    $studentId = isset($_POST['student_form_feedback_id']) ? intval($_POST['student_form_feedback_id']) : null;

    if (empty($formId)) $errors[] = "Form ID is required.";
    if (empty($formVersion)) $errors[] = "Form version is required.";
    if (empty($studentId)) $errors[] = "Student ID is required.";

    if (!empty($errors)) {
        echo json_encode(["status" => "error", "messages" => $errors]);
        exit();
    }

    $submissionData = [];

    foreach ($_POST as $key => $value) {
        if ($key !== 'form_id' && $key !== 'form_version_id' && $key !== 'student_form_feedback_id') {
            $submissionData[$key] = sanitizeInput($value);
        }
    }

    if (isset($_FILES['signature']) && $_FILES['signature']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . '/../../uploads/signatures/';
        $uploadUrl = '/uploads/signatures/';
        $fileName = uniqid('sig_') . '_' . basename($_FILES['signature']['name']);
        $filePath = $uploadDir . $fileName;

        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        $fileType = mime_content_type($_FILES['signature']['tmp_name']);

        if (!in_array($fileType, $allowedTypes)) {
            $errors[] = "Only JPEG, PNG, and GIF files are allowed for signature.";
        } elseif (move_uploaded_file($_FILES['signature']['tmp_name'], $filePath)) {
            $submissionData['signature'] = $uploadUrl . $fileName;
        } else {
            $errors[] = "Failed to upload signature.";
        }
    }

    if (!empty($errors)) {
        echo json_encode(["status" => "error", "messages" => $errors]);
        exit();
    }

    $submissionJson = json_encode($submissionData);

    $sql = "INSERT INTO form_submissions (form_id, form_version, student_id, submission_data)
            VALUES (?, ?, ?, ?)";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("iiis", $formId, $formVersion, $studentId, $submissionJson);

        if ($stmt->execute()) {
            echo json_encode([
                "status" => "success",
                "message" => "Feedback submitted successfully.",
                "form_id" => $formId,
                "form_version" => $formVersion,
                "student_id" => $studentId
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "messages" => ["Failed to submit feedback. Please try again."]
            ]);
        }

        $stmt->close();
    } else {
        echo json_encode([
            "status" => "error",
            "messages" => ["Database error. Could not process submission."]
        ]);
    }
}

$conn->close();