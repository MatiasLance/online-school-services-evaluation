<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $formTitle = sanitizeData($_POST['formTitle']); // Sanitize input
    $formData = json_decode($_POST['formData'], true);

    // Insert form title into `forms` table
    $stmt = $conn->prepare("INSERT INTO forms (title) VALUES (?)");
    $stmt->bind_param("s", $formTitle);
    $stmt->execute();
    $formId = $stmt->insert_id;

    // Prepare statement for inserting form fields
    $stmt = $conn->prepare("INSERT INTO form_fields (form_id, field_label, field_name, field_type, field_options) VALUES (?, ?, ?, ?, ?)");

    $fields = []; // Store parsed fields
    
    foreach ($formData as $field) {
        $name = $field['name']; // Example: "fields[1][label]" or "fields[1][type]"
        $value = sanitizeData($field['value']); // Sanitize value

        // Extract field index and key using regex
        if (preg_match('/fields\[(\d+)\]\[(label|type)\]/', $name, $matches)) {
            $index = $matches[1]; // Field number (e.g., 1, 2, 3...)
            $key = $matches[2];   // Either 'label' or 'type'

            // Store in structured array
            $fields[$index][$key] = $value;
        }
    }

    // Insert extracted fields into the database
    foreach ($fields as $index => $field) {
        if (isset($field['label']) && isset($field['type'])) {
            $label = $field['label'];
            $field_name = strtolower(str_replace(" ", "_", $label));
            $type = $field['type'];

            $stmt->bind_param("isss", $formId, $label, $field_name, $type);
            $stmt->execute();
        }
    }

    // Fetch the inserted form fields to return for rendering
    $stmt = $conn->prepare("SELECT field_label, field_name, field_type FROM form_fields WHERE form_id = ?");
    $stmt->bind_param("i", $formId);
    $stmt->execute();
    $result = $stmt->get_result();

    $formFields = [];
    while ($row = $result->fetch_assoc()) {
        $formFields[] = $row;
    }

    echo json_encode([
        "success" => true,
        "message" => "Form saved successfully!",
        "form" => [
            "id" => $formId,
            "title" => $formTitle,
            "fields" => $formFields
        ]
    ]);

    $conn->close();
}
