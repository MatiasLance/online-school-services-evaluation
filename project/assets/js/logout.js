
jQuery.noConflict();

jQuery(function($){
    $(document).on('click', '.logout', function() {
        $.ajax({
            url: './controller/LogoutController.php',
            type: 'POST',
            dataType: 'json',
            success: function(response) {
                if(response.success) {
                    Swal.fire({
                        title: 'Success',
                        text: response.message,
                        icon: 'success',
                        showConfirmButton: false
                    });
                    setTimeout(function(){
                        window.location.href = response.redirect;
                    }, 1000)
                }
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    })
})