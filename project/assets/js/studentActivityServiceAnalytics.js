const studentBody = jQuery('#student-activity-service-analytics-table-body');
const studentMostCommonAnswerCard = jQuery('#studentActivityServiceMostCommonAnswerCard');
const studentGeneralWeightAverage = jQuery('#studentActivityServiceGWA');
const studentGeneralWeightAverageContainer = jQuery('#generalWeightAverageContainer');
const studentSatisfactionPercent = jQuery('#student-satisfaction-percent');
const studentSatisfactionBar = jQuery('#student-satisfaction-bar');
let isLoadingStudent = false;
let studentEvaluationSection = {
    title: 'Student Activity Service',
    gwa: {}
};

jQuery(function($) {
    studentGeneralWeightAverageContainer.hide();
    loadAllStudentResponses();
    listOfStudentActivityFeedbacks();

    $('#refreshStudentActivityServiceEvaluationResult').on('click', function(){
        loadAllStudentResponses();
        listOfStudentActivityFeedbacks();
    });

    $('#summarizeBtn').on('click', function () {
        summarizeCommenAndSuggestionForStudent(studentEvaluationSection)
    });
    
    $('#studentActivityPrintResult').on('click', function(){
        window.print();
    });

    $(document).on('click', '#loadMoreStudentActivityFeedback', function(){
        const office = $(this).data('office');
        const nextPage = $(this).data('page');
        const limit = $(this).data('limit');
        const payload = {
            office,
            nextPage,
            limit
        }

        loadMoreStudentActivityFeedbacks(payload);
    })

    $(document).on('click', '#hideMoreStudentActivityFeedback', function(){
        jQuery('#student-activity-feedback-container').empty();
        const office = $(this).data('office');
        const nextPage = $(this).data('page');
        const limit = $(this).data('limit');
        const payload = {
            office,
            nextPage,
            limit
        }
        loadMoreStudentActivityFeedbacks(payload);
    })
});

