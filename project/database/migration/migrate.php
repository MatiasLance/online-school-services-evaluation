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
                gender ENUM('Male', 'Female') NOT NULL,
                department VARCHAR(255) NOT NULL,
                section VARCHAR(255) DEFAULT NULL,  
                year_level ENUM('1st Year', '2nd Year', '3rd Year', '4th Year') NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )",
            "forms" => "CREATE TABLE IF NOT EXISTS forms (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                student_id INT, -- if specific to students
                category_id INT,
                version INT DEFAULT 1,
                status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                created_by INT, -- user who created the form
                published_at TIMESTAMP NULL, -- when status changed to published
                FOREIGN KEY (created_by) REFERENCES users(id),
                CONSTRAINT fk_forms_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
                CONSTRAINT fk_forms_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
                CONSTRAINT fk_forms_created_by FOREIGN KEY (created_by) REFERENCES users(id)
            )",
            "form versions" => "CREATE TABLE form_versions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                form_id INT NOT NULL,
                version INT NOT NULL,
                form_fields JSON NOT NULL, -- stores the complete form structure
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_by INT,
                notes TEXT, -- version notes/changelog
                FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE CASCADE,
                FOREIGN KEY (created_by) REFERENCES users(id),
                UNIQUE KEY (form_id, version)
            )",
            "form submissions" => "CREATE TABLE form_submissions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                form_id INT NOT NULL,
                form_version INT NOT NULL,
                submitted_by INT, -- user_id if logged in
                student_id INT, -- if specific to students
                submission_data JSON NOT NULL, -- stores all answers
                submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                ip_address VARCHAR(45),
                FOREIGN KEY (form_id) REFERENCES forms(id),
                FOREIGN KEY (form_id, form_version) REFERENCES form_versions(form_id, version),
                FOREIGN KEY (submitted_by) REFERENCES users(id)
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
