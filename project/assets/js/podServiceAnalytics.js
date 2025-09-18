const podBody = jQuery('#pod-service-analytics-table-body');
const podMostCommonAnswerCard = jQuery('#podServiceMostCommonAnswerCard');
const podGeneralWeightAverage = jQuery('#podServiceGWA');
const podGeneralWeightAverageContainer = jQuery('#podServiceGeneralWeightAverageContainer');
const podSatisfactionPercent = jQuery('#pod-satisfaction-percent');
const podSatisfactionBar = jQuery('#pod-satisfaction-bar');
let isLoadingPOD = false;
let podEvaluationSection = {
    title: 'POD Service',
    gwa: {}
};

jQuery(function($) {
    podGeneralWeightAverageContainer.hide();
    loadAllPODResponses();
    listOfPODFeedbacks();
    $('#refreshPODServiceEvaluationResult').on('click', function(){
        loadAllPODResponses();
        listOfPODFeedbacks();
    });
    $('#summarizeBtn').on('click', function () {
        summarizeCommenAndSuggestionForPOD(podEvaluationSection)
    });

    $('#podPrintResult').on('click', function(){
        window.print();
    });
});

function loadAllPODResponses() {
    jQuery.ajax({
        url: 'https://script.google.com/macros/s/AKfycbz0019GBbTfP4z2KHn2Uo0iZguzAqQOzCGxpgjpAjBkrJOOdkJVzFi0oqe4e5V_dTDxHQ/exec',
        dataType: 'jsonp',
        beforeSend: function() {
            podBody.empty();
            podMostCommonAnswerCard.empty();
            podGeneralWeightAverageContainer.hide();
            podSatisfactionPercent.empty();
             jQuery('#summarizeBtn').attr('disabled', true)
             jQuery('#podPrintResult').attr('disabled', true)
            podBody.append(`
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
            podMostCommonAnswerCard.append(`
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
            podSatisfactionPercent.append(`
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>`);
            isLoadingPOD = true;
        },
        success: function(data) {
            podBody.empty();
            podMostCommonAnswerCard.empty();
            podGeneralWeightAverage.empty();
            podSatisfactionPercent.empty();
            podGeneralWeightAverageContainer.show();
            jQuery('#summarizeBtn').attr('disabled', false)
            jQuery('#podPrintResult').attr('disabled', true);

            if (data.error) {
                podGeneralWeightAverageContainer.hide();
                jQuery('#summarizeBtn').attr('disabled', true);
                jQuery('#podPrintResult').attr('disabled', true);
                podBody.append(`
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
                podGeneralWeightAverageContainer.hide();
                jQuery('#summarizeBtn').attr('disabled', true)
                jQuery('#podPrintResult').attr('disabled', true)
                podBody.append(`
                    <tr>
                        <td colspan="4" class="text-muted text-center">
                            No responses yet.
                        </td>
                    </tr>
                `);
                podMostCommonAnswerCard.append(`
                    <tr>
                        <td colspan="3" class="text-muted text-center">
                            No responses yet.
                        </td>
                    </tr>
                `);
                podSatisfactionPercent
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
                podBody.append(`
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

                podBody.append(`
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
                        podEvaluationSection.mca = item.mostCommon
                    }
                    podMostCommonAnswerCard.append(`
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
                        podEvaluationSection.gwa[item.question] = item.average;
                        podGeneralWeightAverage.append(`
                            <li class="list-group-item d-flex justify-content-between align-items-start py-3 px-4 bg-white border-bottom">
                                <div class="flex-grow-1 text-dark">${item.question}</div>
                                <span class="badge bg-custom-info rounded-pill">${item.average}</span>
                            </li>
                        `);
                    }
                });

                const podValidAverages = weightedAverages
                    .filter(item => 
                        item.average !== null && 
                        item.question.toLowerCase().trim() !== 'year level'
                    )
                    .map(item => item.average);

                const podOverallAverage = podValidAverages.length > 0 
                    ? podValidAverages.reduce((sum, avg) => sum + avg, 0) / podValidAverages.length 
                    : 0;
                const podOverallSatisfactionPercent = (podOverallAverage / 5.0) * 100;

                const podDisplayPercent = podOverallSatisfactionPercent.toFixed(2);

                podSatisfactionPercent
                .removeClass('bg-danger bg-warning bg-custom-blue')
                .addClass(
                    podOverallSatisfactionPercent >= 80 ? 'bg-custom-blue' :
                    podOverallSatisfactionPercent >= 60 ? 'bg-warning' : 'bg-danger'
                )
                .text(podDisplayPercent + '%');
                podSatisfactionBar
                    .css('width', podDisplayPercent + '%')
                    .removeClass('bg-danger bg-warning bg-custom-blue')
                    .addClass(
                        podOverallSatisfactionPercent >= 80 ? 'bg-custom-blue' :
                        podOverallSatisfactionPercent >= 60 ? 'bg-warning' : 'bg-danger'
                    );
            }
        },
        complete: function() {
            isLoadingPOD = false;
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

function summarizeCommenAndSuggestionForPOD(payload) {
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

function listOfPODFeedbacks(){
    jQuery.ajax({
        url: './controller/feedback/FeedbackListController.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            jQuery('#podServiceFeedbackMostCommonAnswer').empty();
            if(response.success) {
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].office.toLowerCase() === 'pod'){
                        jQuery('#podServiceFeedbackMostCommonAnswer').append(`
                            <tr>
                                <td class="text-center">${response.data[1].feedback_count}</td>
                                <td class="text-center">${response.data[1].most_common_feedback}</td>
                            </tr>
                        `);

                        jQuery('#pod-feedback-bar')
                            .css('width', response.data[0].percentage + '%')
                            .removeClass('bg-danger bg-warning bg-custom-blue')
                            .addClass(
                                response.data[1].percentage >= 80 ? 'bg-custom-blue' :
                                response.data[1].percentage >= 60 ? 'bg-warning' : 'bg-danger'
                            )
                            .text(response.data[1].percentage + '%');
                            }
                }
            }
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}