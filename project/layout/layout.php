<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="keywords" content="Online School Service Evaluation">
<meta name="description" content="Online School Service Evaluation">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php echo htmlspecialchars($pageTitle ?? 'Online School Service Evaluation'); ?></title>
<link rel="icon" type="image/x-icon" href="https://i.imgur.com/HLqsP73.png">
<link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<link rel="stylesheet" href="https://unpkg.com/bs-brain@2.0.4/components/error-404s/error-404-1/assets/css/error-404-1.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" rel="stylesheet">
<link rel="stylesheet" href="./assets/css/main.css">
<?php
    if(isset($pageCss) && is_array($pageCss)) {
        foreach($pageCss as $cssFile) {
            echo '<link rel="stylesheet" href="' . htmlspecialchars($cssFile) . '">' . "\n";
        }
    }
?>
</head>
<body class="d-flex flex-column min-vh-100">
<?php 
    if (isset($pageContent)) {
        require $pageContent;
    }
?>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>

<?php
    if (isset($pageJS) && is_array($pageJS)) {
        foreach ($pageJS as $jsFile) {
            echo '<script src="' . htmlspecialchars($jsFile) . '"></script>' . "\n";
        }
    }
?>
</body>
</html>