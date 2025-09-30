<?php
require_once  __DIR__ .  "/../middleware/auth_check.php";

$pageTitle = "Satisfaction Rate - Dashboard";

$pageCss = [
    "./assets/css/dashboard.css",
    "./assets/css/modal.css",
    "./assets/css/image-upload.css",
    "./assets/css/dropdown.css",
    "./assets/css/navbar.css"
];

$pageJS = [
    "./assets/js/logout.js",
    "./assets/js/registrarAnalytics.js",
    "./assets/js/studentActivityServiceAnalytics.js",
    "./assets/js/podServiceAnalytics.js",
    "./assets/js/financeServiceAnalytics.js",
    "./assets/js/campusMinistryServiceAnalytics.js",
    "./assets/js/maintenanceServiceAnalytics.js",
    "./assets/js/canteenServiceAnalytics.js",
    "./assets/js/libraryServiceAnalytics.js",
    "./assets/js/clinicServiceAnalytics.js",
    "./assets/js/guidanceServiceAnalytics.js",
    "./assets/js/securityServiceAnalytics.js",
    "./assets/js/toggleSidebar.js",
];

$pageContent = __DIR__ . "/contents/satisfaction-rate-content.php";

include __DIR__ . "/../layout/layout.php";
