<div class="row d-flex justify-content-center align-items-center">
    <div class="card shadow-sm" style="width: 50rem;">
        <form>
            <div class="card-body">
                <!-- Header -->
                <h5 class="card-title text-center mb-4">Form Settings</h5>

                <hr class="my-4" />

                <!-- Switch Toggle -->
                 <div class="d-flex justify-content-end">
                    <div class="form-check form-switch mb-3 ">
                        <input class="form-check-input" type="checkbox" role="switch" id="switchCheckDefault">
                        <label class="form-check-label text-muted" for="switchCheckDefault">Publish</label>
                    </div>
                 </div>

                <!-- Assign Student -->
                <div class="mb-3">
                    <label for="assignStudent" class="form-label">Assign Student</label>
                    <select class="form-select" id="assignStudent" aria-label="Assign Student">
                        <option selected>Select a student</option>
                        <option value="student1">John Doe</option>
                        <option value="student2">Jane Smith</option>
                        <option value="student3">Alice Johnson</option>
                    </select>
                </div>

                <!-- Category -->
                <div class="mb-3">
                    <label for="category" class="form-label">Category</label>
                    <select class="form-select" id="category" aria-label="Category">
                        <option selected>Select a category</option>
                        <option value="math">Mathematics</option>
                        <option value="science">Science</option>
                        <option value="arts">Arts</option>
                    </select>
                </div>

                <!-- Department -->
                <div class="mb-3">
                    <label for="department" class="form-label">Department</label>
                    <select class="form-select" id="department" aria-label="Department">
                        <option selected>Select a department</option>
                        <option value="engineering">Engineering</option>
                        <option value="medicine">Medicine</option>
                        <option value="business">Business</option>
                    </select>
                </div>

                <!-- Footer -->
                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                </div>
            </div>
        </form>
    </div>
</div>