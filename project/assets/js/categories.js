let currentPage = 1;
let debounceTimer;

jQuery(function($){
    $(document).on('click', '#saveCategory', function(){
        const payload = {
            category_name: $('#categoryNameFormControlInput1').val(),
        }

        $.ajax({
            url: './controller/AddCategoriesController.php',
            type: 'POST',
            data: payload,
            dataType: 'json',
            success: function(response){
                if(response.status === 'success'){
                    Swal.fire({
                        title: 'Success',
                        text: response.message,
                        icon: 'success'
                    }).then((result) => {
                        if(result.isConfirmed){
                            $('#categoryNameFormControlInput1').val('');
                            loadCategories(1, '');
                        }
                    });
                }

                if(response.status === 'error'){
                    Swal.fire({
                        title: 'Success',
                        text: response.message,
                        icon: 'success'
                    }).then((result) => {
                        if(result.isConfirmed){
                            loadCategories(1, '');
                        }
                    });
                }
            },
            error: function(xhr, status, error){
                console.error(error);
            }
        })
    })

    // Pagination click
    $(document).on('click', '.page-btn', function (e) {
        e.preventDefault();
        const page = parseInt($(this).data('page'));
        if (page > 0) {
            loadCategories(page, $('#searchInput').val());
        }
    });

    // Search functionality
    $('#filterByCategorynameFormControlInput1').on('keyup', function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () {
            loadCategories(1, $('#filterByCategorynameFormControlInput1').val());
        }, 500);
    });

    // Retrieve Category
    $(document).on('click', '#retrieveCategory', function(){
        const categoryId = $(this).data('id');
        retrieveCategory(categoryId);
    })

    // Save Edited Category Detail
    $(document).on('click', '#saveEditedCategoryDetail', function(){
        const categoryId = $('#categoryId').val()
        const editedCategoryName = $('#editedCategoryNameFormControlInput1').val();
        updateCategoryDetail(categoryId, editedCategoryName);
    })

    // Confirm Deletion of Category
    $(document).on('click', '#confirmDeleteCategory', function(){
        const categoryId = $(this).data('id');
        retrieveCategory(categoryId);
    })

    // Delete Category
    $(document).on('click', '#deleteCategoryDetail', function(){
        const id = $('#categoryIdToBeDeleted').val();
        const password = $('#categoryPasswordFormControlInput1').val();
        deleteCategory(id, password);
    })

    loadCategories();
});

function loadCategories(page = 1, search = '') {
    jQuery.ajax({
        url: './controller/ListCategoriesController.php',
        type: 'GET',
        data: { page: page, limit: 5, search: search },
        dataType: 'json',
        success: function (response) {
            const tbody = jQuery('#categoriesTable tbody');
            tbody.empty();

            if (response.status === 'success') {
                for(let i = 0; i < response.data.length; i++){
                    // Load category names in the user categories selection.
                    jQuery('#studentCategorySelectionContainer').prepend(`
                        <div class="col">
                            <div class="card category-card shadow-sm border-0 rounded-3 mb-4">
                                <div class="card-body p-4">
                                    <!-- Category Name -->
                                    <h5 class="card-title text-center mb-3" id="categorySelection" data-id="${response.data[i].id}">
                                        ${response.data[i].name}
                                    </h5>

                                    <!-- Status Badge -->
                                    <div class="d-flex justify-content-center align-items-center mt-2">
                                        ${response.data[i].form_statuses.length > 0 ? `
                                            <span class="badge bg-success d-inline-flex align-items-center px-3 py-2">
                                                <span class="me-2">&#9679;</span> Active
                                            </span>`: `
                                            <span class="badge bg-secondary d-inline-flex align-items-center px-3 py-2">
                                                <span class="me-2">&#9679;</span> Inactive
                                            </span>
                                        `}
                                    </div>
                                </div>
                                <div class="card-footer d-flex align-items-center justify-content-center">
                                ${response.data[i].form_statuses.length > 0 ? `
                                    <button type="button" class="btn btn-vibrant-golden-yellow" id="proceedToAssignedForm">
                                        Proceed
                                    </button>`:`
                                    <button type="button" class="btn btn-secondary" disabled>
                                        Not available
                                    </button>`}
                                    
                                </div>
                            </div>
                        </div>
                        `);
                    jQuery('#assignCategory').append(`<option value="${response.data[i].id}">${response.data[i].name}</option>`)
                    tbody.append(`
                        <tr>
                            <td>${response.data[i].name}</td>
                             <td class="flex flex-row justify-content-between">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18" id="retrieveCategory" data-id="${response.data[i].id}" data-bs-toggle="modal" data-bs-target="#retrieveCategoryModal" data-bs-auto-close="false"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"/></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" id="confirmDeleteCategory" data-id="${response.data[i].id}" data-bs-toggle="modal" data-bs-target="#deleteCategoryModal" data-bs-auto-close="false"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                            </td>
                        </tr>
                    `);
                }

                // Pagination
                const pagination = jQuery('#pagination');
                pagination.empty();

                // Previous Button
                pagination.append(`
                    <li class="page-item ${page === 1 ? 'disabled' : ''}">
                        <a class="page-link page-btn" href="#" data-page="${page - 1}">Previous</a>
                    </li>
                `);

                for (let i = 1; i <= response.total_pages; i++) {
                    pagination.append(`
                        <li class="page-item ${i === response.current_page ? 'active' : ''}">
                            <a class="page-link page-btn" href="#" data-page="${i}">${i}</a>
                        </li>
                    `);
                }

                // Next Button
                pagination.append(`
                    <li class="page-item ${page === response.total_pages ? 'disabled' : ''}">
                        <a class="page-link page-btn" href="#" data-page="${page + 1}">Next</a>
                    </li>
                `);

                currentPage = page;
            } else {
                tbody.append('<tr><td colspan="3" class="text-center">No categories found.</td></tr>');
            }
        }
    });
}

