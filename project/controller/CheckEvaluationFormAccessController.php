<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

$error = [];
$dbCategoryFormId = [];
$dbStudentFormId = [];

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $studentId = isset($_POST['student_id']) ? intval($_POST['student_id']) : 0;
    $categoryId = isset($_POST['category_id']) ? intval($_POST['category_id']) : 0;

    if ($studentId <= 0) {
      $error[] = "Invalid student ID.";
    }

    if ($categoryId <= 0) {
      $error[] = "Invalid category ID.";
    }

    $checkStudentAccessInTheForm = $conn->prepare('SELECT form_id FROM form_student WHERE student_id = ? AND category_id = ?');
    $checkStudentAccessInTheForm->bind_param('ii', $studentId, $categoryId);
    $checkStudentAccessInTheForm->execute();
    $result = $checkStudentAccessInTheForm->get_result();
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            $dbStudentFormId[] = $row['form_id'];
        }
    }else{
        echo json_encode(['status' => 'error', 'message' => 'You have not been assigned to a form yet. Please wait for the admin to assign you, and the form will appear once it’s ready. Thank you for your patience!']);
        exit;
    }

    $checkStudentAccessInTheForm->close();

    // $checkingForCategoryIDSetInFormStatement = $conn->prepare("SELECT id FROM forms WHERE category_id = ?");
    // $checkingForCategoryIDSetInFormStatement->bind_param('i', $categoryId);
    // $checkingForCategoryIDSetInFormStatement->execute();
    // $result = $checkingForCategoryIDSetInFormStatement->get_result();
    // if($result->num_rows > 0){
    //     while($row = $result->fetch_assoc()){
    //         $dbCategoryFormId[] = $row['id'];
    //     }
    // }else{
    //     echo json_encode(['status' => 'error', 'message' => 'The selected category is currently unavailable. Please wait for the admin to configure the available categories in the form. Once set, the form will be visible to you. Thank you for your patience!']);
    //     exit;
    // }

    // $checkingForCategoryIDSetInFormStatement->close();

    if($dbStudentFormId[0]){
        $fetchFormTemplate = $conn->prepare('SELECT form_id, version FROM form_versions WHERE form_id = ?');
        $fetchFormTemplate->bind_param('i', $dbStudentFormId[0]);
        $fetchFormTemplate->execute();
        $result = $fetchFormTemplate->get_result();
        if($result->num_rows > 0){
            $formVersion = $result->fetch_assoc();
            $formVersion['form_id'];
            $formVersion['version'];
            echo json_encode(['status' => 'success', 'data' => $formVersion]);
        }else {
            echo json_encode(['status' => 'error', 'message' => 'Form not found.']);
            exit;
        }

        $fetchFormTemplate->close();
    }else{
        echo json_encode(['status' => 'error', 'message' => 'You don\'t have permission to proceed with this category.']);
        exit;
    }


    $conn->close();
}