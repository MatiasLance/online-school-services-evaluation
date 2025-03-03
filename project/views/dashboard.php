<?php
require_once "./middleware/auth_check.php";

$pageTitle = "Admin - Dashboard";

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
    "./assets/js/evaluationForm.js",
    // "./assets/js/saveForm.js"
];

$pageContent = __DIR__ . "/contents/dashboard-content.php";

include "./layout/layout.php";
?>
