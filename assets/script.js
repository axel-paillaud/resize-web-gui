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
    }
}

const validateInput = function (event) {
    let isCheckSize = validateCheckbox("size");
    let isCheckFormat = validateCheckbox("format");
    let isFile = validateImage("image-file");
    enableSubmit(submitBtn, isCheckSize, isCheckFormat, isFile);
}


form.addEventListener('change', validateInput);