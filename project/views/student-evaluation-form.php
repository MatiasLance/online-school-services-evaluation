<?php
require_once  __DIR__ .  "/../middleware/auth_check.php";

$pageTitle = "Student - Evaluation Form";

$pageCss = [
    "./assets/css/dashboard.css",
    "./assets/css/modal.css",
    "./assets/css/image-upload.css",
    "./assets/css/dropdown.css",
    "./assets/css/navbar.css"
];

$pageJS = [
    "./assets/js/logout.js",
    "./assets/js/categories.js",
    "./assets/js/profile.js",
    "./assets/js/form.js",
    "./assets/js/student-dashboard.js",
];

$pageContent = __DIR__ . "/contents/student-evaluation-form-content.php";

include __DIR__ . "/../layout/layout.php";
