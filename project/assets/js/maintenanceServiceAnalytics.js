const body = jQuery('#maintenance-service-analytics-table-body');
const maintenanceMostCommonAnswerCard = jQuery('#maintenanceServiceMostCommonAnswerCard');
const maintenanceGeneralWeightAverage = jQuery('#maintenanceServiceGWA');
const maintenanceGeneralWeightAverageContainer = jQuery('#maintenanceServiceGeneralWeightAverageContainer');
const maintenanceSatisfactionPercent = jQuery('#maintenance-satisfaction-percent');
const maintenanceSatisfactionBar = jQuery('#maintenance-satisfaction-bar');
var isLoadingMaintenance = false;
let maintenanceEvaluationSection = {
    title: 'Maintenance Service',
    gwa: {}
};

jQuery(function($) {
    maintenanceGeneralWeightAverageContainer.hide();
    loadAllMaintenanceResponses();
    listOfMaintenanceFeedbacks();

    $('#refreshMaintenanceServiceEvaluationResult').on('click', function(){
        loadAllMaintenanceResponses();
        listOfMaintenanceFeedbacks();
    });

    $('#summarizeBtn').on('click', function () {
        summarizeCommenAndSuggestionForMaintenance(maintenanceEvaluationSection)
    });

    $('#maintenancePrintResult').on('click', function(){
        window.print();
    });

    $(document).on('click', '#loadMoreMaintenanceFeedback', function(){
        const office = $(this).data('office');
        const nextPage = $(this).data('page');
        const limit = $(this).data('limit');
        const payload = {
            office,
            nextPage,
            limit
        }

        loadMoreMaintenanceFeedbacks(payload);
    })

    $(document).on('click', '#hideMoreMaintenanceFeedback', function(){
        jQuery('#maintenance-feedback-container').empty();
        const office = $(this).data('office');
        const nextPage = $(this).data('page');
        const limit = $(this).data('limit');
        const payload = {
            office,
            nextPage,
            limit
        }
        loadMoreMaintenanceFeedbacks(payload);
    })
});

