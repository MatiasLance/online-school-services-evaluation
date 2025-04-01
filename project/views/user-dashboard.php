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
    "./assets/js/toggleSideBar.js",
    "./assets/js/logout.js",
    "./assets/js/imageUpload.js",
    "./assets/js/categories.js",
    "./assets/js/userDashboard.js",
    "./assets/js/profile.js"
];

$pageContent = __DIR__ . "/contents/user-dashboard-content.php";

include __DIR__ . "/../layout/layout.php";
