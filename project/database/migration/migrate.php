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

            "form_feedbacks" => "CREATE TABLE IF NOT EXISTS form_feedbacks (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                office VARCHAR(100) NOT NULL COMMENT 'Name of the office/service being rated (e.g., Registrar, Bursar)',
                feedback LONGTEXT NOT NULL COMMENT 'User-submitted feedback or comment',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'When feedback was submitted',
                deleted_at TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp; NULL means active, non-NULL means deleted',

                INDEX idx_office (office),
                INDEX idx_created_at (created_at DESC),
                INDEX idx_deleted_at (deleted_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores user feedback with soft delete support; auto-purged after 90 days'"
        ];

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

$arguments = getopt("f:", ["migrate"]);
if (isset($arguments['migrate'])) {
    $migrator->migrate();
} else {
    echo "Usage: php migrate.php --migrate\n";
}
?>
