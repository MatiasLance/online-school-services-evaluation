$.noConflict();

jQuery(function($) {
    const emailField = $('#email');
    const passwordField = $('#password');
    const icon = $('#togglePassword i');
    
    // Hide and Show password
    $(document).on('click', '#togglePassword', function() {
        const type = passwordField.attr('type') === 'password' ? 'text' : 'password';
        passwordField.attr('type', type);
        icon.toggleClass('fa-eye fa-eye-slash');
    })

    // Login
    $(document).on('click', '#login', function() {
        const payload = {
            email: emailField.val(),
            password: passwordField.val()
        }

        if(emailField.val() === '') {
            Swal.fire({
                title: 'Warning',
                text: 'Email is required.',
                icon: 'warning',
                showConfirmButton: false
            });

            return false;
        }

        if(passwordField.val() === '') {
            Swal.fire({
                title: 'Warning',
                text: 'Password is required.',
                icon: 'warning',
                showConfirmButton: false
            });

            return false
        }
        
        // Send an AJAX POST request to the login PHP script
        $.ajax({
            url: './controller/LoginController.php',
            type: 'POST',
            dataType: 'json',
            data: payload,
            success: function(response) {
                if(response.success) {
                    Swal.fire({
                        title: 'Success',
                        text: response.message,
                        icon: 'success',
                        showConfirmButton: false
                    });
                    setTimeout(function(){
                        window.location.href = '/dashboard';
                    }, 1000)
                } else {
                    Swal.fire({
                        title: 'error',
                        text: response.message,
                        icon: 'error',
                        showConfirmButton: false
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    })
})