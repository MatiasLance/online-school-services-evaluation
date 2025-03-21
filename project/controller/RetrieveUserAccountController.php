<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json'); // Ensure JSON response

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $userId = isset($_GET['id']) ? intval($_GET['id']) : 0;

    // Validate ID
    if ($userId <= 0) {
        echo json_encode(["status" => "error", "message" => "Invalid user ID."]);
        exit();
    }

    // Query to fetch user account by ID
    $sql = "SELECT id, firstname, lastname, email, password
            FROM users 
            WHERE id = ?";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            echo json_encode(["status" => "success", "data" => $user]);
        } else {
            echo json_encode(["status" => "error", "message" => "User account not found."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Database error. Please contact support."]);
    }

    // Close connection
    $conn->close();
}
?>
