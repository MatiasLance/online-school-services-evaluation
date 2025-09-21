<!-- Navbar -->
<?php include __DIR__ . '/../../navbar.php' ?>

<div class="flex-grow-1 d-flex">
    <?php include __DIR__ . '/../../sidebar-content.php' ?>

    <main class="container-fluid container-content flex-grow-1 p-4">
      <div class="row">
        <div class="col-12 mb-4">
          <div class="card fade-in shadow-sm">
            <div class="card-header bg-custom-blue text-center py-4">
                <h5 class="card-title mb-0">Campus Ministry Service Feedback</h5>
            </div>
          </div>

          <div class="d-flex flex-row-reverse mt-4 gap-4">
            <button 
                    type="button" 
                    class="btn bg-custom-blue btn-sm d-flex align-items-center gap-2" id="listAllCampusMinistryFeedbacks"
                    data-bs-toggle="modal" data-bs-target="#campusMinistryViewFeedbacksModal"
                >
                    <i class="fas fa-eye" style="font-size: 1.2rem;"></i>
                    <span>View Feedbacks</span>
                </button>
              <button 
                  type="button" 
                  class="btn btn-vibrant-golden-yellow btn-sm d-flex align-items-center gap-2" 
                  id="refreshCampusMinistryServiceEvaluationResult"
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
<?php include __DIR__ . '/../../modal/feedback/CampusMinistryViewFeedbacksModal.php'; ?>

<!-- Footer -->
<?php include __DIR__ . '/../../footer.php' ?>