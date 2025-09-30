<nav class="navbar navbar-expand-lg bg-custom-blue px-2 z-3">
<?php if(isset($_SESSION['id'])){ ?>
  <div class="container-fluid d-flex justify-content-between">
    <button type="button" class="btn bg-custom-blue btn-sm" id="openSideNavigationBar">
        <i class="bi bi-list" style="font-size: 30px;"></i>
    </button>
    <div class="dropstart">
        <button class="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="false" >
            <i class="bi bi-gear text-white fs-3"></i>
        </button>
        <ul class="dropdown-menu" aria-labelledby="userDropdown">
            <li>
                <a class="dropdown-item montserrat-medium text-capitalize logout" href="#">
                    <i class="fa-solid fa-right-from-bracket"></i> logout
                </a>
            </li>
        </ul>
    </div>
  </div>
<?php }else{ ?>
  <div class="container-fluid d-flex justify-content-end">
    <div class="dropstart">
        <button class="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="false" >
            <i class="bi bi-gear text-white fs-3"></i>
        </button>
        <ul class="dropdown-menu" aria-labelledby="userDropdown">
            <li>
                <a class="dropdown-item montserrat-medium text-capitalize logout" href="#">
                    <i class="fa-solid fa-right-from-bracket"></i> logout
                </a>
            </li>
        </ul>
    </div>
  </div>
<?php } ?>
</nav>