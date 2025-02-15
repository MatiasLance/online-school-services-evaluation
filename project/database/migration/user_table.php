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
        $sql = "CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            firstname VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            user_type ENUM('admin', 'user') NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )";

        if ($this->conn->query($sql) === TRUE) {
            echo "Table `users` migrated successfully.\n";
        } else {
            echo "Error migrating table: " . $this->conn->error . "\n";
        }
    }
}

// Command-line arguments
$arguments = getopt("f:", ["migrate"]);
$migrator = new DatabaseMigrator($conn);

if (isset($arguments['migrate'])) {
    $migrator->migrate();
}