jQuery('#createFormBtn').on('click', function() {
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
                    {
                        type: "MULTIPLE_CHOICE",
                        title: "How satisfied are you?",
                        required: true,
                        options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]
                    },
                    {
                        type: "SCALE",
                        title: "Rate our service (1-5)",
                        required: true,
                        low: 1,
                        high: 5,
                        lowLabel: "Poor",
                        highLabel: "Excellent"
                    },
                    {
                        type: "FILE_UPLOAD",
                        title: "Upload a photo (optional)",
                        required: false,
                        fileLimit: 2
                    }
                ]
            };

            jQuery.ajax({
                url: './controller/CreateFormController.php',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(formData),
                dataType: 'json',
                beforeSend: function() {
                    jQuery('#result').html('<p>Creating form... please wait...</p>');
                },
                success: function(response) {
                    if (response.success) {
                        const form = response.data;
                        jQuery('#result').html(`
                            <h3>✅ Form Created Successfully!</h3>
                            <p><strong>Edit Link:</strong> <a href="${form.formUrl}" target="_blank">Edit Form</a></p>
                            <p><strong>Response Link:</strong> <a href="${form.responseUrl}" target="_blank">Fill Form</a></p>
                            <p><strong>Responses Sheet:</strong> <a href="${form.sheetUrl}" target="_blank">View Responses</a></p>
                        `);
                        // jQuery('#result').html(<iframe src="${form.responseUrl}" width="100%" height="800px" frameborder="0"></iframe>)
                    } else {
                        jQuery('#result').html(`<p style="color:red">❌ Error: ${response.error}</p>`);
                    }
                },
                error: function(xhr, status, error) {
                    jQuery('#result').html(`<p style="color:red">❌ Network Error: ${error}</p>`);
                }
            });
        });