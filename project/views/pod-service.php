<?php
require_once  __DIR__ .  "/../middleware/auth_check.php";

$pageTitle = "POD Service Evaluation - Dashboard";

$pageCss = [
    "./assets/css/main.css",
    "./assets/css/dashboard.css",
    "./assets/css/modal.css",
    "./assets/css/navbar.css"
];

$pageJS = [
    "./assets/js/logout.js",
    "./assets/js/account.js",
    "./assets/js/podServiceAnalytics.js",
];

$pageContent = __DIR__ . "/contents/pod/pod-content.php";

include __DIR__ . "/../layout/layout.php";
