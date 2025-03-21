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

    // Create user table
    $(document).on('click', '#createUserTable', function() {
        $.ajax({
            url: './src/populate_admin_user.php',
            type: 'POST',
            dataType: 'json',
            success: function(response) {
                if(response.success) {
                    Swal.fire({
                        title: 'Success',
                        text: response.message,
                        icon: 'success'
                    });
                } else {
                    Swal.fire({
                        title: 'error',
                        text: response.message,
                        icon: 'error'
                    });
                }
                
            },
            error: function(error) {
                console.error(error);
            }
        })
    });
});