<!-- Modal -->
<div class="modal fade" id="retrieveDepartmentModal" tabindex="-1" aria-labelledby="retrieveDepartmentModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modal-primary-header">
        <h1 class="modal-title modal-primary-title fs-5" id="retrieveDepartmentModalLabel">Edit Department</h1>
        <button type="button" class="btn-close modal-primary-button-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="departmentId">
        <div class="mb-3">
            <label for="editedDepartmentFormControlInput1" class="form-label fw-bold">Department</label>
            <input type="text" class="form-control" id="editedDepartmentFormControlInput1">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" id="saveEditedDepartmentDetail" class="btn btn-vibrant-golden-yellow btn-sm" data-bs-dismiss="modal">Save</button>
      </div>
    </div>
  </div>
</div>