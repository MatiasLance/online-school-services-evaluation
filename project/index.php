<?php
$request = $_SERVER['REQUEST_URI'];
$viewDir = '/views/';

switch($request) {
  case '/':
    require __DIR__ . $viewDir . '/user-login.php';
    break;
  case '/register':
    require __DIR__ . $viewDir . 'user-register.php';
    break;
  case '/admin':
    require __DIR__ . $viewDir . 'login.php';
    break;
  case '/dashboard':
    require __DIR__ . $viewDir . 'dashboard.php';
    break;
  case '/user-dashboard':
    require __DIR__ . $viewDir . 'user-dashboard.php';
    break;
  case '/user-categories':
    require __DIR__ . $viewDir . 'user-categories.php';
    break;
  default:
    http_response_code(404);
    require __DIR__ . $viewDir . '404.php';
}