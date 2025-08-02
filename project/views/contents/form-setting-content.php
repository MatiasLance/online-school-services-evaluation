<div class="row d-flex justify-content-center mt-5">
  <div class="col-md-8 col-lg-6">
    <div class="card shadow-sm border-0 rounded-3">
      <form id="saveFormSettingChanges">
        <input type="hidden" name="form_setting_template_id" id="formSettingTemplateId">

        <div class="card-body p-4">

          <!-- Header -->
          <h5 class="card-title text-center mb-4">Form Settings</h5>
          <p class="text-center text-muted small mb-4">Configure your form settings below.</p>

          <hr class="my-4" />

          <!-- Publish Toggle -->
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h6 class="mb-1">Publish Form</h6>
              <p class="text-muted small mb-0">Toggle to make this form visible to students.</p>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" name="publish" id="switchCheckPublishFormDefault">
              <label class="form-check-label" for="switchCheckPublishFormDefault">Publish</label>
            </div>
          </div>

          <!-- Assign Student -->
          <div class="mb-4">
            <label for="assignStudent" class="form-label fw-semibold">Assign Student(s)</label>
            <select class="form-select" id="assignStudent" name="assign_student" aria-label="Assign Student" multiple>
              <option value="" selected>Select a student</option>
              <!-- Options will be populated dynamically -->
            </select>
            <div class="form-text">Hold Ctrl (or Command) to select multiple students.</div>
          </div>

          <!-- Selected Students Display -->
          <h6 class="mb-3">Selected Students</h6>
          <div class="row g-2 mb-4" id="selectedStudentsContainer">
            <!-- Dynamic student badges go here -->
          </div>

          <!-- Category -->
          <div class="mb-4">
            <label for="assignCategory" class="form-label fw-semibold">Assign Category</label>
            <select class="form-select" id="assignCategory" name="assign_category" aria-label="Category">
              <option value="" selected>Select a category</option>
              <!-- Options will be populated dynamically -->
            </select>
          </div>

          <!-- Department -->
          <div class="mb-4">
            <label for="assignDepartment" class="form-label fw-semibold">Assign Department</label>
            <select class="form-select" id="assignDepartment" name="assign_department" aria-label="Department">
              <option value="" selected>Select a department</option>
              <!-- Options will be populated dynamically -->
            </select>
          </div>

          <!-- Save Button -->
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-vibrant-golden-yellow px-4 py-2">
              <i class="bi bi-save me-1"></i> Save Changes
            </button>
          </div>

        </div>
      </form>
    </div>
  </div>
</div>