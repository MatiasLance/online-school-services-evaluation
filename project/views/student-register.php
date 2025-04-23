<?php 
require_once __DIR__ . "/../middleware/redirect_if_login.php";

$pageTitle = "Student - Register";

$pageCss = ["./assets/css/register.css"];

$pageJS = ["./assets/js/student-register.js"];

$pageContent = __DIR__ . "/contents/student-register-content.php";

include __DIR__ . "/../layout/layout.php";