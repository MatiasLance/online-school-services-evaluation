<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        $formDepartmentStatement = $conn->prepare("SELECT id, department_id FROM forms");

        if (!$formDepartmentStatement) {
            throw new Exception("Failed to prepare statement.");
        }

        $formDepartmentStatement->execute();
        $result = $formDepartmentStatement->get_result();

        $departmentId = [];
        $formId = [];
        while ($row = $result->fetch_assoc()) {
            $departmentId[] = $row['department_id'];
            $formId[] = $row['id'];
        }

        $formDepartmentStatement->close();

        $selectDepartmentStatement = $conn->prepare("SELECT id, department FROM departments WHERE id = ?");

        if (!$selectDepartmentStatement) {
            throw new Exception("Failed to prepare the statement for fetching department.");
        }

        $department = [];

        $selectDepartmentStatement->bind_param('i', $departmentId[0]);
        $selectDepartmentStatement->execute();
        $result = $selectDepartmentStatement->get_result();
        if($result->num_rows === 0){
            throw new Exception("No department found.");
        }else{
            $department[] = $result->fetch_assoc();
        }

        $selectDepartmentStatement->close();
        
        $conn->close();

        if (empty($department)) {
            echo json_encode(['status' => 'error', 'message' => 'No department found.']);
        } else {
            echo json_encode(['status' => 'success', 'department' => $department, 'form_id' => $formId]);
        }
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}