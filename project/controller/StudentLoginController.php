<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = sanitizeData($_POST['email']);
    $password = sanitizeData($_POST['password']);

    $sql = "SELECT id, first_name, last_name, email, password FROM students WHERE email = ? LIMIT 1";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("s", $email);

        $stmt->execute();

        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($id, $firstname, $lastname, $email_db, $password_db);

            $stmt->fetch();

            if (password_verify($password, $password_db)) {
                $_SESSION['student_id'] = $id;
                $_SESSION['student_firstname'] = $firstname;
                $_SESSION['student_lastname'] = $lastname;
                echo json_encode([
                    'success' => true,
                    'message' => 'Login successful!',
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Invalid password.'
                ]);
            }
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'No student found with this email.'
            ]);
        }

        $stmt->close();
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error preparing the query.'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Email and password are required.'
    ]);
}

// Close the database connection
$conn->close();
