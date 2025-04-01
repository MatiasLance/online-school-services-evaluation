<?php
session_start();

// Check if either admin or student is logged in
if (!isset($_SESSION['id']) && !isset($_SESSION['student_id'])) {
    header("Location: /"); // Redirect to a common login page
    exit();
}
