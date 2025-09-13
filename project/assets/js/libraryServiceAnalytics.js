const libraryBody = jQuery('#library-service-analytics-table-body');
const libraryMostCommonAnswerCard = jQuery('#libraryServiceMostCommonAnswerCard');
const libraryGeneralWeightAverage = jQuery('#libraryServiceGWA');
const libraryGeneralWeightAverageContainer = jQuery('#libraryServiceGeneralWeightAverageContainer');
const librarySatisfactionPercent = jQuery('#library-satisfaction-percent');
const librarySatisfactionBar = jQuery('#library-satisfaction-bar');
var isLoadingLibrary = false;
let libraryEvaluationSection = {
    title: 'Library Service',
    gwa: {}
};

jQuery(function($) {
    libraryGeneralWeightAverageContainer.hide();
    loadAllLibraryResponses();
    $('#refreshLibraryServiceEvaluationResult').on('click', function(){
        loadAllLibraryResponses();
    });
    $('#summarizeBtn').on('click', function () {
        summarizeCommenAndSuggestionForLibrary(libraryEvaluationSection)
    });
});

function loadAllLibraryResponses() {
    jQuery.ajax({
        url: 'https://script.google.com/macros/s/AKfycbx_t79ElxsvKaHph9AozJbd-WMzJaih_P0FFkHw6KPVpvmeuZowy1pnjmdoHqfIeg1BHQ/exec',
        dataType: 'jsonp',
        beforeSend: function() {
            libraryBody.empty();
            librarySatisfactionPercent.empty();
            libraryMostCommonAnswerCard.empty();
            libraryGeneralWeightAverageContainer.hide();
             jQuery('#summarizeBtn').attr('disabled', true)
            libraryBody.append(`
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
            libraryMostCommonAnswerCard.append(`
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
            librarySatisfactionPercent.append(`
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>`);
            isLoadingLibrary = true;
        },
        success: function(data) {
            libraryBody.empty();
            libraryMostCommonAnswerCard.empty();
            libraryGeneralWeightAverage.empty();
            librarySatisfactionPercent.empty();
            libraryGeneralWeightAverageContainer.show();
             jQuery('#summarizeBtn').attr('disabled', false)

            if (data.error) {
                libraryGeneralWeightAverageContainer.hide();
                 jQuery('#summarizeBtn').attr('disabled', true)
                libraryBody.append(`
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
                libraryGeneralWeightAverageContainer.hide();
                 jQuery('#summarizeBtn').attr('disabled', true)
                libraryBody.append(`
                    <tr>
                        <td colspan="4" class="text-muted text-center">
                            No responses yet.
                        </td>
                    </tr>
                `);
                libraryMostCommonAnswerCard.append(`
                    <tr>
                        <td colspan="3" class="text-muted text-center">
                            No responses yet.
                        </td>
                    </tr>
                `);
                librarySatisfactionPercent
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
                libraryBody.append(`
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

                libraryBody.append(`
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
                        libraryEvaluationSection.mca = item.mostCommon
                    }
                    libraryMostCommonAnswerCard.append(`
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
                        libraryEvaluationSection.gwa[item.question] = item.average;
                        libraryGeneralWeightAverage.append(`
                            <li class="list-group-item d-flex justify-content-between align-items-start py-3 px-4 bg-white border-bottom">
                                <div class="flex-grow-1 text-dark">${item.question}</div>
                                <span class="badge bg-custom-info rounded-pill">${item.average}</span>
                            </li>
                        `);
                    }
                });

                const libraryValidAverages = weightedAverages
                    .filter(item => 
                        item.average !== null && 
                        item.question.toLowerCase().trim() !== 'year level'
                    )
                    .map(item => item.average);

                const libraryOverallAverage = libraryValidAverages.length > 0 
                    ? libraryValidAverages.reduce((sum, avg) => sum + avg, 0) / libraryValidAverages.length 
                    : 0;
                const libraryOverallSatisfactionPercent = (libraryOverallAverage / 5.0) * 100;

                const libraryDisplayPercent = libraryOverallSatisfactionPercent.toFixed(2);

                librarySatisfactionPercent
                .removeClass('bg-danger bg-warning bg-custom-blue')
                .addClass(
                    libraryOverallSatisfactionPercent >= 80 ? 'bg-custom-blue' :
                    libraryOverallSatisfactionPercent >= 60 ? 'bg-warning' : 'bg-danger'
                )
                .text(libraryDisplayPercent + '%');
                librarySatisfactionBar
                    .css('width', libraryDisplayPercent + '%')
                    .removeClass('bg-danger bg-warning bg-custom-blue')
                    .addClass(
                        libraryOverallSatisfactionPercent >= 80 ? 'bg-custom-blue' :
                        libraryOverallSatisfactionPercent >= 60 ? 'bg-warning' : 'bg-danger'
                    );
            }
        },
        complete: function() {
            isLoadingLibrary = false;
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

function summarizeCommenAndSuggestionForLibrary(payload) {
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