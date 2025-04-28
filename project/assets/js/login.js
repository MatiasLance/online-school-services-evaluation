jQuery.noConflict();

jQuery(function($) {
    const emailField = $('#email');
    const passwordField = $('#password');
    const icon = $('#togglePassword i');
    
    $(document).on('click', '#togglePassword', function() {
        const type = passwordField.attr('type') === 'password' ? 'text' : 'password';
        passwordField.attr('type', type);
        icon.toggleClass('fa-eye fa-eye-slash');
    })

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
                    }).then((result) => {
                        if(result.isConfirmed){
                            setTimeout(function(){
                                window.location.href = '/dashboard';
                            }, 500)
                        }
                    });

                    if(response.user_type === 'admin'){
                        $('#formTemplatesContainer').hide();
                    }
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