<?php
require_once  __DIR__ .  "/../middleware/auth_check.php";

$pageTitle = "Student - Evaluation Form";

$pageCss = [
    "./assets/css/dashboard.css",
    "./assets/css/navbar.css",
    "./assets/css/feedback.css"
];

$pageJS = [
    "./assets/js/logout.js",
    "./assets/js/student.js"
];

$pageContent = __DIR__ . "/contents/student-evaluation-form-content.php";

include __DIR__ . "/../layout/layout.php";
