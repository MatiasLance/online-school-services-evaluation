<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

// Load .env variables
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// Access variables
$host = $_ENV['DB_HOST'];
$port = $_ENV['DB_PORT'];
$username = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_ROOT_PASSWORD'];
$database = $_ENV['DB_DATABASE'];

$conn = new mysqli($host, $username, $password, $database, $port);

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

return $conn;