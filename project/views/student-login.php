<?php 
require_once __DIR__ . "/../middleware/redirect_if_login.php";

$pageTitle = "Student - Login";

$pageCss = ["./assets/css/login.css"];

$pageJS = ["./assets/js/student-login.js"];

$pageContent = __DIR__ . "/contents/student-login-content.php";

include __DIR__ . "/../layout/layout.php";