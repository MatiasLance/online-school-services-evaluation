<!-- Navbar -->
<?php include __DIR__ . '/../navbar.php' ?>

<!-- Categories for Evaluation -->
 <div class="form-container">
    <div class="container">
        <input type="hidden" id="studentLoginId" value="<?php echo $_SESSION['student_id'] ?>">
        <div class="row" id="studentCategorySelectionContainer"></div>
    </div>
 </div>

<!-- Footer -->
<?php include __DIR__ . '/../footer.php' ?>