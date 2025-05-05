<!-- Navbar -->
<?php include __DIR__ . '/../navbar.php' ?>

<!-- Categories for Evaluation -->
 <div class="form-container">
    <div class="container">
        <input type="hidden" id="studentLoginId" value="<?php echo $_SESSION['student_id'] ?>">
        <select class="form-select form-select-lg mb-3" aria-label="Select category" id="studentSelectCategory">
            <option selected disabled>Select category to evaluate.</option>
        </select>
        <button type="button" class="btn btn-vibrant-golden-yellow" id="proceedToAssignedForm">
            Proceed
        </button>
    </div>
 </div>

<!-- Footer -->
<?php include __DIR__ . '/../footer.php' ?>