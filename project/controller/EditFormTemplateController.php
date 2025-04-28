<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

// Retrieve JSON input
// https://stackoverflow.com/questions/2731297/file-get-contentsphp-input-or-http-raw-post-data-which-one-is-better-to
$data = json_decode(file_get_contents("php://input"), true);

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $formID = isset($data['form_id']) ? intval($data['form_id']) : 0;
    $formFields = isset($data['form_fields']) ? json_encode($data['form_fields']) : null;

    if ($formID <= 0) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid form ID.']);
        exit;
    }

    if (empty($formFields) || json_decode($formFields) === null) {
        echo json_encode(['status' => 'error', 'message' => 'Form fields must be a valid JSON.']);
        exit;
    }

    $sql = "UPDATE form_versions SET form_fields = ? WHERE form_id = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("si", $formFields, $formID);

        if($stmt->execute()){
            if($stmt->affected_rows > 0) {
                echo json_encode(["status" => "success", "message" => "Form Updated successfully."]);
            }else{
                echo json_encode(["status" => "error", "message" => "No changes made or form field not found."]);
            }
            
        }else{
            echo json_encode(["status" => "error", "message" => "Failed to update form. Please try again."]);
        }

        $stmt->close();
    }

    $conn->close();
}