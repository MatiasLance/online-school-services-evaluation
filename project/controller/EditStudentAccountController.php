<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userId = isset($_POST['id']) ? intval($_POST['id']) : 0;
    $firstname = sanitizeData($_POST['first_name'] ?? '');
    $lastname = sanitizeData($_POST['last_name'] ?? '');
    $email = sanitizeData($_POST['email'] ?? '');
    $gender = sanitizeData($_POST['gender'] ?? '');
    $department = sanitizeData($_POST['department'] ?? '');
    $year_level = sanitizeData($_POST['year_level'] ?? '');
    $section = sanitizeData($_POST['section'] ?? '');
    $password = sanitizeData($_POST['password'] ?? '');
    $confirm_password = sanitizeData($_POST['confirm_password'] ?? '');

    if (empty($firstname) || empty($lastname) || empty($email) || empty($gender) || empty($department) || empty($year_level) || empty($section) || empty($password) || empty($confirm_password)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        exit;
    }

    if ($userId <= 0) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid student ID.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid email format.']);
        exit;
    }

    if ($password !== $confirm_password) {
        echo json_encode(['status' => 'error', 'message' => 'Passwords do not match.']);
        exit;
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("UPDATE students SET first_name = ?, last_name = ?, email = ?, gender = ?, department = ?, year_level = ?, section = ?, password = ? WHERE id = ?");
    if (!$stmt) {
        echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $conn->error]);
        exit;
    }

    $stmt->bind_param("ssssssssi", $firstname, $lastname, $email, $gender, $department, $year_level, $section, $hashed_password, $userId);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Registration successful!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error saving data: ' . $stmt->error]);
    }

    $stmt->close();

    $conn->close();
}