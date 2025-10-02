const canteenBody = jQuery('#canteen-service-analytics-table-body');
const canteenMostCommonAnswerCard = jQuery('#canteenServiceMostCommonAnswerCard');
const canteenGeneralWeightAverage = jQuery('#canteenServiceGWA');
const canteenGeneralWeightAverageContainer = jQuery('#CanteenServiceGeneralWeightAverageContainer');
const canteenSatisfactionPercent = jQuery('#canteen-satisfaction-percent');
const canteenSatisfactionBar = jQuery('#canteen-satisfaction-bar');
var isLoadingCanteen = false;
let canteenEvaluationSection = {
    title: 'Canteen Service',
    gwa: {}
};

jQuery(function($) {
    canteenGeneralWeightAverageContainer.hide();
    loadAllCanteenResponses();
    listOfCanteenFeedbacks();

    $('#refreshCanteenServiceEvaluationResult').on('click', function(){
        loadAllCanteenResponses();
        listOfCanteenFeedbacks();
    });

    $('#summarizeBtn').on('click', function () {
        summarizeCommenAndSuggestionForCanteen(canteenEvaluationSection)
    });

    $('#canteenPrintResult').on('click', function(){
        window.print();
    });

    $(document).on('click', '#loadMoreCanteenFeedback', function(){
        const office = $(this).data('office');
        const nextPage = $(this).data('page');
        const limit = $(this).data('limit');
        const payload = {
            office,
            nextPage,
            limit
        }

        loadMoreCanteenFeedbacks(payload);
    })

    $(document).on('click', '#hideMoreCanteenFeedback', function(){
        jQuery('#canteen-feedback-container').empty();
        const office = $(this).data('office');
        const nextPage = $(this).data('page');
        const limit = $(this).data('limit');
        const payload = {
            office,
            nextPage,
            limit
        }
        loadMoreCanteenFeedbacks(payload);
    })
});

