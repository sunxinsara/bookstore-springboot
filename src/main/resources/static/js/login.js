$(document).ready(function () {
    setupTabClick();
    setupFormInteractions();
    setupFormSubmission();
});

function setupFormSubmission() {
    $('#signup-form').on('submit', submitForm);
}

function submitForm(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    sendFormData(formData);
}

function sendFormData(formData) {
    $.ajax({
        type: "POST",
        url: "your-server-endpoint",
        data: formData,
        success: handleSuccess,
        error: handleError
    });
}

function handleSuccess(response) {
    console.log("Form submitted successfully!", response);
    window.location.href = '../pages/bookstore.html';
}

function handleError(xhr, status, error) {
    console.error("Error submitting form:", error);
}

function setupTabClick() {
    $('.tab a').on('click', function (e) {
        e.preventDefault();
        changeTab($(this));
    });
}

function changeTab($this) {
    $this.parent().addClass('active');
    $this.parent().siblings().removeClass('active');

    var target = $this.attr('href');

    $('.tab-content > div').not(target).hide();
    $(target).fadeIn(600);
}
function setupFormInteractions() {
    $('.form').find('input, textarea').on('keyup blur focus', function (e) {
        handleFormEvents($(this), e);
    });
}

function handleFormEvents($this, e) {
    var label = $this.prev('label');

    switch (e.type) {
        case 'keyup':
            toggleLabel($this, label, $this.val() !== '');
            break;
        case 'blur':
            if ($this.val() === '') {
                label.removeClass('active highlight');
            } else {
                label.removeClass('highlight');
            }
            break;
        case 'focus':
            toggleLabel($this, label, true);
            break;
    }
}

function toggleLabel($input, $label, isActive) {
    if (isActive) {
        $label.addClass('active highlight');
    } else {
        $label.removeClass('active highlight');
    }
}