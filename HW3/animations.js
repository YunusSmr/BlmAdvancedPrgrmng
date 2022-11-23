var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = canvas.width = 300;
canvas.height = canvas.height = 300;

//create empty array
var images = [];
images.length = 5;
var myImage = null;
const imageUrl = '/sprite/1.jpg';


fetch(imageUrl).then(res => res.blob()) // Gets the response and returns it as a blob 
    .then(blob => {
        let objectURL = URL.createObjectURL(blob);
        console.log("objectURL", objectURL);
        usableImage = objectURL;
        myImage.src = usableImage;
    });


for (var i = 1; i < images.length; i++) {
    images[i] = new Image();
    images[i].src = 'sprite/' + i.toString() + '.jpg';
}
var i = 1;

setInterval(function() {
    i++;
    if (i >= 6) {
        i = 1;
    }
    c.drawImage(fetch(imageUrl), 100, 100, 100, 100);

}, 500)