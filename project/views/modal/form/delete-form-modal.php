<!-- Delete Confirmation Modal -->
<div class="modal fade" id="deleteFormModal" tabindex="-1" aria-labelledby="deleteFormModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header modal-warning-header">
            <h1 class="modal-title fs-5" id="deleteFormModalLabel">Delete</h1>
            <button type="button" class="btn-close modal-warning-close-button" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <p class="fs-6 text-muted">Are you sure you want to delete <strong id="formNameToBeDeleted"></strong>? This action cannot be undone.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-vibrant-golden-yellow btn-sm" data-bs-toggle="modal" data-bs-target="#askPasswordModal" data-bs-auto-close="false">Continue</button>
          </div>
        </div>
      </div>
    </div>