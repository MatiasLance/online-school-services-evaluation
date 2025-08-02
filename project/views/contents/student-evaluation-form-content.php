<!-- Navbar -->
<?php include __DIR__ . '/../navbar.php' ?>

<div class="container student-view-form-container">
    <div class="row" id="displayNoteMessage">
        <input type="hidden" id="student_id" value="<?php echo $_SESSION['student_id'] ?>">
        <form id="formFeedBack" enctype="multipart/form-data" class="d-flex flex-column w-100">
            <div class="card shadow-sm border-0 rounded-3">
                <div class="card-body p-5">
                     <!-- Question 1: Text Input -->
                    <div class="mb-4">
                        <label for="questionOne" class="form-label fw-semibold">1. What do you think about St. Mary's College of Bansalan, Inc?</label>
                        <input 
                        type="hidden" 
                        class="form-control" 
                        id="questionOne" 
                        name="question_one"
                        value="What do you think about St. Mary's College of Bansalan, Inc?"
                        >
                    </div>

                    <!-- Answer 1 -->
                    <div class="mb-4">
                        <input 
                        type="text" 
                        class="form-control"
                        name="answer_one" 
                        id="answerOne" 
                        >
                    </div>

                    <hr class="my-4">

                    <!-- Question 2: Textarea -->
                    <div class="mb-4">
                        <label for="questionTwo" class="form-label fw-semibold">2. How would you rate the quality of teaching and learning environment?</label>
                        <input 
                        type="hidden" 
                        class="form-control" 
                        id="questionTwo" 
                        name="question_two"
                        value="How would you rate the quality of teaching and learning environment?"
                        >
                    </div>

                    <!-- Answer 2 -->
                    <div class="mb-4">
                        <textarea 
                        class="form-control" 
                        id="answerTwo"
                        name="answer_two"
                        rows="4" 
                        ></textarea>
                    </div>

                    <hr class="my-4">

                    <!-- Question 3: Select Dropdown -->
                    <div class="mb-4">
                        <label for="questionThree" class="form-label fw-semibold">3. How satisfied are you with school facilities (library, labs, etc.)?</label>
                        <input 
                        type="hidden" 
                        class="form-control" 
                        id="questionThree" 
                        name="question_three"
                        value="How satisfied are you with school facilities (library, labs, etc.)?"
                        >
                    </div>

                    <!-- Answer 3 -->
                    <div class="mb-4">
                        <select class="form-select" id="answerThree" name="answer_three">
                        <option selected>Choose an option</option>
                        <option value="very-satisfied">Very Satisfied</option>
                        <option value="satisfied">Satisfied</option>
                        <option value="neutral">Neutral</option>
                        <option value="dissatisfied">Dissatisfied</option>
                        <option value="very-dissatisfied">Very Dissatisfied</option>
                        </select>
                    </div>

                    <hr class="my-4">

                    <!-- Question 4: Checkboxes -->
                    <div class="mb-4">
                        <label class="form-label fw-semibold">4. Which extracurricular activities have you participated in? (Select all that apply)</label>
                        <input 
                        type="hidden" 
                        class="form-control" 
                        id="questionFour" 
                        name="question_four"
                        value="Which extracurricular activities have you participated in? (Select all that apply)"
                        >
                    </div>

                    <!-- Answer 4 -->
                    <div class="mb-4">
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="answer_four" value="sports" id="chkSports">
                        <label class="form-check-label" for="chkSports">Sports</label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="answer_four" value="arts-and-culture" id="chkArts">
                        <label class="form-check-label" for="chkArts">Arts & Culture</label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="answer_four" value="scouts" id="chkScouts">
                        <label class="form-check-label" for="chkScouts">Scouts</label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="answer_four" value="academic-clubs" id="chkAcademics">
                        <label class="form-check-label" for="chkAcademics">Academic Clubs</label>
                        </div>
                    </div>

                    <hr class="my-4">

                    <!-- Question 5: Radio Buttons -->
                    <div class="mb-4">
                        <label class="form-label fw-semibold">5. Would you recommend St. Mary's College to others?</label>
                        <input 
                        type="hidden" 
                        class="form-control" 
                        id="questionFive" 
                        name="question_five"
                        value="Would you recommend St. Mary's College to others?"
                        >
                    </div>

                    <!-- Answer 5 -->
                    <div class="mb-4">
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="answer_five" value="yes" id="radioYes">
                        <label class="form-check-label" for="radioYes">Yes</label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="answer_five" value="no" id="radioNo">
                        <label class="form-check-label" for="radioNo">No</label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="answer_five" value="maybe" id="radioMaybe">
                        <label class="form-check-label" for="radioMaybe">Maybe</label>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="d-flex justify-content-end mt-2">
                        <button type="submit" class="btn btn-vibrant-golden-yellow me-2">
                            <span>Submit Feedback</span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>


<!-- Footer -->
<?php
    include __DIR__ . '/../modal/form/view-student-response-modal.php';
    include __DIR__ . '/../modal/profile/student-edit-profile-modal.php';
    include __DIR__ . '/../footer.php';
 ?>