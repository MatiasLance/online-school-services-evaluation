jQuery(function($) {
    function loadAllResponses() {
        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbwoj4kgiDPLDaNSwzPkFAROj6VXFD1n2YZC9WP0IMoyiJN7l3fEpwuSheRCYvjMnIYFzQ/exec',
            dataType: 'jsonp',
            success: function(data) {
                const body = $('#analytics-table-body');
                body.empty();

                if (data.error) {
                    body.append(`
                        <tr>
                            <td colspan="3" class="text-danger text-center">
                                ⛔ Error: ${data.error}
                            </td>
                        </tr>
                    `);
                    return;
                }

                const { responses } = data;

                if (!responses || responses.length === 0) {
                    body.append(`
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
                    body.append(`
                        <tr>
                            <td colspan="3" class="text-muted text-center">
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
                        const ans = (rawAnswer || '').trim();
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
                                        ? `<div>${answer} (${count} response)</div>`
                                        : `<div>${answer} (${count} responses)</div>`;
                                })
                                .join('');
                        }
                    }

                    const progressBarHtml = allAreNoAnswer
                        ? `
                            <div class="mb-1">
                                <small>No responses: 0%</small>
                                <div class="progress" style="height: 10px;">
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
                                    <div class="mb-1">
                                        <small>${answer}: ${percent}%</small>
                                        <div class="progress" style="height: 10px;">
                                            <div class="progress-bar bg-custom-info" role="progressbar"
                                                style="width: ${percent}%;"></div>
                                        </div>
                                    </div>
                                `;
                            }).join('');

                    body.append(`
                        <tr>
                            <td><strong>${question}</strong></td>
                            <td><small class="response-list">${responseText}</small></td>
                            <td>${progressBarHtml}</td>
                        </tr>
                    `);
                });
            },
            error: function() {
                $('#analytics-table-body').html(`
                    <tr>
                        <td colspan="3" class="text-danger text-center">
                            ⛔ Failed to load data. Check deployment.
                        </td>
                    </tr>
                `);
            }
        });
    }

    loadAllResponses();

    setInterval(loadAllResponses, 30000);
});