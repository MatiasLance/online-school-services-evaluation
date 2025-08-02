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
                icon: 'warning'
            });

            return false;
        }

        if(passwordField.val() === '') {
            Swal.fire({
                title: 'Warning',
                text: 'Password is required.',
                icon: 'warning',
            });

            return false
        }
        
        $.ajax({
            url: './controller/StudentLoginController.php',
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
                            $(emailField, passwordField).val('');
                            setTimeout(function(){
                                window.location.href = '/student-evaluation-form';
                            }, 500)
                        }
                    });
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