function loadAllStudentResponses() {
    jQuery.ajax({
        url: 'https://script.google.com/macros/s/AKfycbz-Zwt7LZz2GEkTqIzYWexKca6ULZS66y_Kw_Pl9Ek7A8osFzK7enJMjBWy9tbCgffPew/exec',
        dataType: 'jsonp',
        beforeSend: function() {
            studentBody.empty();
            studentMostCommonAnswerCard.empty();
            studentSatisfactionPercent.empty();
            studentGeneralWeightAverageContainer.hide();
            jQuery('#summarizeBtn').attr('disabled', true);
            jQuery('#studentActivityPrintResult').attr('disabled', true);
            studentBody.append(`
                <tr>
                    <td colspan="4" class="text-danger text-center">
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </td>
                </tr>
            `);
            studentMostCommonAnswerCard.append(`
                <tr>
                    <td colspan="3" class="text-danger text-center">
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </td>
                </tr>
            `);
            studentSatisfactionPercent.append(`
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>`);
            isLoadingStudent = true;
        },
        success: function(data) {
            studentBody.empty();
            studentMostCommonAnswerCard.empty();
            studentGeneralWeightAverage.empty();
            studentSatisfactionPercent.empty();
            studentGeneralWeightAverageContainer.show();
             jQuery('#summarizeBtn').attr('disabled', false);
             jQuery('#studentActivityPrintResult').attr('disabled', false);

            if (data.error) {
                studentGeneralWeightAverageContainer.hide();
                jQuery('#summarizeBtn').attr('disabled', true);
                jQuery('#studentActivityPrintResult').attr('disabled', true);
                studentBody.append(`
                    <tr>
                        <td colspan="4" class="text-secondary text-center">
                            ⛔ Error: ${data.error}
                        </td>
                    </tr>
                `);
                return;
            }

            const { responses, mostCommonResponses, weightedAverages, formYearCreated } = data;

            if (!responses || responses.length === 0) {
                studentGeneralWeightAverageContainer.hide();
                jQuery('#summarizeBtn').attr('disabled', true);
                jQuery('#studentActivityPrintResult').attr('disabled', true);
                studentBody.append(`
                    <tr>
                        <td colspan="4" class="text-muted text-center">
                            No responses yet.
                        </td>
                    </tr>
                `);
                studentMostCommonAnswerCard.append(`
                    <tr>
                        <td colspan="3" class="text-muted text-center">
                            No responses yet.
                        </td>
                    </tr>
                `);
                return;
            }

            const allQuestions = Object.keys(responses[0] || {});
            const surveyQuestions = allQuestions.filter(q => 
                q.toLowerCase().trim() !== 'timestamp'
            );

            if (surveyQuestions.length === 0) {
                studentBody.append(`
                    <tr>
                        <td colspan="4" class="text-muted text-center">
                            No survey questions found.
                        </td>
                    </tr>
                `);
                return;
            }

            surveyQuestions.forEach(question => {
                const counts = {};
                let total = 0;

                responses.forEach(r => {
                    const rawAnswer = r[question];
                    const ans = (rawAnswer || '');
                    const key = ans === '' ? 'No answer' : ans;
                    counts[key] = (counts[key] || 0) + 1;
                    total++;
                });

                const allAreNoAnswer = counts['No answer'] === total && total > 0;

                let responseText;

                if (allAreNoAnswer) {
                    responseText = '<div>No responses</div>';
                } else {
                    const validEntries = Object.entries(counts).filter(([answer]) => answer !== 'No answer');
                    
                    if (validEntries.length === 0) {
                        responseText = '<div>No responses</div>';
                    } else {
                        responseText = validEntries
                            .map(([answer, count]) => {
                                return count === 1
                                    ? `<div>${answer}</div>`
                                    : `<div>${answer}</div>`;
                            })
                            .join('');
                    }
                }

                const progressBarHtml = allAreNoAnswer
                    ? `
                        <div class="mb-2">
                            <div class="progress" style="height: 20px;">
                                <div class="progress-bar bg-secondary" role="progressbar" style="width: 0%;"></div>
                            </div>
                        </div>
                    `
                    : Object.entries(counts)
                        .filter(([answer]) => answer !== 'No answer')
                        .map(([answer, count]) => {
                            const uniqueAnswers = Object.keys(counts).filter(ans => ans !== 'No answer').length;
                            const percent = uniqueAnswers === 1 ? 100 : ((count / total) * 100).toFixed(1);

                            return `
                                <div class="mb-2">
                                    <div class="progress" style="height: 20px; width: 250px;">
                                        <div class="progress-bar bg-custom-info" role="progressbar"
                                            style="width: ${percent}%;" aria-valuemax="100"></div>
                                            &nbsp;${percent}%
                                    </div>
                                </div>
                            `;
                        }).join('');

                studentBody.append(`
                    <tr>
                        <td><strong>${question}</strong></td>
                        <td><small class="response-list">${responseText}</small></td>
                        <td style="width: 250px;">${progressBarHtml}</td>
                        <td>${formYearCreated}</td>
                    </tr>
                `);
            });

            if (mostCommonResponses.length > 0) {
                mostCommonResponses.forEach(item => {
                    if(item.question.toLowerCase() === 'comments and suggestions'){
                        studentEvaluationSection.mca = item.mostCommon
                    }
                    studentMostCommonAnswerCard.append(`
                         <tr>
                            <td><strong>${item.question}</strong></td>
                            <td><small class="response-list">${item.count}</small></td>
                            <td style="width: 250px;">${item.mostCommon}</td>
                        </tr>
                    `);
                });
            }

            if (weightedAverages.length > 0 ) {
                weightedAverages.forEach(item => {
                    if (item.average !== null && item.question.toLowerCase().trim() !== 'year level') {
                        studentEvaluationSection.gwa[item.question] = item.average;
                        studentGeneralWeightAverage.append(`
                            <li class="list-group-item d-flex justify-content-between align-items-start py-3 px-4 bg-white border-bottom">
                                <div class="flex-grow-1 text-dark">${item.question}</div>
                                <span class="badge bg-custom-info rounded-pill">${item.average}</span>
                            </li>
                        `);
                    }
                });

                const studentEvaluation = weightedAverages
                    .filter(item => 
                        item.average !== null && 
                        item.question.toLowerCase().trim() !== 'year level'
                    )
                    .map(item => item.average);

                const studentOverallAverage = studentEvaluation.length > 0 
                    ? studentEvaluation.reduce((sum, avg) => sum + avg, 0) / studentEvaluation.length 
                    : 0;
                const studentOverallSatisfactionPercent = (studentOverallAverage / 5.0) * 100;

                const studentDisplayPercent = studentOverallSatisfactionPercent.toFixed(2);

                studentSatisfactionPercent
                .removeClass('bg-danger bg-warning bg-custom-blue')
                .addClass(
                    studentOverallSatisfactionPercent >= 80 ? 'bg-custom-blue' :
                    studentOverallSatisfactionPercent >= 60 ? 'bg-warning' : 'bg-danger'
                )
                .text(studentDisplayPercent + '%');
                studentSatisfactionBar
                    .css('width', studentDisplayPercent + '%')
                    .removeClass('bg-danger bg-warning bg-custom-blue')
                    .addClass(
                        studentOverallSatisfactionPercent >= 80 ? 'bg-custom-blue' :
                        studentOverallSatisfactionPercent >= 60 ? 'bg-warning' : 'bg-danger'
                    );
                // studentActivityYearEvaluated.text(formYearCreated);
            }

        },
        complete: function() {
            isLoadingStudent = false;
        },
        error: function() {
            jQuery('#analytics-table-body').html(`
                <tr>
                    <td colspan="3" class="text-danger text-center">
                        ⛔ Failed to load data. Check deployment.
                    </td>
                </tr>
            `);
        }
    });
}

