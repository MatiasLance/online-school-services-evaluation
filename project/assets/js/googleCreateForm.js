jQuery('#createFormBtn').on('click', function() {
    jQuery('#result').removeClass('bg-danger');

    const formData = {
        title: "My Survey Form",
        description: "Created via my system using jQuery + PHP",
        questions: [
            {
                type: "SHORT_ANSWER",
                title: "What is your name?",
                required: true,
                helpText: "Please enter your full name"
            },
        ]
    };

    jQuery.ajax({
        url: './controller/CreateFormController.php',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        dataType: 'json',
        beforeSend: function() {
            jQuery('#result').html('<p>Creating form... please wait...</p>').addClass('bg-custom-blue mt-5 p-5 rounded-sm');
        },
        success: function(response) {
            if (response.success) {
                const form = response.data;
                jQuery('#result').html(`
                    <h3>✅ Form Created Successfully!</h3>
                    <p><strong>Edit Link:</strong> <a href="${form.formUrl}" target="_blank">Edit Form</a></p>
                    <p><strong>Response Link:</strong> <a href="${form.responseUrl}" target="_blank">Fill Form</a></p>
                    <p><strong>Responses Sheet:</strong> <a href="${form.sheetUrl}" target="_blank">View Responses</a></p>
                `).removeClass('bg-danger').addClass('bg-custom-blue');
                // jQuery('#result').html(<iframe src="${form.responseUrl}" width="100%" height="800px" frameborder="0"></iframe>)
            } else {
                jQuery('#result').html(`<p style="color: #fff;">❌ Error: ${response.error}</p>`).removeClass('bg-custom-blue').addClass('bg-danger');
            }
        },
        error: function(xhr, status, error) {
            jQuery('#result').html(`<p style="color: #fff;">❌ Network Error: ${error}</p>`).removeClass('bg-custom-blue').addClass('bg-danger');
        }
    });
});