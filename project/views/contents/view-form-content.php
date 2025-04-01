<!-- Navbar -->
<?php require __DIR__ . '/../navbar.php' ?>

<div class="container form-tabs-container">
    <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
         <li class="nav-item">
            <a class="nav-link form-nav-link" aria-current="page" href="/dashboard">Back to Main</a>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link form-nav-link active" id="questions-tab" data-bs-toggle="tab" data-bs-target="#questions-tab-pane" type="button" role="tab" aria-controls="questions-tab-pane" aria-selected="true">Questions</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link form-nav-link" id="responses-tab" data-bs-toggle="tab" data-bs-target="#responses-tab-pane" type="button" role="tab" aria-controls="responses-tab-pane" aria-selected="false">Responses</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link form-nav-link" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings-tab-pane" type="button" role="tab" aria-controls="settings-tab-pane" aria-selected="false">Settings</button>
        </li>

    </ul>

    <div class="tab-content mt-4" id="myTabContent">
        <div class="tab-pane fade show active" id="questions-tab-pane" role="tabpanel" aria-labelledby="questions-tab" tabindex="0">
            <?php include __DIR__  . '/form-question-content.php' ?>
        </div>
        <div class="tab-pane fade" id="responses-tab-pane" role="tabpanel" aria-labelledby="responses-tab" tabindex="0">
        </div>
        <div class="tab-pane fade" id="settings-tab-pane" role="tabpanel" aria-labelledby="settings-tab" tabindex="0">
        </div>
    </div>
</div>


<!-- Footer -->
<?php require __DIR__ . '/../footer.php' ?>