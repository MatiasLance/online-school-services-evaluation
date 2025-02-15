jQuery(function($) {
    $('#evaluationForm').on('submit', function(event) {
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
                        $("#evaluationForm")[0].reset(); // Reset form
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


    let serviceChartInstance, recommendChartInstance, genderChartInstance, emailChartInstance;

    function updateBarCharts(serviceLabels, serviceCounts, recommendLabels, recommendCounts, genderLabels, genderCounts) {
        if (serviceChartInstance) serviceChartInstance.destroy();
        if (recommendChartInstance) recommendChartInstance.destroy();
        if (genderChartInstance) genderChartInstance.destroy();
    
        // Service Rate Chart
        const ctxService = document.getElementById("serviceRateChart").getContext("2d");
        serviceChartInstance = new Chart(ctxService, {
            type: "bar",
            data: {
                labels: serviceLabels,
                datasets: [{
                    label: "Service Ratings Count",
                    data: serviceCounts,
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    
        // Recommendation Chart
        const ctxRecommend = document.getElementById("recommendChart").getContext("2d");
        recommendChartInstance = new Chart(ctxRecommend, {
            type: "bar",
            data: {
                labels: recommendLabels,
                datasets: [{
                    label: "Recommendation Count",
                    data: recommendCounts,
                    backgroundColor: "rgba(255, 99, 132, 0.6)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Count"
                        }
                     },
                }
            }
        });

        // Gender Chart
        const ctxGender = document.getElementById("genderChart").getContext("2d");
        recommendChartInstance = new Chart(ctxGender, {
            type: "bar",
            data: {
                labels: genderLabels,
                datasets: [{
                    label: "Gender Count",
                    data: genderCounts,
                    backgroundColor: "rgba(30, 144, 255, 0.6)",
                    borderColor: "rgba(30, 144, 255, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Count"
                        }
                     },
                }
            }
        });
    }

    function updateEmailChart(emailLabels, emailCounts) {
        if (emailChartInstance) emailChartInstance.destroy();

        const ctxEmail = document.getElementById("emailChart").getContext("2d");
        emailChartInstance = new Chart(ctxEmail, {
            type: "bar",
            data: {
                labels: emailLabels,
                datasets: [{
                    label: "Email Count per Domain",
                    data: emailCounts,
                    backgroundColor: "rgba(0, 123, 255, 0.6)", // Bootstrap primary blue
                    borderColor: "rgba(0, 123, 255, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Count"
                        }
                     },
                }
            }
        });
    }


    function loadTabulatedData() {
        $.ajax({
            url: "./controller/TabulateEvaluationForm.php",
            type: "GET",
            dataType: "json",
            success: function(response) {
                let serviceLabels = [], serviceCounts = [], recommendLabels = [], recommendCounts = [], genderLabels = [], genderCounts = [], emailLabels = [], emailCounts = [];

                response.service_rates.forEach(row => {
                    serviceLabels.push(row.service_rate);
                    serviceCounts.push(row.count);
                });

                response.recommend_data.forEach(row => {
                    recommendLabels.push(row.recommend_service);
                    recommendCounts.push(row.count);
                });

                response.gender_data.forEach(row => {
                    genderLabels.push(row.gender);
                    genderCounts.push(row.count);
                })

                let emailDetails = [];
                response.email_data.forEach(row => {
                    emailLabels.push(row.domain);
                    emailCounts.push(row.count);
                    emailDetails.push(`${row.domain}: ${row.emails}`);
                });

                updateBarCharts(serviceLabels, serviceCounts, recommendLabels, recommendCounts, genderLabels, genderCounts);
                updateEmailChart(emailLabels, emailCounts);
            }
        });
    }

    loadTabulatedData();
})