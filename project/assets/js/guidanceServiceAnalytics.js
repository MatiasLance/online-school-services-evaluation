const guidanceBody = jQuery('#guidance-service-analytics-table-body');
const guidanceMostCommonAnswerCard = jQuery('#guidanceServiceMostCommonAnswerCard');
const guidanceGeneralWeightAverage = jQuery('#guidanceServiceGWA');
const guidanceGeneralWeightAverageContainer = jQuery('#guidanceServiceGeneralWeightAverageContainer');
const guidanceSatisfactionPercent = jQuery('#guidance-satisfaction-percent');
const guidanceSatisfactionBar = jQuery('#guidance-satisfaction-bar');
var isLoadingGuidance = false;
let guidanceEvaluationSection = {
    title: 'Guidance Service',
    gwa: {}
};

jQuery(function($) {
    guidanceGeneralWeightAverageContainer.hide();
    loadAllGuidanceResponses();
    listOfGuidanceFeedbacks();
    $('#refreshGuidanceServiceEvaluationResult').on('click', function(){
        loadAllGuidanceResponses();
        listOfGuidanceFeedbacks();
    });
    $('#summarizeBtn').on('click', function () {
        summarizeCommenAndSuggestionForGuidance(guidanceEvaluationSection)
    });
    $('#guidancePrintResult').on('click', function(){
        window.print();
    });
    $('#listAllGuidanceFeedbacks').on('click', function(){
        listOfGuidanceFeedbacks();
    });
});

function loadAllGuidanceResponses() {
    jQuery.ajax({
        url: 'https://script.google.com/macros/s/AKfycbw4rIIamnifoZtTAJSScK7I9uGEmifAUcEG31-j_dQXgJJCna7Ja0zXDKLom3d9oRfs/exec',
        dataType: 'jsonp',
        beforeSend: function() {
            guidanceBody.empty();
            guidanceMostCommonAnswerCard.empty();
            guidanceSatisfactionPercent.empty();
            guidanceGeneralWeightAverageContainer.hide();
            jQuery('#summarizeBtn').attr('disabled', true);
            jQuery('#guidancePrintResult').attr('disabled', true);
            guidanceBody.append(`
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
            guidanceMostCommonAnswerCard.append(`
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
            guidanceSatisfactionPercent.append(`
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>`);
            isLoadingGuidance = true;
        },
        success: function(data) {
            guidanceBody.empty();
            guidanceMostCommonAnswerCard.empty();
            guidanceGeneralWeightAverage.empty();
            guidanceSatisfactionPercent.empty();
            guidanceGeneralWeightAverageContainer.show();
             jQuery('#summarizeBtn').attr('disabled', false);
             jQuery('#guidancePrintResult').attr('disabled', false);

            if (data.error) {
                guidanceGeneralWeightAverageContainer.hide();
                 jQuery('#summarizeBtn').attr('disabled', true);
                 jQuery('#guidancePrintResult').attr('disabled', true);
                guidanceBody.append(`
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
                guidanceGeneralWeightAverageContainer.hide();
                 jQuery('#summarizeBtn').attr('disabled', true);
                 jQuery('#guidancePrintResult').attr('disabled', true);
                guidanceBody.append(`
                    <tr>
                        <td colspan="4" class="text-muted text-center">
                            No responses yet.
                        </td>
                    </tr>
                `);
                guidanceMostCommonAnswerCard.append(`
                    <tr>
                        <td colspan="3" class="text-muted text-center">
                            No responses yet.
                        </td>
                    </tr>
                `);
                guidanceSatisfactionPercent
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
                guidanceBody.append(`
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

                guidanceBody.append(`
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
                        guidanceEvaluationSection.mca = item.mostCommon
                    }
                    guidanceMostCommonAnswerCard.append(`
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
                        guidanceEvaluationSection.gwa[item.question] = item.average;
                        guidanceGeneralWeightAverage.append(`
                            <li class="list-group-item d-flex justify-content-between align-items-start py-3 px-4 bg-white border-bottom">
                                <div class="flex-grow-1 text-dark">${item.question}</div>
                                <span class="badge bg-custom-info rounded-pill">${item.average}</span>
                            </li>
                        `);
                    }
                });

                const guidanceValidAverages = weightedAverages
                    .filter(item => 
                        item.average !== null && 
                        item.question.toLowerCase().trim() !== 'year level'
                    )
                    .map(item => item.average);

                const guidanceOverallAverage = guidanceValidAverages.length > 0 
                    ? guidanceValidAverages.reduce((sum, avg) => sum + avg, 0) / guidanceValidAverages.length 
                    : 0;
                const guidanceOverallSatisfactionPercent = (guidanceOverallAverage / 5.0) * 100;

                const guidanceDisplayPercent = guidanceOverallSatisfactionPercent.toFixed(2);

                guidanceSatisfactionPercent
                .removeClass('bg-danger bg-warning bg-custom-blue')
                .addClass(
                    guidanceOverallSatisfactionPercent >= 80 ? 'bg-custom-blue' :
                    guidanceOverallSatisfactionPercent >= 60 ? 'bg-warning' : 'bg-danger'
                )
                .text(guidanceDisplayPercent + '%');
                guidanceSatisfactionBar
                    .css('width', guidanceDisplayPercent + '%')
                    .removeClass('bg-danger bg-warning bg-custom-blue')
                    .addClass(
                        guidanceOverallSatisfactionPercent >= 80 ? 'bg-custom-blue' :
                        guidanceOverallSatisfactionPercent >= 60 ? 'bg-warning' : 'bg-danger'
                    );
            }
        },
        complete: function() {
            isLoadingGuidance = false;
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

function summarizeCommenAndSuggestionForGuidance(payload) {
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

function listOfGuidanceFeedbacks(){
    jQuery.ajax({
        url: './controller/feedback/FeedbackListController.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            jQuery('#guidanceServiceFeedbackMostCommonAnswer, #guidance-feedback-container').empty();
            if(response.success) {
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].office.toLowerCase() === 'guidance'){
                        jQuery('#guidanceServiceFeedbackMostCommonAnswer').append(`
                            <tr>
                                <td class="text-center">${response.data[i].feedback_count}</td>
                                <td class="text-center">${response.data[i].most_common_feedback}</td>
                            </tr>
                        `);

                        jQuery('#guidance-feedback-bar')
                            .css('width', response.data[i].percentage + '%')
                            .removeClass('bg-danger bg-warning bg-custom-blue')
                            .addClass(
                                response.data[i].percentage >= 80 ? 'bg-custom-blue' :
                                response.data[i].percentage >= 60 ? 'bg-warning' : 'bg-danger'
                            )
                            .text(response.data[i].percentage + '%');

                        for(let x = 0; x < response.data[i].feedbacks.length; x++){
                            jQuery('#guidance-feedback-container').append(`
                                <tr>
                                    <td>${response.data[i].feedbacks[x].feedback}</td>
                                </tr>
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