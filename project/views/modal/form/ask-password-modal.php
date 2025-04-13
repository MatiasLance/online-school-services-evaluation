<!-- Modal -->
<div class="modal fade" id="askPasswordModal" tabindex="-1" aria-labelledby="askPasswordModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modal-danger-header ">
        <h1 class="modal-title fs-5 modal-danger-title" id="askPasswordModalLabel">Enter your password to confirm the deletion.</h1>
        <button type="button" class="btn-close modal-danger-close-button" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="formIdToBeDeleted">

        <div class="mb-3">
            <label for="passwordFormControlInput1" class="form-label fw-bold">Password</label>
            <input type="password" class="form-control" id="passwordFormControlInput1" required>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" id="deleteForm" class="btn btn-vibrant-golden-yellow btn-sm" data-bs-dismiss="modal">Delete</button>
      </div>
    </div>
  </div>
</div>