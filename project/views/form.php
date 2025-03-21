<div class="form-container">
    <!-- Tabs -->
    <div class="container bg-body-tertiary p-5 rounded">
     <?php if(isset($_SESSION['student_id'])){ ?>
        <ul class="nav nav-tabs justify-content-center" id="evaluationTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="question-tab" data-bs-toggle="tab" data-bs-target="#user-question" type="button" role="tab">Question</button>
            </li>
        </ul>
        <?php }else{ ?>
            <ul class="nav nav-tabs justify-content-center" id="evaluationTabs" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="question-tab" data-bs-toggle="tab" data-bs-target="#question" type="button" role="tab">Question</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="response-tab" data-bs-toggle="tab" data-bs-target="#response" type="button" role="tab">Response</button>
                </li>
            </ul>
        <?php } ?>

        <!-- Tab Content -->
        <?php if(isset($_SESSION['student_id'])){ ?>
        <div class="tab-content mt-3">
                <!-- Question Tab -->
                <div class="tab-pane fade show active" id="user-question" role="tabpanel">
                    <div class="d-flex flex-row justify-content-between" id="user-form-title">
                        <h5>Submit Your Evaluation</h5>
                    </div>

                    <form id="userEvaluationForm" class="mt-4">
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

                        <div class="d-flex flex-row-reverse">
                            <button type="submit" class="btn btn-sm btn-custom-color text-capitalize">submit feedback</button>
                        </div>
                    </form>
                </div>
            </div>
            <?php }else{ ?>
            <div class="tab-content mt-3">
                <!-- Question Tab -->
                <div class="tab-pane fade show active" id="question" role="tabpanel">

                    <div class="d-flex flex-row justify-content-between">
                        <h5>School Service Evaluation</h5>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="publishFormSwitchCheckDefault">
                            <label class="form-check-label" for="publishFormSwitchCheckDefault">Publish</label>
                        </div>
                    </div>

                    <form id="evaluationForm" class="mt-4">
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

                        <div class="d-flex flex-row-reverse">
                            <button type="submit" class="btn btn-sm btn-custom-color text-capitalize">submit feedback</button>
                        </div>
                    </form>
                </div>
            </div>
            <?php } ?>
            
            <div class="tab-content mt-3">
                <!-- Response Tab -->
                <div class="tab-pane fade" id="response" role="tabpanel">
                    <h5>Responses</h5>

                    <div class="container mt-4">
                        <div class="row">
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Questions</th>
                                            <th scope="col">Year Level</th>
                                            <th scope="col">Data Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>How would you rate the service?</td>
                                            <td>
                                                <p>Fourth Year</p>
                                                <p>Third Year</p>
                                                <p>Second Year</p>
                                                <p>First Year</p>
                                            </td>
                                            <td>
                                                <div class="progress mb-2" role="progressbar" aria-label="Example with label" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="height: 30px">
                                                    <div class="progress-bar" style="width: 50%">50%</div>
                                                </div>
                                                <div class="progress mb-2" role="progressbar" aria-label="Example with label" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="height: 30px">
                                                    <div class="progress-bar" style="width: 50%">50%</div>
                                                </div>
                                                <div class="progress mb-2" role="progressbar" aria-label="Example with label" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="height: 30px">
                                                    <div class="progress-bar" style="width: 50%">50%</div>
                                                </div>
                                                <div class="progress mb-2" role="progressbar" aria-label="Example with label" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="height: 30px">
                                                    <div class="progress-bar" style="width: 50%">50%</div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Would you recommend our service?</td>
                                            <td>
                                                <p>Fourth Year</p>
                                                <p>Third Year</p>
                                                <p>Second Year</p>
                                                <p>First Year</p>
                                            </td>
                                            <td>
                                                <div class="progress mb-2" role="progressbar" aria-label="Example with label" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="height: 30px">
                                                    <div class="progress-bar" style="width: 50%">50%</div>
                                                </div>
                                                <div class="progress mb-2" role="progressbar" aria-label="Example with label" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="height: 30px">
                                                    <div class="progress-bar" style="width: 50%">50%</div>
                                                </div>
                                                <div class="progress mb-2" role="progressbar" aria-label="Example with label" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="height: 30px">
                                                    <div class="progress-bar" style="width: 50%">50%</div>
                                                </div>
                                                <div class="progress mb-2" role="progressbar" aria-label="Example with label" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="height: 30px">
                                                    <div class="progress-bar" style="width: 50%">50%</div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>