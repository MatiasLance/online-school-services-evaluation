<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        $formStudentStatement = $conn->prepare("SELECT form_id, student_id FROM form_student");

        if (!$formStudentStatement) {
            throw new Exception("Failed to prepare statement.");
        }

        $formStudentStatement->execute();
        $result = $formStudentStatement->get_result();

        $studentsIds = [];
        $formIds = [];
        while ($row = $result->fetch_assoc()) {
            $studentsIds[] = $row['student_id'];
            $formIds[] = $row['form_id'];
        }

        $formStudentStatement->close();

        $selectedStudentStatement = $conn->prepare("SELECT CONCAT(first_name, ' ', last_name) as full_name FROM students WHERE id = ?");

        if (!$selectedStudentStatement) {
            throw new Exception("Failed to prepare the statement for fetching student names.");
        }

        $students = [];

        foreach($studentsIds as $id){
            $selectedStudentStatement->bind_param('i', $id);
            $selectedStudentStatement->execute();
            $result = $selectedStudentStatement->get_result();
            if($result->num_rows === 0){
                throw new Exception("No students found.");
            }else{
                $students[] = $result->fetch_assoc();
            }
        }

        $selectedStudentStatement->close();
        
        $conn->close();

        $uniqueFormId = array_unique($formIds);
        $formId = array_values($uniqueFormId);

        if (empty($students)) {
            echo json_encode(['status' => 'error', 'message' => 'No students found.']);
        } else {
            echo json_encode(['status' => 'success', 'students' => $students, 'form_id' => implode(',', $formId)]);
        }
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}