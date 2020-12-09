canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
log = document.getElementById('log');
//Width of image in pixels
width = canvas.offsetHeight;
//Actual width of image in cm
const rawWidth = 21.575;
//Square cm per pixel of the image
factor = (rawWidth / width)**2;
image = new Image();

function start() {
    image.src = 'img/Hand Solid ' + width + '.png';
    image.onload = function(){
        context.drawImage(image, 0, 0, width, width);
    }
}

function compute() {var imgData = context.getImageData(0, 0, width, width);
    var data = imgData.data;
    var sum = 0;

    for (var i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        if (alpha > 100) {
            sum++;
        }
    }
    print(
        "Image Width = " + width + " px" + "<br />"
        + "Actual Width = " + Math.sqrt(width**2 * factor) + " cm" + "<br />"
        + "1 px = " + factor.toFixed(6) + " cm^2" + "<br />"
        + "Image Area = " + width**2 + " px" + "<br />"
        + "Hand Area = " + sum + " px" + "<br /><br />"
        + "Hand Area = " + (sum * factor).toFixed(3) + " cm^2" + "<br />"
        + "Hand Area = " + (sum * factor / 6.452).toFixed(3) + " in^2"
    );
}

function print(str) {
    log.innerHTML = str;
}
function display(str) {
    log.innerHTML = str + '<br />' + log.innerHTML;
}
function line() {
    log.innerHTML = '----------<br />' + log.innerHTML;
}

function SetSize() {
    var e = document.getElementById("size");
    var s = parseInt(e.options[e.selectedIndex].text);
    document.getElementById("canvas").width = s;
    document.getElementById("canvas").height = s;
    width = s;
    factor = (rawWidth / width)**2;
    image.src = 'img/Hand Solid ' + width + '.png';
    image.onload = function(){
        context.drawImage(image, 0, 0, width, width);
    }
}