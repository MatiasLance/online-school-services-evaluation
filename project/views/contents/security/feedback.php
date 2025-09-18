<!-- Navbar -->
<?php include __DIR__ . '/../../navbar.php' ?>

<div class="flex-grow-1 d-flex">
    <?php include __DIR__ . '/../../sidebar-content.php' ?>

    <main class="container-fluid container-content flex-grow-1 p-4">
      <div class="row">
        <div class="col-12 mb-4">
            <div class="card fade-in">
                <div class="card-header bg-custom-blue text-center py-4">
                    <h5 class="card-title mb-0">Security Service Feedback</h5>
                </div>
            </div>

            <div class="d-flex flex-row-reverse mt-4">
                <button 
                    type="button" 
                    class="btn btn-vibrant-golden-yellow btn-sm d-flex align-items-center gap-2" 
                    id="refreshSecurityServiceEvaluationResult"
                >
                    <i class="fas fa-arrows-rotate" style="font-size: 1.2rem;"></i>
                    <span>Refresh</span>
                </button>
            </div>
        </div>

        <?php
            include __DIR__ . '/feedback-mca-content.php';
        ?>

      </div>
    </main>
</div>

<!-- Modal -->
<?php include __DIR__ . '/../../modal/profile/edit-profile-modal.php'; ?>

<!-- Footer -->
<?php include __DIR__ . '/../../footer.php' ?>