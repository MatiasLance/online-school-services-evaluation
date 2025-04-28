jQuery.noConflict();

jQuery(document).ready(function ($) {
    const sidebar = $('#sidebar');
    const overlay = $('#overlay');
    const content = $('#content');

    // Toggle sidebar
    $('#menuToggle').click(function () {
        sidebar.toggleClass('active');
        overlay.toggleClass('active');
        content.toggleClass('sidebar-active');
    });

    // Hide sidebar when clicking overlay
    overlay.click(function () {
        sidebar.removeClass('active');
        overlay.removeClass('active');
        content.removeClass('sidebar-active');
    });

    // Set current year in footer
    $('#year').text(new Date().getFullYear());
});