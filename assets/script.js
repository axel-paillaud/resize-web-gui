let testButton = document.getElementById("test");

let fakeData = {
    name: "Axel",
    age: 18,
}

const sendData = function (event) {
    fetch("/src/api.php", {
        method: "POST",
        body: JSON.stringify(fakeData),
    })
    .then(function(res) {
        if (res.ok) {
            console.log(res);
        }
        else {
            console.log(res);
        }
    })
    .then(function(res) {
        fetch("src/api.php")
        .then(function(res) {
            console.log(res);
        })
    })

    fetch("src/api.php")
    .then(function(res) {
        console.log(res)
    })
}

testButton.addEventListener('click', sendData);