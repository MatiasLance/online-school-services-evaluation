<div class="py-3 py-md-5" id="loginForm">
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
        <div class="bg-custom-white p-4 p-md-5 rounded shadow-sm">
          <div class="row">
            <div class="col-12">
              <div class="text-center mb-4">
                <img id="adminLoginFormLogo" src="<?php echo isset($_SESSION['sidebar_menu_logo']) ? $_SESSION['sidebar_menu_logo']: 'https://i.imgur.com/HLqsP73.png'?>" alt="Goat Farm Logo" width="175" height="157">
              </div>
            </div>
          </div>

          <form>
            <div class="row gy-3 gy-md-4 overflow-hidden">
              
              <!-- Email -->
              <div class="col-12">
                <label for="email" class="form-label montserrat-medium">Email <span class="text-danger">*</span></label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-envelope"></i>
                  </span>
                  <input type="email" class="form-control" name="email" id="email" required>
                </div>
              </div>

              <!-- Password -->
              <div class="col-12">
                <label for="password" class="form-label montserrat-medium">Password <span class="text-danger">*</span></label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-key"></i>
                  </span>
                  <input type="password" class="form-control" name="password" id="password" required>
                  <span class="input-group-text" id="togglePassword">
                    <i class="fas fa-eye"></i>
                  </span>
                </div>
              </div>

              <!-- Login Button -->
              <div class="col-12">
                <div class="d-flex flex-column align-items-center">
                  <button class="btn btn-custom-primary btn-sm montserrat-medium text-uppercase w-100" id="login" type="button">
                    Login <i class="fas fa-arrow-right"></i>
                  </button>
                  <p class="mt-3 text-center">
                    Don't have an account? 
                    <a href="/student-register" class="montserrat-medium text-decoration-none">Register here</a>
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
