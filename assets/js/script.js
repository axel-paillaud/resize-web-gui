let form = document.getElementById("form");
let submitBtn = document.getElementById("submit");
const loader = document.getElementById("js-loader");
const userInput = document.getElementById("image-file");
let imgContainer = document.getElementById("js-add-img-container");
let indexToDelete = 2;

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
            let numberOfImg = countImage("image-file");
            if (tooMuchImage(numberOfImg)) {
                textInfo(imgContainer, `${numberOfImg} images left`);
            };
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
                    updateBtnToDownload(submitBtn, "src/resize_images/" + getResizeFileName(), getResizeFileName());
                    document.getElementById("download-btn").addEventListener("click", resetForm);
                    form.addEventListener('change', updateImgContainer);
                    window.addEventListener('keydown', triggerDownload);
                    return;
                  }

                  // empty buffer
                  buffer = "";
                  buffer = textDecoder.decode(value);
                  textInfo(messageContainer, buffer);

                  // Check if we have to delete one thumbnail image or not
                  // To do this, we check wether the name of the current file has changed or not

                  let actualFilename = getActualFilename(buffer);
                  if (actualFilename !== stackFilename) {
                    if (tooMuchImage(numberOfImg)) {
                        numberOfImg--;
                        textInfo(imgContainer, `${numberOfImg} images left`);
                    }
                    else {
                        deleteThumbnail();
                    }
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

// On every reload, we want to flush user images input
window.addEventListener('DOMContentLoaded', () => {
    userInput.value = "";
})

// Update thumbnail when user add images
userInput.addEventListener('change', updateImgContainer);

submitBtn.addEventListener('click', triggerSubmit);
submitBtn.addEventListener('keydown', triggerSubmit);
