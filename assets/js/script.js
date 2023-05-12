let form = document.getElementById("form");
let submitBtn = document.getElementById("submit");
const loader = document.getElementById("js-loader");
const userInput = document.getElementById("image-file");
let imgContainer = document.getElementById("js-add-img-container");

const logTest = function (event) {
    event.preventDefault();
    console.log("Test : " + event);
}

function displayErrorMsg(message) {
    let msgErrorContainer = document.getElementById("js-container");
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
        let msgErrorContainer = document.getElementById("js-container");
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

function countImage(name) {
    let fileLength = form[name].files.length;
    return fileLength;
}

function checkImage(name) {
    let isFile = false;
    if (form[name].files && form[name].files[0]) {
        isFile = true;
    }
    return isFile;
}

function setBtnStyleToEnable(submitBtn, content) {
    submitBtn.style.backgroundColor = "#590004";
    submitBtn.style.cursor = "pointer";
    submitBtn.style.pointerEvents = "fill";
    submitBtn.innerText = content;
}

function setBtnStyleToDisable(submitBtn, content) {
    submitBtn.style.backgroundColor = "#a7a7a7";
    submitBtn.style.cursor = "default";
    submitBtn.style.pointerEvents = "none";
    submitBtn.innerText = content;
}

function updateBtnToDownload(btn, url, filename)
{
    let container = document.getElementById("js-container");
    let link = document.createElement("a");
    link.setAttribute('download', filename);
    link.href = url;
    link.innerText = "Download";
    link.classList.add("btn-heavy");
    link.id = "download-btn";

    btn.style.display = "none";
    btn.disabled = true;
    container.appendChild(link);
    return link;
}

function showValidMessage() {
    let p = document.createElement("p");
    p.textContent = "Done ! Click 'Download' button to download image(s)";

    imgContainer.appendChild(p);
}

/**
 * Update user image start here
 * We don't set the same CSS class if we have one or more images added by user
 */

function updateThumbnail(imgContainer, numberOfImg, userImg) {
    for (let i = 0; i < numberOfImg; i++) {
        let img = document.createElement('img');
        img.setAttribute("alt", "");

        const reader = new FileReader();
        reader.onload = (e) => {
            img.src = e.target.result;
            imgContainer.appendChild(img);
        };
        reader.readAsDataURL(userImg.files[i]);
    }
}

function hideLabelImgContainer() {
    for (let child of imgContainer.children) {
        child.style.display = "none";
    }
}

function deleteImgContainer() {
    while(imgContainer.children.length !== 2) {
        imgContainer.children[imgContainer.children.length - 1].remove();
    }
}

const updateImgContainer = function () {
    userInput.removeEventListener('change', updateImgContainer);
    hideLabelImgContainer();

    let numberOfImg = countImage("image-file");
    
    if (numberOfImg === 1) {
        imgContainer.classList.replace("add-img-container", "single-img-container");
        updateThumbnail(imgContainer, numberOfImg, userInput);
    }
    else if (numberOfImg < 32) {
        imgContainer.classList.replace("add-img-container", "list-img-container");
        if (numberOfImg > 12) {
            imgContainer.style.gridTemplateColumns = "repeat(auto-fit,minmax(15%, 1fr))";
        }
        else if (numberOfImg > 9) {
            imgContainer.style.gridTemplateColumns = "repeat(auto-fit,minmax(20%, 1fr))";
        }
        updateThumbnail(imgContainer, numberOfImg, userInput);
    }
    else {
        imgContainer.classList.add("text-img-container");
    }
}

function getActualFilename(message) {
    if (message === "resize_images.zip") {
        return;
    }
    let filename = message.split("<b>")[1].split("</b>")[0];
    return filename;
}

let indexToDelete = 2;

function deleteThumbnail() {
    let imgChildren = imgContainer.children[indexToDelete];
    imgChildren.style.animation = "fadeOutTop 0.3s";
    setTimeout(() => {
        imgChildren.style.visibility = "hidden";
    }, 300);
    indexToDelete++;
}

function enableSubmit(submitBtn, isCheckSize, isCheckFormat, isFile) {
    if (isCheckSize && isCheckFormat && isFile) {
        submitBtn.disabled = false;
        submitBtn.style.display = null;
        document.getElementById("js-container").replaceChildren();
        setBtnStyleToEnable(submitBtn, "Resize and convert");
    }
    else {
        setBtnStyleToDisable(submitBtn, "Resize and convert");
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
    return true;
}

function getFormData(form) {
    let formData = new FormData();

    if (form["rename"]. value !== "") {
        formData.append("rename", form["rename"].value);
    }
    form["size"].forEach(size => {
        if (size.checked === true) {
            formData.append("size[]", size.value);
        }
    });
    form["format"].forEach(format => {
        if (format.checked === true) {
            formData.append("format[]", format.value);
        }
    });
    form["quality"].forEach(quality => {
        if (quality.checked === true) {
            formData.append("quality", quality.value);
        }
    });
    formData.append("side", form["side"].value);
    for (const image of form["image-file"].files) {
        formData.append("image[]", image);
    }
    return formData;
}

function fetchDataToApi(formData) {
    fetch("src/resizeweb.api.php", {
        method: "POST",
        body: formData,
    })
    .then(function(res) {
        if (res.ok) {
            const reader = res.body.getReader();
            let buffer = "";
            let stackFilename = "";
            let textDecoder = new TextDecoder();
            let messageContainer = document.getElementById("js-message");
            messageContainer.style.display = "block";
            const read = () => {
                return reader.read().then(({ done, value }) => {
                  if (done) {
                    deleteImgContainer();
                    imgContainer.classList.add("light-text-img-container");
                    showValidMessage();
                    messageContainer.style.display = "none";
                    loader.classList.remove("loader");
                    setBtnStyleToEnable(submitBtn, "Download");
                    // when PHP script is over, the buffer correspond to the name of the file we want to download.
                    updateBtnToDownload(submitBtn, "src/resize_images/" + buffer, buffer);
                    window.addEventListener('keydown', triggerDownload);
                    return;
                  }

                  // empty buffer
                  buffer = "";
                  messageContainer.classList.add("fade-top-animation");
                  setTimeout(() => {
                    messageContainer.classList.remove("fade-top-animation");
                  }, 200);
                  buffer = textDecoder.decode(value);
                  messageContainer.innerHTML = buffer;

                  // Check if we have to delete one thumbnail image or not
                  // To do this, we check wether the name of the file has changed or not

                  let actualFilename = getActualFilename(buffer);
                  if (actualFilename !== stackFilename && stackFilename !== "") {
                    deleteThumbnail();
                  }

                  stackFilename = getActualFilename(buffer);

                  return read();
                });
              };

            return read();
        }
    })
    .catch((error) => {
        console.log(error);
    })
}

function sendForm() {
    let formData = getFormData(form);

    fetchDataToApi(formData);
}

const triggerSubmit = function (event) {
    event.preventDefault();
    if (event.type === 'click' || event.key === 'Enter') {
        let isValidInput = validateInput();
        if (!isValidInput)
            return;
        else {
            submitBtn.style.display = "none";
            loader.classList.add("loader");
            sendForm();
        }
    }
}

const triggerDownload = function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
        document.getElementById("download-btn").click();
        window.removeEventListener('keydown', triggerDownload);
    }
}

form.addEventListener('change', checkInput);

// We also want to check if input is valid when we reload the page
window.addEventListener('DOMContentLoaded', checkInput);

// Update thumbnail when user add images

userInput.addEventListener('change', updateImgContainer);

submitBtn.addEventListener('click', triggerSubmit);
submitBtn.addEventListener('keydown', triggerSubmit);
