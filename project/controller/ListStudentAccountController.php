<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');


$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$search = isset($_GET['search']) ? sanitizeData($_GET['search']) : '';

$offset = ($page - 1) * $limit;

$searchCondition = $search ? "AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)" : "";

$countQuery = "SELECT COUNT(*) AS total FROM students WHERE 1=1 $searchCondition";

if ($stmt = $conn->prepare($countQuery)) {
    if ($search) {
        $searchTerm = "%$search%";
        $stmt->bind_param("sss", $searchTerm, $searchTerm, $searchTerm);
    }
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    $totalRecords = $result['total'];
    $stmt->close();
}

$sql = "SELECT id, first_name, last_name, email, gender, department, section, year_level FROM students WHERE 1=1 $searchCondition LIMIT ?, ?";
if ($stmt = $conn->prepare($sql)) {
    if ($search) {
        $searchTerm = "%$search%";
        $stmt->bind_param("sssii", $searchTerm, $searchTerm, $searchTerm, $offset, $limit);
    } else {
        $stmt->bind_param("ii", $offset, $limit);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $students = [];
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }

    echo json_encode([
        "status" => "success",
        "data" => $students,
        "total" => $totalRecords,
        "current_page" => $page,
        "total_pages" => ceil($totalRecords / $limit)
    ]);

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "messages" => ["Database error. Please contact support."]]);
}

$conn->close();
?>