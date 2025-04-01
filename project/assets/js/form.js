jQuery(function($){
    let checkboxCount = 0; // To ensure unique IDs
    let checkboxOptionCount = 0;
    let dropdownCount = 0;
    let dropdownOptionCount = 0;
    let radioGroupCount = 0;
    let radioGroupOptionCount = 0;
    let radioGroupLabelCount = 0;
    let paragraphCount = 0;
    let dateCount = 0;
    let timeCount = 0;

    // Initially hide these button
    $('#saveFormButton, #submitFeedBack').hide();

    // Generate form header
    $('#createForm').on('click', function(){
        $('#displayFormTemplate').empty(); // Clear previous content
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
        checkboxCount++; // Increment for uniqueness
        checkboxOptionCount++

        let formCheckboxes = `
        <div class="card mb-3 form-checkbox" id="checkboxWrapper-${checkboxCount}">
            <div class="card-body position-relative">
                <div class="mb-3">
                    <input type="text" class="form-control checkbox-question" name="form_checkbox_question[${checkboxCount}]" placeholder="Enter Question" required>
                </div>
                <div class="mb-3 checkbox-options">
                    <div class="form-check d-flex align-items-center">
                        <input class="form-check-input" type="checkbox" id="checkbox-${checkboxCount}" name="form_checkbox_option[${checkboxCount}]">
                        <input type="text" class="form-control ms-2 checkbox-label" name="form_checkbox_option_label[${checkboxOptionCount}]" placeholder="Option Label" required>
                        <button type="button" class="btn btn-sm btn-danger ms-2 removeCheckboxOption">X</button>
                    </div>
                </div>
                <button type="button" class="btn btn-sm btn-success addCheckboxOption">+ Add Option</button>
                <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger removeFormCheckbox" 
                style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
            </div>
        </div>`;

        $('#displayFormTemplate').append(formCheckboxes);
    });

    // Add Additional Checkbox Option to a Specific Template
    $(document).on('click', '.addCheckboxOption', function(){
        checkboxCount++; // Increment for uniqueness
        checkboxOptionCount++;

        let newOption = `
        <div class="form-check d-flex align-items-center">
            <input class="form-check-input" type="checkbox" id="checkbox-${checkboxCount}" name="form_checkbox_option[${checkboxCount}]">
            <input type="text" class="form-control ms-2 checkbox-label" name="form_checkbox_option_label[${checkboxOptionCount}]" placeholder="Option Label" required>
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
        dropdownOptionCount++

        let dropdownTemplate = `
        <div class="card mb-3 form-dropdown" id="dropdownWrapper-${dropdownCount}">
            <div class="card-body position-relative">
                <div class="mb-3">
                    <input type="text" class="form-control dropdown-question" name="form_dropdown_question[${dropdownCount}]" placeholder="Enter Question" required>
                </div>
                <div class="mb-3 dropdown-options">
                    <div class="input-group mb-2">
                        <input type="text" class="form-control dropdown-label" name="form_dropdown_option[${dropdownOptionCount}]" placeholder="Option Label" required>
                        <button type="button" class="btn btn-sm btn-danger removeDropdownOption">X</button>
                    </div>
                </div>
                <button type="button" class="btn btn-sm btn-success addDropdownOption">+ Add Option</button>
                <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger removeDropdown" 
                style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
            </div>
        </div>`;

        $('#displayFormTemplate').append(dropdownTemplate);
    });

    // Add Additional Dropdown Option
    $(document).on('click', '.addDropdownOption', function(event){
        event.preventDefault(); // Prevent unintended form submission

        dropdownOptionCount++;

        let newOption = `
        <div class="input-group mb-2">
            <input type="text" class="form-control dropdown-label" name="form_dropdown_option[${dropdownOptionCount}]" placeholder="Option Label" required>
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

        if($('#displayFormTemplate .form-file-upload').length === 0){
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

            $('#displayFormTemplate').append(fileUploadTemplate);
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
        radioGroupCount++; // Increment for uniqueness
        radioGroupOptionCount++;
        radioGroupLabelCount++;

        let radioTemplate = `
        <div class="card mb-3 form-multiple-choice" id="radioWrapper-${radioGroupCount}">
            <div class="card-body position-relative">
                <div class="mb-3">
                    <input type="text" class="form-control radio-question" name="form_radio_question[${radioGroupCount}]" placeholder="Enter Question" required>
                </div>
                <div class="mb-3 radio-options">
                    <div class="input-group mb-2">
                        <div class="input-group-text">
                            <input type="radio" name="form_radio_option[${radioGroupOptionCount}]" disabled>
                        </div>
                        <input type="text" class="form-control radio-label" name="form_radio_label[${radioGroupLabelCount}]" placeholder="Option Label" required>
                        <button type="button" class="btn btn-sm btn-danger removeRadioOption">X</button>
                    </div>
                </div>
                <button type="button" class="btn btn-sm btn-success addRadioOption">+ Add Option</button>
                <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger removeRadio" 
                style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
            </div>
        </div>`;

        $('#displayFormTemplate').append(radioTemplate);
    });

    // Add Additional Radio Option
    $(document).on('click', '.addRadioOption', function(event){
        event.preventDefault(); // Prevent unintended form submission
        radioGroupOptionCount++;
        radioGroupLabelCount++;

        let newOption = `
        <div class="input-group mb-2">
            <div class="input-group-text">
                <input type="radio" name="form_radio_option[${radioGroupOptionCount}]" disabled>
            </div>
            <input type="text" class="form-control radio-label" name="form_radio_label[${radioGroupLabelCount}]" placeholder="Option Label" required>
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
        paragraphCount++; // Increment for uniqueness

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

        $('#displayFormTemplate').append(paragraphTemplate);
    });

    /******************************************Rating Template***************************************************/
    // Add Rating Template
    $(document).on('click', '#addRating', function(){

        if($('#displayFormTemplate .form-rating-star').length === 0){
            let ratingTemplate = `
            <div class="card mb-3 form-rating-star" id="ratingWrapper">
                <div class="card-body position-relative">
                    <div class="mb-3">
                        <input type="text" class="form-control rating-label" name="form_rating_question" placeholder="Enter Question" required>
                    </div>
                    <div class="mb-3 rating-stars d-flex justify-content-center align-items-center gap-2" data-rating="0">
                        <i class="fa-regular fa-star star fs-3" data-value="1"></i>
                        <i class="fa-regular fa-star star fs-3" data-value="2"></i>
                        <i class="fa-regular fa-star star fs-3" data-value="3"></i>
                        <i class="fa-regular fa-star star fs-3" data-value="4"></i>
                        <i class="fa-regular fa-star star fs-3" data-value="5"></i>
                        <input type="hidden" name="form_rating_value" class="rating-value">
                    </div>
                    <i class="fa-regular fa-circle-xmark fs-3 position-absolute top-0 end-0 text-danger removeRating" 
                    style="transform: translateX(13px) translateY(-13px); cursor: pointer;"></i>
                </div>
            </div>`;

            $('#displayFormTemplate').append(ratingTemplate);
        }else{
            Swal.fire({
                title: 'Warning!',
                text: 'Only one rating field can be added.',
                icon: 'warning'
            });
        }
    });

    // Handle Star Rating Click
    $(document).on('click', '.star', function(){
        let starValue = $(this).data('value');
        let ratingContainer = $(this).closest('.rating-stars');

        ratingContainer.find('.star').removeClass('fa-solid text-warning').addClass('fa-regular'); // Reset stars
        ratingContainer.find('.star').each(function(){
            if($(this).data('value') <= starValue){
                $(this).removeClass('fa-regular').addClass('fa-solid text-warning'); // Highlight selected stars
            }
        });

        ratingContainer.data('rating', starValue);
        ratingContainer.find('.rating-value').val(starValue); // Store value in hidden input
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

        $('#displayFormTemplate').append(dateTemplate);
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

        $('#displayFormTemplate').append(timeTemplate);
    });
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
            title: $('#formTitle').val().trim(), // Get the form title
            description: $('#formDescription').val().trim(), // Get the description
            student_id: $('#student_id').val() || null, // Get student ID or null
            category_id: $('#category_id').val() || null, // Get category ID or null
            form_fields: JSON.stringify($(this).serializeArray()), // Serialize form data
            status: $('#status').val() || 'draft' // Default to 'draft' if empty
        };
    
        saveFormTemplate(payload);
    });

    /****************************************Retrieve Form***********************************************/
    // Check if the current URL contains "/view-form" and has a query parameter "form_id"
    if (window.location.pathname === '/view-form' && window.location.search.includes('form_id=')) {
        // Get the URL's query string
        const urlParams = new URLSearchParams(window.location.search);

        // Get the value of "form_id" from the query string
        const formId = urlParams.get('form_id');
        const version = urlParams.get('form_version');
        
        retrieveFormTemplate(formId, version);
    }

    /****************************************Form Submission***********************************************/
    $('#formSubmission').on('submit', function(e){
        e.preventDefault();

        const data = $(this).serializeArray()
        .filter(item => {
            // Customize what you consider "empty"
            const emptyValues = ['', 'null', 'undefined', '0']; // Add more if needed
            
            return (
                item.name &&                            // Name exists
                item.name.trim() !== '' &&               // Name not empty
                item.value !== undefined &&              // Value exists
                item.value !== null &&                  // Value not null
                !emptyValues.includes(item.value.trim()) // Value not in empty list
            );
        });
        console.log(data);
    });

    listFormTemplate();
});


function saveFormTemplate(payload) {
    jQuery.ajax({
        url: './controller/AddFormTemplateController.php',
        type: 'POST',
        data: JSON.stringify(payload), // Send as JSON string
        contentType: 'application/json', // Indicate JSON data
        dataType: 'json',
        processData: false, // Prevent jQuery from processing data
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

function retrieveFormTemplate(formId, version = null) {
    jQuery.ajax({
        url: './controller/RetrieveFormTemplateController.php',
        type: 'GET',
        dataType: 'json',
        data: { form_id: formId, version: version },
        success: function(response) {

            if (response.status === 'success') {
                const form = response.data;

                // Ensure form_fields is properly parsed
                const formFields = typeof form.form_fields === 'string' 
                    ? JSON.parse(form.form_fields) 
                    : form.form_fields || [];

                console.log(formFields);

                // Ensure the target container exists before updating
                if (jQuery('.form-header-container').length > 0) {
                    jQuery('.form-header-container').empty();

                    let formHeader = `
                        <div class="mb-3">
                            <input type="text" class="form-control" id="formTitle" name="form_title" value="${formFields.find(f => f.name === 'form_title')?.value || 'Untitled Form'}">
                        </div>
                        <div class="mb-3">
                            <textarea class="form-control" id="formDescription" name="form_description" rows="3">${formFields.find(f => f.name === 'form_description')?.value || 'No description'}</textarea>
                        </div>`;

                    jQuery('.form-header-container').append(formHeader);
                } else {
                    console.error('Error: .form-header-container not found in the DOM.');
                }

                if (jQuery('.form-radio-container').length > 0) {
                    jQuery('.form-radio-container').empty();
                
                    // Extract all radio questions dynamically
                    const radioQuestions = formFields.filter(f => f.name.startsWith('form_radio_question'));
                
                    let formRadioHTML = '';
                
                    // Loop through each radio question
                    radioQuestions.forEach(question => {
                        const questionIndex = question.name.match(/\[(\d+)\]/)?.[1]; // Extract index from [X]
                
                        // Extract ALL radio options (since no grouping, just find all form_radio_label)
                        const radioOptions = formFields
                            .filter(f => f.name.startsWith('form_radio_label')) // No need to match index
                            .map((option, index) => `
                                <div class="form-check mb-3">
                                    <input class="form-check-input" type="radio" name="form_radio_label[${index + 1}]" id="radioOption${questionIndex}_${index + 1}" value="${option.value}" disabled>
                                    <input type="text" class="form-control radio-label" name="form_radio_label[${index + 1}]" value="${option.value}">
                                </div>
                            `)
                            .join('');
                
                        // Append question and its options
                        formRadioHTML += `
                            <div class="mb-3">
                                <input type="text" class="form-control radio-question" name="form_radio_question[${questionIndex}]" value="${question.value}">
                            </div>
                            ${radioOptions}`;
                    });
                
                    // Append all generated form sections to the container
                    jQuery('.form-radio-container').append(formRadioHTML);
                } else {
                    console.error('Error: .form-radio-container not found in the DOM.');
                }                

            } else {
                jQuery('#formTemplatesContainer').html('<p class="text-danger">Form not found or error retrieving form fields.</p>');
                console.error('Error retrieving form fields:', response.message);
            }
        },
        error: function(xhr, status, error) {
            console.error('AJAX Error:', status, error);
            jQuery('#formTemplatesContainer').html('<p class="text-danger">Error fetching form fields. Please try again.</p>');
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
                                <div class="card-footer bg-transparent">
                                    <small class="text-muted">Created at: ${new Date(form.created_at).toLocaleDateString()}</small>
                                </div>
                            </div>
                        </div>`;
                    formCardDisplayContainer.append(formCardDisplay);
                });
            } else {
                formCardDisplayContainer.html('<p class="text-muted">No forms available.</p>');
            }
        },
        error: function () {
            formCardDisplayContainer.html('<p class="text-danger">Error fetching forms. Please try again.</p>');
        }
    });
}

