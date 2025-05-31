jQuery(function($){
    let checkboxCount = 0;
    let dropdownCount = 0;
    let radioGroupCount = 0;
    let paragraphCount = 0;
    let ratingStarCount = 0;
    let dateCount = 0;
    let timeCount = 0;

    // Initially hide these button
    $('#saveFormButton, #submitFeedBack, #saveEvaluationFormChanges').hide();

    // Generate form header
    $('#createForm').on('click', function(){

        $('#displayFormTemplate').empty();

        if($('#displayFormTemplate .form-header').length === 0){
            let formHeader = `
            <div class="d-flex flex-column flex-md-row flex-lg-row flex-xl-row flex-xxl-row gap-3 mb-3 buttons-selector">
                <button type="button" class="btn btn-primary" id="addCheckbox">Checkboxes</button>
                <button type="button" class="btn btn-primary" id="addDropdown">Dropdown</button>
                <button type="button" class="btn btn-primary" id="addFileUpload">File Upload</button>
                <button type="button" class="btn btn-primary" id="addParagraph">Paragraph</button>
                <button type="button" class="btn btn-primary" id="addMultipleChoice">Multiple Choice</button>
                <button type="button" class="btn btn-primary" id="addRating">Rating</button>
                <button type="button" class="btn btn-primary" id="addDate">Date</button>
                <button type="button" class="btn btn-primary" id="addTime">Time</button>
            </div>
            <div class="card mb-3 form-header">
                <div class="card-body position-relative">
                    <div class="mb-3">
                        <input type="text" class="form-control" id="formTitle" name="form_title" placeholder="Untitled form" required>
                    </div>
                    <div class="mb-3">
                        <textarea class="form-control" id="formDescription" name="form_description" rows="3" placeholder="Form description" required></textarea>
                    </div>
                    <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger" id="removeFormHeader" style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
                </div>
            </div>`;

            $('#displayFormTemplate').append(formHeader);
        }

        if ($('#displayFormTemplate .form-header').length > 0) {
            $('#saveFormButton').show();
        }
    });

    /**************************************************Checkbox Template************************************************/
    // Add Checkbox Template
    $(document).on('click', '#addCheckbox', function(){
        checkboxCount++;

        let formCheckboxes = `
        <div class="card mb-3 form-checkbox" id="checkboxWrapper-${checkboxCount}">
            <div class="card-body position-relative">
                <div class="mb-3">
                    <input type="text" class="form-control checkbox-question" name="form_checkbox_question[${checkboxCount}]" placeholder="Enter Question" required>
                </div>
                <div class="mb-3 checkbox-options">
                    <div class="form-check d-flex align-items-center">
                        <input class="form-check-input" type="checkbox" id="checkbox-${checkboxCount}" name="form_checkbox_option[${checkboxCount}]">
                        <input type="text" class="form-control ms-2 checkbox-label" name="form_checkbox_option_label[${checkboxCount}]" placeholder="Option Label" required>
                        <button type="button" class="btn btn-sm btn-danger ms-2 removeCheckboxOption">X</button>
                    </div>
                </div>
                <button type="button" class="btn btn-sm btn-success addCheckboxOption" data-index="${checkboxCount}">+ Add Option</button>
                <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger removeFormCheckbox" 
                style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
            </div>
        </div>`;

        $('#displayFormTemplate, #formTemplatesContainer').append(formCheckboxes);
    });

    // Add Additional Checkbox Option to a Specific Template
    $(document).on('click', '.addCheckboxOption', function(){
        const index = $(this).data('index');

        let newOption = `
        <div class="form-check d-flex align-items-center">
            <input class="form-check-input" type="checkbox" id="checkbox-${index}" name="form_checkbox_option[${index}]">
            <input type="text" class="form-control ms-2 checkbox-label" name="form_checkbox_option_label[${index}]" placeholder="Option Label" required>
            <button type="button" class="btn btn-sm btn-danger ms-2 removeCheckboxOption">X</button>
        </div>`;

        $(this).siblings('.checkbox-options').append(newOption);
    });

    // Remove Individual Checkbox Option
    $(document).on('click', '.removeCheckboxOption', function(){
        $(this).parent('.form-check').remove();
    });

    /**********************************************Dropdown Template************************************************/
    // Add Dropdown Template
    $(document).on('click', '#addDropdown', function(){
        dropdownCount++; // Increment for uniqueness

        let dropdownTemplate = `
        <div class="card mb-3 form-dropdown" id="dropdownWrapper-${dropdownCount}">
            <div class="card-body position-relative">
                <div class="mb-3">
                    <input type="text" class="form-control dropdown-question" name="form_dropdown_question[${dropdownCount}]" placeholder="Enter Question" required>
                </div>
                <div class="mb-3 dropdown-options">
                    <div class="input-group mb-2">
                        <input type="text" class="form-control dropdown-label" name="form_dropdown_option[${dropdownCount}]" placeholder="Option Label" required>
                        <button type="button" class="btn btn-sm btn-danger removeDropdownOption">X</button>
                    </div>
                </div>
                <button type="button" class="btn btn-sm btn-success addDropdownOption" data-index="${dropdownCount}">+ Add Option</button>
                <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger removeDropdown" 
                style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
            </div>
        </div>`;

        $('#displayFormTemplate, #formTemplatesContainer').append(dropdownTemplate);
    });

    // Add Additional Dropdown Option
    $(document).on('click', '.addDropdownOption', function(event){
        event.preventDefault();
        const index = $(this).data('index');

        let newOption = `
        <div class="input-group mb-2">
            <input type="text" class="form-control dropdown-label" name="form_dropdown_option[${index}]" placeholder="Option Label" required>
            <button type="button" class="btn btn-sm btn-danger removeDropdownOption">X</button>
        </div>`;

        $(this).siblings('.dropdown-options').append(newOption);
    });

    // Remove Individual Dropdown Option
    $(document).on('click', '.removeDropdownOption', function(){
        $(this).parent('.input-group').remove();
    });

    /******************************************File Upload Template***************************************************/
     // Add File Upload Template
     $(document).on('click', '#addFileUpload', function(){

        if($('#displayFormTemplate .form-file-upload, #formTemplatesContainer .form-file-upload, #formTemplatesContainer .form-file-upload-container').length === 0){
            let fileUploadTemplate = `
            <div class="card mb-3 form-file-upload" id="fileUploadWrapper">
                <div class="card-body position-relative">
                    <div class="mb-3">
                        <input type="text" class="form-control file-upload-question" name="form_file_upload_question" placeholder="Enter Question" required>
                    </div>
                    <div class="mb-3">
                        <input type="file" class="form-control file-upload-input" name="form_file_upload_input">
                    </div>
                    <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger removeFileUpload" 
                    style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
                </div>
            </div>`;

            $('#displayFormTemplate, #formTemplatesContainer').append(fileUploadTemplate);
        }else{
            Swal.fire({
                title: 'Warning!',
                text: 'Only one file input can be added.',
                icon: 'warning'
            });
        }
    });

    /******************************************Multiple Choice Template***************************************************/
    // Add Multiple Choice Template
    $(document).on('click', '#addMultipleChoice', function(){
        radioGroupCount++;

        let radioTemplate = `
        <div class="card mb-3 form-multiple-choice" id="radioWrapper-${radioGroupCount}">
            <div class="card-body position-relative">
                <div class="mb-3">
                    <input type="text" class="form-control radio-question" name="form_radio_question[${radioGroupCount}]" placeholder="Enter Question" required>
                </div>
                <div class="mb-3 radio-options">
                    <div class="input-group mb-2">
                        <div class="input-group-text">
                            <input type="radio" name="form_radio_option[${radioGroupCount}]" disabled>
                        </div>
                        <input type="text" class="form-control radio-label" name="form_radio_label[${radioGroupCount}]" placeholder="Option Label" required>
                        <button type="button" class="btn btn-sm btn-danger removeRadioOption">X</button>
                    </div>
                </div>
                <button type="button" class="btn btn-sm btn-success addRadioOption" data-index="${radioGroupCount}">+ Add Option</button>
                <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger removeRadio" 
                style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
            </div>
        </div>`;

        $('#displayFormTemplate, #formTemplatesContainer').append(radioTemplate);
    });

    // Add Additional Radio Option
    $(document).on('click', '.addRadioOption', function(event){
        event.preventDefault();
        const index = $(this).data('index');

        let newOption = `
        <div class="input-group mb-2">
            <div class="input-group-text">
                <input type="radio" name="form_radio_option[${index}]" disabled>
            </div>
            <input type="text" class="form-control radio-label" name="form_radio_label[${index}]" placeholder="Option Label" required>
            <button type="button" class="btn btn-sm btn-danger removeRadioOption">X</button>
        </div>`;

        $(this).siblings('.radio-options').append(newOption);
    });

    // Remove Individual Radio Option
    $(document).on('click', '.removeRadioOption', function(){
        $(this).parent('.input-group').remove();
    });

    /******************************************Paragraph Template***************************************************/
     // Add Paragraph Template
     $(document).on('click', '#addParagraph', function(){
        paragraphCount++;

        let paragraphTemplate = `
        <div class="card mb-3 form-paragraph" id="paragraphWrapper-${paragraphCount}">
            <div class="card-body position-relative">
                <div class="mb-3">
                    <input type="text" class="form-control paragraph-label" name="form_paragraph_question[${paragraphCount}]" placeholder="Enter Question" required>
                </div>
                <div class="mb-3">
                    <textarea class="form-control paragraph-text" name="form_paragraph_text[${paragraphCount}]" rows="3" readonly="true"></textarea>
                </div>
                <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger removeParagraph" 
                style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
            </div>
        </div>`;

        $('#displayFormTemplate, #formTemplatesContainer').append(paragraphTemplate);
    });

    /******************************************Rating Template***************************************************/
    // Add Rating Template
    $(document).on('click', '#addRating', function(){
        ratingStarCount++;

        let ratingTemplate = `
        <div class="card mb-3 form-rating-star" id="ratingWrapper">
            <div class="card-body position-relative">
                <div class="mb-3">
                    <input type="text" class="form-control rating-label" name="form_rating_question[${ratingStarCount}]" placeholder="Enter Question" required>
                </div>
                <div class="mb-3 rating-stars d-flex justify-content-center align-items-center gap-2" data-rating="0">
                    <i class="fa-regular fa-star star fs-3" data-value="1"></i>
                    <i class="fa-regular fa-star star fs-3" data-value="2"></i>
                    <i class="fa-regular fa-star star fs-3" data-value="3"></i>
                    <i class="fa-regular fa-star star fs-3" data-value="4"></i>
                    <i class="fa-regular fa-star star fs-3" data-value="5"></i>
                    <input type="hidden" name="form_rating_value[${ratingStarCount}]" class="rating-value">
                </div>
                <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger removeRating" 
                style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
            </div>
        </div>`;

        $('#displayFormTemplate, #formTemplatesContainer').append(ratingTemplate);
    });

    // Handle Star Rating Click
    $(document).on('click', '.star', function(){
        let starValue = $(this).data('value');
        let ratingContainer = $(this).closest('.rating-stars');

        ratingContainer.find('.star').removeClass('fa-solid text-warning').addClass('fa-regular');
        ratingContainer.find('.star').each(function(){
            if($(this).data('value') <= starValue){
                $(this).removeClass('fa-regular').addClass('fa-solid text-warning');
            }
        });

        ratingContainer.data('rating', starValue);
        ratingContainer.find('.rating-value').val(starValue);
    });

    /******************************************Date Template***************************************************/
    // Add Date Template
    $(document).on('click', '#addDate', function(){
        dateCount++;

        let dateTemplate = `
        <div class="card mb-3 form-date" id="dateWrapper-${dateCount}">
            <div class="card-body position-relative">
                <div class="mb-3">
                    <input type="text" class="form-control date-label" name="form_date_label[${dateCount}]" placeholder="Enter Question" required>
                </div>
                <div class="mb-3">
                    <input type="date" class="form-control date-input" name="form_date_value[${dateCount}]" readonly="true">
                </div>
                <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger removeDate" 
                style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
            </div>
        </div>`;

        $('#displayFormTemplate, #formTemplatesContainer').append(dateTemplate);
    });
    /******************************************Time Template***************************************************/
     // Add Time Template
     $(document).on('click', '#addTime', function(){
        timeCount++;

        let timeTemplate = `
        <div class="card mb-3 form-time" id="timeWrapper-${timeCount}">
            <div class="card-body position-relative">
                <div class="mb-3">
                    <input type="text" class="form-control time-label" name="form_time_label[${timeCount}]" placeholder="Enter Question" required>
                </div>
                <div class="mb-3">
                    <input type="time" class="form-control time-input" name="form_time_value[${timeCount}]" readonly="true">
                </div>
                <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger removeTime" 
                style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
            </div>
        </div>`;

        $('#displayFormTemplate, #formTemplatesContainer').append(timeTemplate);
    });
    /******************************************Delete Form Template***************************************************/
    $(document).on('click', '#deleteConfirmationForformTemplate', function(){
        const id = $(this).data('form')
        $('#formIdToBeDeleted').val(id)
        retrieveFormTemplate(id, 1)
    });

    $('#deleteForm').on('click', function(){
        const payload = {
            id: $('#formIdToBeDeleted').val(),
            password: $('#passwordFormControlInput1').val()
        }

        deleteFormTemplate(payload);
    })

    /****************************************************************************************************************/
     // Remove Time Template
     $(document).on('click', '.removeTime', function(){
        $(this).closest('.form-time').remove();
    });

    // Remove Date Template
    $(document).on('click', '.removeDate', function(){
        $(this).closest('.form-date').remove();
    });

    // Remove Rating Template
    $(document).on('click', '.removeRating', function(){
        $(this).closest('.form-rating-star').remove();
    });
    
    // Remove Paragraph Template
    $(document).on('click', '.removeParagraph', function(){
        $(this).closest('.form-paragraph').remove();
    });

    // Remove Entire Radio Button Template
    $(document).on('click', '.removeRadio', function(){
        $(this).closest('.form-multiple-choice').remove();
    });

    // Remove Entire File Upload Template
    $(document).on('click', '.removeFileUpload', function(){
        $(this).closest('.form-file-upload').remove();
    });

    // Remove Entire Dropdown Template
    $(document).on('click', '.removeDropdown', function(){
        $(this).closest('.form-dropdown').remove();
    });

    // Remove Entire Checkbox Template
    $(document).on('click', '.removeFormCheckbox', function(){
        $(this).closest('.form-checkbox').remove();
    });

    // Remove Entire Form Header
    $(document).on('click', '#removeFormHeader', function(){
        $('.form-header, .buttons-selector').remove();
        $('#saveFormButton').hide();
    });

    /****************************************Save Form Template***********************************************/
    $('#saveGeneratedForm').on('submit', function(e) {
        e.preventDefault();
    
        const payload = {
            title: $('#formTitle').val().trim(),
            description: $('#formDescription').val().trim(),
            student_id: $('#student_id').val() || null,
            category_id: $('#category_id').val() || null, //
            form_fields: JSON.stringify($(this).serializeArray()),
            status: $('#status').val() || 'draft'
        };
    
        saveFormTemplate(payload);
    });

    /****************************************Retrieve Form***********************************************/
    if (window.location.pathname === '/view-form' && window.location.search.includes('form_id=')) {
        const urlParams = new URLSearchParams(window.location.search);

        const formId = urlParams.get('form_id');
        const version = urlParams.get('form_version');
        
        retrieveFormTemplate(formId, version);
    }

    if (window.location.search.includes('form_id=')) {
        const urlParams = new URLSearchParams(window.location.search);

        const formId = urlParams.get('form_id');
        const version = urlParams.get('form_version');
        const studentId = urlParams.get('student_id');
        jQuery('#formVersionId').val(version);
        const payload = {
            form_id: formId,
            form_version: version,
            student_id: studentId
        }
        
        retrieveFormTemplate(formId, version);
        hasSubmittedFeedback(payload);
    }

    /****************************************Update Evaluation Form****************************************/
    $('#formTemplateUpdate').on('submit', function(e){
        e.preventDefault();

        const payload = {
            form_id: $('#formTemplateId').val(),
            form_fields: JSON.stringify($(this).serializeArray())
        }

        updateFormTemplate(payload);
    });

    /****************************************Form Submission***********************************************/
    $('#formFeedBack').on('submit', function(e){
        e.preventDefault();

        const data = new FormData(this)

        // for (const pair of data.entries()) {
        //     console.log(pair[0], pair[1]);
        // }

        submitFeedback(data);
    });

    /****************************************Form Template Update***********************************************/
    $('#saveFormSettingChanges').on('submit', function(e){
        e.preventDefault();
        const payload = {
            formId: $('#formSettingTemplateId').val(),
            isPublish: $('#switchCheckPublishFormDefault').prop('checked'),
            assignStudent: $('#assignStudent').val(),
            assignCategory: $('#assignCategory').val(),
            assignDepartment: $('#assignDepartment').val(),
        }
        
        saveFormSetting(payload)
    })

    /******************************************View Student Response**********************************************/
    $(document).on('click', '#viewStudentResponse', function(){
        const payload = {
            student_id: $('#formSubmissionStudentId').val(),
            form_id: $(this).data('id')
        }

        viewStudentResponse(payload);
    })
    

    listFormTemplate();
    listOfAssignStudent();
    listOfAssignDepartment();
    listOfAssignCategory();
});

