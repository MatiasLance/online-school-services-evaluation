let timerInterval;

jQuery(function($){
    $(document).on('click', '#proceedToAssignedForm', function(){
        let categoriesContainer = $(this).closest('.category-card');
        const payload = {
            student_id: $('#studentLoginId').val(),
            category_id: categoriesContainer.find('#categorySelection').data('id')
        }
        
        $.ajax({
            url: './controller/CheckEvaluationFormAccessController.php',
            type: 'POST',
            dataType: 'json',
            data: payload,
            success: function(response) {
                if(response.status === 'success') {
                    Swal.fire({
                        title: 'Please wait...',
                        text: 'Please wait...',
                        icon: 'info',
                        html: 'Proceeding to assign form in <b></b> milliseconds',
                        timer: 3000,
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
                            setTimeout(function(){
                                window.location.href = `/student-evaluation-form?form_id=${response.data.form_id}&form_version=${response.data.version}&student_id=${payload.student_id}`;
                            }, 500)
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Warning',
                        text: response.message,
                        icon: 'warning',
                    });
                }
            }
        })
    });

    $('#backToCategorySelection').on('click', function(){
        Swal.fire({
            title: 'Please wait...',
            text: 'Please wait...',
            icon: 'info',
            html: 'Proceeding to category selection in <b></b> milliseconds',
            timer: 3000,
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
                setTimeout(function(){
                    window.location.href = '/student-dashboard';
                }, 500)
            }
        });
    })
});