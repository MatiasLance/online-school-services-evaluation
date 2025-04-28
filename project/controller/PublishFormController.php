<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $stmt = $conn->prepare("SELECT is_published FROM form_settings WHERE id = 1");
    $stmt->execute();
    $result = $stmt->bind_result($is_published);
    $stmt->fetch();
    $stmt->close();

    echo json_encode(["success" => true, "is_published" => $is_published]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $new_status = isset($_POST['is_published']) ? (int)$_POST['is_published'] : 0;

    $stmt = $conn->prepare("UPDATE form_settings SET is_published = ? WHERE id = 1");
    $stmt->bind_param("i", $new_status);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Form visibility updated!", "is_published" => $new_status]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update visibility."]);
    }

    $stmt->close();
}

$conn->close();