function viewStudentResponse(payload) {
    jQuery.ajax({
        url: './controller/ViewStudenEvaluationResponseController.php',
        type: 'POST',
        data: payload,
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                const container = jQuery('#studentViewResponseDetailsContainer');
                container.empty();

                response.data.forEach((submission, index) => {
                    const data = submission.submission_data;
                    console.log(data)
                    const submittedAt = new Date(submission.submitted_at);
                    const formattedDate = submittedAt.toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    let checkboxHtml = ''
                    if(data.form_checkbox_question){
                        checkboxHtml = renderCheckbox(data.form_checkbox_question, data.form_checkbox_option_label);
                    }

                    let radioHtml = ''
                    if(data.form_radio_question){
                        radioHtml = renderRadio(data.form_radio_question, data.form_radio_label);
                    }

                    let ratingsHTML = '';
                    if (data.form_rating_question) {
                        ratingsHTML = renderRatings(data.form_rating_question, data.form_rating_value);
                    }

                    let paragraphsHTML = '';
                    if (data.form_paragraph_question) {
                        paragraphsHTML = renderParagraphs(data.form_paragraph_question, data.form_paragraph_answer)
                    }

                    let dateHtml = ''
                    if (data.form_date_label) {
                        dateHtml = renderDate(data.form_date_label, data.form_date_value)
                    }

                    let timeHtml = ''
                    if (data.form_time_label) {
                        timeHtml = renderTime(data.form_time_label, data.form_time_value)
                    }

                    let dropdownHtml = ''
                    if (data.form_dropdown_question) {
                        dropdownHtml = renderDropdown(data.form_dropdown_question, data.form_dropdown_answer)
                    }

                    let renderFileHtml = ''
                    if (data.form_file_upload_question) {
                        renderFileHtml = renderFileUpload(data.form_file_upload_question, data.form_file_upload_input)
                    }

                    const html = `
                        <div class="card shadow-sm mb-4">
                            <div class="card-header bg-white py-3">
                                <h5 class="card-title mb-0">${data.form_title}</h5>
                                <small class="text-muted">Version ${submission.form_version}</small>
                            </div>
                            <div class="card-body">
                                <p class="card-text text-secondary">${data.form_description}</p>
                                ${paragraphsHTML}
                                ${ratingsHTML}
                                ${radioHtml}
                                ${checkboxHtml}
                                ${dropdownHtml}
                                ${renderFileHtml}
                                ${dateHtml}
                                ${timeHtml}
                                <div class="text-muted small mt-3">
                                    <i class="bi bi-clock-history me-1"></i>
                                    Submitted on: ${formattedDate}
                                </div>
                            </div>
                        </div>
                    `;

                    container.append(html);
                });
            }
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function submitFeedback(payload) {
    jQuery.ajax({
        url: './controller/SubmitFormFeedbackController.php',
        type: 'POST',
        data: payload,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                Swal.fire({
                    title: 'Success!',
                    text: response.message,
                    icon: 'success'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const payload = {
                            form_id: response.form_id,
                            form_version: response.form_version,
                            student_id: response.student_id
                        }
                        hasSubmittedFeedback(payload)
                    }
                });
            } else {
                for(let i = 0; i < response.messages.length; i++)
                Swal.fire({
                    title: 'Error!',
                    text: response.messages[i],
                    icon: 'error'
                });
            }
        },
        error: function () {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error'
            });
        }
    });
}

