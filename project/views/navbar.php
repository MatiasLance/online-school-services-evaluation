<nav class="navbar navbar-expand-lg bg-custom-blue px-2">
  <div class="container-fluid d-flex justify-content-between">
    <button type="button" class="btn bg-custom-blue btn-sm" id="openSideNavigationBar">
        <i class="bi bi-list" style="font-size: 30px;"></i>
    </button>
    <div class="dropstart">
        <button class="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="false" >
            <i class="bi bi-gear text-white fs-3"></i>
        </button>
        <ul class="dropdown-menu" aria-labelledby="userDropdown">
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