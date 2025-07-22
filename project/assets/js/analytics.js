jQuery(function($) {
    $.get('./controller/TabulateEvaluationFormController.php')
      .done(function (res) {
          if (res.status === 'success') {
              renderAnalyticsTable(res.data);
          } else {
              $('#analytics-table-body').append(`
                  <tr>
                      <td colspan="3" class="text-danger text-center">❌ ${res.message}</td>
                  </tr>
              `);
          }
      })
      .fail(function () {
          $('#analytics-table-body').append(`
              <tr>
                  <td colspan="3" class="text-danger text-center">⛔ Failed to load analytics data.</td>
              </tr>
          `);
      });
});

function renderAnalyticsTable(data) {
    let body = jQuery('#analytics-table-body');
    body.empty();

    function addRow(question, response, status) {
        body.append(`
            <tr>
                <td>${question}</td>
                <td><strong>${response}</strong></td>
                <td>${status}</td>
            </tr>
        `);
    }

    function addSpacer() {
        body.append('<tr><td colspan="3">&nbsp;</td></tr>');
    }

    body.append(`
        <tr class="table-info">
            <td><strong>Total Submissions Analyzed</strong></td>
            <td colspan="2"><strong>${data.total_submissions_analyzed}</strong></td>
        </tr>
    `);

    const q1Responses = data.text_responses.question_one.responses;
    if (q1Responses.length > 0) {
        q1Responses.forEach(resp => {
            addRow(
                data.text_responses.question_one.question,
                `Student ID ${resp.student_id}`,
                resp.answer_one
            );
        });
    } else {
        addRow(
            data.text_responses.question_one.question,
            '–',
            '<em>No responses yet.</em>'
        );
    }

    addSpacer();

    const q2Responses = data.text_responses.question_two.responses;
    if (q2Responses.length > 0) {
        q2Responses.forEach(resp => {
            addRow(
                data.text_responses.question_two.question,
                `Student ID ${resp.student_id}`,
                resp.answer_two
            );
        });
    } else {
        addRow(
            data.text_responses.question_two.question,
            '–',
            '<em>No responses yet.</em>'
        );
    }

    addSpacer();

    const rec = data.recommendation_responses;
    addRow(
        rec.question,
        'Yes',
        `
        <div class="progress mt-2" style="height: 20px;">
            <div class="progress-bar bg-success" 
                role="progressbar" 
                style="width: ${rec.responses.yes.percentage}%;" 
                aria-valuenow="${rec.responses.yes.percentage}" 
                aria-valuemin="0" 
                aria-valuemax="100">
                ${rec.responses.yes.percentage}%
            </div>
        </div>
        `
    );
    addRow(
        '',
        'No',
        `
        <div class="progress mt-2" style="height: 20px;">
            <div class="progress-bar bg-success" 
                role="progressbar" 
                style="width: ${rec.responses.no.percentage}%;" 
                aria-valuenow="${rec.responses.no.percentage}" 
                aria-valuemin="0" 
                aria-valuemax="100">
                ${rec.responses.no.percentage}%
            </div>
        </div>
        `
    );
    addRow(
        '',
        'Maybe',
        `
        <div class="progress mt-2" style="height: 20px;">
            <div class="progress-bar bg-success" 
                role="progressbar" 
                style="width: ${rec.responses.maybe.percentage}%;" 
                aria-valuenow="${rec.responses.maybe.percentage}" 
                aria-valuemin="0" 
                aria-valuemax="100">
                ${rec.responses.maybe.percentage}%
            </div>
        </div>
        `
    );
    if (rec.responses.unknown.count > 0) {
        addRow('', 'Unknown', `${rec.responses.unknown.count} responses`);
    }

    addSpacer();

    const act = data.extracurricular_responses;
    addRow(
        act.question,
        'Sports',
        `
        <div class="progress mt-2" style="height: 20px;">
            <div class="progress-bar bg-success" 
                role="progressbar" 
                style="width: ${act.responses.sports.percentage}%;" 
                aria-valuenow="${act.responses.sports.percentage}" 
                aria-valuemin="0" 
                aria-valuemax="100">
                ${act.responses.sports.percentage}%
            </div>
        </div>
        `
    );
    addRow('', 'Arts & Culture', `${act.responses.arts_culture.count} students (${act.responses.arts_culture.percentage}%)`);
    addRow('', 'Scouts', `${act.responses.scouts.count} students (${act.responses.scouts.percentage}%)`);
    addRow('', 'Academic Clubs', `${act.responses.academic_clubs.count} students (${act.responses.academic_clubs.percentage}%)`);

    addSpacer();

    const sat = data.satisfaction_responses;
    addRow(
        sat.question,
        'Very Satisfied',
        `${sat.responses.very_satisfied.count} students (${sat.responses.very_satisfied.percentage}%)`
    );
    addRow('', 'Satisfied', `${sat.responses.satisfied.count} students (${sat.responses.satisfied.percentage}%)`);
    addRow('', 'Neutral', `${sat.responses.neutral.count} students (${sat.responses.neutral.percentage}%)`);
    addRow('', 'Dissatisfied', `${sat.responses.dissatisfied.count} students (${sat.responses.dissatisfied.percentage}%)`);
    addRow('', 'Very Dissatisfied', `${sat.responses.very_dissatisfied.count} students (${sat.responses.very_dissatisfied.percentage}%)`);
    if (sat.responses.unknown.count > 0) {
        addRow('', 'Unknown', `${sat.responses.unknown.count} responses`);
    }
}