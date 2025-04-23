<?php
session_start();
if(isset($_SESSION['id'])){
    session_unset();

    echo json_encode([
        'success' => true,
        'message' => 'Logout successfully!',
        'redirect' => '/admin'
    ]);
} elseif (isset($_SESSION['student_id'])) {
    session_unset();
    
    echo json_encode([
        'success' => true,
        'message' => 'Logout successfully!',
        'redirect' => '/'
    ]);
}
