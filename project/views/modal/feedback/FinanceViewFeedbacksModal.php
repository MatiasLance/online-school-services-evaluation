<!-- Modal -->
<div class="modal fade" id="financeViewFeedbacksModal" tabindex="-1" aria-labelledby="financeViewFeedbacksModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header modal-primary-header">
        <h1 class="modal-title modal-primary-title fs-5" id="financeViewFeedbacksModalLabel">List of Feedbacks</h1>
        <button type="button" class="btn-close modal-primary-button-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
        <div class="modal-body">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Feedback</th>
                        </tr>
                    </thead>
                    <tbody id="finance-feedback-container"></tbody>
                </table>
            </div>
        </div>
        <div class="modal-footer" id="appendFinanceLoadMoreButton"></div>
    </div>
  </div>
</div>