<!-- Modal -->
<div class="modal fade" id="retrieveCategoryModal" tabindex="-1" aria-labelledby="retrieveCategoryModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modal-primary-header">
        <h1 class="modal-title modal-primary-title fs-5" id="retrieveCategoryModalLabel">Edit Category Details</h1>
        <button type="button" class="btn-close modal-primary-button-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="categoryId">
        <div class="mb-3">
            <label for="categoryNameFormControlInput1" class="form-label fw-bold">Category Name</label>
            <input type="text" class="form-control" id="editedCategoryNameFormControlInput1">
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" id="saveEditedCategoryDetail" class="btn btn-vibrant-golden-yellow btn-sm" data-bs-dismiss="modal">Save</button>
      </div>
    </div>
  </div>
</div>