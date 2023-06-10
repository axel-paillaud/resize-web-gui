const logTest = function (event) {
    event.preventDefault();
    console.log("Test : " + event);
}

function displayErrorMsg(message) {
    let msgErrorContainer = document.getElementById("js-container");
    let closeIcon = createXmark();

    removeSubmitBtn();
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
            displaySubmitBtn();

            closeIcon.removeEventListener('click', closeMsgError);
            window.removeEventListener('keydown', closeMsgError);
        }, 300);
    }
}

function hideSubmitBtn() {
    submitBtn.style.opacity = 0;
    submitBtn.style.visibility = "hidden";
}

function removeSubmitBtn() {
    submitBtn.style.display = "none";
}

function showSubmitBtn() {
    submitBtn.style.opacity = 1;
    submitBtn.style.visibility = "visible";
}

function displaySubmitBtn() {
    submitBtn.style.display = "block";
}

function deleteChildren(elt) {
    let children = elt.children;
    for (let i = 0; i < children.length; i++) {
        children[i].remove();
    }
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
    if (!form[name]) {
        return;
    }
    let fileLength = form[name].files.length;
    return fileLength;
}

function checkFile(name) {
    let isFile = false;
    if (!form[name]) {
        return false;
    }
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

function deleteAllClass(elt) {
    let classList = elt.classList;
    elt.classList.remove(...classList);
}

function showValidMessage() {
    let p = document.createElement("p");
    p.textContent = "Done ! Click 'Download' button to download image(s)";
    p.classList.add("fade-top-animation");

    imgContainer.appendChild(p);
}

/**
 * Update user image start here
 * We don't set the same CSS class if we have one or more images added by user
 */

function sortImages(userImg) {
    let fileArray = Array.from(userImg.files);

    fileArray.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0
    });
    return fileArray;
}

function updateThumbnail(numberOfImg, userImg) {
    let sortedImages = sortImages(userImg);
    for (let i = 0; i < numberOfImg; i++) {
        let img = document.createElement('img');
        img.setAttribute("alt", "");

        const reader = new FileReader();
        reader.onload = (e) => {
            img.src = e.target.result;
            imgContainer.appendChild(img);
        };
        reader.readAsDataURL(sortedImages[i]);
    }
}

function textInfo(element, message) {
    if (element.lastElementChild !== null && element.lastElementChild.tagName === "P") {
        element.lastElementChild.remove();
    }
    let p = document.createElement("p");
    p.innerHTML = message;
    p.classList.add("fade-top-animation");

    element.appendChild(p);
}

const resetForm = () => {
    // We have to reset this index, because it is still increment by the number of delete img
    indexToDelete = 2;
    imgContainer.children[imgContainer.children.length - 1].remove();
    let classList = imgContainer.classList;
    imgContainer.classList.remove(...classList);
    imgContainer.classList.add("add-img-container");
    showLabelImgContainer();
    userInput.value = "";
    deleteChildren(document.getElementById("js-container"));
    displaySubmitBtn();
    userInput.addEventListener('change', updateImgContainer);
    checkInput();
}

function hideLabelImgContainer() {
    for (let child of imgContainer.children) {
        child.style.display = "none";
    }
}

function showLabelImgContainer() {
    for (let child of imgContainer.children) {
        child.style.display = "block";
    }
}

function deleteImgContainer() {
    while(imgContainer.children.length !== 2) {
        imgContainer.children[imgContainer.children.length - 1].remove();
    }
}

/**
 * 
 * This function set the right class, in regards to the number of images
 */
function putTheRightClass(numberOfImg, imgContainer) {
    if (numberOfImg === 1) {
        imgContainer.classList.add("single-img-container");
    }
    else if (numberOfImg > 1 && numberOfImg < 9) {
        imgContainer.classList.add("list-img-container");
    }
    else if (numberOfImg >= 9 && numberOfImg < 12) {
        imgContainer.classList.add("list-img-container");
        imgContainer.style.gridTemplateColumns = "repeat(auto-fit, minmax(20%, 1fr)";
    }
    else if (numberOfImg >= 12 &&  numberOfImg < 32) {
        imgContainer.classList.add("list-img-container");
        imgContainer.style.gridTemplateColumns = "repeat(auto-fit,minmax(15%, 1fr))";
    }
    else {
        imgContainer.classList.add("text-img-container");
    }
}

const updateImgContainer = function () {
    if (!validateImage("image-file")) return;

    userInput.removeEventListener('change', updateImgContainer);
    form.removeEventListener('change', updateImgContainer);
    imgContainer.classList.remove(...imgContainer.classList);
    indexToDelete = 2;
    hideLabelImgContainer();

    const numberOfImg = countImage("image-file");
    putTheRightClass(numberOfImg, imgContainer);

    if (numberOfImg < 32) {
        updateThumbnail(numberOfImg, userInput);
    }
    else {
        textInfo(imgContainer, `${numberOfImg} images added`);
    }
}

function getActualFilename(message) {
    if (message === "resize_images.zip") {
        return;
    }
    if (!message.includes("<b>")) {
        return;
    }
    let filename = message.split("<b>")[1].split("</b>")[0];
    return filename;
}

function deleteThumbnail() {
    let imgChildren = imgContainer.children[indexToDelete];
    if (!imgChildren) {
        return;
    }
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
    let isFile = checkFile("image-file");
    enableSubmit(submitBtn, isCheckSize, isCheckFormat, isFile);
}

// Validate input is for when the form is send, and validate image input.
// If input is not ok, display an error msg

function validateInput() {
    let isCheckSize = validateCheckbox("size");
    let isCheckFormat = validateCheckbox("format");
    let isFile = checkFile("image-file");
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

/* If user add multiples images, it will create resize_images.zip, else,
we have to retrieve single image filename */

function getResizeFileName() {
    if (countImage("image-file") > 1) {
        return "resize_images.zip"
    }
    else {
        const filenameWithExt = userInput.files[0].name;
        const formData = getFormData(form);
        const filename = filenameWithExt.substring(0, filenameWithExt.lastIndexOf("."));
        const size = formData.get("size[]");
        const format = formData.get("format[]");
        return filename + "-" + size + "." + format;
    }
}

function tooMuchImage(numberOfImg) {
    return (numberOfImg > 32);
}