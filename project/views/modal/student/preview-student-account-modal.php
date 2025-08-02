<!-- Delete Confirmation Modal -->
<div class="modal fade" id="previewStudentAccountModal" tabindex="-1" aria-labelledby="previewStudentAccountModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header modal-warning-header">
                <h1 class="modal-title fs-5" id="previewStudentAccountModalLabel">Delete</h1>
                <button type="button" class="btn-close modal-warning-close-button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
                <p class="fs-6 text-muted">Are you sure you want to delete <strong id="studentAccountToBeDeleted"></strong>? This action cannot be undone.</p>
            </div>
            <div class="modal-footer">
                <button 
                    type="button" 
                    class="btn btn-danger d-flex align-items-center gap-2 px-3 py-2 btn-sm" 
                    data-bs-toggle="modal" 
                    data-bs-target="#deleteStudentAccountModal" 
                    data-bs-auto-close="false"
                >
                    <i class="bi bi-arrow-right" style="font-size: 1.1rem;"></i>
                    <span>Continue</span>
                </button>
            </div>
        </div>
    </div>
</div>