function retrieveCategory(categoryId){
    const payload = { id: categoryId }
    jQuery.ajax({
        url: './controller/RetrieveCategoryController.php',
        type: 'GET',
        data: payload,
        dataType: 'json',
        success: function(response){
            if(response.status === 'success'){
                jQuery('#categoryId').val(response.data.id);
                jQuery('#categoryIdToBeDeleted').val(response.data.id);
                jQuery('#categoryNameToBeDeleted').text(response.data.name);
                jQuery('#editedCategoryNameFormControlInput1').val(response.data.name);
            }
            if(response.status === 'error'){
                Swal.fire({
                    title: 'Error',
                    text: response.message,
                    icon: 'error'
                });
            }
        }
    })
}

function updateCategoryDetail(categoryId, categoryName){
    const payload = {
        id: categoryId,
        category_name: categoryName,
    }
    jQuery.ajax({
        url: './controller/EditCategoriesController.php',
        type: 'POST',
        data: payload,
        dataType: 'json',
        success: function(response){
            if(response.status === 'success'){
                Swal.fire({
                    title: 'Success',
                    text: response.message,
                    icon: 'success'
                }).then((result) => {
                    if(result.isConfirmed){
                        loadCategories(1, '');
                    }
                });
                
            }
            if(response.status === 'error'){
                Swal.fire({
                    title: 'Error',
                    text: response.message,
                    icon: 'error'
                }).then((result) => {
                    if(result.isConfirmed){
                        loadCategories(1, '');
                    }
                });
            }
            if(response.error){
                for(let i = 0; i < response.error.length; i++){
                    Swal.fire({
                        title: 'Warning',
                        text: response.error[i].message,
                        icon: 'warning'
                    }).then((result) => {
                        if(result.isConfirmed){
                            loadCategories(1, '');
                        }
                    });
                }
            }
        }
    })
}

function deleteCategory(categoryId, password){
    const payload = {
        id: categoryId,
        password: password,
    }
    jQuery.ajax({
        url: './controller/DeleteCategoryController.php',
        type: 'POST',
        data: payload,
        dataType: 'json',
        success: function(response){
            if(response.status === 'success'){
                Swal.fire({
                    title: 'Success',
                    text: response.message,
                    icon: 'success'
                }).then((result) => {
                    if(result.isConfirmed){
                        loadCategories(1, '');
                        jQuery('#passwordFormControlInput1').val('');
                    }
                });
                
            }
            if(response.status === 'error'){
                Swal.fire({
                    title: 'Error',
                    text: response.message,
                    icon: 'error'
                }).then((result) => {
                    if(result.isConfirmed){
                        loadCategories(1, '');
                        jQuery('#passwordFormControlInput1').val('');
                    }
                });
            }
            if(response.error){
                for(let i = 0; i < response.error.length; i++){
                    Swal.fire({
                        title: 'Warning',
                        text: response.error[i].message,
                        icon: 'warning'
                    }).then((result) => {
                        if(result.isConfirmed){
                            loadCategories(1, '');
                            jQuery('#passwordFormControlInput1').val('');
                        }
                    });
                }
            }
        }
    })
}