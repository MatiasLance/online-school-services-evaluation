<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

$firstname = sanitizeData($_POST['firstname'] ?? '');
$lastname = sanitizeData($_POST['lastname'] ?? '');
$email = sanitizeData($_POST['email'] ?? '');
$password = sanitizeData($_POST['password'] ?? '');
$confirm_password = sanitizeData($_POST['confirm_password'] ?? '');
$user_type = sanitizeData($_POST['user_type'] ?? '');

$errors = [];

if (empty($firstname) || empty($lastname) || empty($email) || empty($password) || empty($confirm_password) || empty($user_type)) {
    $errors[] = 'All fields are required.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email format.';
}

if ($password !== $confirm_password) {
    $errors[] = 'Passwords do not match.';
}

$allowedUserTypes = ['admin', 'user'];
if (!in_array(strtolower($user_type), $allowedUserTypes)) {
    $errors[] = 'Invalid user type.';
}

if (!empty($errors)) {
    echo json_encode(['success' => false, 'messages' => $errors]);
    exit;
}

$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
    exit;
}

$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Email is already registered.']);
    exit;
}

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (firstname, lastname, email, password, user_type) VALUES (?, ?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
    exit;
}

$stmt->bind_param("sssss", $firstname, $lastname, $email, $hashed_password, $user_type);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'User added successfully!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error saving data: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
