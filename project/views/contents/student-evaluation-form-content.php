<!-- Navbar -->
<?php include __DIR__ . '/../navbar.php' ?>

<div class="container student-view-form-container">
    <ul class="nav nav-tabs justify-content-center mb-5" id="myTab" role="tablist">
        <li class="nav-item">
            <button class="nav-link form-nav-link active" id="backToCategorySelection" type="button">Back to Category Selection</button>
        </li>
    </ul>
    <div class="row" id="displayNoteMessage">
        <form id="formFeedBack" enctype="multipart/form-data" class="d-flex flex-column w-100">
            <input type="hidden" name="form_id" id="formTemplateId">
            <input type="hidden" name="form_version_id" id="formVersionId">
            <input type="hidden" name="student_form_feedback_id" value="<?php echo $_SESSION['student_id'] ?>">
            <div class="col" id="formStudentTemplateContainer"></div>
            <div class="d-flex justify-content-end mt-2">
                <button type="submit" class="btn btn-vibrant-golden-yellow me-2">
                    <span>Submit Feedback</span>
                </button>
            </div>
        </form>
    </div>
</div>


<!-- Footer -->
<?php
    include __DIR__ . '/../modal/form/view-student-response-modal.php';
    include __DIR__ . '/../modal/profile/student-edit-profile-modal.php';
    include __DIR__ . '/../footer.php';
 ?>