var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = canvas.width = 300;
canvas.height = canvas.height = 300;

//create empty array
var images = [];
images.length = 5;
const imageUrl = "https://yunussmr.github.io/BlmAdvancedPrgrmng/HW3/sprite/2.jpg";

fetch(imageUrl).then(res => res.blob())
    .then(blob => {
        let objectURL = URL.createObjectURL(blob);
        usableImage = objectURL;
        imgObj.src = usableImage;
        console.log(imgObj.src);
        c.drawImage(imgObj, 100, 100, 100, 100);
    });

var imgObj = null;
var animate;

function init() {
    imgObj = document.getElementById('myImage');
    imgObj.style.position = 'relative';
    imgObj.style.left = '0px';
}



imgObj = new Image();
imgObj.src = imageUrl;
for (var i = 1; i < images.length; i++) {
    images[i] = new Image();
    images[i].src = 'sprite/' + i.toString() + '.jpg';
}