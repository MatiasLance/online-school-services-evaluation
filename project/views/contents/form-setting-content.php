<div class="row d-flex justify-content-center align-items-center">
    <div class="card shadow-sm" style="width: 50rem;">
        <form id="saveFormSettingChanges">
            <input type="hidden" name="form_setting_template_id" id="formSettingTemplateId">
            <div class="card-body">
                <!-- Header -->
                <h5 class="card-title text-center mb-4">Form Settings</h5>

                <hr class="my-4" />

                <!-- Switch Toggle -->
                 <div class="d-flex justify-content-end">
                    <div class="form-check form-switch mb-3 ">
                        <input class="form-check-input" type="checkbox" role="switch" name="publish" id="switchCheckPublishFormDefault">
                        <label class="form-check-label text-muted" for="switchCheckPublishFormDefault">Publish</label>
                    </div>
                 </div>

                <!-- Assign Student -->
                <div class="mb-3">
                    <label for="assignStudent" class="form-label">Assign Student</label>
                    <select class="form-select" id="assignStudent" name="assign_student" aria-label="Assign Student" multiple>
                        <option value="" selected>Select a student</option>
                    </select>
                </div>

                <!-- Selected Students Display -->
                <h5 class="card-title text-center mb-4">Selected Students</h5>

                <div class="row g-3 mb-3" id="selectedStudentsContainer"></div>

                <!-- Category -->
                <div class="mb-3">
                    <label for="category" class="form-label">Category</label>
                    <select class="form-select" id="assignCategory" name="assign_category" aria-label="Category">
                        <option value="" selected>Select a category</option>
                    </select>
                </div>

                <!-- Department -->
                <div class="mb-3">
                    <label for="department" class="form-label">Department</label>
                    <select class="form-select" id="assignDepartment" name="assign_department" aria-label="Department">
                        <option selected>Select a department</option>
                    </select>
                </div>

                <!-- Footer -->
                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-vibrant-golden-yellow">
                        <span>Save Changes</span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>