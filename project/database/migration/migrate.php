<?php
require_once __DIR__ . '/../../config/db_connection.php';

class DatabaseMigrator
{
    private $conn;

    public function __construct($dbConnection)
    {
        $this->conn = $dbConnection;

        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function migrate()
    {
        // Array of SQL commands to create tables
        $tables = [
            "departments" => "CREATE TABLE IF NOT EXISTS departments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                department VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )",
            "categories" => "CREATE TABLE IF NOT EXISTS categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )",
            "users" => "CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                firstname VARCHAR(50) NOT NULL,
                lastname VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                user_type ENUM('admin', 'user') NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )",
            "students" => "CREATE TABLE IF NOT EXISTS students (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                gender ENUM('male', 'female', 'other') NOT NULL,
                department VARCHAR(255) NOT NULL,
                section VARCHAR(255) DEFAULT NULL,  
                year_level ENUM('1st Year', '2nd Year', '3rd Year', '4th Year') NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )",
            "forms" => "CREATE TABLE IF NOT EXISTS forms (
                id INT AUTO_INCREMENT PRIMARY KEY,
                student_id INT NOT NULL,
                form_response JSON NOT NULL,
                is_submitted BOOLEAN DEFAULT FALSE,
                submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
            )"
        ];

        // Execute each table migration
        foreach ($tables as $tableName => $sql) {
            if ($this->conn->query($sql) === TRUE) {
                echo "Table `$tableName` migrated successfully.\n";
            } else {
                echo "Error migrating table `$tableName`: " . $this->conn->error . "\n";
            }
        }
    }
}

$migrator = new DatabaseMigrator($conn);

// Command-line argument handling
$arguments = getopt("f:", ["migrate"]);
if (isset($arguments['migrate'])) {
    $migrator->migrate();
} else {
    echo "Usage: php migrate.php --migrate\n";
}
?>
