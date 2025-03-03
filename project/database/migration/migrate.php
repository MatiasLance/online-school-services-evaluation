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
            "forms" => "CREATE TABLE forms (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                status TINYINT(1) DEFAULT 0, -- 0 for unpublished, 1 for published
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )",
            "form_fields" => "CREATE TABLE form_fields (
                id INT AUTO_INCREMENT PRIMARY KEY,
                form_id INT NOT NULL,
                field_label VARCHAR(255) NOT NULL,
                field_name VARCHAR(255) NOT NULL,
                field_type ENUM('text', 'textarea', 'select', 'radio', 'checkbox', 'email', 'tel') NOT NULL,
                options TEXT NULL,
                required BOOLEAN DEFAULT 0,
                FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE CASCADE
            )",
            "form_responses" => "CREATE TABLE form_submissions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                form_id INT NOT NULL,
                submission_data TEXT NOT NULL, -- JSON format
                submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE CASCADE
            )",
            "form_setting" => "CREATE TABLE form_settings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                is_published BOOLEAN NOT NULL DEFAULT 0 -- 1 = Published, 0 = Unpublished
            )",
            "evaluation_form" => "CREATE TABLE IF NOT EXISTS evaluation_form (
                id INT AUTO_INCREMENT PRIMARY KEY,
                full_name VARCHAR(100) NOT NULL,
                gender ENUM('Male', 'Female', 'Other') NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                service_rate ENUM('Excellent', 'Good', 'Fair', 'Poor') NOT NULL,
                recommend_service ENUM('Yes', 'No') NOT NULL,
                comments TEXT NOT NULL,
                is_publish TINYINT(1) NOT NULL DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )",
            "students" => "CREATE TABLE IF NOT EXISTS students (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                gender ENUM('Male', 'Female') NOT NULL,
                course VARCHAR(255) NOT NULL,
                year_level ENUM('1st Year', '2nd Year', '3rd Year', '4th Year') NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
