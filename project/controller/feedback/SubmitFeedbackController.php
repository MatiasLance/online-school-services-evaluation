<?php
session_start();

require_once __DIR__ . '/../../config/db_connection.php';
require_once __DIR__ . '/../../helper/helper.php';

header('Content-Type: application/json');

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $selectOffice = sanitizeData($_POST['selectedOffice']);
    $feedback = sanitizeData($_POST['feedback']);

    if (empty($selectOffice)) {
        $errors[] = "Please select an office.";
    }

    if(empty($feedback)){
        $errors[] = "Please share your feedback.";
    }

    if (!empty($errors)) {
        echo json_encode(["error" => true, "messages" => $errors]);
        exit();
    }

    $sql = "INSERT INTO form_feedbacks (office,feedback) VALUES (?,?)";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("ss", $selectOffice, $feedback);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Thank you for your valuable feedback."]);
        } else {
            echo json_encode(["error" => true, "messages" => ["Please try again later."]]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => true, "messages" => ["Database error. Please contact support."]]);
    }

    $conn->close();
}
