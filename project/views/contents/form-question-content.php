<div class="row mt-5 justify-content-center">
  <div class="col-lg-8 col-md-10">
    <form id="formQuestion">
      <div class="card shadow-sm border-0 rounded-3">
        <!-- Card Header -->
        <div class="card-header bg-white py-4">
          <h5 class="card-title text-center mb-0">Evaluation Form</h5>
        </div>

        <!-- Card Body -->
        <div class="card-body px-4">

          <!-- Question 1: Text Input -->
          <div class="mb-4">
            <label for="questionOne" class="form-label fw-semibold">1. What do you think about St. Mary's College of Bansalan, Inc?</label>
          </div>

          <!-- Answer 1 -->
          <div class="mb-4">
            <label for="answerOne" class="form-label text-primary">Student Response</label>
            <input 
              type="text" 
              class="form-control" 
              id="answerOne" 
              placeholder="Student's short answer will appear here." 
              readonly
            >
          </div>

          <hr class="my-4">

          <!-- Question 2: Textarea -->
          <div class="mb-4">
            <label for="questionTwo" class="form-label fw-semibold">2. How would you rate the quality of teaching and learning environment?</label>
          </div>

          <!-- Answer 2 -->
          <div class="mb-4">
            <label for="answerTwo" class="form-label text-primary">Student Response</label>
            <textarea 
              class="form-control" 
              id="answerTwo" 
              rows="4" 
              placeholder="Student's detailed feedback will be shown here." 
              readonly
            ></textarea>
          </div>

          <hr class="my-4">

          <!-- Question 3: Select Dropdown -->
          <div class="mb-4">
            <label for="questionThree" class="form-label fw-semibold">3. How satisfied are you with school facilities (library, labs, etc.)?</label>
          </div>

          <!-- Answer 3 -->
          <div class="mb-4">
            <label for="answerThree" class="form-label text-primary">Student Response</label>
            <select class="form-select" id="answerThree" disabled>
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
          </div>

          <!-- Answer 4 -->
          <div class="mb-4">
            <label class="form-label text-primary">Student Response</label>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="chkSports" disabled>
              <label class="form-check-label" for="chkSports">Sports</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="chkArts" disabled>
              <label class="form-check-label" for="chkArts">Arts & Culture</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="chkScouts" disabled>
              <label class="form-check-label" for="chkScouts">Scouts</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="chkAcademics" disabled>
              <label class="form-check-label" for="chkAcademics">Academic Clubs</label>
            </div>
          </div>

          <hr class="my-4">

          <!-- Question 5: Radio Buttons -->
          <div class="mb-4">
            <label class="form-label fw-semibold">5. Would you recommend St. Mary's College to others?</label>
          </div>

          <!-- Answer 5 -->
          <div class="mb-4">
            <label class="form-label text-primary">Student Response</label>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="recommendRadio" id="radioYes" disabled>
              <label class="form-check-label" for="radioYes">Yes</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="recommendRadio" id="radioNo" disabled>
              <label class="form-check-label" for="radioNo">No</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="recommendRadio" id="radioMaybe" disabled>
              <label class="form-check-label" for="radioMaybe">Maybe</label>
            </div>
          </div>

        </div>
      </div>
    </form>
  </div>
</div>