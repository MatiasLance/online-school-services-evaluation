<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json'); // Ensure JSON response

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $categoryId = isset($_GET['id']) ? intval($_GET['id']) : 0;

    // Validate ID
    if ($categoryId <= 0) {
        echo json_encode(["status" => "error", "message" => "Invalid category ID."]);
        exit();
    }

    // Query to fetch category by ID
    $sql = "SELECT id, name FROM categories WHERE id = ?";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("i", $categoryId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $category = $result->fetch_assoc();
            echo json_encode(["status" => "success", "data" => $category]);
        } else {
            echo json_encode(["status" => "error", "message" => "Category not found."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Database error. Please contact support."]);
    }

    // Close connection
    $conn->close();
}
?>
