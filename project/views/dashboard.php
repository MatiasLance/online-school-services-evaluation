<?php
require_once  __DIR__ .  "/../middleware/auth_check.php";

$pageTitle = "Admin - Dashboard";

$pageCss = [
    "./assets/css/dashboard.css",
    "./assets/css/modal.css",
    "./assets/css/image-upload.css",
    "./assets/css/dropdown.css",
    "./assets/css/navbar.css"
];

$pageJS = [
    "./assets/js/logout.js",
    "./assets/js/toggleSidebar.js",
];

$pageContent = __DIR__ . "/contents/dashboard-content.php";

include __DIR__ . "/../layout/layout.php";
