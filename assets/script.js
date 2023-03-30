let form = document.getElementById("form");
let submitBtn = document.getElementById("submit");

const logTest = function (event) {
    console.log("Test : " + event);
}

// validate function is to ensure that at least one checkbox is checked,
// and one image is added.

function validateCheckbox(name) {
    let isChecked = false;

    form[name].forEach(checkboxElement => {
        if (checkboxElement.checked === true) {
            isChecked = true;
        }
    });
    return isChecked;
}

function validateImage(name) {
    let isFile = false;
    if (form[name].files && form[name].files[0]) {
        isFile = true;
    }
    return isFile;
}

function enableSubmit(submitBtn, isCheckSize, isCheckFormat, isFile) {
    if (isCheckSize && isCheckFormat && isFile) {
        submitBtn.disabled = false;
        submitBtn.style.backgroundColor = "#590004";
        submitBtn.style.cursor = "pointer";
    }
    else {
        submitBtn.style.backgroundColor = "#a7a7a7";
        submitBtn.style.cursor = "default";
    }
}

const validateInput = function (event) {
    let isCheckSize = validateCheckbox("size");
    let isCheckFormat = validateCheckbox("format");
    let isFile = validateImage("image-file");
    enableSubmit(submitBtn, isCheckSize, isCheckFormat, isFile);
}

form.addEventListener('change', validateInput);

// We also want to check if input is valid when we reload the page
window.addEventListener('DOMContentLoaded', validateInput);