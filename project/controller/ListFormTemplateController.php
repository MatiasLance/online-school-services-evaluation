<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $categoryId = isset($_GET['category_id']) ? intval($_GET['category_id']) : null;
    $status = isset($_GET['status']) ? trim($_GET['status']) : null;

    $validStatuses = ['draft', 'published', 'archived'];
    if (!is_null($status) && !in_array($status, $validStatuses)) {
        echo json_encode(["status" => "error", "message" => "Invalid status value."]);
        exit();
    }

    $sql = "SELECT id, title, description, category_id, version, status, created_by, created_at 
            FROM forms WHERE 1=1";
    $params = [];
    $types = "";

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
