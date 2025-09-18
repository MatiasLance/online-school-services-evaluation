<!-- Navbar -->
<?php include __DIR__ . '/../../navbar.php' ?>

<div class="flex-grow-1 d-flex">
    <?php include __DIR__ . '/../../sidebar-content.php' ?>

    <main class="container-fluid container-content flex-grow-1 p-4">
      <div class="row print-only">
        <div class="col-12 mb-4">
            <div class="card fade-in">
                <div class="card-header bg-custom-blue text-center py-4">
                    <h5 class="card-title mb-0">Guidance Service Evaluation Result</h5>
                </div>
            </div>

            <div class="d-flex flex-row-reverse gap-4 my-4 not-print">
                <button 
                    type="button" 
                    class="btn btn-vibrant-golden-yellow btn-sm d-flex align-items-center gap-2" 
                    id="refreshGuidanceServiceEvaluationResult"
                >
                    <i class="fas fa-arrows-rotate" style="font-size: 1.2rem;"></i>
                    <span>Refresh</span>
                </button>
                <button 
                    type="button" 
                    class="btn btn-vibrant-bright-teal-color btn-sm d-flex align-items-center gap-2" 
                    id="guidancePrintResult"
                >
                    <i class="bi bi-printer" style="font-size: 1.2rem;"></i>
                    <span>Print Result</span>
                </button>
            </div>

            <?php
                include __DIR__ . '/response-content.php';
            ?>
        </div>
         <?php
            include __DIR__ . '/most-common-response-content.php';
            include __DIR__ . '/general-weight-average.php';
            include __DIR__ . '/summary-note.php';
         ?>
      </div>
    </main>
</div>

<!-- Modal -->
<?php include __DIR__ . '/../../modal/profile/edit-profile-modal.php'; ?>

<!-- Footer -->
<?php include __DIR__ . '/../../footer.php' ?>