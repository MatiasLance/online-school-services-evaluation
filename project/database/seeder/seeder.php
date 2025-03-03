<?php
require_once __DIR__ . '/../../config/db_connection.php';

class DatabaseSeeder
{
    private $conn;

    public function __construct($dbConnection)
    {
        $this->conn = $dbConnection;

        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function seed()
    {
        $passwordHash = password_hash('superadmin1', PASSWORD_BCRYPT);

        // Seed users
        $userSql = "INSERT INTO users (firstname, lastname, email, password, user_type) VALUES
            ('admin', 'admin', 'admin@smcbi.edu.ph', '$passwordHash', 'admin'),
            ('Jane', 'Smith', 'student@smcbi.edu.ph', '$passwordHash', 'user')";

        if ($this->conn->query($userSql) === TRUE) {
            echo "Users seeded successfully.\n";
        } else {
            echo "Error seeding users: " . $this->conn->error . "\n";
        }

        // Seed form visibility
        $formSql = "INSERT INTO form_settings (id, is_published) VALUES (1, 0)
                    ON DUPLICATE KEY UPDATE is_published = is_published";

        if ($this->conn->query($formSql) === TRUE) {
            echo "Form settings seeded successfully.\n";
        } else {
            echo "Error seeding form settings: " . $this->conn->error . "\n";
        }
    }
}

// Command-line arguments
$arguments = getopt("f:", ["seed"]);
$seeder = new DatabaseSeeder($conn);

if (isset($arguments['seed'])) {
    $seeder->seed();
}
