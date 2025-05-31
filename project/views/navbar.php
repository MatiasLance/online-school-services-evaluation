<nav class="navbar navbar-expand-lg fixed-top bg-body-tertiary">
  <div class="container d-flex justify-content-between">
    <span class="navbar-brand mb-0 h1 montserrat-medium text-capitalize">Good day, <?php echo isset($_SESSION['firstname']) ? $_SESSION['firstname'] : $_SESSION['student_firstname']  ?>. <i class="fa-regular fa-hand"></i></span>
    <div class="dropdown">
        <i class="fa-solid fa-gear gear-dropdown-menu-icon fs-4" id="userDropdown" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false"></i>
        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start" aria-labelledby="userDropdown">
            <?php if(isset($_SESSION['student_id'])){ ?>
                <li>
                    <a class="dropdown-item montserrat-medium text-capitalize" id="openStudentProfile" data-bs-toggle="modal" data-bs-target="#studentProfileModal" href="#">
                        <i class="fa-solid fa-user"></i> profile
                    </a>
                </li>
           <?php }else{ ?>
              <li>
                <a class="dropdown-item montserrat-medium text-capitalize" data-bs-toggle="modal" data-bs-target="#adminProfileModal" href="#">
                    <i class="fa-solid fa-user"></i> profile
                </a>
            </li>
            <?php } ?>
            <li><hr class="dropdown-divider"></li>
            <li>
                <a class="dropdown-item montserrat-medium text-capitalize logout" href="#">
                    <i class="fa-solid fa-right-from-bracket"></i> logout
                </a>
            </li>
        </ul>
    </div>
  </div>
</nav>