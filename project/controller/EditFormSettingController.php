<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

$response = [
    'status' => 'error',
    'message' => 'Invalid request.',
];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        $form_id = $_POST['formId'] ?? null;
        $is_publish = $_POST['isPublish'] ?? null;
        $assign_student_id = $_POST['assignStudent'] ?? [];
        $assign_department_id = $_POST['assignDepartment'] ?? null;
        $assign_category_id = $_POST['assignCategory'] ?? null;

        if (!$form_id || !is_numeric($form_id)) {
            throw new Exception('Invalid form ID.');
        }

        $stmt = $conn->prepare("SELECT id FROM forms WHERE id = ?");
        $stmt->bind_param('i', $form_id);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows === 0) {
            throw new Exception('Form does not exist.');
        }
        $stmt->close();

        $is_publish = filter_var($is_publish, FILTER_VALIDATE_BOOLEAN) ? 1 : 0;

        if (!is_bool($is_publish) && !is_numeric($is_publish)) {
            throw new Exception('Invalid publish status format.');
        }

        if (!in_array($is_publish, [0, 1])) {
            throw new Exception('Invalid publish status.');
        }

        if (!empty($assign_student_id)) {
            if (!is_array($assign_student_id)) {
                throw new Exception('Invalid student IDs format.');
            }

            foreach ($assign_student_id as $student_id) {
                if (!is_numeric($student_id)) {
                    throw new Exception('Invalid student ID.');
                }
            }

            $placeholders = implode(',', array_fill(0, count($assign_student_id), '?'));
            $types = str_repeat('i', count($assign_student_id));
            $stmt = $conn->prepare("SELECT COUNT(*) FROM students WHERE id IN ($placeholders)");
            $stmt->bind_param($types, ...$assign_student_id);
            $stmt->execute();
            $stmt->bind_result($validStudentCount);
            $stmt->fetch();
            $stmt->close();

            if ($validStudentCount !== count($assign_student_id)) {
                throw new Exception('One or more student IDs are invalid.');
            }
        }

        // Start a transaction to ensure atomicity
        // Basaha nalang ninyo ang docs. about aning transaction https://www.php.net/manual/en/pdo.transactions.php
        $conn->begin_transaction();

        $status = $is_publish ? 'published' : 'draft';
        $published_at = $is_publish ? date('Y-m-d H:i:s') : null;

        $stmt = $conn->prepare("
            UPDATE forms 
            SET status = ?, department_id = ?, category_id = ?, published_at = ?
            WHERE id = ?
        ");
        $stmt->bind_param('siisi', $status, $assign_department_id, $assign_category_id, $published_at, $form_id);
        $stmt->execute();
        $stmt->close();

        if (!empty($assign_student_id)) {
            // Delete existing assignments for this form to avoid duplicates
            $stmt = $conn->prepare("DELETE FROM form_student WHERE form_id = ?");
            $stmt->bind_param('i', $form_id);
            $stmt->execute();
            $stmt->close();

            $stmt = $conn->prepare("INSERT INTO form_student (form_id, student_id) VALUES (?, ?)");

            foreach ($assign_student_id as $student_id) {
                $stmt->bind_param('ii', $form_id, $student_id);
                $stmt->execute();
            }
            $stmt->close();

        }

        $conn->commit();

        $response['status'] = 'success';
        $response['students_id'] = $assign_student_id;
        $response['department_id'] = $assign_department_id;
        $response['category_id'] = $assign_category_id;
        $response['message'] = 'Form updated successfully.';
    } catch (Exception $e) {
        // Rollback the transaction in case of an error
        $conn->rollback();

        $response['message'] = $e->getMessage();
    }
}

echo json_encode($response);