function hasSubmittedFeedback(payload){
    jQuery.ajax({
        url: './controller/CheckSubmissionController.php',
        type: 'POST',
        data: payload,
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                if(response.submitted){
                    jQuery('#formFeedBack').removeClass('d-flex').addClass('d-none');
                    jQuery('#displayNoteMessage').append(`
                            <div class="card">
                                <div class="card-body text-center">
                                <input type="hidden" id="formSubmissionStudentId" value="${response.data.student_id}">
                                    <!-- Thank You Message -->
                                    <h5 class="card-title text-muted d-flex align-items-center justify-content-center mb-4">
                                        <i class="bi bi-check-circle-fill text-success display-3 me-3"></i>
                                        Thank you for your feedback.
                                    </h5>

                                    <!-- Button to Trigger Modal -->
                                    <button type="button" class="btn btn-outline-primary mt-2" id="viewStudentResponse" data-bs-toggle="modal" data-bs-target="#viewResponseModal" data-id="${response.data.form_id}">
                                        View your response
                                    </button>
                                </div>
                            </div>`)
                }else{
                    jQuery('#formFeedBack').removeClass('d-none').addClass('d-flex');
                }
            }
        },
        error: function () {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error'
            });
        }
    });
}


function saveFormTemplate(payload) {
    jQuery.ajax({
        url: './controller/AddFormTemplateController.php',
        type: 'POST',
        data: JSON.stringify(payload),
        contentType: 'application/json',
        dataType: 'json',
        processData: false,
        success: function (response) {
            if (response.status === 'success') {
                Swal.fire({
                    title: 'Success!',
                    text: response.message,
                    icon: 'success'
                }).then((result) => {
                    if (result.isConfirmed) {
                        listFormTemplate();
                    }
                });
            } else {
                for(let i = 0; i < response.messages.length; i++)
                Swal.fire({
                    title: 'Error!',
                    text: response.messages[i],
                    icon: 'error'
                });
            }
        },
        error: function () {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error'
            });
        }
    });
}

function saveFormSetting(payload) {
    jQuery.ajax({
        url: './controller/EditFormSettingController.php',
        type: 'POST',
        data: payload,
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                Swal.fire({
                    title: 'Success!',
                    text: response.message,
                    icon: 'success'
                }).then((result) => {
                    if (result.isConfirmed) {
                        listOfAssignStudent();
                        listOfAssignDepartment();
                        listOfAssignCategory();
                    }
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: response.message,
                    icon: 'error'
                });
            }
        },
        error: function () {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error'
            });
        }
    });
}

function updateFormTemplate(payload) {
    jQuery('#formTemplatesContainer').empty();
    jQuery.ajax({
        url: './controller/EditFormTemplateController.php',
        type: 'POST',
        data: JSON.stringify(payload),
        contentType: 'application/json',
        dataType: 'json',
        processData: false,
        success: function (response) {
            if (response.status === 'success') {
                Swal.fire({
                    title: 'Success!',
                    text: response.message,
                    icon: 'success'
                }).then((result) => {
                    if (result.isConfirmed) {
                        retrieveFormTemplate(response.form_id, 1);
                    }
                });
            } else {
                Swal.fire({
                    title: 'Warning!',
                    text: response.message,
                    icon: 'warning'
                }).then((result) => {
                    if (result.isConfirmed) {
                        retrieveFormTemplate(response.form_id, 1);
                    }
                });
            }
        },
        error: function () {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error'
            });
        }
    });
}

function listOfAssignStudent() {
    const urlParams = new URLSearchParams(window.location.search);
    const formId = urlParams.get('form_id');
    jQuery.ajax({
        url: './controller/ListOfAssignStudentController.php',
        type: 'GET',
        data: { form_id: formId },
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                if(formId == parseInt(response.form_id)){
                    const selectedStudentContainer = jQuery('#selectedStudentsContainer');
                    selectedStudentContainer.empty();
                    for(let i = 0; i < response.students.length; i++){
                        selectedStudentContainer.append(`
                            <div class="col-12 col-md-4">
                                <span class="badge bg-primary w-100 text-wrap text-center p-2">
                                    ${response.students[i].full_name}
                                </span>
                            </div>
                        `);
                    }
                } 
            }
        },
        error: function () {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error'
            });
        }
    });
}

