function getImageDataFromImage(image) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, canvas.width, canvas.height);
}

function getImageFromImageData(imageData) {
    var image = new Image();
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    context.putImageData(imageData, 0, 0);
    image.src = canvas.toDataURL();
    return image;
}

function generateRGBA() {
    var imageData = getImageDataFromImage(this);
    var data = imageData.data;
    var celldata = [[], [], [], [], [], [], [], []];
    for (var i = 0; i < data.length; i++) {
        celldata[i % 4] = celldata[i % 4].concat(data[i], data[i], data[i], 1]);
        celldata[i % 4 + 4] = celldata[i % 4 + 4].concat(data[i], 0, 0, 1]);
    }
    var cells = [
        document.getElementById("r0"),
        document.getElementById("g0"),
        document.getElementById("b0"),
        document.getElementById("a0"),
        document.getElementById("r1"),
        document.getElementById("g1"),
        document.getElementById("b1"),
        document.getElementById("a1")
    ];
    for (var i = 0; i < 8; i++) {
        var image = getImageFromImageData(celldata[i]);
        cells[i].innerHTML = "";
        cells[i].appendChild(image);
    }
}

function onInputLoad() {
    var image = new Image();
    image.addEventListener("load", generateRGBA);
    image.src = this.result;
}

function onInput() {
    var file = this.files[0];
    if (file) {
        var reader = new FileReader();
        reader.addEventListener("load", onInputLoad);
        reader.readAsDataURL(file);
    }
}

function main() {
    var input = document.getElementById("input");
    input.addEventListener("input", onInput);
}

window.addEventListener("DOMContentLoaded", main);
