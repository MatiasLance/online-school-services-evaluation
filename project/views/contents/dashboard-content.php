<!-- Navbar -->
<?php include __DIR__ . '/../navbar.php' ?>

<div class="container dashboard-tabs-container">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link dashboard-nav-link active" id="category-tab" data-bs-toggle="tab" data-bs-target="#category-tab-pane" type="button" role="tab" aria-controls="category-tab-pane" aria-selected="true">Categories</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link dashboard-nav-link" id="department-tab" data-bs-toggle="tab" data-bs-target="#department-tab-pane" type="button" role="tab" aria-controls="department-tab-pane" aria-selected="false">Department</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link dashboard-nav-link" id="forms-tab" data-bs-toggle="tab" data-bs-target="#forms-tab-pane" type="button" role="tab" aria-controls="forms-tab-pane" aria-selected="false">Forms</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link dashboard-nav-link" id="users-account-tab" data-bs-toggle="tab" data-bs-target="#users-account-tab-pane" type="button" role="tab" aria-controls="users-account-tab-pane" aria-selected="false">Users Account</button>
        </li>
    </ul>

    <div class="tab-content mt-4" id="myTabContent">
        <div class="tab-pane fade show active" id="category-tab-pane" role="tabpanel" aria-labelledby="category-tab" tabindex="0">
            <?php include __DIR__  . '/categories-content.php' ?>
        </div>
        <div class="tab-pane fade" id="department-tab-pane" role="tabpanel" aria-labelledby="department-tab" tabindex="0">
            <?php include __DIR__  . '/department-content.php' ?>
        </div>
        <div class="tab-pane fade" id="forms-tab-pane" role="tabpanel" aria-labelledby="forms-tab" tabindex="0">

        </div>
        <div class="tab-pane fade" id="users-account-tab-pane" role="tabpanel" aria-labelledby="users-tab" tabindex="0">
            <?php include __DIR__  . '/user-account-content.php' ?>
        </div>
    </div>
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
?>

<!-- Footer -->
<?php include __DIR__ . '/../footer.php' ?>