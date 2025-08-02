<!-- <button type="button" class="btn btn-vibrant-golden-yellow d-flex align-items-center gap-2 mb-5" id="createForm">
    <i class="fa-regular fa-square-plus" style="font-size: 25px;"></i>
    <span>Create Form</span>
</button> -->

<!-- <div class="row mb-3">
    <form id="saveGeneratedForm">
        <div class="col" id="displayFormTemplate"></div>
        <button type="submit" class="btn btn-vibrant-golden-yellow" id="saveFormButton">
            <span>Save</span>
        </button>
    </form>
</div> -->

<!-- <div class="row" id="displayFormTemplateCard"></div> -->

<div class="container mt-3">
    <ul class="nav nav-pills justify-content-center" id="myTab" role="tablist">
        <!-- <li class="nav-item" role="presentation">
            <button class="nav-link form-nav-link active" id="questions-tab" data-bs-toggle="tab" data-bs-target="#questions-tab-pane" type="button" role="tab" aria-controls="questions-tab-pane" aria-selected="true">Questions</button>
        </li> -->
        <!-- <li class="nav-item" role="presentation">
            <button class="nav-link form-nav-link active" id="responses-tab" data-bs-toggle="tab" data-bs-target="#responses-tab-pane" type="button" role="tab" aria-controls="responses-tab-pane" aria-selected="false">Responses</button>
        </li> -->
        <!-- <li class="nav-item" role="presentation">
            <button class="nav-link form-nav-link" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings-tab-pane" type="button" role="tab" aria-controls="settings-tab-pane" aria-selected="false">Settings</button>
        </li> -->

    </ul>

    <div class="tab-content mt-4" id="myTabContent">
        <div class="tab-pane fade" id="questions-tab-pane" role="tabpanel" aria-labelledby="questions-tab" tabindex="0">
            <?php include __DIR__  . '/form-question-content.php' ?>
        </div>
        <div class="tab-pane fade show active" id="responses-tab-pane" role="tabpanel" aria-labelledby="responses-tab" tabindex="0">
            <?php include __DIR__  . '/form-response-content.php' ?>
        </div>
        <div class="tab-pane fade" id="settings-tab-pane" role="tabpanel" aria-labelledby="settings-tab" tabindex="0">
            <?php include __DIR__  . '/form-setting-content.php' ?>
        </div>
    </div>
</div>

<?php
include __DIR__ . '/../modal/form/delete-form-modal.php';
include __DIR__ . '/../modal/form/ask-password-modal.php';
?>