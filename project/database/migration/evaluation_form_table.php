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
        $sql = "CREATE TABLE IF NOT EXISTS evaluation_form (
            id INT AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(100) NOT NULL,
            gender ENUM('Male', 'Female', 'Other') NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            service_rate ENUM('Excellent', 'Good', 'Fair', 'Poor') NOT NULL,
            recommend_service ENUM('Yes', 'No') NOT NULL,
            comments TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )";

        if ($this->conn->query($sql) === TRUE) {
            echo "Table `evaluation_form` migrated successfully.\n";
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