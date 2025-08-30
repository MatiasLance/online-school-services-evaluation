<!-- Navbar -->
<?php include __DIR__ . '/../navbar.php' ?>

<div class="flex-grow-1 d-flex">
    <?php include __DIR__ . '/../sidebar-content.php' ?>

    <main class="container-fluid container-content flex-grow-1 p-4">
      <div class="row">

      <div class="card shadow-sm border-0 rounded-3 mb-5">
            <!-- Card Header -->
            <div class="card-header bg-primary text-white d-flex align-items-center p-3">
                <i class="ri-user-settings-line fs-4 me-2"></i>
                <h5 class="card-title mb-0">Registrar Evaluation Result</h5>
            </div>

            <!-- Card Body -->
            <div class="card-body">
                <!-- Evaluation Summary Text -->
                <p class="card-text text-dark mb-4">
                The registrar’s performance has been evaluated based on accuracy, timeliness, compliance with academic policies, and communication with faculty and students.
                </p>

                <p class="card-text text-dark mb-4">
                All required documentation was processed within the designated turnaround time. Data entry accuracy was consistently high, with no critical errors reported during the review period.
                </p>

                <p class="card-text text-dark mb-0">
                The registrar demonstrated strong organizational skills and played a key role in ensuring smooth academic operations. Feedback from departments was overwhelmingly positive.
                </p>

                <!-- Status Badge -->
                <div class="d-flex justify-content-end mt-4">
                <span class="badge bg-success bg-opacity-20 text-white fs-6 px-3 py-2">
                    <i class="ri-checkbox-circle-line me-1"></i>
                    Evaluation: Approved
                </span>
                </div>
            </div>

            <!-- Footer: Evaluator & Date -->
            <div class="card-footer bg-light border-0 py-2 px-3">
                <small class="text-muted">
                Evaluated by: <strong>Admin User</strong> • <time datetime="2025-04-05">Apr 5, 2025</time>
                </small>
            </div>
        </div>

        <?php include __DIR__ . '/form-response-content.php'; ?>

        <div class="card shadow-sm border-0 rounded-3 overflow-hidden mt-4">
            <!-- Card Header -->
            <div class="card-header bg-primary text-white p-3">
                <h5 class="card-title mb-0">
                <i class="ri-bar-chart-2-line me-2"></i>
                Evaluation Summary
                </h5>
            </div>

            <!-- Card Body -->
            <div class="card-body p-4">
                <!-- Overall Score -->
                <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="mb-0 text-muted">Overall Score</h6>
                <span class="badge bg-success fs-5 px-3 py-2">86%</span>
                </div>

                <!-- Progress Bar -->
                <div class="progress mb-3" style="height: 10px;">
                <div
                    class="progress-bar bg-success"
                    role="progressbar"
                    style="width: 86%;"
                    aria-valuenow="86"
                    aria-valuemin="0"
                    aria-valuemax="100"
                ></div>
                </div>

                <!-- Score Details -->
                <div class="row text-center mt-4 g-3">
                <div class="col-6 col-md-3">
                    <div class="p-2 bg-light rounded">
                    <small class="text-muted">Accuracy</small>
                    <div class="fw-bold text-dark">92%</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="p-2 bg-light rounded">
                    <small class="text-muted">Completeness</small>
                    <div class="fw-bold text-dark">88%</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="p-2 bg-light rounded">
                    <small class="text-muted">Timeliness</small>
                    <div class="fw-bold text-dark">78%</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="p-2 bg-light rounded">
                    <small class="text-muted">Clarity</small>
                    <div class="fw-bold text-dark">86%</div>
                    </div>
                </div>
                </div>

                <!-- Status Message -->
                <div class="alert alert-success mt-4 mb-0 p-3 text-center" role="alert">
                <i class="ri-check-double-line me-1"></i>
                <strong>Performance Level:</strong> Exceeds Expectations
                </div>
            </div>

            <!-- Optional Footer -->
            <div class="card-footer bg-light p-3 text-end">
                <small class="text-muted">Last evaluated: Apr 5, 2025</small>
            </div>
        </div>

        <div class="card shadow-sm border-0 rounded-3 mt-4">
            <!-- Optional Header -->
            <div class="card-header bg-white border-0 pb-0">
                <h5 class="card-title mb-0 text-primary">
                <i class="ri-information-line me-2"></i>
                Evaluation Notes
                </h5>
            </div>

            <!-- Card Body -->
            <div class="card-body">
                <p class="card-text text-dark">
                The candidate demonstrated strong attention to detail and consistently met deadlines. 
                All required documentation was submitted on time and formatted correctly.
                </p>

                <p class="card-text text-dark mb-0">
                Areas for improvement include clearer communication in team settings and more proactive 
                follow-up on pending tasks. Overall performance exceeds baseline expectations for this role.
                </p>
            </div>

            <!-- Optional Footer -->
            <div class="card-footer bg-light border-0 pt-0">
                <small class="text-muted">
                Reviewed by: <strong>Admin User</strong> • Apr 5, 2025
                </small>
            </div>
        </div>

         <div class="col-lg-8 col-md-10">
            <!-- Stats Card -->
            <div class="card stats-card p-4 fade-in">
            <h6 class="text-muted mb-3">Live Poll Result</h6>

            <!-- Question -->
            <p class="question-text mb-4">
                What is your preferred programming language?
            </p>

            <!-- Answer Count with Animated Counter -->
            <div class="mb-4">
                <h5 class="text-secondary">Total Responses</h5>
                <div class="counter" id="answerCounter">0</div>
            </div>

            <!-- Most Common Answer -->
            <div>
                <h5 class="text-secondary">Most Common Answer</h5>
                <div class="common-answer">JavaScript</div>
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