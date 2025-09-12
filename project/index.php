<?php
$requestUri = $_SERVER['REQUEST_URI'];
$parsedUrl = parse_url($requestUri);
$path = $parsedUrl['path'];
$viewDir = '/views/';

switch($path) {
  case '/':
    require  __DIR__ . $viewDir . 'login.php';
    break;
  case '/create-form':
    require  __DIR__ . $viewDir . 'form.php';
    break;
  case '/dashboard':
    require  __DIR__ . $viewDir . 'dashboard.php';
    break;
  case '/registrar':
    require  __DIR__ . $viewDir . '/registrar.php';
    break;
  case '/pod-service':
    require  __DIR__ . $viewDir . '/pod-service.php';
    break;
  case '/finance-service':
    require  __DIR__ . $viewDir . '/finance-service.php';
    break;
  case '/campus-ministry-service':
    require  __DIR__ . $viewDir . '/campus-ministry-service.php';
    break;
  case '/maintenance-service':
    require  __DIR__ . $viewDir . '/maintenance-service.php';
    break;
  case '/canteen-service':
    require  __DIR__ . $viewDir . '/canteen-service.php';
    break;
  case '/library-service':
    require  __DIR__ . $viewDir . '/library-service.php';
    break;
  case '/clinic-service':
    require  __DIR__ . $viewDir . '/clinic-service.php';
    break;
  case '/guidance-service':
    require  __DIR__ . $viewDir . '/guidance-service.php';
    break;
  case '/security-service':
    require  __DIR__ . $viewDir . '/security-service.php';
    break;
  case '/student-activity-service':
    require  __DIR__ . $viewDir . '/student-activity-service.php';
    break;
  default:
    http_response_code(404);
    require  __DIR__ . $viewDir . '404.php';
    break;
}