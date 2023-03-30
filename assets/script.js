let form = document.getElementById("form");
let submitBtn = document.getElementById("submit");

const logTest = function (event) {
    event.preventDefault();
    console.log("Test : " + event);
}

function displayErrorMsg(message) {
    let msgErrorContainer = document.getElementById("js-error-msg");
    let closeIcon = createXmark();

    hideSubmitBtn(submitBtn);
    msgErrorContainer.classList.add("error-msg");
    msgErrorContainer.style.opacity = 1;
    msgErrorContainer.textContent = message;
    msgErrorContainer.appendChild(closeIcon);
    window.addEventListener("keydown", closeMsgError);
}

function createXmark() {
    let xIcon = document.createElement("img");
    xIcon.setAttribute("src", "assets/images/xmark-solid.svg");
    xIcon.setAttribute("alt", "x mark to close error message");
    xIcon.id = "js-close-icon";
    xIcon.classList.add("fa-mark");
    xIcon.addEventListener('click', closeMsgError);
    return xIcon;
}

const closeMsgError = function(event) {
    if (event.type === 'click' || event.key === 'Enter') {
        let msgErrorContainer = document.getElementById("js-error-msg");
        let closeIcon = document.getElementById("js-close-icon");

        msgErrorContainer.style.opacity = 0;
        setTimeout(function() {
            msgErrorContainer.classList.remove("error-msg");
            msgErrorContainer.replaceChildren();
            showSubmitBtn(submitBtn);

            closeIcon.removeEventListener('click', closeMsgError);
            window.removeEventListener('keydown', closeMsgError);
        }, 300);
    }
}

function hideSubmitBtn(submitBtn) {
    submitBtn.style.opacity = 0;
    submitBtn.style.visibility = "hidden";
}

function showSubmitBtn(submitBtn) {
    submitBtn.style.opacity = 1;
    submitBtn.style.visibility = "visible";
}

// Check function is to ensure that at least one checkbox is checked,
// and one image is added. if so, enable the submit button.

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
    let fileLength = form[name].files.length;
    
    for (let i = 0; i < fileLength; i++) {
        if (!form[name].files[i].type.startsWith("image/")) {
            return false;
        }
    }
    return true;
}

function checkImage(name) {
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
        submitBtn.style.pointerEvents = "fill";
    }
    else {
        submitBtn.style.backgroundColor = "#a7a7a7";
        submitBtn.style.cursor = "default";
        submitBtn.style.pointerEvents = "none";
    }
}

const checkInput = function () {
    let isCheckSize = validateCheckbox("size");
    let isCheckFormat = validateCheckbox("format");
    let isFile = checkImage("image-file");
    enableSubmit(submitBtn, isCheckSize, isCheckFormat, isFile);
}

// Validate input is for when the form is send, and validate image input.
// If input is not ok, display an error msg
function validateInput() {
    let isCheckSize = validateCheckbox("size");
    let isCheckFormat = validateCheckbox("format");
    let isFile = checkImage("image-file");
    let isValidImage = validateImage("image-file");
    console.log(isValidImage);
    if (!isCheckSize) {
        displayErrorMsg("Error : You need to check at least one image size");
        return false;
    }
    else if (!isCheckFormat) {
        displayErrorMsg("Error : You need to check at least one image format");
        return false;
    }
    else if (!isFile) {
        displayErrorMsg("Error : You need to upload at least one image file");
        return false;
    }
    else if (!isValidImage) {
        displayErrorMsg('Error : One file is not of type "image"');
        return false;
    }
}

const triggerSubmit = function (event) {
    event.preventDefault();
    if (event.type === 'click' || event.key === 'Enter') {
        let isValidInput = validateInput();
        if (!isValidInput)
            return;
    }
}

form.addEventListener('change', checkInput);

// We also want to check if input is valid when we reload the page
window.addEventListener('DOMContentLoaded', checkInput);

submitBtn.addEventListener('click', triggerSubmit);
submitBtn.addEventListener('keydown', triggerSubmit);