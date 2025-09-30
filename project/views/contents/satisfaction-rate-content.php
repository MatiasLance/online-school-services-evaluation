<!-- Navbar -->
<?php include __DIR__ . '/../navbar.php' ?>
<?php include __DIR__ . '/../sidebar-content.php' ?>

<div class="flex-grow-1 d-flex">
    <main class="container-fluid container-content flex-grow-1 p-4">
      <div class="row">
        <div class="col">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="2025-tab" data-bs-toggle="tab" data-bs-target="#2025-tab-pane" type="button" role="tab" aria-controls="2025-tab-pane" aria-selected="true">2025</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="2026-tab" data-bs-toggle="tab" data-bs-target="#2026-tab-pane" type="button" role="tab" aria-controls="2026-tab-pane" aria-selected="false">2026</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="2027-tab" data-bs-toggle="tab" data-bs-target="#2027-tab-pane" type="button" role="tab" aria-controls="2027-tab-pane" aria-selected="false">2027</button>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="2025-tab-pane" role="tabpanel" aria-labelledby="2025-tab" tabindex="0">
                    <?php include __DIR__ . '/../tabs/2025-tab.php'; ?>
                </div>
                <div class="tab-pane fade" id="2026-tab-pane" role="tabpanel" aria-labelledby="2026-tab" tabindex="0">
                    <?php include __DIR__ . '/../tabs/2026-tab.php'; ?>
                </div>
                <div class="tab-pane fade" id="2027-tab-pane" role="tabpanel" aria-labelledby="2027-tab" tabindex="0">
                         <?php include __DIR__ . '/../tabs/2027-tab.php'; ?>
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