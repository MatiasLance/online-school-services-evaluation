let timerInterval;

jQuery(function($){
    $('#proceedToAssignedForm').on('click', function(){
        const payload = {
            student_id: $('#studentLoginId').val(),
            category_id: $('#studentSelectCategory').val()
        }

        console.log(payload)
        // Swal.fire({
        //     title: 'Please wait...',
        //     text: 'Please wait...',
        //     icon: 'info',
        //     html: 'Proceeding to assign form in <b></b> milliseconds',
        //     timer: 2000,
        //     timerProgressBar: true,
        //     didOpen: () => {
        //         Swal.showLoading();
        //         const timer = Swal.getPopup().querySelector("b");
        //         timerInterval = setInterval(() => {
        //         timer.textContent = `${Swal.getTimerLeft()}`;
        //         }, 100);
        //     },
        //     willClose: () => {
        //         clearInterval(timerInterval);
        //         setTimeout(function(){
        //             window.location.href = '/student-evaluation-form';
        //         }, 500)
        //     }
        // });
    });
});