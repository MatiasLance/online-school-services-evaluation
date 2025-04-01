let studentAccountCurrentPage = 1;
let studentAccountDebounceTimer;

jQuery(function($){
    $('#togglePassword, #toggleNewPassword').on('click', function () {
        const passwordField = $('#userPassword');
        const editPasswordField = $('#newUserPassword');
        const isPassword = passwordField.attr('type') === 'password';
        const isEditPassword = editPasswordField.attr('type') === 'password' 

        // Toggle password visibility
        passwordField.attr('type', isPassword ? 'text' : 'password');
        editPasswordField.attr('type', isEditPassword ? 'text' : 'password');

        // Change SVG icon path for eye/eye-slash effect
        $(this).html(isPassword 
            ? `<path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"/>`
            : `<path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/>`);

        $(this).html(isEditPassword
            ? `<path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"/>`
            : `<path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/>`);
    });

    $('#toggleConfirmPassword, #toggleConfirmNewPassword').on('click', function () {
        const confirmPasswordField = $('#userConfirmPassword');
        const confirmNewPasswordField = $('#confirmNewUserPassoword');
        const isPassword = confirmPasswordField.attr('type') === 'password';
        const isConfirmNewPassword = confirmNewPasswordField.attr('type') === 'password';

        // Toggle confirm password visibility
        confirmPasswordField.attr('type', isPassword ? 'text' : 'password');
        confirmNewPasswordField.attr('type', isConfirmNewPassword ? 'text' : 'password');

        // Change SVG icon path for eye/eye-slash effect
        $(this).html(isPassword 
            ? `<path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"/>`
            : `<path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/>`);
        
        $(this).html(isConfirmNewPassword 
            ? `<path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"/>`
            : `<path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/>`);
    });

    // Validate the email to ensure that only allowed emails are accepted.
    $('#emailFormControlInput3').on('input', function() {
        const email = $(this).val();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@smcbi\.edu\.ph$/;
        const isValid = emailPattern.test(email);

        if (isValid) {
            $('#userEmailFeedback').text('✔ Valid email').css('color', 'green');
            $('#saveUserAccount').prop('disabled', false);
        } else {
            $('#userEmailFeedback').text('✖ Email must be @smcbi.edu.ph').css('color', 'red');
            $('#saveUserAccount').prop('disabled', true);
        }
    });

     // Save user account
    $('#saveUserAccount').on('click', function(){
        const payload = {
            firstname: $('#firstNameFormControlInput1').val().trim(),
            lastname: $('#lastNameFormControlInput2').val().trim(),
            email: $('#emailFormControlInput3').val().trim(),
            password: $('#userPassword').val().trim(),
            confirm_password: $('#userConfirmPassword').val().trim(),
            user_type: 'user'
        }


        if (payload.password !== payload.confirm_password) {
            Swal.fire({
                title: 'Warning',
                text: 'Passwords do not match.',
                icon: 'warning'
            })
            return;
        }

        $.ajax({
            url: './controller/UserRegisterController.php',
            type: 'POST',
            data: payload,
            dataType: 'json',
            beforeSend: function() {
                $('#saveUserAccount').prop('disabled', true).text('Saving...');
            },
            success: function(response) {
                if(response.success){
                    Swal.fire({
                        title: 'Success',
                        text: response.message,
                        icon: 'success'
                    })
                }

                if(!response.success) {
                    Swal.fire({
                        title: 'Warning!',
                        text: response.message,
                        icon: 'warning'
                    })
                }

                if (Array.isArray(response.messages)) {
                    Swal.fire({
                        title: 'Error!',
                        text: response.messages.join('\n'),
                        icon: 'error'
                    })
                }
            },
            error: function() {
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while saving the user account. Please try again.',
                    icon: 'error'
                })
            },
            complete: function() {
                $('#saveUserAccount').prop('disabled', false).text('Save');
                $('#firstNameFormControlInput1').val('');
                $('#lastNameFormControlInput2').val('');
                $('#emailFormControlInput3').val('');
                $('#userPassword').val('');
                $('#userConfirmPassword').val('');
                $('#userEmailFeedback').text('');
                loadUsersAccount(1, '');
            }
        });
    });

    // Search functionality
    $('#filterByUserNameFormControlInput1').on('keyup', function () {
        clearTimeout(userAccountDebounceTimer);
        userAccountDebounceTimer = setTimeout(function () {
            loadUsersAccount(1, $('#filterByUserNameFormControlInput1').val());
        }, 500);
    });

    // Retrieve user account
    $(document).on('click', '#retrieveUserAccount', function(){
        const userAccountId = $(this).data('id');
        retrieveUserAccount(userAccountId);
    })

    // Open confirmation delete modal
    $(document).on('click', '#confirmDeleteUserAccount', function(){
        const userAccountId = $(this).data('id');
        retrieveUserAccount(userAccountId);
    })

    // Delete user account
    $(document).on('click', '#deleteUserAccountRecord', function(){
        const userAccountId = $(this).data('id');
        const payload = {
            id: $('#userAccountIdToBeDeleted').val(),
            password: $('#userAccountPasswordFormControlInput1').val()
        }
        deleteUserAccount(payload);
    })

    $(document).on('click', '#saveEditedUserAccount', function(){
        const payload = {
            id: $('#editUserAccountId').val(),
            firstname: $('#editFirstName').val(),
            lastname: $('#editLastName').val(),
            email: $('#editEmail').val(),
            password: $('#newUserPassword').val(),
            confirmNewPassword: $('#confirmNewUserPassoword').val(),
            user_type: 'user'
        }

        if (payload.password !== payload.confirmNewPassword) {
            Swal.fire({
                title: 'Warning',
                text: 'Passwords do not match.',
                icon: 'warning'
            })
            return;
        }

        updateUserAccountDetail(payload);
    })

    // Inital load users account
    loadUsersAccount();

});

