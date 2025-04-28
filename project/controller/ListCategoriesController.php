<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 5;
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$search = isset($_GET['search']) ? sanitizeData($_GET['search']) : '';

$offset = ($page - 1) * $limit;

$searchCondition = $search ? "WHERE name LIKE ?" : "";

$countQuery = "SELECT COUNT(*) AS total FROM categories $searchCondition";
if ($stmt = $conn->prepare($countQuery)) {
    if ($search) {
        $searchTerm = "%$search%";
        $stmt->bind_param("s", $searchTerm);
    }
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    $totalRecords = $result['total'];
    $stmt->close();
}

$sql = "SELECT id, name FROM categories $searchCondition LIMIT ?, ?";
if ($stmt = $conn->prepare($sql)) {
    if ($search) {
        $stmt->bind_param("sii", $searchTerm, $offset, $limit);
    } else {
        $stmt->bind_param("ii", $offset, $limit);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $categories = [];
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }

    echo json_encode([
        "status" => "success",
        "data" => $categories,
        "total" => $totalRecords,
        "current_page" => $page,
        "total_pages" => ceil($totalRecords / $limit)
    ]);

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "messages" => ["Database error. Please contact support."]]);
}

$conn->close();