function listOfAssignDepartment() {
    const urlParams = new URLSearchParams(window.location.search);
    const formId = urlParams.get('form_id');
    jQuery.ajax({
        url: './controller/ListOfAssignDepartmentController.php',
        type: 'GET',
        data: { form_id: formId },
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                if(formId == parseInt(response.data.form.form_id)){
                    const assignDepartmentId = response.data.department.id;
                    const assignDepartment = jQuery('#assignDepartment');
                    const seletedDepartment = response.data.department.department;
                    const existingAssignDepartment = assignDepartment.find(`option[value="${assignDepartmentId}"]`);
                    if (existingAssignDepartment.length === 0 && seletedDepartment !== '') {
                        assignDepartment.append(`<option value="${assignDepartmentId}" selected>${seletedDepartment}</option>`);
                    } else {
                        existingAssignDepartment.prop('selected', true);
                    }
                }
            }
        },
        error: function () {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error'
            });
        }
    });
}

function listOfAssignCategory() {
    const urlParams = new URLSearchParams(window.location.search);
    const formId = urlParams.get('form_id');
    jQuery.ajax({
        url: './controller/ListOfAssignCategoryController.php',
        type: 'GET',
        data: { form_id: formId },
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                 if(formId == parseInt(response.data.form_id)){
                    const assignCategoryId = response.data.category.id;
                    const assignCategory = jQuery('#assignCategory');
                    const seletedCategory = response.data.category.name;
                    const existingAssignCategory = assignCategory.find(`option[value="${assignCategoryId}"]`);
                    if (existingAssignCategory.length === 0 && seletedCategory !== '') {
                        assignCategory.append(`<option value="${assignCategoryId}" selected>${seletedCategory}</option>`);
                    } else {
                        existingAssignCategory.prop('selected', true);
                    }
                }
            }
        },
        error: function () {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error'
            });
        }
    });
}