function loadUsersAccount(page = 1, search = ''){
    jQuery.ajax({
        url: './controller/ListUserAccountController.php',
        type: 'GET',
        data: { page: page, limit: 10, search: search },
        dataType: 'json',
        success: function (response) {
            const tbody = jQuery('#userAccountTable tbody');
            tbody.empty();

            if (response.status === 'success') {
                for(let i = 0; i < response.data.length; i++){
                    tbody.append(`
                        <tr>
                            <td>${response.data[i].firstname}</td>
                            <td>${response.data[i].lastname}</td>
                            <td>${response.data[i].email}</td>
                             <td class="flex flex-row justify-content-between">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18" id="retrieveUserAccount" data-id="${response.data[i].id}" data-bs-toggle="modal" data-bs-target="#retrieveUserAccountModal" data-bs-auto-close="false"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"/></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" id="confirmDeleteUserAccount" data-id="${response.data[i].id}" data-bs-toggle="modal" data-bs-target="#deleteUserAccountModal" data-bs-auto-close="false"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                            </td>
                        </tr>
                    `);
                }

                // Pagination
                const pagination = jQuery('#userAccountPagination');
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
                tbody.append('<tr><td colspan="3" class="text-center">No users found.</td></tr>');
            }
        }
    });
}

function retrieveUserAccount(userAccountId){
    const payload = { id: userAccountId }
    jQuery.ajax({
        url: './controller/RetrieveUserAccountController.php',
        type: 'GET',
        data: payload,
        dataType: 'json',
        success: function(response){
            if(response.status === 'success'){
                jQuery('#editUserAccountId').val(response.data.id);
                jQuery('#editFirstName').val(response.data.firstname);
                jQuery('#editLastName').val(response.data.lastname);
                jQuery('#editEmail').val(response.data.email);
                jQuery('#userAccountToBeDeleted').text(response.data.firstname + ' ' + response.data.lastname);
                jQuery('#userAccountIdToBeDeleted').val(response.data.id)
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

function updateUserAccountDetail(payload){
    jQuery.ajax({
        url: './controller/EditUserAccountController.php',
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
                        jQuery('#newUserPassword').val('');
                        jQuery('#confirmNewUserPassoword').val('');
                        loadUsersAccount();
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

function deleteUserAccount(payload){
    jQuery.ajax({
        url: './controller/DeleteUserAccountController.php',
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
                        loadUsersAccount();
                        jQuery('#userAccountPasswordFormControlInput1').val('');
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
                        loadUsersAccount();
                        jQuery('#userAccountPasswordFormControlInput1').val('');
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
                            loadUsersAccount();v
                            jQuery('#userAccountPasswordFormControlInput1').val('');
                        }
                    });
                }
            }
        }
    })
}