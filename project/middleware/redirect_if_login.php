<?php
session_start();

// Redirect based on user type
if (isset($_SESSION['id'])) {
    header("Location: /dashboard");
    exit();
} elseif (isset($_SESSION['student_id'])) {
    header("Location: /user-dashboard");
    exit();
}