function summarizeCommenAndSuggestionForStudent(payload) {
    jQuery.ajax({
        url: './controller/AutoSummarizeSuggestionAndComment.php',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(payload),
        success: function(response) {
            if (response && response.summary) {
                jQuery('#summaryOutput').html('<strong>Summary:</strong> ' + response.summary);
            } else {
                jQuery('#summaryOutput').text('Invalid response from server.');
            }
        },
        error: function(xhr, status, error) {
            console.error('AJAX Error:', status, error);
            jQuery('#summaryOutput').text('Error generating summary.');
        }
    });
}

function listOfStudentActivityFeedbacks(){
    jQuery.ajax({
        url: './controller/feedback/FeedbackListController.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            jQuery('#studentActivityServiceFeedbackMostCommonAnswer, #student-activity-feedback-container, #appendStudentActivityLoadMoreButton').empty();
            if(response.success) {
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].office.toLowerCase() === 'student activity'){
                        jQuery('#studentActivityServiceFeedbackMostCommonAnswer').append(`
                            <tr>
                                <td class="text-center">${response.data[i].feedback_count}</td>
                                <td class="text-center">${response.data[i].most_common_feedback}</td>
                            </tr>
                        `);

                        jQuery('#student-activity-feedback-bar')
                            .css('width', response.data[i].percentage + '%')
                            .removeClass('bg-danger bg-warning bg-custom-blue')
                            .addClass(
                                response.data[i].percentage >= 80 ? 'bg-custom-blue' :
                                response.data[i].percentage >= 60 ? 'bg-warning' : 'bg-danger'
                            )
                            .text(response.data[i].percentage + '%');
                        
                        for(let x = 0; x < response.data[i].feedbacks.length; x++){
                            jQuery('#student-activity-feedback-container').append(`
                                <tr>
                                    <td>${response.data[i].feedbacks[x].feedback}</td>
                                </tr>
                            `)
                        }

                        if(response.data[i].has_more){
                            jQuery('#appendStudentActivityLoadMoreButton').append(`
                                <button class="btn btn-sm btn-primary"
                                data-office="${response.data[i].office}"
                                data-page="2"
                                data-limit="5"
                                id="loadMoreStudentActivityFeedback">
                                    Load More Feedbacks
                                </button>
                            `)
                        }
                    }
                }
            }
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}

function loadMoreStudentActivityFeedbacks(data){
    jQuery.ajax({
        url: `./controller/feedback/FeedbackListController.php?office=${encodeURIComponent(data.office)}&page=${data.nextPage}&limit=${data. limit}`,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            jQuery('#studentActivityServiceFeedbackMostCommonAnswer, #appendStudentActivityLoadMoreButton').empty();
            if(response.success) {
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].office.toLowerCase() === 'student activity'){
                        jQuery('#studentActivityServiceFeedbackMostCommonAnswer').append(`
                            <tr>
                                <td class="text-center">${response.data[i].feedback_count}</td>
                                <td class="text-center">${response.data[i].most_common_feedback}</td>
                            </tr>
                        `);

                        jQuery('#student-activity-feedback-bar')
                            .css('width', response.data[i].percentage + '%')
                            .removeClass('bg-danger bg-warning bg-custom-blue')
                            .addClass(
                                response.data[i].percentage >= 80 ? 'bg-custom-blue' :
                                response.data[i].percentage >= 60 ? 'bg-warning' : 'bg-danger'
                            )
                            .text(response.data[i].percentage + '%');
                        
                        for(let x = 0; x < response.data[i].feedbacks.length; x++){
                            jQuery('#student-activity-feedback-container').append(`
                                <tr>
                                    <td>${response.data[i].feedbacks[x].feedback}</td>
                                </tr>
                            `)
                        }

                        if(response.data[i].has_more || response.data[i].pagination.current_page === 1){
                            jQuery('#appendStudentActivityLoadMoreButton').append(`
                                <button class="btn btn-sm btn-primary"
                                data-office="${response.data[i].office}"
                                data-page="2"
                                data-limit="5"
                                id="loadMoreStudentActivityFeedback">
                                    Load More Feedbacks
                                </button>
                            `)
                        }

                        if(!response.data[i].has_more && response.data[i].pagination.current_page !==1){
                            jQuery('#appendStudentActivityLoadMoreButton').append(`
                                <button class="btn btn-sm btn-primary"
                                data-office="${response.data[i].office}"
                                data-page="${response.data[i].pagination.current_page - 1}"
                                data-limit="5"
                                id="hideMoreStudentActivityFeedback">
                                    Hide More Feedbacks
                                </button>
                            `)
                        }
                    }
                }
            }
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}