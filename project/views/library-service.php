<?php
require_once  __DIR__ .  "/../middleware/auth_check.php";

$pageTitle = "Library Service Evaluation - Dashboard";

$pageCss = [
    "./assets/css/main.css",
    "./assets/css/dashboard.css",
    "./assets/css/modal.css",
    "./assets/css/navbar.css"
];

$pageJS = [
    "./assets/js/logout.js",
    "./assets/js/account.js",
    "./assets/js/libraryServiceAnalytics.js",
];

$pageContent = __DIR__ . "/contents/library/library-content.php";

include __DIR__ . "/../layout/layout.php";
