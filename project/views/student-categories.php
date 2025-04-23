<?php
require_once  __DIR__ .  "/../middleware/auth_check.php";

$pageTitle = "Student - Dashboard";

$pageCss = [
    "./assets/css/dashboard.css",
    "./assets/css/modal.css",
    "./assets/css/image-upload.css",
    "./assets/css/dropdown.css",
    "./assets/css/navbar.css"
];

$pageJS = [
    "./assets/js/toggle-side-bar.js",
    "./assets/js/logout.js",
    "./assets/js/image-upload.js",
    "./assets/js/categories.js",
    "./assets/js/profile.js"
];

$pageContent = __DIR__ . "/contents/student-categories-content.php";

include __DIR__ . "/../layout/layout.php";
