var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");

function resetCanvas(x, y) {
    canvas.width = x;
    canvas.height = y;
    // canvas.clearRect(0, 0, x, y); // resizing already triggers a clear
}

function getImageDataFromImage(image) {
    resetCanvas(image.width, image.height);
    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, canvas.width, canvas.height);
}

function getImageFromImageData(imageData) {
    var image = new Image();
    resetCanvas(imageData.width, imageData.height);
    context.putImageData(imageData, 0, 0);
    image.src = canvas.toDataURL();
    return image;
}

function generateRGBA() {
    var imageData = getImageDataFromImage(this);
    var cellData = [
        context.createImageData(imageData.width, imageData.height),
        context.createImageData(imageData.width, imageData.height),
        context.createImageData(imageData.width, imageData.height),
        context.createImageData(imageData.width, imageData.height),
        context.createImageData(imageData.width, imageData.height),
        context.createImageData(imageData.width, imageData.height),
        context.createImageData(imageData.width, imageData.height),
        context.createImageData(imageData.width, imageData.height),
        imageData
    ];
    for (var i = 0; i < imageData.data.length; i++) {
        cellData[i % 4].data[Math.floor(i / 4) * 4] = imageData.data[i];
        cellData[i % 4].data[Math.floor(i / 4) * 4 + 1] = imageData.data[i];
        cellData[i % 4].data[Math.floor(i / 4) * 4 + 2] = imageData.data[i];
        cellData[i % 4].data[Math.floor(i / 4) * 4 + 3] = 255;
        cellData[i % 4 + 4].data[Math.floor(i / 4) * 4 + 3] = 255;
        cellData[i % 4 + 4].data[i] = imageData.data[i];
    }
    var cells = [
        document.getElementById("r0"),
        document.getElementById("g0"),
        document.getElementById("b0"),
        document.getElementById("a0"),
        document.getElementById("r1"),
        document.getElementById("g1"),
        document.getElementById("b1"),
        document.getElementById("a1"),
        document.getElementById("im")
    ];
    for (var i = 0; i < 9; i++) {
        var image = getImageFromImageData(cellData[i]); // convert (this) from image to data to image again in case it has multiple frames (gif or video)
        cells[i].innerHTML = "";
        cells[i].appendChild(image);
    }
}

function startGenerateRGBA(uri) {
    var image = new Image();
    image.addEventListener("load", generateRGBA);
    image.src = uri;
}

function onInputLoadImage() {
    startGenerateRGBA(this.result);
}

function onInputLoadOther() {
    startGenerateRGBA("./error.png");
}

function test() {
    startGenerateRGBA("./test.png");
}

function onInput() {
    var file = this.files[0];
    if (file) {
        var reader = new FileReader();
        if (file.type.startsWith("image/") || file.type.startsWith("video/")) { // i shouldn't support videos since big files crash the site, but
            reader.addEventListener("load", onInputLoadImage);
        }
        else {
            reader.addEventListener("load", onInputLoadOther);
        }
        reader.readAsDataURL(file);
    }
}

function main() {
    var input = document.getElementById("input");
    input.addEventListener("input", onInput);
    test();
}

window.addEventListener("DOMContentLoaded", main);
