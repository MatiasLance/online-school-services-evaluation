<?php
$requestUri = $_SERVER['REQUEST_URI'];
$parsedUrl = parse_url($requestUri);
$path = $parsedUrl['path'];
$viewDir = '/views/';

switch($path) {
  case '/':
    require  __DIR__ . $viewDir . '/student-login.php';
    break;
  case '/student-register':
    require  __DIR__ . $viewDir . 'student-register.php';
    break;
  case '/student-dashboard':
    require  __DIR__ . $viewDir . 'student-dashboard.php';
    break;
  case '/student-evaluation-form':
    require  __DIR__ . $viewDir . 'student-evaluation-form.php';
    break;
  case '/admin':
    require  __DIR__ . $viewDir . 'login.php';
    break;
  case '/dashboard':
    require  __DIR__ . $viewDir . 'dashboard.php';
    break;
  case '/view-form':
    // Access query parameters if needed
    parse_str($parsedUrl['query'] ?? '', $queryParams);
    $formId = $queryParams['form_id'] ?? null;

    require  __DIR__ . $viewDir . 'form.php';
    break;
  default:
    http_response_code(404);
    require  __DIR__ . $viewDir . '404.php';
    break;
}