<!-- Navbar -->
<?php include __DIR__ . '/../navbar.php' ?>

<div class="flex-grow-1 d-flex">
    <?php include __DIR__ . '/../sidebar-content.php' ?>

    <main class="container-fluid container-content flex-grow-1 p-4">
      <div class="row">
        <div class="col">
            <div class="card fade-in">
                <div class="card-header bg-custom-blue text-white p-3">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="card-title mb-0">
                            <i class="ri-bar-chart-2-line me-2"></i>
                            Overall Score
                        </h5>
                        <h5 id="evaluated-year"></h5>
                    </div>
                </div>

                <div class="card-body">
                    <div class="mb-5">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="mb-0 text-muted">Registrar Service</h6>
                            <span class="badge bg-custom-blue fs-5 px-3 py-2" id="registrar-satisfaction-percent"></span>
                        </div>

                        <div class="progress mb-3" style="height: 20px;">
                            <div id="registrar-satisfaction-bar" class="progress-bar bg-custom-blue" role="progressbar" style="width: 0;" aria-valuenow="86" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>

                    <!-- <div class="mb-5">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="mb-0 text-muted">Student Service</h6>
                            <span class="badge bg-custom-blue fs-5 px-3 py-2" id="student-satisfaction-percent"></span>
                        </div>

                        <div class="progress mb-3" style="height: 20px;">
                            <div id="student-satisfaction-bar" class="progress-bar bg-custom-blue" role="progressbar" style="width: 0;" aria-valuenow="86" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div> -->
                </div>
            </div>
            
        </div>
      </div>
    </main>
</div>

<!-- Modal -->
<?php
    include __DIR__ . '/../modal/manage-system-logo-modal.php';
    include __DIR__ . '/../modal/category/add-category-modal.php';
    include __DIR__ . '/../modal/category/edit-category-modal.php';
    include __DIR__ . '/../modal/category/delete-category-modal.php';
    include __DIR__ . '/../modal/category/ask-password-modal.php';
    include __DIR__ . '/../modal/department/add-department-modal.php';
    include __DIR__ . '/../modal/department/edit-department-modal.php';
    include __DIR__ . '/../modal/department/delete-department-modal.php';
    include __DIR__ . '/../modal/department/ask-password-modal.php';
    include __DIR__ . '/../modal/user-account/add-user-account-modal.php';
    include __DIR__ . '/../modal/user-account/edit-user-account-modal.php';
    include __DIR__ . '/../modal/user-account/delete-user-account-modal.php';
    include __DIR__ . '/../modal/user-account/ask-password-modal.php';
    include __DIR__ . '/../modal/profile/edit-profile-modal.php';
    include __DIR__ . '/../modal/student/add-student-account-modal.php';
    include __DIR__ . '/../modal/student/retrieve-student-account-modal.php';
    include __DIR__ . '/../modal/student/preview-student-account-modal.php';
    include __DIR__ . '/../modal/student/delete-student-account-modal.php';
?>

<!-- Footer -->
<?php include __DIR__ . '/../footer.php' ?>