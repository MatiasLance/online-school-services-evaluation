<!-- Navbar -->
<?php include __DIR__ . '/../navbar.php' ?>

<div class="container student-view-form-container">
    <div class="row">
        <form id="formFeedBack" class="d-flex flex-column w-100">
            <input type="hidden" id="formTemplateId">
            <div class="col" id="formStudentTemplateContainer"></div>
            <div class="d-flex justify-content-end mt-2">
                <button type="submit" class="btn btn-vibrant-golden-yellow me-2" id="submitFeedBack">
                    <span>Submit Feedback</span>
                </button>
            </div>
        </form>
    </div>
</div>

<!-- Footer -->
<?php include __DIR__ . '/../footer.php' ?>