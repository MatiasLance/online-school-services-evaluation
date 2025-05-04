<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json'); // Ensure JSON response

$errors = [];

// Retrieve JSON input
// https://stackoverflow.com/questions/2731297/file-get-contentsphp-input-or-http-raw-post-data-which-one-is-better-to
$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $title = isset($data['title']) ? trim($data['title']) : null;
    $description = isset($data['description']) ? trim($data['description']) : null;
    $categoryId = isset($data['category_id']) ? intval($data['category_id']) : null;
    $formFields = isset($data['form_fields']) ? json_encode($data['form_fields']) : null;
    $status = isset($data['status']) ? trim($data['status']) : 'draft';
    $createdBy = isset($_SESSION['id']) ? intval($_SESSION['id']) : null;

    if (empty($title)) {
        $errors[] = "Title is required.";
    }
    if (!empty($categoryId) && $categoryId <= 0) {
        $errors[] = "Invalid category ID.";
    }
    if (empty($formFields) || json_decode($formFields) === null) {
        $errors[] = "Form fields must be a valid JSON.";
    }
    if (!in_array($status, ['draft', 'published', 'archived'])) {
        $errors[] = "Invalid status value.";
    }
    if (empty($createdBy)) {
        $errors[] = "User authentication required.";
    }

    if (!empty($errors)) {
        echo json_encode(["status" => "error", "messages" => $errors]);
        exit();
    }

    $sql = "INSERT INTO forms (title, description, category_id, status, created_by) 
            VALUES (?, ?, ?, ?, ?)";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("ssisi", $title, $description, $categoryId, $status, $createdBy);

        if ($stmt->execute()) {
            $formId = $stmt->insert_id;

            $sqlVersion = "INSERT INTO form_versions (form_id, version, form_fields, created_by) 
                           VALUES (?, 1, ?, ?)";

            if ($stmtVersion = $conn->prepare($sqlVersion)) {
                $stmtVersion->bind_param("isi", $formId, $formFields, $createdBy);
                $stmtVersion->execute();
                $stmtVersion->close();
            }

            echo json_encode(["status" => "success", "message" => "Form added successfully."]);
        } else {
            echo json_encode(["status" => "error", "messages" => ["Failed to add form. Please try again."]]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "messages" => ["Database error. Please contact support."]]);
    }

    $conn->close();
}
?>
