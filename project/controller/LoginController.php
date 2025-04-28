<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = sanitizeData($_POST['email']);
    $password = sanitizeData($_POST['password']);

    $sql = "SELECT id, firstname, lastname, email, password, user_type FROM users WHERE email = ? AND user_type = 'admin' OR user_type = 'user' LIMIT 1";

    if ($stmt = $conn->prepare($sql)) {

        $stmt->bind_param("s", $email);

        $stmt->execute();

        $stmt->store_result();

        if ($stmt->num_rows > 0) {

            $stmt->bind_result($id, $firstname, $lastname, $email_db, $password_db, $user_type);

            $stmt->fetch();

            if (password_verify($password, $password_db)) {
                $_SESSION['id'] = $id;
                $_SESSION['firstname'] = $firstname;
                $_SESSION['lastname'] = $lastname;
                $_SESSION['user_type'] = $user_type;
                echo json_encode([
                    'success' => true,
                    'message' => 'Login successful!',
                    'user_type' => $user_type
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
                'message' => 'No user found with this email.'
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
