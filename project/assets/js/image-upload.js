/*  ==========================================
    SHOW UPLOADED IMAGE PREVIEW
* ========================================== */
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            jQuery("#imageResult").attr("src", e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

/*  ==========================================
    SHOW FILE NAME
* ========================================== */
function showFileName(event) {
    var input = event.target;
    var fileName = input.files[0].name;
    jQuery("#upload-label").text("File name: " + fileName);
}

function attachSideBarMenuLogo(file) {
    jQuery('#sideBarMenuLogo, #adminLoginFormLogo').attr('src' , file).fadeIn();
}

jQuery(document).ready(function ($) {
    $("#uploadForm").on("submit", function (e) {
        e.preventDefault();
        var formData = new FormData(this);

        $.ajax({
            url: "./controller/ImageUploadController.php",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (response) {
                Swal.fire({
                    title: 'Success',
                    text: response.message,
                    icon: 'success',
                    showConfirmButton: true
                });
                if (response.status === "success") {
                    attachSideBarMenuLogo(response.file)
                    $("#preview").html(`<img id="imageResult" src="${response.file}" width="200">`);
                    $("#upload-label").text("File name: " + response.file.split('/').pop());
                    $('#manageSystemLogoModal').close();
                } else {
                    Swal.fire({
                        title: 'Success',
                        text: response.message,
                        icon: 'danger',
                        showConfirmButton: true
                    });
                }
            }
        });
    });

    // Show uploaded image before submission
    $("#upload").on("change", function () {
        readURL(this);
        showFileName(event);
    });
});
