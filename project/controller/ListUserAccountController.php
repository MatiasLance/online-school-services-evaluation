<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json'); // Ensure JSON response

// Pagination and Search Setup
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 5;
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$search = isset($_GET['search']) ? sanitizeData($_GET['search']) : '';

$offset = ($page - 1) * $limit;

// Search condition
$searchCondition = $search ? "AND (firstname LIKE ? OR lastname LIKE ? OR email LIKE ?)" : "";

// Count total records
$countQuery = "SELECT COUNT(*) AS total FROM users WHERE user_type = 'user' $searchCondition";
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

// Fetch paginated data
$sql = "SELECT id, firstname, lastname, email FROM users WHERE user_type = 'user' $searchCondition LIMIT ?, ?";
if ($stmt = $conn->prepare($sql)) {
    if ($search) {
        $stmt->bind_param("sssii", $searchTerm, $searchTerm, $searchTerm, $offset, $limit);
    } else {
        $stmt->bind_param("ii", $offset, $limit);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    echo json_encode([
        "status" => "success",
        "data" => $users,
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