function retrieveFormTemplate(formId, version = null) {
    jQuery.ajax({
        url: './controller/RetrieveFormTemplateController.php',
        type: 'GET',
        dataType: 'json',
        data: { form_id: formId, version: version },
        success: function(response) {

            if (response.status === 'success') {
                const form = response.data;
                listOfAssignStudent();

                jQuery('#formTemplateId, #formSettingTemplateId').val(form.form_id);

                const formFields = typeof form.form_fields === 'string' 
                    ? JSON.parse(form.form_fields) 
                    : form.form_fields || [];
                
                // Admin
                const parentContainer = jQuery('#formTemplatesContainer');
                // Student
                const studentParentContainer = jQuery('#formStudentTemplateContainer');
                // Admin
                parentContainer.empty();
                // Student
                studentParentContainer.empty();

                jQuery('#formNameToBeDeleted').text(formFields.find(f => f.name === 'form_title')?.value)

                // Student
                if (studentParentContainer.length > 0) {
                    jQuery('#submitFeedBack').show();

                    // Form Title and Description
                    let formHeader = `
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="studentFormTitle" class="form-label fw-bold">${formFields.find(f => f.name === 'form_title')?.value || 'Untitled Form'}</label>
                                <input type="hidden" id="studentFormTitle" name="form_title" value="${formFields.find(f => f.name === 'form_title')?.value || 'Untitled Form'}">
                            </div>
                            <div class="mb-3">
                                <label for="formDescription" class="form-label fw-bold">Description</label>
                                <textarea class="form-control" id="formDescription" name="form_description" rows="3" readonly="true">${formFields.find(f => f.name === 'form_description')?.value || 'No description'}</textarea>
                            </div>
                        </div>
                    </div>`;

                    studentParentContainer.append(formHeader);

                    // Form Multiple Choice
                    const radioQuestions = formFields.filter(f => f.name.startsWith('form_radio_question'));

                    if(radioQuestions.length > 0) {

                        radioQuestions.forEach(question => {
                            const questionIndex = question.name.match(/\[(\d+)\]/)?.[1];
                    
                            const radioOptions = formFields
                                .filter(f => f.name.startsWith(`form_radio_label[${questionIndex}]`))
                                .map((option, index) => `
                                    <div class="form-check mb-3">
                                        
                                        <input class="form-check-input" type="radio" name="form_radio_label[${questionIndex}]" id="formRadioLabel[${questionIndex}]" value="${option.value}" required>
                                        <label class="form-check-label">
                                            ${option.value}
                                        </label>
                                    </div>
                                `)
                                .join('');
                    
                            const formRadioHTML = `
                                <div class="mb-3">
                                    <label class="form-label fw-bold">${question.value}</label>
                                    <input type="hidden" class="form-control" id="formRadioQuestion[${questionIndex}]" name="form_radio_question[${questionIndex}]" value="${question.value}">
                                </div>
                                ${radioOptions}`;


                            const formRadioTemplate = `
                            <div class="card mb-3 form-radio-container">
                                <div class="card-body">
                                    ${formRadioHTML}
                                </div>
                            </div>`;
                            
                            studentParentContainer.append(formRadioTemplate)
                        });
                    }

                    // Form Dropdown
                    const dropDownQuestions = formFields.filter(f => f.name.startsWith('form_dropdown_question'));

                    if(dropDownQuestions.length > 0){
                        dropDownQuestions.forEach(question => {
                            const questionIndex = question.name.match(/\[(\d+)\]/)?.[1];
                    
                            if (!questionIndex) {
                                console.error(`Error: Unable to extract index from question name: ${question.name}`);
                                return;
                            }
                    
                            const dropdownOptions = formFields
                                .filter(f => f.name.startsWith(`form_dropdown_option[${questionIndex}]`))
                                .map((option, index) => `
                                    <option value="${option.value}">${option.value}</option>
                                `)
                                .join('');
                    
                            const dropdownHTML = `
                                <div class="mb-3">
                                    <label class="form-label fw-bold">${question.value}</label>
                                    <input type="hidden" class="form-control" name="form_dropdown_question[${questionIndex}]" value="${question.value}">
                                </div>
                                <select class="form-select" name="form_dropdown_answer[${questionIndex}]" aria-label="Default select example" required>
                                    <option selected>Select answer</option>
                                    ${dropdownOptions}
                                </select>
                            `;

                            const formDropDownTemplate = `
                            <div class="card mb-3 form-dropdown-container">
                                <div class="card-body">
                                    ${dropdownHTML}
                                </div>
                            </div>`;
    
                            studentParentContainer.append(formDropDownTemplate)
                        });
                    }

                    // Form checkbox
                    const checkboxQuestions = formFields.filter(f => f.name.startsWith('form_checkbox_question'));

                    if(checkboxQuestions.length > 0){
                
                        checkboxQuestions.forEach(question => {
                            const questionIndex = question.name.match(/\[(\d+)\]/)?.[1];
                    
                            if (!questionIndex) {
                                console.error(`Error: Unable to extract index from question name: ${question.name}`);
                                return;
                            }
                    
                            const checkboxOptions = formFields
                                .filter(f => f.name.startsWith(`form_checkbox_option_label[${questionIndex}]`))
                                .map((option, index) => `
                                    <div class="form-check mb-3">
                                        <input type="checkbox" class="form-check-input" name="form_checkbox_option_label[${questionIndex}]" value="${option.value}" id="formCheckBoxOptionLabel[${index + 1}]">
                                        <label class="form-check-label" for="formCheckBoxOptionLabel[${questionIndex}]">
                                            ${option.value}
                                        </label>
                                    </div>
                                `)
                                .join('');
                    
                            const checkboxHTML = `
                                <div class="mb-3">
                                    <label class="form-label fw-bold">${question.value}</label>
                                    <input type="hidden" class="form-control" name="form_checkbox_question[${questionIndex}]" value="${question.value}" id="formCheckBoxQuestion[${questionIndex}]">
                                </div>
                                ${checkboxOptions}
                            `;

                            const formCheckBoxTemplate = `
                            <div class="card mb-3 form-checkbox-container">
                                <div class="card-body">
                                    ${checkboxHTML}
                                </div>
                            </div>`;
    
                            studentParentContainer.append(formCheckBoxTemplate)
                        });
                    }

                    // Form Upload
                    const fileUploadQuestions = formFields.filter(f => f.name.startsWith('form_file_upload_question'));

                    if(fileUploadQuestions.length > 0){
                
                        fileUploadQuestions.forEach(question => {
                    
                            const fileUploadHTML = `
                                <div class="mb-3">
                                    <label for="formFileUploadQuestion" class="form-label fw-bold">${question.value}</label>
                                    <input type="hidden" class="form-control" name="form_file_upload_question" value="${question.value}" id="formFileUploadQuestion">
                                </div>
                                <div class="mb-3">
                                    <input type="file" class="form-control" name="form_file_upload_input" required>
                                </div>
                            `;

                            const formFileUploadTemplate = `
                            <div class="card mb-3 form-file-upload-container">
                                <div class="card-body">
                                    ${fileUploadHTML}
                                </div>
                            </div>`;
    
                            studentParentContainer.append(formFileUploadTemplate)
                        });
                    }

                    // Form Paragraph
                    const fileParagraphQuestions = formFields.filter(f => f.name.startsWith('form_paragraph_question'));

                    if(fileParagraphQuestions.length > 0){
                
                        fileParagraphQuestions.forEach(question => {
                            const questionIndex = question.name.match(/\[(\d+)\]/)?.[1];
                    
                            const fileParagraphHTML = `
                                <div class="mb-3">
                                    <label class="form-label fw-bold">${question.value}</label>
                                    <input type="hidden" class="form-control" name="form_paragraph_question[${questionIndex}]" value="${question.value}" id="formParagraphQuestion[${questionIndex}]">
                                </div>
                                <div class="mb-3">
                                    <textarea class="form-control" id="formParagraphText[${questionIndex}]" rows="3" name="form_paragraph_answer[${questionIndex}]" required></textarea>
                                </div>
                            `;

                            const formParagraphTemplate = `
                            <div class="card mb-3 form-paragraph-container">
                                <div class="card-body">
                                    ${fileParagraphHTML}
                                </div>
                            </div>`;
    
                            studentParentContainer.append(formParagraphTemplate)
                        });
                    }

                    // Form Rating
                    const formRatingQuestions = formFields.filter(f => f.name.startsWith('form_rating_question'));

                    if(formRatingQuestions.length > 0){
                
                        formRatingQuestions.forEach(question => {
                            const formRatingIndex = question.name.match(/\[(\d+)\]/)?.[1];
                    
                            const formRatingHTML = `
                                <div class="mb-3">
                                    <label for="formRatingQuestion" class="form-label fw-bold">${question.value}</label>
                                    <input type="hidden" class="form-control" name="form_rating_question[${formRatingIndex}]" value="${question.value}" id="formRatingQuestion">
                                </div>
                                <div class="mb-3 rating-stars d-flex justify-content-center align-items-center gap-2" data-rating="0">
                                    <i class="fa-regular fa-star star fs-3" data-value="1"></i>
                                    <i class="fa-regular fa-star star fs-3" data-value="2"></i>
                                    <i class="fa-regular fa-star star fs-3" data-value="3"></i>
                                    <i class="fa-regular fa-star star fs-3" data-value="4"></i>
                                    <i class="fa-regular fa-star star fs-3" data-value="5"></i>
                                    <input type="hidden" name="form_rating_value[${formRatingIndex}]" class="rating-value">
                                </div>
                            `;

                            const formFileUploadTemplate = `
                            <div class="card mb-3 form-rating-container">
                                <div class="card-body">
                                    ${formRatingHTML}
                                </div>
                            </div>`;
    
                            studentParentContainer.append(formFileUploadTemplate)
                        });
                    }

                    // Form Date
                    const formDateLabel = formFields.filter(f => f.name.startsWith('form_date_label'));

                    if(formDateLabel.length > 0){
                
                        formDateLabel.forEach(question => {
                            const questionIndex = question.name.match(/\[(\d+)\]/)?.[1];
                    
                            const formDateHTML = `
                                <div class="mb-3">
                                    <label class="form-label fw-bold">${question.value}</label>
                                    <input type="hidden" class="form-control" name="form_date_label[${questionIndex}]" value="${question.value}" id="formDateLabel[${questionIndex}]">
                                </div>
                                <div class="mb-3">
                                    <input type="date" class="form-control" name="form_date_value[${questionIndex}]" required>
                                </div>
                            `;

                            const formDateTemplate = `
                            <div class="card mb-3 form-date-container">
                                <div class="card-body">
                                    ${formDateHTML}
                                </div>
                            </div>`;
    
                            studentParentContainer.append(formDateTemplate)
                        });
                    }

                    // Form Time
                    const formTimeLabel = formFields.filter(f => f.name.startsWith('form_time_label'));

                    if(formTimeLabel.length > 0){
                
                        formTimeLabel.forEach(question => {
                            const questionIndex = question.name.match(/\[(\d+)\]/)?.[1];
                    
                            const formTimeHTML = `
                                <div class="mb-3">
                                    <label class="form-label fw-bold">${question.value}</label>
                                    <input type="hidden" class="form-control" name="form_time_label[${questionIndex}]" value="${question.value}" id="formTimeLabel[${questionIndex}]">
                                </div>
                                <div class="mb-3">
                                    <input type="time" class="form-control" name="form_time_value[${questionIndex}]" required>
                                </div>
                            `;

                            const formTimeTemplate = `
                            <div class="card mb-3 form-time-container">
                                <div class="card-body">
                                    ${formTimeHTML}
                                </div>
                            </div>`;
    
                            studentParentContainer.append(formTimeTemplate)
                        });
                    }
                }

                // Admin
                if (parentContainer.length > 0) {

                    parentContainer.append(`
                        <div class="d-flex flex-column flex-md-row flex-lg-row flex-xl-row flex-xxl-row gap-3 mb-3 buttons-selector">
                            <button type="button" class="btn btn-primary" id="addCheckbox">Checkboxes</button>
                            <button type="button" class="btn btn-primary" id="addDropdown">Dropdown</button>
                            <button type="button" class="btn btn-primary" id="addFileUpload">File Upload</button>
                            <button type="button" class="btn btn-primary" id="addParagraph">Paragraph</button>
                            <button type="button" class="btn btn-primary" id="addMultipleChoice">Multiple Choice</button>
                            <button type="button" class="btn btn-primary" id="addRating">Rating</button>
                            <button type="button" class="btn btn-primary" id="addDate">Date</button>
                            <button type="button" class="btn btn-primary" id="addTime">Time</button>
                        </div>
                        `);

                    jQuery('#saveEvaluationFormChanges').show();

                    // Form Title and Description
                    const formTitleAndDescriptionIndex = formFields.findIndex(f => f.name === 'form_title');
                    let formHeader = `
                    <div class="card mb-3" data-index="${formTitleAndDescriptionIndex}">
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="formTitle" class="form-label fw-bold">Title</label>
                                <input type="text" class="form-control" id="formTitle" name="form_title" value="${formFields.find(f => f.name === 'form_title')?.value || 'Untitled Form'}">
                            </div>
                            <div class="mb-3">
                                    <label for="formDescription" class="form-label fw-bold">Description</label>
                                <textarea class="form-control" id="formDescription" name="form_description" rows="3">${formFields.find(f => f.name === 'form_description')?.value || 'No description'}</textarea>
                            </div>
                        </div>
                    </div>`;

                    parentContainer.append(formHeader);

                    // Form Multiple Choice
                    const radioQuestions = formFields.filter(f => f.name.startsWith('form_radio_question'));

                    if(radioQuestions.length > 0) {
                        const radioQuestionsIndex = formFields.findIndex(f => f.name.startsWith('form_radio_question'));

                        radioQuestions.forEach(question => {
                            const questionIndex = question.name.match(/\[(\d+)\]/)?.[1];
                    
                            const radioOptions = formFields
                                .filter(f => f.name.startsWith(`form_radio_label[${questionIndex}]`))
                                .map((option, index) => `
                                    <div class="form-check mb-3">
                                        <label for="formRadioLabel[${questionIndex}]" class="form-label fw-bold">Option ${index + 1}</label>
                                        <input class="form-check-input" type="radio" name="form_radio_label[${questionIndex}]" id="formRadioLabel[${questionIndex}]" value="${option.value}">
                                        <input type="text" class="form-control radio-label" name="form_radio_label[${questionIndex}]" value="${option.value}">
                                    </div>
                                `)
                                .join('');
                    
                            const formRadioHTML = `
                                <div class="mb-3">
                                    <label for="formRadioQuestion[${questionIndex}]" class="form-label fw-bold">Question ${questionIndex}</label>
                                    <input type="text" class="form-control" id="formRadioQuestion[${questionIndex}]" name="form_radio_question[${questionIndex}]" value="${question.value}">
                                </div>
                                ${radioOptions}`;


                            const formRadioTemplate = `
                            <div class="card mb-3 form-radio-container position-relative" data-index="${radioQuestionsIndex}">
                                <div class="card-body">
                                    ${formRadioHTML}
                                    <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger" data-index="${radioQuestionsIndex}" id="removeFormRadioIndex" style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
                                </div>
                            </div>`;
                            
                            parentContainer.append(formRadioTemplate)
                        });
                    }

                    // Form Dropdown
                    const dropDownQuestions = formFields.filter(f => f.name.startsWith('form_dropdown_question'));

                    if(dropDownQuestions.length > 0){

                        const dropDownQuestionsIndex = formFields.findIndex(f => f.name.startsWith('form_dropdown_question'));
                
                        dropDownQuestions.forEach(question => {
                            const questionIndex = question.name.match(/\[(\d+)\]/)?.[1];
                    
                            if (!questionIndex) {
                                console.error(`Error: Unable to extract index from question name: ${question.name}`);
                                return;
                            }
                    
                            const dropdownOptions = formFields
                                .filter(f => f.name.startsWith(`form_dropdown_option[${questionIndex}]`))
                                .map((option, index) => `
                                    <div class="mb-3">
                                        <label for="formDropDownOption[${questionIndex}]" class="form-label fw-bold">Option ${index + 1}</label>
                                        <input type="text" class="form-control" name="form_dropdown_option[${questionIndex}]" value="${option.value}">
                                    </div>
                                `)
                                .join('');
                    
                            const dropdownHTML = `
                                <div class="mb-3">
                                    <label for="formDropDownQuestion[${questionIndex}]" class="form-label fw-bold">Question ${questionIndex}</label>
                                    <input type="text" class="form-control" name="form_dropdown_question[${questionIndex}]" value="${question.value}">
                                </div>
                                ${dropdownOptions}
                            `;

                            const formDropDownTemplate = `
                            <div class="card mb-3 form-dropdown-container position-relative" data-index="${dropDownQuestionsIndex}">
                                <div class="card-body">
                                    ${dropdownHTML}
                                     <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger" data-index="${dropDownQuestionsIndex}" id="removeformDropDownIndex" style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
                                </div>
                            </div>`;
    
                            parentContainer.append(formDropDownTemplate)
                        });
                    }

                    // Form checkbox
                    const checkboxQuestions = formFields.filter(f => f.name.startsWith('form_checkbox_question'));

                    if(checkboxQuestions.length > 0){

                        const checkboxQuestionsIndex = formFields.findIndex(f => f.name.startsWith('form_checkbox_question'));
                
                        checkboxQuestions.forEach(question => {
                            const questionIndex = question.name.match(/\[(\d+)\]/)?.[1];
                    
                            if (!questionIndex) {
                                console.error(`Error: Unable to extract index from question name: ${question.name}`);
                                return;
                            }
                    
                            const checkboxOptions = formFields
                                .filter(f => f.name.startsWith(`form_checkbox_option_label[${questionIndex}]`))
                                .map((option, index) => `
                                    <div class="form-check mb-3">
                                        <input type="checkbox" class="form-check-input" name="form_checkbox_option_label[${index + 1}]" value="${option.value}" id="formCheckBoxOptionLabel[${index + 1}]">
                                        <input type="text" class="form-control" name="form_checkbox_option_label[${index + 1}]" value="${option.value}" id="formCheckBoxQuestion[${index + 1}]">
                                    </div>
                                `)
                                .join('');
                    
                            const checkboxHTML = `
                                <div class="mb-3">
                                    <label for="formCheckBoxQuestion[${questionIndex}]" class="form-label fw-bold">Question ${questionIndex}</label>
                                    <input type="text" class="form-control" name="form_checkbox_question[${questionIndex}]" value="${question.value}" id="formCheckBoxQuestion[${questionIndex}]">
                                </div>
                                ${checkboxOptions}
                            `;

                            const formCheckBoxTemplate = `
                            <div class="card mb-3 form-checkbox-container position-relative" data-index="${checkboxQuestionsIndex}">
                                <div class="card-body">
                                    ${checkboxHTML}
                                    <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger" data-index="${checkboxQuestionsIndex}" id="removeFormCheckboxQuestionsIndex" style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
                                </div>
                            </div>`;
    
                            parentContainer.append(formCheckBoxTemplate)
                        });
                    }

                    // Form Upload
                    const fileUploadQuestions = formFields.filter(f => f.name.startsWith('form_file_upload_question'));

                    if(fileUploadQuestions.length > 0){

                        const fileUploadQuestionsIndex = formFields.findIndex(f => f.name.startsWith('form_file_upload_question'));
                
                        fileUploadQuestions.forEach(question => {
                    
                            const fileUploadHTML = `
                                <div class="mb-3">
                                    <label for="formFileUploadQuestion" class="form-label fw-bold">Label</label>
                                    <input type="text" class="form-control" name="form_file_upload_question" value="${question.value}" id="formFileUploadQuestion">
                                </div>
                                <div class="mb-3">
                                    <input type="file" class="form-control" name="form_file_upload_input">
                                </div>
                            `;

                            const formFileUploadTemplate = `
                            <div class="card mb-3 form-file-upload-container position-relative" data-index="${fileUploadQuestionsIndex}">
                                <div class="card-body">
                                    ${fileUploadHTML}
                                    <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger" data-index="${fileUploadQuestionsIndex}" id="removeFormFileUploadQuestionsIndex" style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
                                </div>
                            </div>`;
    
                            parentContainer.append(formFileUploadTemplate)
                        });
                    }

                    // Form Paragraph
                    const fileParagraphQuestions = formFields.filter(f => f.name.startsWith('form_paragraph_question'));

                    if(fileParagraphQuestions.length > 0){

                        const fileParagraphQuestionsIndex  = formFields.findIndex(f => f.name.startsWith('form_paragraph_question'));
                
                        fileParagraphQuestions.forEach(question => {
                            const questionIndex = question.name.match(/\[(\d+)\]/)?.[1];
                    
                            const fileParagraphHTML = `
                                <div class="mb-3">
                                    <label for="formParagraphQuestion[${questionIndex}]" class="form-label fw-bold">Question ${questionIndex}</label>
                                    <input type="text" class="form-control" name="form_paragraph_question[${questionIndex}]" value="${question.value}" id="formParagraphQuestion[${questionIndex}]">
                                </div>
                                <div class="mb-3">
                                    <label for="formParagraphText[${questionIndex}]" class="form-label fw-bold">Answer ${questionIndex}</label>
                                    <textarea class="form-control" id="formParagraphText[${questionIndex}]" rows="3"></textarea>
                                </div>
                            `;

                            const formParagraphTemplate = `
                            <div class="card mb-3 form-paragraph-container position-relative" data-index="${fileParagraphQuestionsIndex}">
                                <div class="card-body">
                                    ${fileParagraphHTML}
                                    <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger" data-index="${fileParagraphQuestionsIndex}" id="removeFormParagraphQuestionsIndex" style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
                                </div>
                            </div>`;
    
                            parentContainer.append(formParagraphTemplate)
                        });
                    }

                    // Form Rating
                    const formRatingQuestions = formFields.filter(f => f.name.startsWith('form_rating_question'));

                    if(formRatingQuestions.length > 0){
                        
                        const formRatingQuestionsIndex = formFields.findIndex(f => f.name.startsWith('form_rating_question'));
                
                        formRatingQuestions.forEach(question => {
                            const formRatingIndex = question.name.match(/\[(\d+)\]/)?.[1];
                            const formRatingHTML = `
                                <div class="mb-3">
                                    <label for="formRatingQuestion" class="form-label fw-bold">Question</label>
                                    <input type="text" class="form-control" name="form_rating_question[${formRatingIndex}]" value="${question.value}" id="formRatingQuestion">
                                </div>
                                <div class="mb-3 rating-stars d-flex justify-content-center align-items-center gap-2" data-rating="0">
                                    <i class="fa-regular fa-star star fs-3" data-value="1"></i>
                                    <i class="fa-regular fa-star star fs-3" data-value="2"></i>
                                    <i class="fa-regular fa-star star fs-3" data-value="3"></i>
                                    <i class="fa-regular fa-star star fs-3" data-value="4"></i>
                                    <i class="fa-regular fa-star star fs-3" data-value="5"></i>
                                    <input type="hidden" name="form_rating_value[${formRatingIndex}]" class="rating-value">
                                </div>
                            `;

                            const formFileUploadTemplate = `
                            <div class="card mb-3 form-rating-container position-relative" data-index="${formRatingQuestionsIndex}">
                                <div class="card-body">
                                    ${formRatingHTML}
                                    <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger" data-index="${formRatingQuestionsIndex}" id="removeFormRatingQuestionsIndex" style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
                                </div>
                            </div>`;
    
                            parentContainer.append(formFileUploadTemplate)
                        });
                    }

                    // Form Date
                    const formDateLabel = formFields.filter(f => f.name.startsWith('form_date_label'));

                    if(formDateLabel.length > 0){

                        const formDateLabelIndex = formFields.findIndex(f => f.name.startsWith('form_date_label'));
                
                        formDateLabel.forEach(question => {
                            const questionIndex = question.name.match(/\[(\d+)\]/)?.[1];
                    
                            const formDateHTML = `
                                <div class="mb-3">
                                    <label for="formDateLabel[${questionIndex}]" class="form-label fw-bold">Label</label>
                                    <input type="text" class="form-control" name="form_date_label[${questionIndex}]" value="${question.value}" id="formDateLabel[${questionIndex}]">
                                </div>
                                <div class="mb-3">
                                    <input type="date" class="form-control" name="form_date_value[${questionIndex}]">
                                </div>
                            `;

                            const formDateTemplate = `
                            <div class="card mb-3 form-date-container position-relative" data-index="${formDateLabelIndex}">
                                <div class="card-body">
                                    ${formDateHTML}
                                    <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger" data-index="${formDateLabelIndex}" id="removeFormDateIndex" style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
                                </div>
                            </div>`;
    
                            parentContainer.append(formDateTemplate)
                        });
                    }

                    // Form Time
                    const formTimeLabel = formFields.filter(f => f.name.startsWith('form_time_label'));

                    if(formTimeLabel.length > 0){

                        const formTimeLabelIndex = formFields.findIndex(f => f.name.startsWith('form_time_label'));
                
                        formTimeLabel.forEach(question => {
                            const questionIndex = question.name.match(/\[(\d+)\]/)?.[1];
                    
                            const formTimeHTML = `
                                <div class="mb-3">
                                    <label for="formTimeLabel[${questionIndex}]" class="form-label fw-bold">Label</label>
                                    <input type="text" class="form-control" name="form_time_label[${questionIndex}]" value="${question.value}" id="formTimeLabel[${questionIndex}]">
                                </div>
                                <div class="mb-3">
                                    <input type="time" class="form-control" name="form_time_value[${questionIndex}]">
                                </div>
                            `;

                            const formTimeTemplate = `
                            <div class="card mb-3 form-time-container position-relative" data-index="${formTimeLabelIndex}">
                                <div class="card-body">
                                    ${formTimeHTML}
                                    <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger" data-index="${formTimeLabelIndex}" id="removeFormTimeIndex" style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
                                </div>
                            </div>`;
    
                            parentContainer.append(formTimeTemplate)
                        });
                    }
                }

                const formRadioContainers = parentContainer.find('.form-radio-container')
                formRadioContainers.each(function () {
                    const $container = jQuery(this);
                    const hasChildren = $container.children().length > 0;
                
                    if (!hasChildren) {
                        $container.hide();
                    } else {
                        $container.show();
                    }
                });

                jQuery(document).on('click', '#removeFormRadioIndex', function() {
                    const indexToRemove = jQuery(this).data('index');
                    jQuery(this).closest('.form-radio-container').remove();
                    formFields.splice(indexToRemove, 1);
                });

                jQuery(document).on('click', '#removeformDropDownIndex', function() {
                    const indexToRemove = jQuery(this).data('index');
                    jQuery(this).closest('.form-dropdown-container').remove();
                    formFields.splice(indexToRemove, 1);
                });

                jQuery(document).on('click', '#removeFormCheckboxQuestionsIndex', function() {
                    const indexToRemove = jQuery(this).data('index');
                    jQuery(this).closest('.form-checkbox-container').remove();
                    formFields.splice(indexToRemove, 1);
                })

                jQuery(document).on('click', '#removeFormFileUploadQuestionsIndex', function() {
                    const indexToRemove = jQuery(this).data('index');
                    jQuery(this).closest('.form-file-upload-container').remove();
                    formFields.splice(indexToRemove, 1);
                })

                jQuery(document).on('click', '#removeFormParagraphQuestionsIndex', function() {
                    const indexToRemove = jQuery(this).data('index');
                    jQuery(this).closest('.form-paragraph-container').remove();
                    formFields.splice(indexToRemove, 1);
                })

                jQuery(document).on('click', '#removeFormRatingQuestionsIndex', function() {
                    const indexToRemove = jQuery(this).data('index');
                    jQuery(this).closest('.form-rating-container').remove();
                    formFields.splice(indexToRemove, 1);
                })

                jQuery(document).on('click', '#removeFormDateIndex', function() {
                    const indexToRemove = jQuery(this).data('index');
                    jQuery(this).closest('.form-date-container').remove();
                    formFields.splice(indexToRemove, 1);
                })

                jQuery(document).on('click', '#removeFormTimeIndex', function() {
                    const indexToRemove = jQuery(this).data('index');
                    jQuery(this).closest('.form-time-container').remove();
                    formFields.splice(indexToRemove, 1);
                })

            } else {
                jQuery('#formTemplatesContainer').html(`
                    <div class="card border border-info">
                        <div class="card-body">
                            <p class="card-text text-center text-danger">Form not found or error retrieving form fields.</p>
                        </div>
                    </div>
                    `);
            }
        }
    });
}

