<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json'); // Ensure JSON response

// Fetch Department with Pagination and Search
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 5;
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$search = isset($_GET['search']) ? sanitizeData($_GET['search']) : '';

$offset = ($page - 1) * $limit;

// Search condition
$searchCondition = $search ? "WHERE name LIKE ?" : "";

// Count total records
$countQuery = "SELECT COUNT(*) AS total FROM departments $searchCondition";
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

// Fetch paginated data
$sql = "SELECT id, department FROM departments $searchCondition LIMIT ?, ?";
if ($stmt = $conn->prepare($sql)) {
    if ($search) {
        $stmt->bind_param("sii", $searchTerm, $offset, $limit);
    } else {
        $stmt->bind_param("ii", $offset, $limit);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $departments = [];
    while ($row = $result->fetch_assoc()) {
        $departments[] = $row;
    }

    echo json_encode([
        "status" => "success",
        "data" => $departments,
        "total" => $totalRecords,
        "current_page" => $page,
        "total_pages" => ceil($totalRecords / $limit)
    ]);

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "messages" => ["Database error. Please contact support."]]);
}

$conn->close();