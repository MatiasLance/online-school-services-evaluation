<?php
session_start();

// Redirect to dashboard if the user is already logged in
if (isset($_SESSION['id'])) {
    header("Location: dashboard");
    exit();
}