function loadAllCanteenResponses() {
    jQuery.ajax({
        url: 'https://script.google.com/macros/s/AKfycbxou7slxRpibWXGcraHhO7-qHXmf9QE-vj_CRWk5-lGev988CJqHKKLl7xDfHtKcfub/exec',
        dataType: 'jsonp',
        beforeSend: function() {
            canteenBody.empty();
            canteenMostCommonAnswerCard.empty();
            canteenSatisfactionPercent.empty();
            canteenGeneralWeightAverageContainer.hide();
            jQuery('#summarizeBtn').attr('disabled', true);
            jQuery('#canteenPrintResult').attr('disabled', true)
            canteenBody.append(`
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
            canteenMostCommonAnswerCard.append(`
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
            canteenSatisfactionPercent.append(`
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>`);
            isLoadingCanteen = true;
        },
        success: function(data) {
            canteenBody.empty();
            canteenMostCommonAnswerCard.empty();
            canteenGeneralWeightAverage.empty();
            canteenSatisfactionPercent.empty();
            canteenGeneralWeightAverageContainer.show();
            jQuery('#summarizeBtn').attr('disabled', false);
            jQuery('#canteenPrintResult').attr('disabled', false)

            if (data.error) {
                canteenGeneralWeightAverageContainer.hide();
                jQuery('#summarizeBtn').attr('disabled', true);
                jQuery('#canteenPrintResult').attr('disabled', true)
                canteenBody.append(`
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
                canteenGeneralWeightAverageContainer.hide();
                jQuery('#summarizeBtn').attr('disabled', true);
                jQuery('#canteenPrintResult').attr('disabled', true)
                canteenBody.append(`
                    <tr>
                        <td colspan="4" class="text-muted text-center">
                            No responses yet.
                        </td>
                    </tr>
                `);
                canteenMostCommonAnswerCard.append(`
                    <tr>
                        <td colspan="3" class="text-muted text-center">
                            No responses yet.
                        </td>
                    </tr>
                `);
                canteenSatisfactionPercent
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
                canteenBody.append(`
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

                canteenBody.append(`
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
                        canteenEvaluationSection.mca = item.mostCommon
                    }
                    canteenMostCommonAnswerCard.append(`
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
                        canteenEvaluationSection.gwa[item.question] = item.average;
                        canteenGeneralWeightAverage.append(`
                            <li class="list-group-item d-flex justify-content-between align-items-start py-3 px-4 bg-white border-bottom">
                                <div class="flex-grow-1 text-dark">${item.question}</div>
                                <span class="badge bg-custom-info rounded-pill">${item.average}</span>
                            </li>
                        `);
                    }
                });

                const canteenValidAverages = weightedAverages
                    .filter(item => 
                        item.average !== null && 
                        item.question.toLowerCase().trim() !== 'year level'
                    )
                    .map(item => item.average);

                const canteenOverallAverage = canteenValidAverages.length > 0 
                    ? canteenValidAverages.reduce((sum, avg) => sum + avg, 0) / canteenValidAverages.length 
                    : 0;
                const canteenOverallSatisfactionPercent = (canteenOverallAverage / 5.0) * 100;

                const canteenDisplayPercent = canteenOverallSatisfactionPercent.toFixed(2);

                canteenSatisfactionPercent
                .removeClass('bg-danger bg-warning bg-custom-blue')
                .addClass(
                    canteenOverallSatisfactionPercent >= 80 ? 'bg-custom-blue' :
                    canteenOverallSatisfactionPercent >= 60 ? 'bg-warning' : 'bg-danger'
                )
                .text(canteenDisplayPercent + '%');
                canteenSatisfactionBar
                    .css('width', canteenDisplayPercent + '%')
                    .removeClass('bg-danger bg-warning bg-custom-blue')
                    .addClass(
                        canteenOverallSatisfactionPercent >= 80 ? 'bg-custom-blue' :
                        canteenOverallSatisfactionPercent >= 60 ? 'bg-warning' : 'bg-danger'
                    );
            }
        },
        complete: function() {
            isLoadingCanteen = false;
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

function summarizeCommenAndSuggestionForCanteen(payload) {
    jQuery.ajax({
        url: './controller/AutoSummarizeSuggestionAndComment.php',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(payload),
        beforeSend: function() {
            isLoadingCanteen = true;
            jQuery('#summaryOutput').html(`
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            `);
            jQuery('#summarizeBtn').attr('disabled', true).text('Summarizing...');
        },
        success: function(response) {
            const mcaMatch = response.summary.match(/MCA \(Most Common Answer\): (.+)/);
            const gwaMatch = response.summary.match(/GWA \(General Weighted Average\): (.+)/);
            const summaryMatch = response.summary.match(/Summary: (.+)/s);
            if (response && response.summary) {
                let structuredHTML = '';

                if (mcaMatch) {
                    structuredHTML += `<div class="mca-section">
                        <h3>MCA (Most Common Answer)</h3>
                        <p>${mcaMatch[1]}</p>
                    </div>`;
                }

                if (gwaMatch) {
                    structuredHTML += `<div class="gwa-section">
                        <h3>GWA (General Weighted Average)</h3>
                        <p>${gwaMatch[1]}</p>
                    </div>`;
                }

                if (summaryMatch) {
                    structuredHTML += `<div class="summary-section">
                        <h3>Summary</h3>
                        <p>${summaryMatch[1]}</p>
                    </div>`;
                }
                jQuery('#summaryOutput').html(structuredHTML);
            } else {
                jQuery('#summaryOutput').text('Invalid response from server.');
            }
        },
        error: function(xhr, status, error) {
            console.error('AJAX Error:', status, error);
            jQuery('#summaryOutput').text('Error generating summary.');
        },
        complete: function() {
            isLoadingCanteen = false;
            jQuery('#summarizeBtn').attr('disabled', false).text('Generate Summary');
        }
    });
}

function listOfCanteenFeedbacks(){
    let feedbackList = [];
    let feedbackListSubmissionDate = [];
    jQuery.ajax({
        url: './controller/feedback/FeedbackListController.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            jQuery('#canteenServiceFeedbackMostCommonAnswer, #canteen-feedback-container, #appendCanteenLoadMoreButton').empty();
            if(response.success) {
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].office.toLowerCase() === 'canteen'){
                        response.data[i].feedbacks.forEach(feedback => {
                            feedbackList.push(feedback.feedback);
                            feedbackListSubmissionDate.push(feedback.created_at)
                        });

                        analyzeCanteenFeedbackWithAI(feedbackList, function(err, results, gwa) {
                            if (err) {
                                jQuery('#canteenServiceFeedbackMostCommonAnswer').html(`
                                    <tr><td colspan="3" class="text-center text-danger">Failed to analyze feedback.</td></tr>
                                `);
                                return;
                            }
                            jQuery('#canteenServiceFeedbackMostCommonAnswer').empty();
                            results.forEach((result, index) => {
                                const dateStr = feedbackListSubmissionDate[index];
                                const formattedDate = dateStr ? new Date(dateStr).toDateString() : 'N/A';
                                jQuery('#canteenServiceFeedbackMostCommonAnswer').append(`
                                    <tr>
                                        <td class="text-center">${result.feedback}</td>
                                        <td class="text-center">${result.rating}</td>
                                        <td class="text-center">${formattedDate}</td>
                                    </tr>
                                `);

                                jQuery('#canteen-feedback-bar')
                                .css('width', gwa + '%')
                                .removeClass('bg-danger bg-warning bg-custom-blue')
                                .addClass(
                                    gwa >= 80 ? 'bg-custom-blue' :
                                    gwa >= 60 ? 'bg-warning' : 'bg-danger'
                                )
                                .text(gwa + '%');
                            });
                        });

                        for(let x = 0; x < response.data[i].feedbacks.length; x++){
                            jQuery('#canteen-feedback-container').append(`
                                <tr>
                                    <td>${response.data[i].feedbacks[x].feedback}</td>
                                </tr>
                            `)
                        }

                        if(response.data[i].has_more){
                            jQuery('#appendCanteenLoadMoreButton').append(`
                                <button class="btn btn-sm btn-primary"
                                data-office="${response.data[i].office}"
                                data-page="2"
                                data-limit="5"
                                id="loadMoreCanteenFeedback">
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

function loadMoreCanteenFeedbacks(data){
    jQuery.ajax({
        url: `./controller/feedback/FeedbackListController.php?office=${encodeURIComponent(data.office)}&page=${data.nextPage}&limit=${data. limit}`,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            jQuery('#canteenServiceFeedbackMostCommonAnswer, #appendCanteenLoadMoreButton').empty();
            if(response.success) {
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].office.toLowerCase() === 'canteen'){
                        jQuery('#canteenServiceFeedbackMostCommonAnswer').append(`
                            <tr>
                                <td class="text-center">${response.data[i].feedback_count}</td>
                                <td class="text-center">${response.data[i].most_common_feedback}</td>
                            </tr>
                        `);

                        jQuery('#canteen-feedback-bar')
                            .css('width', response.data[i].percentage + '%')
                            .removeClass('bg-danger bg-warning bg-custom-blue')
                            .addClass(
                                response.data[i].percentage >= 80 ? 'bg-custom-blue' :
                                response.data[i].percentage >= 60 ? 'bg-warning' : 'bg-danger'
                            )
                            .text(response.data[i].percentage + '%');

                        for(let x = 0; x < response.data[i].feedbacks.length; x++){
                            jQuery('#canteen-feedback-container').append(`
                                <tr>
                                    <td>${response.data[i].feedbacks[x].feedback}</td>
                                </tr>
                            `)
                        }

                        if(response.data[i].has_more || response.data[i].pagination.current_page === 1){
                            jQuery('#appendCanteenLoadMoreButton').append(`
                                <button class="btn btn-sm btn-primary"
                                data-office="${response.data[i].office}"
                                data-page="2"
                                data-limit="5"
                                id="loadMoreCanteenFeedback">
                                    Load More Feedbacks
                                </button>
                            `)
                        }

                        if(!response.data[i].has_more && response.data[i].pagination.current_page !==1){
                            jQuery('#appendCanteenLoadMoreButton').append(`
                                <button class="btn btn-sm btn-primary"
                                data-office="${response.data[i].office}"
                                data-page="${response.data[i].pagination.current_page - 1}"
                                data-limit="5"
                                id="hideMoreCanteenFeedback">
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

function analyzeCanteenFeedbackWithAI(feedbacks, callback) {
    jQuery.ajax({
        url: './controller/feedback/AnalyzeFeedbackController.php',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({ feedbacks: feedbacks }),
        beforeSend: function() {
            isLoadingCanteen = true;
            jQuery('#canteenServiceFeedbackMostCommonAnswer').html(`
                <td colspan="3" class="text-danger text-center">
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <p class="text-center">Analyzing feedback...</p>
                </td>
            `);
        },
        success: function(response) {
            if (response && response.success) {
                const weightedAvg = response.data.weighted_average_top5;
                const percentage = (weightedAvg / 5) * 100;
                const displayPercentage = Math.round(percentage)
                callback(null, response.data.individual_results, displayPercentage);
            } else {
                jQuery('#canteenServiceFeedbackMostCommonAnswer').html(`
                    <tr><td colspan="3" class="text-center text-danger">Analysis failed. Please try again.</td></tr>
                `);
            }
        },
        error: function(xhr, status, error) {
            jQuery('#canteenServiceFeedbackMostCommonAnswer').html(`
                <tr><td colspan="3" class="text-center text-danger">Error loading feedback analysis.</td></tr>
            `);
        },
        complete: function() {
            isLoadingCanteen = false;
        }
    });
}