function loadAllMaintenanceResponses() {
    jQuery.ajax({
        url: 'https://script.google.com/macros/s/AKfycbwb2WTqcSyR-HuUn_hsR5zD-gb2VcvKLg_eNW2SxRkEZk9-c2bATVBED2yYChPSs-WHjw/exec',
        dataType: 'jsonp',
        beforeSend: function() {
            body.empty();
            maintenanceMostCommonAnswerCard.empty();
            maintenanceSatisfactionPercent.empty();
            maintenanceGeneralWeightAverageContainer.hide();
            jQuery('#summarizeBtn').attr('disabled', true);
            jQuery('#maintenancePrintResult').attr('disabled', true);
            body.append(`
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
            maintenanceMostCommonAnswerCard.append(`
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
            maintenanceSatisfactionPercent.append(`
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>`);
            isLoadingMaintenance = true;
        },
        success: function(data) {
            body.empty();
            maintenanceMostCommonAnswerCard.empty();
            maintenanceGeneralWeightAverage.empty();
            maintenanceSatisfactionPercent.empty();
            maintenanceGeneralWeightAverageContainer.show();
             jQuery('#summarizeBtn').attr('disabled', false);
             jQuery('#maintenancePrintResult').attr('disabled', false);

            if (data.error) {
                maintenanceGeneralWeightAverageContainer.hide();
                 jQuery('#summarizeBtn').attr('disabled', true);
                 jQuery('#maintenancePrintResult').attr('disabled', true);
                body.append(`
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
                maintenanceGeneralWeightAverageContainer.hide();
                 jQuery('#summarizeBtn').attr('disabled', true);
                 jQuery('#maintenancePrintResult').attr('disabled', true);
                body.append(`
                    <tr>
                        <td colspan="4" class="text-muted text-center">
                            No responses yet.
                        </td>
                    </tr>
                `);
                maintenanceMostCommonAnswerCard.append(`
                    <tr>
                        <td colspan="3" class="text-muted text-center">
                            No responses yet.
                        </td>
                    </tr>
                `);
                maintenanceSatisfactionPercent
                .removeClass('bg-danger bg-warning bg-custom-blue')
                .addClass('bg-secondary')
                .text(0);
                return;
            }

            const allQuestions = Object.keys(responses[0] || {});
            const surveyQuestions = allQuestions.filter(q => 
                q.toLowerCase().trim() !== 'timestamp'
            );

            if (surveyQuestions.length === 0) {
                body.append(`
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

                body.append(`
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
                        maintenanceEvaluationSection.mca = item.mostCommon
                    }
                    maintenanceMostCommonAnswerCard.append(`
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
                        maintenanceEvaluationSection.gwa[item.question] = item.average;
                        maintenanceGeneralWeightAverage.append(`
                            <li class="list-group-item d-flex justify-content-between align-items-start py-3 px-4 bg-white border-bottom">
                                <div class="flex-grow-1 text-dark">${item.question}</div>
                                <span class="badge bg-custom-info rounded-pill">${item.average}</span>
                            </li>
                        `);
                    }
                });

                const maintenanceValidAverages = weightedAverages
                    .filter(item => 
                        item.average !== null && 
                        item.question.toLowerCase().trim() !== 'year level'
                    )
                    .map(item => item.average);

                const maintenanceOverallAverage = maintenanceValidAverages.length > 0 
                    ? maintenanceValidAverages.reduce((sum, avg) => sum + avg, 0) / maintenanceValidAverages.length 
                    : 0;
                const maintenanceOverallSatisfactionPercent = (maintenanceOverallAverage / 5.0) * 100;

                const maintenanceDisplayPercent = maintenanceOverallSatisfactionPercent.toFixed(2);

                maintenanceSatisfactionPercent
                .removeClass('bg-danger bg-warning bg-custom-blue')
                .addClass(
                    maintenanceOverallSatisfactionPercent >= 80 ? 'bg-custom-blue' :
                    maintenanceOverallSatisfactionPercent >= 60 ? 'bg-warning' : 'bg-danger'
                )
                .text(maintenanceDisplayPercent + '%');
                maintenanceSatisfactionBar
                    .css('width', maintenanceDisplayPercent + '%')
                    .removeClass('bg-danger bg-warning bg-custom-blue')
                    .addClass(
                        maintenanceOverallSatisfactionPercent >= 80 ? 'bg-custom-blue' :
                        maintenanceOverallSatisfactionPercent >= 60 ? 'bg-warning' : 'bg-danger'
                    );
            }
        },
        complete: function() {
            isLoadingMaintenance = false;
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

function summarizeCommenAndSuggestionForMaintenance(payload) {
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

function listOfMaintenanceFeedbacks(){
    jQuery.ajax({
        url: './controller/feedback/FeedbackListController.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            jQuery('#maintenanceServiceFeedbackMostCommonAnswer, #maintenance-feedback-container, #appendMaintenanceLoadMoreButton').empty();
            if(response.success) {
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].office.toLowerCase() === 'maintenance'){
                        jQuery('#maintenanceServiceFeedbackMostCommonAnswer').append(`
                            <tr>
                                <td class="text-center">${response.data[i].feedback_count}</td>
                                <td class="text-center">${response.data[i].most_common_feedback}</td>
                            </tr>
                        `);

                        jQuery('#maintenance-feedback-bar')
                            .css('width', response.data[i].percentage + '%')
                            .removeClass('bg-danger bg-warning bg-custom-blue')
                            .addClass(
                                response.data[i].percentage >= 80 ? 'bg-custom-blue' :
                                response.data[i].percentage >= 60 ? 'bg-warning' : 'bg-danger'
                            )
                            .text(response.data[i].percentage + '%');

                        for(let x = 0; x < response.data[i].feedbacks.length; x++){
                            jQuery('#maintenance-feedback-container').append(`
                                <tr>
                                    <td>${response.data[i].feedbacks[x].feedback}</td>
                                </tr>
                            `)
                        }

                        if(response.data[i].has_more){
                            jQuery('#appendMaintenanceLoadMoreButton').append(`
                                <button class="btn btn-sm btn-primary"
                                data-office="${response.data[i].office}"
                                data-page="2"
                                data-limit="5"
                                id="loadMoreMaintenanceFeedback">
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

function loadMoreMaintenanceFeedbacks(data){
    jQuery.ajax({
        url: `./controller/feedback/FeedbackListController.php?office=${encodeURIComponent(data.office)}&page=${data.nextPage}&limit=${data. limit}`,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            jQuery('#maintenanceServiceFeedbackMostCommonAnswer, #appendMaintenanceLoadMoreButton').empty();
            if(response.success) {
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].office.toLowerCase() === 'maintenance'){
                        jQuery('#maintenanceServiceFeedbackMostCommonAnswer').append(`
                            <tr>
                                <td class="text-center">${response.data[i].feedback_count}</td>
                                <td class="text-center">${response.data[i].most_common_feedback}</td>
                            </tr>
                        `);

                        jQuery('#maintenance-feedback-bar')
                            .css('width', response.data[i].percentage + '%')
                            .removeClass('bg-danger bg-warning bg-custom-blue')
                            .addClass(
                                response.data[i].percentage >= 80 ? 'bg-custom-blue' :
                                response.data[i].percentage >= 60 ? 'bg-warning' : 'bg-danger'
                            )
                            .text(response.data[i].percentage + '%');

                        for(let x = 0; x < response.data[i].feedbacks.length; x++){
                            jQuery('#maintenance-feedback-container').append(`
                                <tr>
                                    <td>${response.data[i].feedbacks[x].feedback}</td>
                                </tr>
                            `)
                        }

                        if(response.data[i].has_more || response.data[i].pagination.current_page === 1){
                            jQuery('#appendMaintenanceLoadMoreButton').append(`
                                <button class="btn btn-sm btn-primary"
                                data-office="${response.data[i].office}"
                                data-page="2"
                                data-limit="5"
                                id="loadMoreMaintenanceFeedback">
                                    Load More Feedbacks
                                </button>
                            `)
                        }

                        if(!response.data[i].has_more && response.data[i].pagination.current_page !==1){
                            jQuery('#appendMaintenanceLoadMoreButton').append(`
                                <button class="btn btn-sm btn-primary"
                                data-office="${response.data[i].office}"
                                data-page="${response.data[i].pagination.current_page - 1}"
                                data-limit="5"
                                id="hideMoreMaintenanceFeedback">
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