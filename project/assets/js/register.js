jQuery(function($) {
    const passwordField = $('#password');
    const confirmPasswordField = $('#confirmPassword');
    const passwordIcon = $('#togglePassword i');
    const confirmPasswordIcon = $('#toggleConfirmPassword i');

    // Hide and Show password
    $(document).on('click', '#togglePassword', function() {
        const type = passwordField.attr('type') === 'password' ? 'text' : 'password';
        passwordField.attr('type', type);
        passwordIcon.toggleClass('bi-eye bi-eye-slash');
    })

    // Hide and Show confirm password
    $(document).on('click', '#toggleConfirmPassword', function() {
        const type = confirmPasswordField.attr('type') === 'password' ? 'text' : 'password';
        confirmPasswordField.attr('type', type);
        confirmPasswordIcon.toggleClass('bi-eye bi-eye-slash');
    })

    // Validate the email to ensure that only allowed emails are accepted.
    $('#email').on('input', function() {
        const email = $(this).val();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@smcbi\.edu\.ph$/;
        const isValid = emailPattern.test(email);

        if (isValid) {
            $('#emailFeedback').text('✔ Valid email').css('color', 'green');
            $('#register').prop('disabled', false);
        } else {
            $('#emailFeedback').text('✖ Email must be @smcbi.edu.ph').css('color', 'red');
            $('#register').prop('disabled', true);
        }
    });

    $('#registerStudentForm').on('submit', function(e) {
        e.preventDefault();

        const payload = {
            first_name: $('#firstName').val(),
            last_name: $('#lastName').val(),
            email: $('#email').val(),
            gender: $('#inputGroupSelectGender').val(),
            year_level: $('#inputGroupYearLevel').val(),
            department: $('#inputGroupDepartment').val(),
            section: $('#inputGroupSection').val(),
            password: $('#password').val(),
            confirm_password: $('#confirmPassword').val()
        }

        $.ajax({
            url: './controller/StudentRegisterController.php',
            type: 'POST',
            data: payload,
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    let timerInterval;
                    Swal.fire({
                        title: 'Success',
                        text: response.message,
                        icon: 'success',
                        html: 'Proceeding to login in <b></b> milliseconds',
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
                            $('#registerStudentForm')[0].reset(); // Clear form
                            setTimeout(function(){
                                window.location.href = '/';
                            }, 500)
                        }
                    });
                    
                } else {
                    Swal.fire({
                        title: 'error',
                        text: response.message,
                        icon: 'error'
                    });
                }
            },
            error: function() {
                Swal.fire({
                    title: 'error',
                    text: 'Something went wrong!',
                    icon: 'error'
                });
            }
        });
    });

    // Object storing which elements to show for each year level
    let visibilityMapForYearLevel = {
        '1st Year': ['one', 'two', 'seven'],
        '2nd Year': ['three', 'eight'],
        '3rd Year': ['four', 'five', 'nine'],
        '4th Year': ['six']
    };

    // Object storing which elements to show for each department
    let visibilityMapForDepartment = {
        'BSIT': ['one', 'two', 'three', 'four', 'five', 'six'],
        'BSBA': ['seven', 'eight', 'nine']
    };

    // Function to update visibility based on selected year level & department
    function updateVisibility() {
        let selectedYear = $('#inputGroupYearLevel').val(); // Get selected year level
        let selectedDepartment = $('#inputGroupDepartment').val(); // Get selected department
        
        // Get the corresponding classes from the lookup objects, or set empty arrays if nothing is selected
        let yearClasses = visibilityMapForYearLevel[selectedYear] || [];
        let departmentClasses = visibilityMapForDepartment[selectedDepartment] || [];

        // Compute the intersection (elements that exist in both arrays)
        let toShow = yearClasses.filter(className => departmentClasses.includes(className));

        // Hide all elements first
        $('.one, .two, .three, .four, .five, .six, .seven, .eight, .nine').hide();

        // Show only the elements that match both filters
        toShow.forEach(className => $('.' + className).show());
    }

    // Attach the updateVisibility function to both dropdown change events
    $('#inputGroupYearLevel, #inputGroupDepartment').on('change', updateVisibility);
});