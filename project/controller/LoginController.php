<?php
session_start();

require_once __DIR__ . '/../config/db_connection.php';
require_once __DIR__ . '/../helper/helper.php';

header('Content-Type: application/json');

// Checks if the request method is POST to ensure the form was submitted.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = sanitizeData($_POST['email']);
    $password = sanitizeData($_POST['password']);

    // Prepare the query to fetch user data based on the provided email
    $sql = "SELECT id, firstname, lastname, email, password, user_type FROM users WHERE email = ? AND user_type = 'admin' OR user_type = 'user' LIMIT 1";

    // Prepare the statement
    if ($stmt = $conn->prepare($sql)) {
        // Bind the parameter
        $stmt->bind_param("s", $email);

        // Execute the statement
        $stmt->execute();

        // Store the result
        $stmt->store_result();

        // Check if any user was found with the provided email
        if ($stmt->num_rows > 0) {
            // Bind the result to variables
            $stmt->bind_result($id, $firstname, $lastname, $email_db, $password_db, $user_type);

            // Fetch the result
            $stmt->fetch();

            // Verify the provided password against the hashed password stored in the database
            if (password_verify($password, $password_db)) {
                // Password is correct, return success response
                $_SESSION['id'] = $id;
                $_SESSION['firstname'] = $firstname;
                $_SESSION['lastname'] = $lastname;
                $_SESSION['user_type'] = $user_type;
                echo json_encode([
                    'success' => true,
                    'message' => 'Login successful!',
                ]);
            } else {
                // Incorrect password
                echo json_encode([
                    'success' => false,
                    'message' => 'Invalid password.'
                ]);
            }
        } else {
            // No user found with the provided email
            echo json_encode([
                'success' => false,
                'message' => 'No user found with this email.'
            ]);
        }

        // Close the statement
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
