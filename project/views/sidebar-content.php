<!-- Sidebar -->
<div id="sidebar" class="sidebar">
    <div class="sidebar-header">
        <img id="sideBarMenuLogo" src="<?php echo isset($_SESSION['sidebar_menu_logo']) ? $_SESSION['sidebar_menu_logo']: 'https://i.imgur.com/HLqsP73.png'?>" alt="Goat Farm">
    </div>
    <nav class="nav flex-column">
        <a class="nav-link d-flex align-items-center gap-2" href="/">
            <i class="fas fa-registered"></i>
            <span style="transform: translateY(2px);">Dashboard</span>
        </a>
        <a class="nav-link d-flex align-items-center gap-2" href="/registrar">
            <i class="fas fa-registered"></i>
            <span style="transform: translateY(2px);">Registrar</span>
        </a>
        <a class="nav-link d-flex align-items-center gap-2" href="/pod-service">
            <i class="fas fa-box"></i>
            <span style="transform: translateY(2px);">POD Services</span>
        </a>
        <a class="nav-link d-flex align-items-center gap-2" href="/finance-service">
            <i class="fas fa-coins"></i>
            <span style="transform: translateY(2px);">Finance Services</span>
        </a>
        <a class="nav-link d-flex align-items-center gap-2" href="/campus-ministry-service">
            <i class="fas fa-school"></i>
            <span style="transform: translateY(2px);">Campus Ministry Services</span>
        </a>
        <a class="nav-link d-flex align-items-center gap-2" href="/maintenance-service">
            <i class="fas fa-screwdriver-wrench"></i>
            <span style="transform: translateY(2px);">Maintenance Services</span>
        </a>
        <a class="nav-link d-flex align-items-center gap-2" href="/canteen-service">
            <i class="fas fa-utensils"></i>
            <span style="transform: translateY(2px);">Canteen Services</span>
        </a>
        <a class="nav-link d-flex align-items-center gap-2" href="/library-service">
            <i class="fas fa-book"></i>
            <span style="transform: translateY(2px);">Library Services</span>
        </a>
        <a class="nav-link d-flex align-items-center gap-2" href="/clinic-service">
            <i class="fas fa-house-chimney-medical"></i>
            <span style="transform: translateY(2px);">Clinic Services</span>
        </a>
        <a class="nav-link d-flex align-items-center gap-2" href="/guidance-service">
            <i class="fas fa-hand-holding-heart"></i>
            <span style="transform: translateY(2px);">Guidance Services</span>
        </a>
        <a class="nav-link d-flex align-items-center gap-2" href="/security-service">
            <i class="fas fa-shield"></i>
            <span style="transform: translateY(2px);">Security Services</span>
        </a>
        <a class="nav-link d-flex align-items-center gap-2" href="/student-activity-service">
            <i class="fas fa-users"></i>
            <span style="transform: translateY(2px);">Student Activity Services</span>
        </a>
    </nav>
</div>