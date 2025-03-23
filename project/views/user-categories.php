<?php
require_once "./middleware/auth_check.php";

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
    "./assets/js/evaluationForm.js",
    "./assets/js/categories.js",
    "./assets/js/profile.js"
];

$pageContent = __DIR__ . "/contents/user-categories-content.php";

include "./layout/layout.php";
?>
