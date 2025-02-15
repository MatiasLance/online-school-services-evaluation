jQuery(function($) {
    $('#evaluationForm').on('submit', function(event) {
        event.preventDefault();

        const payload = {
            fullname: $('#fullName').val(),
            email: $('#email').val(),
            serviceRate: $('#serviceRate').val(),
            isRecommended: $("input[name='recommend']:checked").val(),
            comments: $('#additionalComments').val()
        }

        let allowedEmailDomain = '@smcbi.edu.ph'

        if(payload.email.endsWith(allowedEmailDomain)){
            $('#errorMessage').css('color', 'green').text('Email is valid.')
        }else{
            $('#errorMessage').css('color', 'red').text('Email is not valid.')
            return false
        }

        if(payload.fullName !== ''
            && payload.email !== ''
            && payload.serviceRate === 'excellent'
            || payload.serviceRate === 'good'
            || payload.serviceRate === 'fair'
            || payload.serviceRate === 'poor'
            && payload.isRecommended === 'yes'
            || payload.isRecommended === 'no'
            && payload.comments !== '') {
            $.ajax({
                type: 'POST',
                url: './controller/EvaluationFormController.php',
                data: payload,
                dataType: 'json',
                success: function(response){
                    if (response.status === "error") {
                        // Display multiple error messages
                        response.messages.forEach(function(msg) {
                            Swal.fire({
                                title: 'Warning',
                                text: msg,
                                icon: 'warning'
                            });
                        });
                    } else if (response.status === "success") {
                        // Display success message
                        Swal.fire({
                            title: 'Success',
                            text: response.message,
                            icon: 'success'
                        });
                        $("#evaluationForm")[0].reset(); // Reset form
                        $('#errorMessage').text('');
                    }
                },
                error: function(){
                    Swal.fire({
                        title: 'Warning',
                        text: 'Something went wrong. Please try again.',
                        icon: 'warning'
                    });
                }
            })
        }

    })
})