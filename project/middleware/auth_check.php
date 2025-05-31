<?php
session_start();

if (!isset($_SESSION['id']) && !isset($_SESSION['student_id'])) {
    header("Location: /");
    exit();
}
