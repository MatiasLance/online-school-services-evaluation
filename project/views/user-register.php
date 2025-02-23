<?php 
require_once __DIR__ . "/../middleware/redirect_if_login.php";

$pageTitle = "Student - Register";

$pageCss = ["./assets/css/register.css"];

$pageJS = ["./assets/js/register.js"];

$pageContent = __DIR__ . "/contents/user-register-content.php";

include __DIR__ . "/../layout/layout.php";
?>