let studentAccountDebounceTimer;

let visibilityMapForYearLevel = {
    '1st Year': ['one', 'two', 'seven'],
    '2nd Year': ['three', 'eight'],
    '3rd Year': ['four', 'five', 'nine'],
    '4th Year': ['six']
};

let visibilityMapForDepartment = {
    'BSIT': ['one', 'two', 'three', 'four', 'five', 'six'],
    'BSBA': ['seven', 'eight', 'nine']
};

jQuery(function($){

    const passwordField = $('#password, #studentPassword');
    const confirmPasswordField = $('#confirmPassword, #studentConfirmPassword');
    const passwordIcon = $('#togglePassword i, #toggleNewStudentPassword i');
    const confirmPasswordIcon = $('#toggleConfirmPassword i, #toggleNewStudentConfirmPassword i');

    $('#toggleNewStudentPassword, #toggleNewStudentConfirmPassword').css({ 'cursor': 'pointer' })

    $(document).on('click', '#togglePasswordOne, #toggleNewStudentPassword', function() {
        const type = passwordField.attr('type') === 'password' ? 'text' : 'password';
        passwordField.attr('type', type);
        passwordIcon.toggleClass('bi-eye bi-eye-slash');
    })

    $(document).on('click', '#toggleConfirmPasswordOne, #toggleNewStudentConfirmPassword', function() {
        const type = confirmPasswordField.attr('type') === 'password' ? 'text' : 'password';
        confirmPasswordField.attr('type', type);
        confirmPasswordIcon.toggleClass('bi-eye bi-eye-slash');
    })

    $('#email').on('input', function() {
        const email = $(this).val();
        const emailPattern = /^[a-zA-Z0-9._%+\-]+@smcbi\.edu\.ph$/;
        const isValid = emailPattern.test(email);

        if (isValid) {
            $('#emailFeedback').text('✔ Valid email').css('color', 'green');
            $('#register').prop('disabled', false);
        } else {
            $('#emailFeedback').text('✖ Email must be @smcbi.edu.ph').css('color', 'red');
            $('#register').prop('disabled', true);
        }
    });

    // Add Student Account
    $('#addStudentForm').on('submit', function(e) {
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
                    Swal.fire({
                        title: 'Success',
                        text: response.message,
                        icon: 'success',
                    }).then((result) => {
                        if(result.isConfirmed){
                            $('#addStudentForm')[0].reset();
                            listOfStudentAccounts();
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

    $('#filterByStudentNameFormControlInput1').on('keyup', function () {
        clearTimeout(studentAccountDebounceTimer);
        studentAccountDebounceTimer = setTimeout(function () {
            listOfStudentAccounts(1, $('#filterByStudentNameFormControlInput1').val());
        }, 500);
    });

    // Retrieve student account
    $(document).on('click', '#retrieveStudentAccount', function(){
        const studentAccountID = $(this).data('id');
        retrieveStudentAccount(studentAccountID);
    })

    // Open confirmation delete modal
    $(document).on('click', '#previewStudentAccount', function(){
        const studentAccountID = $(this).data('id');
        retrieveStudentAccount(studentAccountID);
    })

    // Delete student account
    $(document).on('click', '#deleteStudentAccount', function(){
        const payload = {
            id: $('#studentAccountIDToBeDeleted').val(),
            password: $('#studentAccountPasswordFormControlInput1').val()
        }
        deleteStudentAccount(payload);
    })

    // Update Student Account
    $(document).on('submit', '#EditStudentAccountDetail', function(e){
        e.preventDefault();

        const payload = {
            id: $('#studentAccountId').val(),
            first_name: $('#retrieveStudentFirstName').val(),
            last_name: $('#retrieveStudentLastName').val(),
            email: $('#retrieveStudentEmail').val(),
            gender: $('#retrieveSelectedStudentGender').val(),
            year_level: $('#retrieveStudentYearLevel').val(),
            department: $('#retrieveStudentDepartment').val(),
            section: $('#retrieveStudentSection').val(),
            password: $('#studentPassword').val(),
            confirm_password: $('#studentConfirmPassword').val()
        }

        if (payload.password !== payload.confirm_password) {
            Swal.fire({
                title: 'Warning',
                text: 'Passwords do not match.',
                icon: 'warning'
            })
            return;
        }

        updateStudentAccountDetail(payload);
    })

    $('#retrieveStudentYearLevel,#retrieveStudentDepartment, #inputGroupYearLevel, #inputGroupDepartment').on('change', updateVisibility);

    listOfStudentAccounts();

});

function listOfStudentAccounts(page = 1, search = ''){
    jQuery.ajax({
        url: './controller/ListStudentAccountController.php',
        type: 'GET',
        data: { page: page, limit: 10, search: search },
        dataType: 'json',
        success: function (response) {
            const tbody = jQuery('#studentAccountTable tbody');
            tbody.empty();

            if (response.status === 'success') {
                for(let i = 0; i < response.data.length; i++){
                    jQuery('#assignStudent').append(`<option value="${response.data[i].id}">${response.data[i].first_name} ${response.data[i].last_name}</option>`);
                    tbody.append(`
                        <tr>
                            <td>${response.data[i].first_name}</td>
                            <td>${response.data[i].last_name}</td>
                            <td>${response.data[i].email}</td>
                            <td class="text-capitalize">${response.data[i].gender}</td>
                            <td>${response.data[i].year_level}</td>
                            <td>${response.data[i].department}</td>
                            <td>${response.data[i].section === '' ? '<span class="badge text-bg-warning">There is no section available for this year level and department.</span>': response.data[i].section}</td>
                             <td class="flex flex-row justify-content-between">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18" id="retrieveStudentAccount" data-id="${response.data[i].id}" data-bs-toggle="modal" data-bs-target="#retrieveStudentAccountModal" data-bs-auto-close="false" style="cursor: pointer"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"/></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" id="previewStudentAccount" data-id="${response.data[i].id}" data-bs-toggle="modal" data-bs-target="#previewStudentAccountModal" data-bs-auto-close="false" style="cursor: pointer"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                            </td>
                        </tr>
                    `);
                }

                // Pagination
                const pagination = jQuery('#studentAccountPagination');
                pagination.empty();

                // Previous Button
                pagination.append(`
                    <li class="page-item ${page === 1 ? 'disabled' : ''}">
                        <a class="page-link page-btn" href="#" data-page="${page - 1}">Previous</a>
                    </li>
                `);

                for (let i = 1; i <= response.total_pages; i++) {
                    pagination.append(`
                        <li class="page-item ${i === response.current_page ? 'active' : ''}">
                            <a class="page-link page-btn" href="#" data-page="${i}">${i}</a>
                        </li>
                    `);
                }

                // Next Button
                pagination.append(`
                    <li class="page-item ${page === response.total_pages ? 'disabled' : ''}">
                        <a class="page-link page-btn" href="#" data-page="${page + 1}">Next</a>
                    </li>
                `);

                currentPage = page;
            } else {
                tbody.append('<tr><td colspan="3" class="text-center">No Students found.</td></tr>');
            }
        }
    });
}

function retrieveStudentAccount(studentAccountId){
    const payload = { id: studentAccountId }
    jQuery.ajax({
        url: './controller/RetrieveStudentAccountController.php',
        type: 'GET',
        data: payload,
        dataType: 'json',
        success: function(response){
            if(response.status === 'success'){
                jQuery('#studentAccountToBeDeleted').text(`${response.data.firstname} ${response.data.lastname}`)
                jQuery('#studentAccountIDToBeDeleted').val(response.data.id);
                jQuery('#studentAccountId').val(response.data.id);
                jQuery('#retrieveStudentFirstName').val(response.data.firstname);
                jQuery('#retrieveStudentLastName').val(response.data.lastname);
                jQuery('#retrieveStudentEmail').val(response.data.email);
                // Handle Gender dropdown
                const genderSelect = jQuery('#retrieveSelectedStudentGender');
                const selectedGender = response.data.gender.toLowerCase();
                const existingGenderOption = genderSelect.find(`option[value="${selectedGender}"]`);
                if (existingGenderOption.length === 0 && selectedGender !== '') {
                    genderSelect.append(`<option value="${selectedGender}" selected>${selectedGender}</option>`);
                } else {
                    existingGenderOption.prop('selected', true);
                }
                // Handle Year Level Dropdown
                const yearLevelSelect = jQuery('#retrieveStudentYearLevel');
                const selectedYearLevel = response.data.year_level;
                const existingYearLevelOption = yearLevelSelect.find(`option[value="${selectedYearLevel}"]`);
                if (existingYearLevelOption.length === 0 && selectedYearLevel !== '') {
                    genderSelect.append(`<option value="${selectedYearLevel}" selected>${selectedYearLevel}</option>`);
                } else {
                    existingYearLevelOption.prop('selected', true);
                }
                // Handle Department Dropdown
                const departmentSelect = jQuery('#retrieveStudentDepartment');
                const selectedDepartment = response.data.department;
                const existingDepartmentOption = departmentSelect.find(`option[value="${selectedDepartment}"]`);
                if (existingDepartmentOption.length === 0 && selectedDepartment !== '') {
                    genderSelect.append(`<option value="${selectedDepartment}" selected>${selectedDepartment}</option>`);
                } else {
                    existingDepartmentOption.prop('selected', true);
                }
                // Handle Section Dropdown
                const sectionSelect = jQuery('#retrieveStudentSection');
                const selectedSection = response.data.section;
                const existingSectionOption = sectionSelect.find(`option[value="${selectedSection}"]`);
                if (existingDepartmentOption.length === 0 && selectedSection !== '') {
                    sectionSelect.append(`<option value="${selectedSection}" selected>${selectedSection}</option>`);
                } else {
                    existingSectionOption.prop('selected', true);
                }
            }
            if(response.status === 'error'){
                Swal.fire({
                    title: 'Error!',
                    text: response.message,
                    icon: 'error'
                });
            }
        }
    })
}

function updateStudentAccountDetail(payload){
    jQuery.ajax({
        url: './controller/EditStudentAccountController.php',
        type: 'POST',
        data: payload,
        dataType: 'json',
        success: function(response){
            if(response.status === 'success'){
                Swal.fire({
                    title: 'Success!',
                    text: response.message,
                    icon: 'success'
                }).then((result) => {
                    if(result.isConfirmed){
                        jQuery('#studentPassword, #studentConfirmPassword').val('');
                        listOfStudentAccounts();
                    }
                });
            }
            if(response.status === 'error'){
                Swal.fire({
                    title: 'Error!',
                    text: response.message,
                    icon: 'error'
                });
            }
        }
    })
}

function deleteStudentAccount(payload){
    jQuery.ajax({
        url: './controller/DeleteStudentAccountController.php',
        type: 'POST',
        data: payload,
        dataType: 'json',
        success: function(response){
            if(response.status === 'success'){
                Swal.fire({
                    title: 'Success',
                    text: response.message,
                    icon: 'success'
                }).then((result) => {
                    if(result.isConfirmed){
                        listOfStudentAccounts();
                        jQuery('#studentAccountPasswordFormControlInput1').val('');
                    }
                });
                
            }
            if(response.status === 'error'){
                Swal.fire({
                    title: 'Warning',
                    text: response.message,
                    icon: 'warning'
                }).then((result) => {
                    if(result.isConfirmed){
                        listOfStudentAccounts();
                        jQuery('#studentAccountPasswordFormControlInput1').val('');
                    }
                });
            }
            if(response.error){
                for(let i = 0; i < response.messages.length; i++){
                    Swal.fire({
                        title: 'Error',
                        text: response.messages[i],
                        icon: 'Error'
                    }).then((result) => {
                        if(result.isConfirmed){
                            listOfStudentAccounts();
                            jQuery('#studentAccountPasswordFormControlInput1').val('');
                        }
                    });
                }
            }
        }
    })
}

function updateVisibility() {
    let selectedYear = jQuery('#retrieveStudentYearLevel, #inputGroupYearLevel').val();
    let selectedDepartment = jQuery('#retrieveStudentDepartment, #inputGroupDepartment').val();
    
    let yearClasses = visibilityMapForYearLevel[selectedYear] || [];
    let departmentClasses = visibilityMapForDepartment[selectedDepartment] || [];

    let toShow = yearClasses.filter(className => departmentClasses.includes(className));

    jQuery('.one, .two, .three, .four, .five, .six, .seven, .eight, .nine').hide();

    toShow.forEach(className => jQuery('.' + className).show());
}