function listFormTemplate() {
    jQuery.ajax({
        url: './controller/ListFormTemplateController.php',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            let formCardDisplayContainer = jQuery('#displayFormTemplateCard');
            let formDisplayFormTemplate = jQuery('#displayFormTemplate');
            let saveButton = jQuery('#saveFormButton');

            // Clear previous content
            formCardDisplayContainer.empty();
            formDisplayFormTemplate.empty();
            saveButton.hide();

            if (response.status === 'success' && response.data.length > 0) {
                response.data.forEach(form => {
                    if(form.status === 'published'){
                        jQuery('#switchCheckPublishFormDefault').prop('checked', true);
                    }else{
                        jQuery('#switchCheckPublishFormDefault').prop('checked', false);
                    }

                    // Render Form Cards
                    let formCardDisplay = `
                        <div class="col-md-6 col-lg-4 mb-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">${form.title || 'Untitled Form'}</h5>
                                    <p class="card-text">${form.description || 'No description'}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="badge ${form.status === 'draft' ? 'bg-secondary' : 'bg-success'}">
                                            ${form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                                        </span>
                                        <a class="btn btn-primary btn-sm view-form-btn" href="/view-form?form_id=${form.id}&form_version=${form.version}">
                                            <i class="fas fa-eye me-1"></i> View Form
                                        </a>
                                    </div>
                                </div>
                                <div class="card-footer bg-transparent d-flex justify-content-between">
                                    <small class="text-muted">Created at: ${new Date(form.created_at).toLocaleDateString()}</small>
                                    <i class="fa-regular fa-trash-can" data-form="${form.id}" id="deleteConfirmationForformTemplate" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#deleteFormModal"></i>
                                </div>

                            </div>
                        </div>`;
                    formCardDisplayContainer.append(formCardDisplay);
                });
            } else {
                formCardDisplayContainer.html(`
                    <div class="card border border-info">
                        <div class="card-body">
                            <p class="text-muted card-text text-center">No forms available.</p>
                        </div>
                    </div>
                    `);
            }
        }
    });
}

