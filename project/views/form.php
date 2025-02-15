<div class="form-container">
    <!-- Tabs -->
    <div class="container bg-body-tertiary p-5 rounded">
        <ul class="nav nav-tabs justify-content-center" id="evaluationTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="question-tab" data-bs-toggle="tab" data-bs-target="#question" type="button" role="tab">Question</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="response-tab" data-bs-toggle="tab" data-bs-target="#response" type="button" role="tab">Response</button>
            </li>
        </ul>

        <!-- Tab Content -->
        <div class="tab-content mt-3">
            <!-- Question Tab -->
            <div class="tab-pane fade show active" id="question" role="tabpanel">
                <h5>Submit Your Evaluation</h5>
                <form id="evaluationForm">
                    <div class="mb-3">
                        <label class="form-label">Full Name <span class="text-danger">*</span></label>
                        <input type="text" id="fullName" class="form-control" placeholder="Enter your full name" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Gender <span class="text-danger">*</span></label>
                        <select class="form-select" id="gender" required>
                            <option value="" disabled selected>Select an option</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Email <span class="text-danger">*</span></label>
                        <input type="email" id="email" class="form-control" placeholder="Enter your email" required>
                        <span id="errorMessage"></span>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">How would you rate the service? <span class="text-danger">*</span></label>
                        <select class="form-select" id="serviceRate" required>
                            <option value="" disabled selected>Select an option</option>
                            <option value="excellent">Excellent</option>
                            <option value="good">Good</option>
                            <option value="fair">Fair</option>
                            <option value="poor">Poor</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Would you recommend our service? <span class="text-danger">*</span></label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="recommend" id="yes" value="yes" required>
                            <label class="form-check-label" for="yes">Yes</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="recommend" id="no" value="no">
                            <label class="form-check-label" for="no">No</label>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Additional Comments</label>
                        <textarea class="form-control" id="additionalComments" rows="4" placeholder="Write your feedback here..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-sm btn-custom-color text-capitalize">save</button>
                </form>
            </div>

            <!-- Response Tab -->
            <div class="tab-pane fade" id="response" role="tabpanel">
                <h5>Responses</h5>

                <div class="container mt-4">
                <div class="row">
                    <div class="col-md-6 mb-4">
                        <div class="card shadow-sm p-3">
                            <h5 class="text-center">Service Rate Distribution</h5>
                            <canvas id="serviceRateChart"></canvas>
                        </div>
                    </div>
                    <div class="col-md-6 mb-4">
                        <div class="card shadow-sm p-3">
                            <h5 class="text-center">Recommendation Choices</h5>
                            <canvas id="recommendChart"></canvas>
                        </div>
                    </div>
                    <div class="col-md-6 mb-4">
                        <div class="card shadow-sm p-3">
                            <h5 class="text-center">Gender</h5>
                            <canvas id="genderChart"></canvas>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card shadow-sm p-3">
                            <h5 class="text-center">Email Distribution</h5>
                            <canvas id="emailChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </div>
    </div>
</div>