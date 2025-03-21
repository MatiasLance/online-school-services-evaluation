<!-- Modal -->
<div class="modal fade" id="retrieveUserAccountModal" tabindex="-1" aria-labelledby="retrieveUserAccountModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modal-primary-header">
        <h1 class="modal-title modal-primary-title fs-5" id="retrieveUserAccountModalLabel">Edit User Account</h1>
        <button type="button" class="btn-close modal-primary-button-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="editUserAccountId">

        <div class="mb-3">
            <label for="editFirstName" class="form-label fw-bold">First Name</label>
            <input type="text" class="form-control" id="editFirstName" required>
        </div>

        <div class="mb-3">
            <label for="editLastName" class="form-label fw-bold">Last Name</label>
            <input type="text" class="form-control" id="editLastName" required>
        </div>

        <div class="mb-3">
            <label for="editEmail" class="form-label fw-bold">Email</label>
            <input type="email" class="form-control mb-2" id="editEmail" required>
            <small id="userEmailFeedback" class="form-text"></small>
        </div>

        <div class="mb-3">
            <label for="newUserPassword" class="form-label fw-bold">New Password</label>
            <div class="input-group mb-3">
                <input type="password" class="form-control" id="newUserPassword" aria-label="User password" aria-describedby="basic-addon2">
                <span class="input-group-text" id="basic-addon2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20" height="20" id="toggleNewPassword" style="cursor: pointer;"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/></svg>
                </span>
            </div>
        </div>

        <div class="mb-3">
            <label for="confirmNewUserPassoword" class="form-label fw-bold">Confirm New Password</label>
            <div class="input-group mb-3">
                <input type="password" class="form-control" id="confirmNewUserPassoword" aria-label="User password" aria-describedby="basic-addon2">
                <span class="input-group-text" id="basic-addon2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20" height="20" id="toggleConfirmNewPassword" style="cursor: pointer;"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/></svg>
                </span>
            </div>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" id="saveEditedUserAccount" class="btn btn-vibrant-golden-yellow btn-sm" data-bs-dismiss="modal">Save</button>
      </div>
    </div>
  </div>
</div>