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
        $sql = "CREATE TABLE form_fields (
                id INT AUTO_INCREMENT PRIMARY KEY,
                form_id INT NOT NULL,
                field_label VARCHAR(255) NOT NULL,
                field_type ENUM('text', 'textarea', 'radio', 'checkbox', 'select') NOT NULL,
                field_options TEXT NULL, -- For select, checkbox, radio (JSON format)
                required BOOLEAN DEFAULT 1,
                FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE CASCADE
            );";

        if ($this->conn->query($sql) === TRUE) {
            echo "Table `Form fields` migrated successfully.\n";
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