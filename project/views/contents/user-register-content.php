<div class="py-4" id="registerForm">
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
        <div class="bg-custom-white p-4 p-md-5 rounded shadow-sm">
          <div class="row">
            <div class="col-12">
              <div class="text-center mb-4">
                <img src="https://i.imgur.com/5EhHhE6.png" alt="SMCBI Logo" width="175" height="157">
              </div>
            </div>
          </div>

          <form id="registerStudentForm">
            <div class="row gy-3 gy-md-4 overflow-hidden">
              
              <!-- First Name -->
              <div class="col-12">
                <label for="firstName" class="form-label montserrat-medium">First Name <span class="text-danger">*</span></label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-person"></i>
                  </span>
                  <input type="text" class="form-control" id="firstName" name="first_name" required>
                </div>
              </div>

              <!-- Last Name -->
              <div class="col-12">
                <label for="lastName" class="form-label montserrat-medium">Last Name <span class="text-danger">*</span></label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-person"></i>
                  </span>
                  <input type="text" class="form-control" id="lastName" name="last_name" required>
                </div>
              </div>

              <!-- Email -->
              <div class="col-12">
                <label for="email" class="form-label montserrat-medium">Email <span class="text-danger">*</span></label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-envelope"></i>
                  </span>
                  <input type="email" class="form-control" id="email" name="email" pattern="^[a-zA-Z0-9._%+-]+@smcbi\.edu\.ph$" title="Only emails ending in @smcbi.edu.ph are allowed" required>
                </div>
                <small id="emailFeedback" class="form-text"></small>
              </div>

              <!-- Gender -->
              <div class="col-12">
                <label for="gender" class="form-label montserrat-medium">Gender <span class="text-danger">*</span></label>
                <div class="input-group">
                    <label class="input-group-text" for="inputGroupSelectGender">
                        <i class="bi bi-gender-neuter"></i>
                    </label>
                    <select class="form-select" id="inputGroupSelectGender" name="gender" required>
                        <option value="" disabled selected>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
              </div>

              <!-- Year Level -->
              <div class="col-12">
                <label for="yearLevel" class="form-label montserrat-medium">Year Level <span class="text-danger">*</span></label>
                <div class="input-group">
                    <label class="input-group-text" for="inputGroupYearLevel">
                        <i class="bi bi-bar-chart"></i>
                    </label>
                    <select class="form-select" id="inputGroupYearLevel" name="year_level" required>
                        <option value="" disabled selected>Select Year Level</option>
                        <option value="1st Year">First Year</option>
                        <option value="2nd Year">Second Year</option>
                        <option value="3rd Year">Third Year</option>
                        <option value="4th Year">Fourth Year</option>
                    </select>
                </div>
              </div>

              <!-- Course Selection -->
              <div class="col-12">
                <label for="course" class="form-label montserrat-medium">Course<span class="text-danger">*</span></label>
                <div class="input-group">
                    <label class="input-group-text" for="inputGroupCourse">
                        <i class="bi bi-mortarboard"></i>
                    </label>
                    <select class="form-select" id="inputGroupCourse" name="course" required>
                        <option value="" disabled selected>Select Course</option>
                        <option value="BSIT">BS Information Technology</option>
                        <option value="BSBA">BS Business Administration</option>
                        <option value="BSHM">BS Hospitality Management</option>
                        <option value="BSED">BS Education</option>
                        <option value="BEED">BS Elementary Education</option>
                    </select>
                </div>
              </div>

                <!-- Password -->
                <div class="col-12">
                <label for="password" class="form-label montserrat-medium">Password <span class="text-danger">*</span></label>
                <div class="input-group">
                  <span class="input-group-text"><i class="bi bi-lock"></i></span>
                  <input type="password" class="form-control" name="password" id="password" required>
                  <span class="input-group-text" id="togglePassword"><i class="bi bi-eye"></i></span>
                </div>
              </div>

              <!-- Confirm Password -->
              <div class="col-12">
                <label for="confirmPassword" class="form-label montserrat-medium">Confirm Password <span class="text-danger">*</span></label>
                <div class="input-group">
                  <span class="input-group-text"><i class="bi bi-lock"></i></span>
                  <input type="password" class="form-control" name="confirm_password" id="confirmPassword" required>
                  <span class="input-group-text" id="toggleConfirmPassword"><i class="bi bi-eye"></i></span>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="col-12">
                <div class="d-flex flex-column align-items-center">
                  <button class="btn btn-custom-primary btn-sm montserrat-medium text-uppercase w-100" id="register" type="submit">
                    Register <i class="fas fa-arrow-right"></i>
                  </button>
                  <p class="mt-3 text-center">
                    Already have an account? 
                    <a href="/" class="montserrat-medium text-decoration-none">Login here</a>
                  </p>
                </div>
              </div>

            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</div>
