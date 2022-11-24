var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth = 300;
canvas.height = window.innerHeight = 300; //create empty array
var images = [];
images.length = 5;
let img = document.createElement("img");
var index = 0;

async function getImages() {
    for (let i = 1; i < 6; i++) {
        let url = 'sprite/' + i + '.jpg';

        let options = {
            method: "GET",
        };

        let response = await fetch(url, options);

        if (response.status === 200) {
            let imageBlob = await response.blob();
            let imageObjectURL = URL.createObjectURL(imageBlob);
            img.src = imageObjectURL;
            images.push(img);
        } else {
            console.log("HTTP-Error: " + response.status);
        }
    }
}

function buildImage(index) {
    img.src = images[index];
    document.getElementById('content').appendChild(img);
}

function changeImage() {
    var img = document.getElementById('content').getElementsByTagName('img')[0]
    index++;
    index = index % images.length; // This is for if this is the last image then goto first image
    img.src = images[index];
}


function move(choice) {

    switch (choice) {
        case 1:
            getImages();
            var i = 0;
            setInterval(function() {
                i++;
                if (i >= 15) {
                    i = 0;
                }
                c.drawImage(images[i], 0, 0, 300, 300);
            }, 200)

            console.log("1");
            break;

        case 2:
            console.log("2");
            break;

        case 3:

            console.log("1");
            break;
        case 4:
            getImages();
            index++;
            console.log(index);
            buildImage(index);
            break;
        case 5:
            break;
    }





}