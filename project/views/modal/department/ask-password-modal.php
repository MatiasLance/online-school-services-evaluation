<!-- Modal -->
<div class="modal fade" id="departmentAskPasswordModal" tabindex="-1" aria-labelledby="departmentAskPasswordModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modal-danger-header ">
        <h1 class="modal-title fs-5 modal-danger-title" id="departmentAskPasswordModalLabel">Enter your password to confirm the deletion.</h1>
        <button type="button" class="btn-close modal-danger-close-button" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="departmentIdToBeDeleted">

        <div class="mb-3">
            <label for="departmentPasswordFormControlInput1" class="form-label fw-bold">Password</label>
            <input type="password" class="form-control" id="departmentPasswordFormControlInput1" required>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" id="deleteDepartmentDetail" class="btn btn-vibrant-golden-yellow btn-sm" data-bs-dismiss="modal">Delete</button>
      </div>
    </div>
  </div>
</div>