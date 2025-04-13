<button type="button" class="btn btn-vibrant-golden-yellow d-flex align-items-center gap-2 mb-5" id="createForm">
    <i class="fa-regular fa-square-plus" style="font-size: 25px;"></i>
    <span>Create Form</span>
</button>

<div class="row mb-3">
    <form id="saveGeneratedForm">
        <div class="col" id="displayFormTemplate"></div>
        <button type="submit" class="btn btn-vibrant-golden-yellow" id="saveFormButton">
            <span>Save</span>
        </button>
    </form>
</div>

<div class="row" id="displayFormTemplateCard"></div>

<?php
include __DIR__ . '/../modal/form/delete-form-modal.php';
include __DIR__ . '/../modal/form/ask-password-modal.php';
?>