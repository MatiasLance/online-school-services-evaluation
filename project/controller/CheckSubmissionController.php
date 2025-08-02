<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
    exit;
}

$student_id = filter_input(INPUT_POST, 'student_id', FILTER_VALIDATE_INT);

if (!$student_id) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing required parameters: student_id, feedback_id'
    ]);
    exit;
}

try {
    $sql = "SELECT id, student_id, is_submitted 
            FROM forms 
            WHERE student_id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $student_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        echo json_encode([
            'status' => 'success',
            'submitted' => (bool)$row['is_submitted'],
            'data' => [
                'form_response_id' => (int)$row['id'],
                'student_id' => (int)$row['student_id'],
                'is_submitted' => (bool)$row['is_submitted']
            ],
            'message' => 'Student has already submitted feedback.'
        ]);
    } else {
        echo json_encode([
            'status' => 'success',
            'submitted' => false,
            'data' => [],
            'message' => 'Student has not submitted feedback yet.'
        ]);
    }

    $stmt->close();

} catch (mysqli_sql_exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to check submission status. Please try again later.'
    ]);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'An unexpected error occurred.'
    ]);
}

$conn->close();