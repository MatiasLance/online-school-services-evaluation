jQuery(function($) {
    $('#userEvaluationForm').on('submit', function(event) {
        event.preventDefault();

        const payload = {
            fullname: $('#fullName').val(),
            gender: $('#gender').val(),
            email: $('#email').val(),
            serviceRate: $('#serviceRate').val(),
            isRecommended: $("input[name='recommend']:checked").val(),
            comments: $('#additionalComments').val()
        }

        let allowedEmailDomain = '@smcbi.edu.ph'

        if(payload.email.endsWith(allowedEmailDomain)){
            $('#errorMessage').css('color', 'green').text('Email is valid.')
        }else{
            $('#errorMessage').css('color', 'red').text('Email is not valid.')
            return false
        }

        if(payload.fullName !== ''
            && payload.gender !== ''
            || payload.gender === 'male'
            || payload.gender === 'female'
            || payload.gender === 'other'
            && payload.email !== ''
            && payload.serviceRate === 'excellent'
            || payload.serviceRate === 'good'
            || payload.serviceRate === 'fair'
            || payload.serviceRate === 'poor'
            && payload.isRecommended === 'yes'
            || payload.isRecommended === 'no'
            && payload.comments !== '') {
            $.ajax({
                type: 'POST',
                url: './controller/EvaluationFormController.php',
                data: payload,
                dataType: 'json',
                success: function(response){
                    if (response.status === "error") {
                        // Display multiple error messages
                        response.messages.forEach(function(msg) {
                            Swal.fire({
                                title: 'Warning',
                                text: msg,
                                icon: 'warning'
                            });
                        });
                    } else if (response.status === "success") {
                        // Display success message
                        Swal.fire({
                            title: 'Success',
                            text: response.message,
                            icon: 'success'
                        });
                        $('#fullName').val(''),
                        $('#gender').val(''),
                        $('#email').val(''),
                        $('#serviceRate').val(''),
                        $("input[name='recommend']:checked").val(''),
                        $('#additionalComments').val('')
                        $('#errorMessage').text('');
                    }
                },
                error: function(){
                    Swal.fire({
                        title: 'Warning',
                        text: 'Something went wrong. Please try again.',
                        icon: 'warning'
                    });
                }
            })
        }

    })

    $(document).on('change', '#publishFormSwitchCheckDefault', function(){
        let isPublished = $(this).is(':checked') ? 1 : 0;
        $.ajax({
            type: 'POST',
            url: './controller/PublishFormController.php',
            data: { is_published: isPublished },
            dataType: 'json',
            success: function(response) {
                Swal.fire({
                    title: 'Success',
                    text: response.message,
                    icon: 'success'
                }).then((result) => {
                    if(result.isConfirmed){
                        isPublished()
                    }
                });
            },
            error: function(){
                Swal.fire({
                    title: 'Warning',
                    text: 'Something went wrong. Please try again.',
                    icon: 'warning'
                });
            }
        })

    })

    // Fetch current form status
    function isPublished(){
        $.ajax({
            type: 'GET',
            url: './controller/PublishFormController.php',
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    $('#publishFormSwitchCheckDefault').prop('checked', response.is_published === 1);
                }

                if(response.is_published === 0) {
                    $('#user-form-title').removeClass('d-flex flex')
                    $('#userEvaluationForm').hide()
                    $('#user-question').html('<h1 class="text-center text-black">No form has been created yet.</h1>');
                }
            }
        });
    }

    // let serviceChartInstance, recommendChartInstance, genderChartInstance, emailChartInstance;

    // function updateBarCharts(serviceLabels, serviceCounts, recommendLabels, recommendCounts, genderLabels, genderCounts) {
    //     if (serviceChartInstance) serviceChartInstance.destroy();
    //     if (recommendChartInstance) recommendChartInstance.destroy();
    //     if (genderChartInstance) genderChartInstance.destroy();
    
    //     // Service Rate Chart
    //     const ctxService = document.getElementById("serviceRateChart").getContext("2d");
    //     serviceChartInstance = new Chart(ctxService, {
    //         type: "bar",
    //         data: {
    //             labels: serviceLabels,
    //             datasets: [{
    //                 label: "Service Ratings Count",
    //                 data: serviceCounts,
    //                 backgroundColor: "rgba(75, 192, 192, 0.6)",
    //                 borderColor: "rgba(75, 192, 192, 1)",
    //                 borderWidth: 1
    //             }]
    //         },
    //         options: {
    //             responsive: true,
    //             indexAxis: 'y',
    //             scales: {
    //                 x: { display: false },
    //                 y: { display: false }
    //             },
    //             plugins: {
    //                 legend: { display: false },
    //                 tooltip: { enabled: true }
    //             },
    //         }
    //     });
    
    //     // Recommendation Chart
    //     const ctxRecommend = document.getElementById("recommendChart").getContext("2d");
    //     recommendChartInstance = new Chart(ctxRecommend, {
    //         type: "bar",
    //         data: {
    //             labels: recommendLabels,
    //             datasets: [{
    //                 label: "Recommendation Count",
    //                 data: recommendCounts,
    //                 backgroundColor: "rgba(255, 99, 132, 0.6)",
    //                 borderColor: "rgba(255, 99, 132, 1)",
    //                 borderWidth: 1
    //             }]
    //         },
    //         options: {
    //             responsive: true,
    //             indexAxis: 'y',
    //             scales: {
    //                 x: { display: false },
    //                 y: { display: false }
    //             },
    //             plugins: {
    //                 legend: { display: false },
    //                 tooltip: { enabled: true }
    //             },
    //         }
    //     });

    //     // Gender Chart
    //     const ctxGender = document.getElementById("genderChart").getContext("2d");
    //     recommendChartInstance = new Chart(ctxGender, {
    //         type: "bar",
    //         data: {
    //             labels: genderLabels,
    //             datasets: [{
    //                 label: "Gender Count",
    //                 data: genderCounts,
    //                 backgroundColor: "rgba(30, 144, 255, 0.6)",
    //                 borderColor: "rgba(30, 144, 255, 1)",
    //                 borderWidth: 1
    //             }]
    //         },
    //         options: {
    //             responsive: true,
    //             indexAxis: 'y',
    //             scales: {
    //                 x: { display: false },
    //                 y: { display: false }
    //             },
    //             plugins: {
    //                 legend: { display: false },
    //                 tooltip: { enabled: true }
    //             },
    //         }
    //     });
    // }

    // // Email Chart
    // function updateEmailChart(emailLabels, emailCounts) {
    //     if (emailChartInstance) emailChartInstance.destroy();

    //     const ctxEmail = document.getElementById("emailChart").getContext("2d");
    //     emailChartInstance = new Chart(ctxEmail, {
    //         type: "bar",
    //         data: {
    //             labels: emailLabels,
    //             datasets: [{
    //                 label: "Email Count per Domain",
    //                 data: emailCounts,
    //                 backgroundColor: "rgba(0, 123, 255, 0.6)",
    //                 borderColor: "rgba(0, 123, 255, 1)",
    //                 borderWidth: 1
    //             }]
    //         },
    //         options: {
    //             responsive: true,
    //             indexAxis: 'y',
    //             scales: {
    //                 x: { display: false },
    //                 y: { display: false }
    //             },
    //             plugins: {
    //                 legend: { display: false },
    //                 tooltip: { enabled: true }
    //             },
    //         }
    //     });
    // }


    // function loadTabulatedData() {
    //     $.ajax({
    //         url: "./controller/TabulateEvaluationForm.php",
    //         type: "GET",
    //         dataType: "json",
    //         success: function(response) {
    //             let serviceLabels = [], serviceCounts = [], recommendLabels = [], recommendCounts = [], genderLabels = [], genderCounts = [], emailLabels = [], emailCounts = [];

    //             response.service_rates.forEach(row => {
    //                 serviceLabels.push(row.service_rate);
    //                 serviceCounts.push(row.count);
    //             });

    //             response.recommend_data.forEach(row => {
    //                 recommendLabels.push(row.recommend_service);
    //                 recommendCounts.push(row.count);
    //             });

    //             response.gender_data.forEach(row => {
    //                 genderLabels.push(row.gender);
    //                 genderCounts.push(row.count);
    //             })

    //             let emailDetails = [];
    //             response.email_data.forEach(row => {
    //                 emailLabels.push(row.domain);
    //                 emailCounts.push(row.count);
    //                 emailDetails.push(`${row.domain}: ${row.emails}`);
    //             });

    //             updateBarCharts(serviceLabels, serviceCounts, recommendLabels, recommendCounts, genderLabels, genderCounts);
    //             updateEmailChart(emailLabels, emailCounts);
    //         }
    //     });
    // }

    // loadTabulatedData();
    isPublished();
})