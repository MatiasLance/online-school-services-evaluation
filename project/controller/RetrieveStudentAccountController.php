<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $sudentID = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if ($sudentID <= 0) {
        echo json_encode(["status" => "error", "message" => "Invalid student ID."]);
        exit();
    }

    $sql = "SELECT id, first_name as firstname, last_name as lastname, email, gender, department, section, year_level
            FROM students
            WHERE id = ?";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("i", $sudentID);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $student = $result->fetch_assoc();
            echo json_encode(["status" => "success", "data" => $student]);
        } else {
            echo json_encode(["status" => "error", "message" => "Student account not found."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Database error. Please contact support."]);
    }

    $conn->close();
}
