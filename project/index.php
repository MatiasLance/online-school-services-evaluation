<?php
$request = $_SERVER['REQUEST_URI'];
$viewDir = '/views/';

switch($request) {
  // case '/':
  //   require __DIR__ . '/user/login.php';
  //   break;
  case '/':
    require __DIR__ . $viewDir . 'login.php';
    break;
  case '/register':
    require __DIR__ . $viewDir . 'register.php';
    break;
  case '/dashboard':
    require __DIR__ . $viewDir . 'dashboard.php';
    break;
  default:
    http_response_code(404);
    require __DIR__ . $viewDir . '404.php';
}