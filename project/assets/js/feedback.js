
jQuery(function($){
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true
    });

    let selectedOffice = '';
    $('.office-option').on('click', function() {
        $('.office-option').removeClass('active');
        $(this).addClass('active');
        selectedOffice = $(this).data('office');
        $('#feedbackText').attr('placeholder', `Tell us about ${selectedOffice}...`);
    });

    $('.office-option:first').trigger('click');

    $('#submitBtn').on('click', function() {
        const feedback = $('#feedbackText').val().trim();
        if (!selectedOffice) {
            Swal.fire({
                title: 'Warning',
                text: 'Please select an office.',
                icon: 'warning',
            })
            return;
        }
        if (!feedback) {
            Swal.fire({
                title: 'Warning',
                text: 'Please share your feedback.',
                icon: 'warning',
            })
            return;
        }

        const payload = {
            selectedOffice,
            feedback
        }

        submitFeedback($, payload);
    });

});

function submitFeedback($, payload) {
    $.ajax({
        url: './controller/feedback/SubmitFeedbackController.php',
        type: 'POST',
        dataType: 'json',
        data: payload,
        beforeSend: function() {
            $('#submitBtn').prop('disabled', true).text('Submitting...');
        },
        success: function(response) {
            if(response.success) {
                let timerInterval;
                Swal.fire({
                    title: "Processing…",
                    html: "Feedback processing will be completed in <b></b> seconds.",
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        $('#submitBtn').prop('disabled', false).text('Submit Feedback');
                        $('#feedbackText').val('');
                        $('.office-option').removeClass('active');
                        $('.office-option:first').trigger('click');
                        window.location.href = "/thank-you";
                    }
                });
            }
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}