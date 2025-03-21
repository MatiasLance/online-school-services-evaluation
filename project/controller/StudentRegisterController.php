<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

// Sanitize Input
$firstname = sanitizeData($_POST['first_name'] ?? '');
$lastname = sanitizeData($_POST['last_name'] ?? '');
$email = sanitizeData($_POST['email'] ?? '');
$gender = sanitizeData($_POST['gender'] ?? '');
$course = sanitizeData($_POST['course'] ?? '');
$year_level = sanitizeData($_POST['year_level'] ?? '');
$password = sanitizeData($_POST['password'] ?? '');
$confirm_password = sanitizeData($_POST['confirm_password'] ?? '');

// Validate Required Fields
if (empty($firstname) || empty($lastname) || empty($email) || empty($gender) || empty($course) || empty($year_level) || empty($password) || empty($confirm_password)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

// Validate Email Format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
    exit;
}

// Check Password Match
if ($password !== $confirm_password) {
    echo json_encode(['success' => false, 'message' => 'Passwords do not match.']);
    exit;
}

// Check If Email Already Exists
$stmt = $conn->prepare("SELECT id FROM students WHERE email = ?");
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

// Hash Password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert Data
$stmt = $conn->prepare("INSERT INTO students (first_name, last_name, email, gender, course, year_level, password) VALUES (?, ?, ?, ?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
    exit;
}

$stmt->bind_param("sssssss", $firstname, $lastname, $email, $gender, $course, $year_level, $hashed_password);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Registration successful!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error saving data: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
