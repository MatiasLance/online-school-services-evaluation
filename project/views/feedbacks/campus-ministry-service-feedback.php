<?php
require_once  __DIR__ .  "/../../middleware/auth_check.php";

$pageTitle = "Campus Ministry Service Feedback - Dashboard";

$pageCss = [
    "../assets/css/main.css",
    "../assets/css/dashboard.css",
    "../assets/css/modal.css",
    "../assets/css/navbar.css"
];

$pageJS = [
    "../assets/js/logout.js",
    "../assets/js/account.js",
    "../assets/js/campusMinistryServiceAnalytics.js",
    "../assets/js/toggleSidebar.js",
];

$pageContent = __DIR__ . "/../contents/campus-ministry/feedback.php";

include __DIR__ . "/../../layout/layout.php";
