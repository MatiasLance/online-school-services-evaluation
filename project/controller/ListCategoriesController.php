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
} else {
    echo json_encode(["status" => "error", "message" => "Database error: " . $conn->error]);
    exit;
}

$sql = "SELECT id, name FROM categories $searchCondition ORDER BY name ASC LIMIT ?, ?";
if ($stmt = $conn->prepare($sql)) {
    if ($search) {
        $stmt->bind_param("sii", $searchTerm, $offset, $limit);
    } else {
        $stmt->bind_param("ii", $offset, $limit);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $categories = [];
    $categoryIds = [];

    while ($row = $result->fetch_assoc()) {
        $categories[] = $row;
        $categoryIds[] = $row['id'];
    }

    $stmt->close();

    $formResult = [];

    if (!empty($categoryIds) && is_array($categoryIds)) {
        $placeholders = implode(',', array_fill(0, count($categoryIds), '?'));
        $types = str_repeat('i', count($categoryIds));

        $formQuery = "SELECT category_id, status FROM forms WHERE category_id IN ($placeholders)";
        $formStmt = $conn->prepare($formQuery);

        if ($formStmt === false) {
            die(json_encode(['error' => 'Failed to prepare statement', 'details' => $conn->error]));
        }

        $formStmt->bind_param($types, ...$categoryIds);

        if (!$formStmt->execute()) {
            die(json_encode(['error' => 'Execute failed: ' . $formStmt->error]));
        }

        $formRes = $formStmt->get_result();

        while ($row = $formRes->fetch_assoc()) {
            $formResult[$row['category_id']][] = $row['status'];
        }

        $formStmt->close();
    }

    foreach ($categories as &$category) {
        $categoryId = $category['id'];
        $category['form_statuses'] = $formResult[$categoryId] ?? [];
    }

    echo json_encode([
        "status" => "success",
        "data" => $categories,
        "total" => $totalRecords ?? 0,
        "current_page" => $page,
        "total_pages" => $totalRecords > 0 ? ceil($totalRecords / $limit) : 1
    ]);

} else {
    echo json_encode(["status" => "error", "messages" => ["Database error. Please contact support."]]);
}

$conn->close();