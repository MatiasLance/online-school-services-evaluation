<!-- Modal -->
<div class="modal fade" id="studentProfileModal" tabindex="-1" aria-labelledby="studentProfileModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modal-primary-header">
        <h1 class="modal-title modal-primary-title fs-5" id="studentprofileModalLabel">Edit Profile</h1>
        <button type="button" class="btn-close modal-primary-button-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="saveEditStudentDetailAccount">
      <div class="modal-body">
        <input type="hidden" id="studentProfileId" value="<?php echo isset($_SESSION['student_id']) ? $_SESSION['student_id']: null; ?>">

         <div class="col-12 mb-3">
            <label for="editStudentFirstName" class="form-label montserrat-medium">First Name <span class="text-danger">*</span></label>
            <div class="input-group">
            <span class="input-group-text">
                <i class="bi bi-person"></i>
            </span>
            <input type="text" class="form-control" id="editStudentFirstName" name="first_name">
            </div>
        </div>

         <div class="col-12 mb-3">
            <label for="editStudentLastName" class="form-label montserrat-medium">Last Name <span class="text-danger">*</span></label>
            <div class="input-group">
            <span class="input-group-text">
                <i class="bi bi-person"></i>
            </span>
            <input type="text" class="form-control" id="editStudentLastName" name="last_name">
            </div>
        </div>

        <div class="col-12 mb-3">
            <label for="editStudentEmail" class="form-label montserrat-medium">Email <span class="text-danger">*</span></label>
            <div class="input-group">
            <span class="input-group-text">
                <i class="bi bi-envelope"></i>
            </span>
            <input type="email" class="form-control" id="editStudentEmail" name="email" pattern="^[a-zA-Z0-9._%+-]+@smcbi\.edu\.ph$" title="Only emails ending in @smcbi.edu.ph are allowed">
            </div>
            <small id="emailFeedback" class="form-text"></small>
        </div>

        <div class="col-12 mb-3">
            <label for="editStudentGender" class="form-label montserrat-medium">Gender <span class="text-danger">*</span></label>
            <div class="input-group">
                <label class="input-group-text" for="editStudentGender">
                    <i class="bi bi-gender-neuter"></i>
                </label>
                <select class="form-select" id="editStudentGender" name="gender">
                    <option value="" disabled selected>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
        </div>

        <div class="col-12 mb-3">
            <label for="editStudentYearLevel" class="form-label montserrat-medium">Year Level <span class="text-danger">*</span></label>
            <div class="input-group">
                <label class="input-group-text" for="editStudentYearLevel">
                    <i class="bi bi-bar-chart"></i>
                </label>
                <select class="form-select" id="editStudentYearLevel" name="year_level">
                    <option value="" disabled selected>Select Year Level</option>
                    <option value="1st Year">First Year</option>
                    <option value="2nd Year">Second Year</option>
                    <option value="3rd Year">Third Year</option>
                    <option value="4th Year">Fourth Year</option>
                </select>
            </div>
        </div>

        <div class="col-12 mb-3">
            <label for="editStudentDepartment" class="form-label montserrat-medium">Department<span class="text-danger">*</span></label>
            <div class="input-group">
                <label class="input-group-text" for="editStudentDepartment">
                    <i class="bi bi-mortarboard"></i>
                </label>
                <select class="form-select" id="editStudentDepartment" name="department">
                    <option value="" disabled selected>Select Department</option>
                    <option value="BSIT">BS Information Technology</option>
                    <option value="BSBA">BS Business Administration</option>
                    <option value="BSHM">BS Hospitality Management</option>
                    <option value="BSED">BS Education</option>
                    <option value="BEED">BS Elementary Education</option>
                </select>
            </div>
        </div>

         <!-- Section Selection -->
        <div class="col-12 mb-3">
            <label for="editStudentSection" class="form-label montserrat-medium">Section<span class="text-danger">*</span></label>
            <div class="input-group">
                <label class="input-group-text" for="editStudentSection">
                    <i class="bi bi-mortarboard"></i>
                </label>
                <select class="form-select" id="editStudentSection" name="section">
                    <option value="" disabled selected>Select Section</option>
                    <option class="one" value="1A">1A</option>
                    <option class="two" value="1B">1B</option>
                    <option class="three" value="2A">2A</option>
                    <option class="four" value="3A">3A</option>
                    <option class="five" value="3B">3B</option>
                    <option class="six" value="4A">4A</option>
                    <option class="seven" value="A">A</option>
                    <option class="eight" value="B">B</option>
                    <option class="nine" value="C">C</option>
                </select>
            </div>
        </div>

        <div class="col-12 mb-3">
            <label for="newStudentPassword" class="form-label montserrat-medium">Password <span class="text-danger">*</span></label>
            <div class="input-group">
            <span class="input-group-text"><i class="bi bi-lock"></i></span>
            <input type="password" class="form-control" name="password" id="newStudentPassword" required>
            <span class="input-group-text" id="toggleNewStudentPassword"><i class="bi bi-eye"></i></span>
            </div>
        </div>

        <div class="col-12 mb-3">
            <label for="confirmNewStudentPassoword" class="form-label montserrat-medium">Confirm Password <span class="text-danger">*</span></label>
            <div class="input-group">
            <span class="input-group-text"><i class="bi bi-lock"></i></span>
            <input type="password" class="form-control" name="confirm_password" id="confirmNewStudentPassoword" required>
            <span class="input-group-text" id="toggleNewStudentConfirmPassword"><i class="bi bi-eye"></i></span>
            </div>
        </div>

      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-vibrant-golden-yellow btn-sm" data-bs-dismiss="modal">Save</button>
      </div>
    </form>
    </div>
  </div>
</div>