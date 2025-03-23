jQuery(function($){
    let checkboxCount = 0; // To ensure unique IDs
    let dropdownCount = 0;
    let radioGroupCount = 0;
    let paragraphCount = 0;
    let ratingCount = 0;
    let dateCount = 0;
    let timeCount = 0;

    // Initially hide save button
    $('#saveFormButton').hide();

    // Generate form header
    $('#createForm').on('click', function(){

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
                        <input type="text" class="form-control" name="form_title" placeholder="Untitled form">
                    </div>
                    <div class="mb-3">
                        <textarea class="form-control" name="form_description" rows="3" placeholder="Form description" readonly="true"></textarea>
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

        let formCheckboxes = `
        <div class="card mb-3 form-checkbox" id="checkboxWrapper-${checkboxCount}">
            <div class="card-body position-relative">
                <div class="mb-3">
                    <input type="text" class="form-control checkbox-question" name="form_checkbox_question[]" placeholder="Enter Question">
                </div>
                <div class="mb-3 checkbox-options">
                    <div class="form-check d-flex align-items-center">
                        <input class="form-check-input" type="checkbox" id="checkbox-${checkboxCount}" name="checkbox-${checkboxCount}" value="">
                        <input type="text" class="form-control ms-2 checkbox-label" placeholder="Option Label">
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
        let newOption = `
        <div class="form-check d-flex align-items-center">
            <input class="form-check-input" type="checkbox" value="">
            <input type="text" class="form-control ms-2 checkbox-label" placeholder="Option Label">
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
                    <input type="text" class="form-control dropdown-question" name="form_dropdown_question[${dropdownCount}]" placeholder="Enter Question">
                </div>
                <div class="mb-3 dropdown-options">
                    <div class="input-group mb-2">
                        <input type="text" class="form-control dropdown-label" placeholder="Option Label">
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

        dropdownCount++;

        let newOption = `
        <div class="input-group mb-2">
            <input type="text" class="form-control dropdown-label" name="form_dropdown_option[${dropdownCount}]" placeholder="Option Label">
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
                        <input type="text" class="form-control file-upload-question" name="form_file_upload_question" placeholder="Enter Question">
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

        let radioTemplate = `
        <div class="card mb-3 form-multiple-choice" id="radioWrapper-${radioGroupCount}">
            <div class="card-body position-relative">
                <div class="mb-3">
                    <input type="text" class="form-control radio-question" name="form_radio_question[${radioGroupCount}]" placeholder="Enter Question">
                </div>
                <div class="mb-3 radio-options">
                    <div class="input-group mb-2">
                        <div class="input-group-text">
                            <input type="radio" name="form_radio_option[${radioGroupCount}]" disabled>
                        </div>
                        <input type="text" class="form-control radio-label" name="form_radio_label[${radioGroupCount}]" placeholder="Option Label">
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

        radioGroupCount++;

        let groupName = $(this).closest('.form-multiple-choice').attr('id'); // Get the unique radio group ID
        let newOption = `
        <div class="input-group mb-2">
            <div class="input-group-text">
                <input type="radio" name="${groupName}" disabled>
            </div>
            <input type="text" class="form-control radio-label" name="form_radio_label[${radioGroupCount}]" placeholder="Option Label">
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
                    <input type="text" class="form-control paragraph-label" name="form_paragraph_question[${paragraphCount}]" placeholder="Enter Question">
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
                        <input type="text" class="form-control rating-label" name="form_rating_question" placeholder="Enter Question">
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
                    <input type="text" class="form-control date-label" name="form_date_label[${dateCount}]" placeholder="Enter Question">
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
                    <input type="text" class="form-control time-label" name="form_time_label[${timeCount}]" placeholder="Enter Question">
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
    $('#saveGeneratedForm').on('submit', function(e){
        e.preventDefault()

        console.log($(this).serializeArray());
    })
});