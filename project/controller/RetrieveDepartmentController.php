<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $departmentId = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if ($departmentId <= 0) {
        echo json_encode(["status" => "error", "message" => "Invalid department ID."]);
        exit();
    }

    $sql = "SELECT id, department FROM departments WHERE id = ?";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("i", $departmentId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $department = $result->fetch_assoc();
            echo json_encode(["status" => "success", "data" => $department]);
        } else {
            echo json_encode(["status" => "error", "message" => "Department not found."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Database error. Please contact support."]);
    }

    $conn->close();
}
?>
