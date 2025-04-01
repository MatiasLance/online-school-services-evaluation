<?php 
require_once __DIR__ . "/../middleware/redirect_if_login.php";

$pageTitle = "Admin - Login";

$pageCss = ["./assets/css/login.css"];

$pageJS = ["./assets/js/login.js"];

$pageContent = __DIR__ . "/contents/login-content.php";

include __DIR__ . "/../layout/layout.php";