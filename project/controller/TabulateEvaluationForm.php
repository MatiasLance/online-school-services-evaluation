<?php
require_once __DIR__ . '/../config/db_connection.php';

header('Content-Type: application/json');

// Query to count service rates
$service_rate_sql = "
    SELECT 
        service_rate, COUNT(*) AS count 
    FROM evaluation_form 
    GROUP BY service_rate 
    ORDER BY FIELD(service_rate, 'Excellent', 'Good', 'Fair', 'Poor')
";

$service_rate_result = $conn->query($service_rate_sql);
$service_rates = [];

if ($service_rate_result->num_rows > 0) {
    while ($row = $service_rate_result->fetch_assoc()) {
        $service_rates[] = $row;
    }
}

// Query to count recommendation selections (Yes/No)
$recommend_sql = "
    SELECT 
        recommend_service, COUNT(*) AS count 
    FROM evaluation_form 
    GROUP BY recommend_service 
    ORDER BY FIELD(recommend_service, 'Yes', 'No')
";

$recommend_result = $conn->query($recommend_sql);
$recommend_data = [];

if ($recommend_result->num_rows > 0) {
    while ($row = $recommend_result->fetch_assoc()) {
        $recommend_data[] = $row;
    }
}

// Query to count gender
$gender_sql = "
    SELECT 
        gender, COUNT(*) AS count 
    FROM evaluation_form 
    GROUP BY gender 
    ORDER BY FIELD(gender, 'Male', 'Female', 'Other')
";
$gender_result = $conn->query($gender_sql);
$gender_data = [];

if ($gender_result->num_rows > 0) {
    while ($row = $gender_result->fetch_assoc()) {
        $gender_data[] = $row;
    }
}

// Query to count emails by domain
$email_sql = "
    SELECT 
        SUBSTRING_INDEX(email, '@', -1) AS domain, 
        COUNT(*) AS count,
        GROUP_CONCAT(email SEPARATOR ', ') AS emails
    FROM evaluation_form 
    GROUP BY domain
";

$email_result = $conn->query($email_sql);
$email_data = [];

if ($email_result->num_rows > 0) {
    while ($row = $email_result->fetch_assoc()) {
        $email_data[] = $row;
    }
}

echo json_encode([
    "service_rates" => $service_rates,
    "recommend_data" => $recommend_data,
    "gender_data" => $gender_data,
    "email_data" => $email_data
]);

$conn->close();