function deleteFormTemplate(payload){
    jQuery.ajax({
        url: './controller/DeleteFormTemplateController.php',
        type: 'POST',
        data: payload,
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                Swal.fire({
                    title: 'Success!',
                    text: response.message,
                    icon: 'success'
                }).then((result) => {
                    if (result.isConfirmed) {
                        listFormTemplate();
                        jQuery('#passwordFormControlInput1').val('');
                    }
                });
            } else {
                for(let i = 0; i < response.messages.length; i++)
                Swal.fire({
                    title: 'Error!',
                    text: response.messages[i],
                    icon: 'error'
                }).then((result) => {
                    if (result.isConfirmed) {
                        listFormTemplate();
                        jQuery('#passwordFormControlInput1').val('');
                    }
                });
            }
        },
        error: function () {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error'
            });
        }
    });
}

function renderFileUpload(label, file = null) {
    let html = '';

    if (!file) {
        html += `
            <div class="mb-3">
                <label><strong>${label}</strong></label>
                <div class="mt-2">
                    <input type="file" class="form-control" name="fileUpload" />
                </div>
            </div>
        `;
    } else {
        let displayContent;

        if (typeof file === 'string') {
            displayContent = `
                <a href="/uploads/${file}" target="_blank">${file}</a>
            `;
        } else if (file instanceof File) {
            const fileName = file.name;
            const fileSizeKB = (file.size / 1024).toFixed(2) + ' KB';
            displayContent = `
                ${fileName} 
                <small class="text-muted">(${fileSizeKB})</small>
            `;
        } else if (typeof file === 'object' && file !== null) {
            const fileName = file.name || 'Unknown File';
            const fileSize = file.size ? (file.size / 1024).toFixed(2) + ' KB' : '';
            const fileURL = file.url || '#';

            displayContent = `
                <a href="${fileURL}" target="_blank">${fileName}</a>
                ${fileSize ? `<small class="text-muted">(${fileSize})</small>` : ''}
            `;
        } else {
            displayContent = 'No file was uploaded.';
        }

        html += `
            <div class="mb-3">
                <label><strong>${label}</strong></label>
                <p class="mt-2 p-3 border rounded bg-light">
                    ${displayContent}
                </p>
            </div>
        `;
    }

    return html;
}

