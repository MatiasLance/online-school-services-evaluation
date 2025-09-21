const registrarBody = jQuery('#registrar-service-analytics-table-body');
const registrarMostCommonAnswerCard = jQuery('#registrarServiceMostCommonAnswerCard');
const registrarGeneralWeightAverage = jQuery('#registrarServiceGWA');
const registrarGeneralWeightAverageContainer = jQuery('#registrarServiceGeneralWeightAverageContainer');
const registrarYearEvaluated = jQuery('#evaluated-year');
const registrarSatisfactionPercent = jQuery('#registrar-satisfaction-percent');
const registrarSatisfactionBar = jQuery('#registrar-satisfaction-bar');
let isLoadingRegistrar = false;
let registrarEvaluationSection = {
    title: 'Registrar Service',
    gwa: {}
};

jQuery(function($) {
    registrarGeneralWeightAverageContainer.hide();
    loadAllRegistrarResponses();
    listOfRegistrarFeedbacks();
    $('#refreshRegistrarServiceEvaluationResult').on('click', function(){
        loadAllRegistrarResponses();
        listOfRegistrarFeedbacks();
    });
    $('#summarizeBtn').on('click', function () {
        summarizeCommenAndSuggestionForRegistrar(registrarEvaluationSection)
    });

    $('#registrarPrintResult').on('click', function(){
        window.print();
    });

    $('#listAllRegistrarFeedbacks').on('click', function(){
        listOfRegistrarFeedbacks();
    });

    $(document).on('click', '#loadMoreRegistrarFeedback', function(){
        const office = $(this).data('office');
        const nextPage = $(this).data('page');
        const limit = $(this).data('limit');
        const payload = {
            office,
            nextPage,
            limit
        }

        loadMoreRegistrarFeedbacks(payload);
    })
});

