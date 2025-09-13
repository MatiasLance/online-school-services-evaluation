<?php
require_once  __DIR__ .  "/../middleware/auth_check.php";

$pageTitle = "Student Activity Service Evaluation - Dashboard";

$pageCss = [
    "./assets/css/main.css",
    "./assets/css/dashboard.css",
    "./assets/css/modal.css",
    "./assets/css/navbar.css"
];

$pageJS = [
    "./assets/js/logout.js",
    "./assets/js/account.js",
    "./assets/js/studentActivityServiceAnalytics.js",
    "./assets/js/toggleSidebar.js",
];

$pageContent = __DIR__ . "/contents/student-activity/student-activity-content.php";

include __DIR__ . "/../layout/layout.php";