function renderDate(labels, values){
    let html = '';

    if (typeof labels === 'string' && typeof values !== 'object') {
        html += `
            <div class="mb-3">
                <strong>${labels}</strong>
                <p class="mt-2 p-3 border rounded bg-light">
                    ${values || 'No answer provided.'}
                </p>
            </div>
        `;
    } else if (typeof labels === 'object' && labels !== null) {
        Object.keys(labels).forEach(key => {
            const question = labels[key];
            const label = (typeof values === 'object' && values !== null && values[key] !== undefined)
                ? values[key]
                : 'No answer provided.';

            html += `
                <div class="mb-3" key="${key}">
                    <strong>${question}</strong>
                    <p class="mt-2 p-3 border rounded bg-light">
                        ${label}
                    </p>
                </div>
            `;
        });
    }

    return html; 
}

function renderDropdown(questions, answers){
    let html = '';

    if (typeof questions === 'string' && typeof answers !== 'object') {
        html += `
            <div class="mb-3">
                <strong>${questions}</strong>
                <p class="mt-2 p-3 border rounded bg-light">
                    ${answers || 'No answer provided.'}
                </p>
            </div>
        `;
    } else if (typeof questions === 'object' && questions !== null) {
        Object.keys(questions).forEach(key => {
            const question = questions[key];
            const label = (typeof answers === 'object' && answers !== null && answers[key] !== undefined)
                ? answers[key]
                : 'No answer provided.';

            html += `
                <div class="mb-3" key="${key}">
                    <strong>${question}</strong>
                    <p class="mt-2 p-3 border rounded bg-light">
                        ${label}
                    </p>
                </div>
            `;
        });
    }

    return html; 
}

function renderTime(labels, values){
    let html = '';

    if (typeof labels === 'string' && typeof values !== 'object') {
        html += `
            <div class="mb-3">
                <strong>${questions}</strong>
                <p class="mt-2 p-3 border rounded bg-light">
                    ${values || 'No answer provided.'}
                </p>
            </div>
        `;
    } else if (typeof labels === 'object' && labels !== null) {
        Object.keys(labels).forEach(key => {
            const question = labels[key];
            const label = (typeof values === 'object' && values !== null && values[key] !== undefined)
                ? values[key]
                : 'No answer provided.';

            html += `
                <div class="mb-3" key="${key}">
                    <strong>${question}</strong>
                    <p class="mt-2 p-3 border rounded bg-light">
                        ${label}
                    </p>
                </div>
            `;
        });
    }

    return html; 
}

function renderCheckbox(questions, labels) {
    let html = '';

    if (typeof questions === 'string' && typeof labels !== 'object') {
        html += `
            <div class="mb-3">
                <strong>${questions}</strong>
                <p class="mt-2 p-3 border rounded bg-light">
                    ${labels || 'No answer provided.'}
                </p>
            </div>
        `;
    } else if (typeof questions === 'object' && questions !== null) {
        Object.keys(questions).forEach(key => {
            const question = questions[key];
            const label = (typeof labels === 'object' && labels !== null && labels[key] !== undefined)
                ? labels[key]
                : 'No answer provided.';

            html += `
                <div class="mb-3" key="${key}">
                    <strong>${question}</strong>
                    <p class="mt-2 p-3 border rounded bg-light">
                        ${label}
                    </p>
                </div>
            `;
        });
    }

    return html; 
}

function renderRadio(questions, labels) {
       let html = '';

    if (typeof questions === 'string' && typeof labels !== 'object') {
        html += `
            <div class="mb-3">
                <strong>${questions}</strong>
                <p class="mt-2 p-3 border rounded bg-light">
                    ${answers || 'No answer provided.'}
                </p>
            </div>
        `;
    } else if (typeof questions === 'object' && questions !== null) {
        Object.keys(questions).forEach(key => {
            const question = questions[key];
            const label = (typeof labels === 'object' && labels !== null && labels[key] !== undefined)
                ? labels[key]
                : 'No answer provided.';

            html += `
                <div class="mb-3" key="${key}">
                    <strong>${question}</strong>
                    <p class="mt-2 p-3 border rounded bg-light">
                        ${label}
                    </p>
                </div>
            `;
        });
    }

    return html; 
}

function renderParagraphs(questions, answers) {
    let html = '';

    if (typeof questions === 'string' && typeof answers !== 'object') {
        html += `
            <div class="mb-3">
                <strong>${questions}</strong>
                <p class="mt-2 p-3 border rounded bg-light">
                    ${answers || 'No answer provided.'}
                </p>
            </div>
        `;
    } else if (typeof questions === 'object' && questions !== null) {
        Object.keys(questions).forEach(key => {
            const question = questions[key];
            const answer = (typeof answers === 'object' && answers !== null && answers[key] !== undefined)
                ? answers[key]
                : 'No answer provided.';

            html += `
                <div class="mb-3" key="${key}">
                    <strong>${question}</strong>
                    <p class="mt-2 p-3 border rounded bg-light">
                        ${answer}
                    </p>
                </div>
            `;
        });
    }

    return html;
}

function renderRatings(questions, values) {
    let html = '';

    if (typeof questions === 'string' && typeof values !== 'object') {
        html += `
            <div class="mb-3">
                <strong>${questions}</strong>
                <div class="d-flex align-items-center mt-2">
                    ${renderStarRating(values)}
                    <span class="ms-2 fw-bold">${values}/5</span>
                </div>
            </div>
        `;
    }else if (typeof questions === 'object' && questions !== null) {
        Object.keys(questions).forEach(key => {
            const question = questions[key];
            const value = (typeof values === 'object' && values !== null) ? values[key] || '0' : '0';

            html += `
                <div class="mb-3" key="${key}">
                    <strong>${question}</strong>
                    <div class="d-flex align-items-center mt-2">
                        ${renderStarRating(value)}
                        <span class="ms-2 fw-bold">${value}/5</span>
                    </div>
                </div>
            `;
        });
    }

    return html;
}

function renderStarRating(rating) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="bi bi-star-fill text-warning"></i>';
    }

    if (hasHalf) {
        starsHTML += '<i class="bi bi-star-half text-warning"></i>';
    }

    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="bi bi-star text-warning"></i>';
    }

    return starsHTML;
}