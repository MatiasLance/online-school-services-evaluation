<?php require __DIR__ . '/../navbar.php' ?>
 <?php include __DIR__ . '/../sidebar-content.php' ?>

<div class="flex-grow-1 d-flex">
    <main class="container-fluid container-content flex-grow-1 p-4" style="min-height: 100vh;">
      <div class="row">
        <div class="col-12 mb-4">
            <div class="card fade-in">
                <div class="card-header bg-custom-blue py-4">
                    <h2 class="text-white text-center card-title mb-0">Create Google Form</h2>
                </div>
                <div class="card-body">
                    <button type="button" class="btn btn-vibrant-golden-yellow btn-sm" id="createFormBtn">Create New Form</button>
                    <div id="result"></div>
                </div>
            </div>
        </div>
      </div>
    </main>
</div>

<?php require __DIR__ . '/../footer.php' ?>