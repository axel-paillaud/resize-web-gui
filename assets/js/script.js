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
            messageContainer.style.display = "block";
            const read = () => {
                return reader.read().then(({ done, value }) => {
                  if (done) {
                    // computeForm = when the form resizes images dynamically
                    resetComputeForm();
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
                    if (tooMuchImage(countImage("image-file"))) {
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