function loadAllRegistrarResponses() {
    jQuery.ajax({
        url: 'https://script.google.com/macros/s/AKfycbxNDpSPTASkkmxl7QQpLbHRtEUeijmCL91TiyWJEFQaoZTrXh19mFIutDutljB1G5TJ/exec',
        dataType: 'jsonp',
        beforeSend: function() {
            registrarBody.empty();
            registrarMostCommonAnswerCard.empty();
            registrarSatisfactionPercent.empty();
            registrarYearEvaluated.empty();
            registrarGeneralWeightAverageContainer.hide();
            jQuery('#summarizeBtn').attr('disabled', true)
            jQuery('#registrarPrintResult').attr('disabled', true)
            registrarBody.append(`
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
             registrarMostCommonAnswerCard.append(`
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
            registrarSatisfactionPercent.append(`
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>`);
            registrarYearEvaluated.append(`
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>`);

            isLoadingRegistrar = true;
        },
        success: function(data) {
            registrarBody.empty();
            registrarMostCommonAnswerCard.empty();
            registrarGeneralWeightAverage.empty();
            registrarSatisfactionPercent.empty();
            registrarYearEvaluated.empty();
            registrarGeneralWeightAverageContainer.show();
            jQuery('#summarizeBtn').attr('disabled', false)
            jQuery('#registrarPrintResult').attr('disabled', false)

            if (data.error) {
                registrarGeneralWeightAverageContainer.hide();
                jQuery('#summarizeBtn').attr('disabled', true)
                jQuery('#registrarPrintResult').attr('disabled', true)
                registrarBody.append(`
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
                registrarGeneralWeightAverageContainer.hide();
                jQuery('#summarizeBtn').attr('disabled', true)
                jQuery('#registrarPrintResult').attr('disabled', true)
                registrarBody.append(`
                    <tr>
                        <td colspan="4" class="text-muted text-center">
                            No responses yet.
                        </td>
                    </tr>
                `);
                registrarMostCommonAnswerCard.append(`
                    <tr>
                        <td colspan="3" class="text-muted text-center">
                            No responses yet.
                        </td>
                    </tr>
                `);
                registrarSatisfactionPercent.text(0)
                return;
            }

            const allQuestions = Object.keys(responses[0] || {});
            const surveyQuestions = allQuestions.filter(q => 
                q.toLowerCase().trim() !== 'timestamp'
            );

            if (surveyQuestions.length === 0) {
                registrarBody.append(`
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

                registrarBody.append(`
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
                        registrarEvaluationSection.mca = item.mostCommon
                    }
                    registrarMostCommonAnswerCard.append(`
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
                        registrarEvaluationSection.gwa[item.question] = item.average;
                        registrarGeneralWeightAverage.append(`
                            <li class="list-group-item d-flex justify-content-between align-items-start py-3 px-4 bg-white border-bottom">
                                <div class="flex-grow-1 text-dark">${item.question}</div>
                                <span class="badge bg-custom-info rounded-pill">${item.average}</span>
                            </li>
                        `);
                    }
                });

                const registrarValidAverages = weightedAverages
                    .filter(item => 
                        item.average !== null && 
                        item.question.toLowerCase().trim() !== 'year level'
                    )
                    .map(item => item.average);

                const registrarOverallAverage = registrarValidAverages.length > 0 
                    ? registrarValidAverages.reduce((sum, avg) => sum + avg, 0) / registrarValidAverages.length 
                    : 0;
                const registrarOverallSatisfactionPercent = (registrarOverallAverage / 5.0) * 100;

                const registrarDisplayPercent = registrarOverallSatisfactionPercent.toFixed(2);

                registrarSatisfactionPercent
                .removeClass('bg-danger bg-warning bg-custom-blue')
                .addClass(
                    registrarOverallSatisfactionPercent >= 80 ? 'bg-custom-blue' :
                    registrarOverallSatisfactionPercent >= 60 ? 'bg-warning' : 'bg-danger'
                )
                .text(registrarDisplayPercent + '%');
                registrarSatisfactionBar
                    .css('width', registrarDisplayPercent + '%')
                    .removeClass('bg-danger bg-warning bg-custom-blue')
                    .addClass(
                        registrarOverallSatisfactionPercent >= 80 ? 'bg-custom-blue' :
                        registrarOverallSatisfactionPercent >= 60 ? 'bg-warning' : 'bg-danger'
                    );
                registrarYearEvaluated.text(formYearCreated);
            }
        },
        complete: function() {
            isLoadingRegistrar = false;
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

function summarizeCommenAndSuggestionForRegistrar(payload) {
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

function listOfRegistrarFeedbacks(){
    jQuery.ajax({
        url: './controller/feedback/FeedbackListController.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            jQuery('#registrarServiceFeedbackMostCommonAnswer, #registrar-feedback-container').empty();
            if(response.success) {
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].office.toLowerCase() === 'registrar'){
                        jQuery('#registrarServiceFeedbackMostCommonAnswer').append(`
                            <tr>
                                <td class="text-center">${response.data[i].feedback_count}</td>
                                <td class="text-center">${response.data[i].most_common_feedback}</td>
                            </tr>
                        `);

                        jQuery('#registrar-feedback-bar')
                            .css('width', response.data[i].percentage + '%')
                            .removeClass('bg-danger bg-warning bg-custom-blue')
                            .addClass(
                                response.data[i].percentage >= 80 ? 'bg-custom-blue' :
                                response.data[i].percentage >= 60 ? 'bg-warning' : 'bg-danger'
                            )
                            .text(response.data[i].percentage + '%');

                        for(let x = 0; x < response.data[i].feedbacks.length; x++){
                            jQuery('#registrar-feedback-container').append(`
                                <tr>
                                    <td>${response.data[i].feedbacks[x].feedback}</td>
                                </tr>
                            `)
                        }

                        if(response.data[i].has_more){
                            jQuery('#appendLoadMoreButton').append(`
                                <button class="btn btn-sm btn-primary"
                                data-office="${response.data[i].office}"
                                data-page="2"
                                data-limit="5"
                                id="loadMoreRegistrarFeedback">
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

function loadMoreRegistrarFeedbacks(data){
    jQuery.ajax({
        url: `./controller/feedback/FeedbackListController.php?office=${encodeURIComponent(data.office)}&page=${data.nextPage}&limit=${data. limit}`,
        type: 'GET',
        dataType: 'json',
        beforeSend: function(){
            jQuery('#loadMoreRegistrarFeedback').prop('disabled', true).text('Loading...');
        },
        success: function(response){

        }
    })
}