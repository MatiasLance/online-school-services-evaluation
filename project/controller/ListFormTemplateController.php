<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json'); // Ensure JSON response

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Get filter parameters (optional)
    $studentId = isset($_GET['student_id']) ? intval($_GET['student_id']) : null;
    $categoryId = isset($_GET['category_id']) ? intval($_GET['category_id']) : null;
    $status = isset($_GET['status']) ? trim($_GET['status']) : null;

    // Validate status (must be one of the ENUM values)
    $validStatuses = ['draft', 'published', 'archived'];
    if (!is_null($status) && !in_array($status, $validStatuses)) {
        echo json_encode(["status" => "error", "message" => "Invalid status value."]);
        exit();
    }

    // Build the query dynamically based on filters
    $sql = "SELECT id, title, description, student_id, category_id, version, status, created_by, created_at 
            FROM forms WHERE 1=1";
    $params = [];
    $types = "";

    if (!empty($studentId)) {
        $sql .= " AND student_id = ?";
        $params[] = $studentId;
        $types .= "i";
    }
    if (!empty($categoryId)) {
        $sql .= " AND category_id = ?";
        $params[] = $categoryId;
        $types .= "i";
    }
    if (!is_null($status)) {
        $sql .= " AND status = ?";
        $params[] = $status;
        $types .= "s";
    }

    if ($stmt = $conn->prepare($sql)) {
        // Bind parameters dynamically if there are any
        if (!empty($params)) {
            $stmt->bind_param($types, ...$params);
        }

        $stmt->execute();
        $result = $stmt->get_result();

        $forms = [];
        while ($row = $result->fetch_assoc()) {
            $forms[] = $row;
        }

        echo json_encode(["status" => "success", "data" => $forms]);

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Database error. Please contact support."]);
    }

    $conn->close();
}
?>
