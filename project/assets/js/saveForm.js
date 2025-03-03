function renderForm(form) {
    var formContainer = jQuery("#renderedForm");
    formContainer.empty(); // Clear previous form

    var formHtml = `<h3>${form.title}</h3><form id="generatedForm">`;

    form.fields.forEach(function (field) {
        formHtml += `
            <div class="mb-3">
                <label class="form-label">${field.field_label}</label>
                <input type="${field.field_type}" name="${field.field_name}" class="form-control">
            </div>
        `;
    });

    formHtml += `<button type="submit" class="btn btn-primary">Submit</button></form>`;
    formContainer.html(formHtml);
}

jQuery(function($){
    let fieldCount = 0;
        
    $("#add-field").click(function() {
        fieldCount++;
        $("#form-builder").append(`
            <div class="border p-3 my-2">
                <input type="text" name="fields[${fieldCount}][label]" class="form-control mb-2" placeholder="Field Label">
                <select name="fields[${fieldCount}][type]" class="form-control field-type">
                    <option value="text">Text</option>
                    <option value="textarea">Textarea</option>
                    <option value="select">Select</option>
                    <option value="radio">Radio</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="file">File Upload</option>
                </select>
                <div class="options-container mt-2"></div>
                <button class="btn btn-danger remove-field mt-2">Remove</button>
            </div>
        `);
    });

    $(document).on("click", ".remove-field", function() {
        $(this).parent().remove();
    });

    $("#save-form").click(function() {
        let formTitle = $("#form-title").val();
        let formData = $("#form-builder :input").serializeArray();

        let payload = {
            formTitle: formTitle,
            formData: JSON.stringify(formData)
        };

        $.ajax({
            url: "./controller/SaveFormController.php",
            type: "POST",
            dataType: "json",
            data: payload,
            success: function(response) {
                if(response.success) {
                    Swal.fire({
                        title: "Success",
                        text: response.message,
                        icon: "success",
                    }).then((result) => {
                        if(result.isConfirmed){
                            setTimeout(function(){
                                window.location.reload();
                            }, 500);
                        }
                    });
                    renderForm(response.form);
                } else {
                    Swal.fire({
                        title: "Error",
                        text: response.message,
                        icon: "error",
                        showConfirmButton: false
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    });
})