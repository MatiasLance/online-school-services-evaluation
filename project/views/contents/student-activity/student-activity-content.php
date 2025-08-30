<!-- Navbar -->
<?php include __DIR__ . '/../../navbar.php' ?>

<div class="flex-grow-1 d-flex">
    <?php include __DIR__ . '/../../sidebar-content.php' ?>

    <main class="container-fluid container-content flex-grow-1 p-4">
      <div class="row">

      <div class="card shadow-sm border-0 rounded-3 mb-5">
            <div class="card-header bg-custom-blue text-center p-3">
                <h5 class="card-title mb-0">Student Activity Service Evaluation Result</h5>
            </div>
        </div>

        <?php
            include __DIR__ . '/response-content.php';
            include __DIR__ . '/most-common-response-content.php';
            include __DIR__ . '/general-weight-average.php';
        ?>

      </div>
    </main>
</div>

<!-- Modal -->
<?php include __DIR__ . '/../../modal/profile/edit-profile-modal.php'; ?>

<!-- Footer -->
<?php include __DIR__ . '/../../footer.php' ?>