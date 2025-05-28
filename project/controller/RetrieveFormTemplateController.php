<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $formId = isset($_GET['form_id']) ? intval($_GET['form_id']) : 0;
    $version = isset($_GET['version']) ? intval($_GET['version']) : null;

    if ($formId <= 0) {
        echo json_encode(["status" => "error", "message" => "Invalid form ID."]);
        exit();
    }

    $sql = "SELECT id, form_id, version, form_fields, created_at
            FROM form_versions
            WHERE form_id = ?";

    if ($version !== null) {
        $sql .= " AND version = ?";
    }

    if ($stmt = $conn->prepare($sql)) {
        if ($version !== null) {
            $stmt->bind_param("ii", $formId, $version);
        } else {
            $stmt->bind_param("i", $formId);
        }

        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $formVersion = $result->fetch_assoc();
            $formVersion['form_fields'] = json_decode($formVersion['form_fields'], true);

            echo json_encode(["status" => "success", "data" => $formVersion]);
        } else {
            echo json_encode(["status" => "error", "message" => "Form version not found."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Database error. Please contact support."]);
    }

    $conn->close();
}
?>
