var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

document.getElementById('canvas').style.width = '600px';
document.getElementById('canvas').style.height = '600px';



//create empty array
var images = [];
var index = 0;
var x;



window.addEventListener("load", () => {
    getImages();
});


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
            let image = document.createElement("img");
            image.src = imageObjectURL;
            images.push(image);
        } else {
            console.log("HTTP-Error: " + response.status);
        }
    }
}




function animate() {
    if (index >= 5) {
        index = 0;
    }

    x = setTimeout(function() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.drawImage(images[index++], 0, 0, 150, 150);

        requestAnimationFrame(animate);
    }, 200);

}


function move(choice) {

    switch (choice) {
        case 1:

            animate();
            document.getElementById("start").disabled = true;
            document.getElementById("next").disabled = true;
            document.getElementById("prev").disabled = true;
            document.getElementById("pause").disabled = false;
            document.getElementById("stop").disabled = false;
            console.log("1");
            break;

        case 2:
            document.getElementById("start").disabled = true;
            document.getElementById("next").disabled = false;
            document.getElementById("prev").disabled = false;
            document.getElementById("pause").disabled = true;
            document.getElementById("stop").disabled = false;
            clearTimeout(x);

            break;

        case 3:
            clearTimeout(x);
            index = 0;
            c.clearRect(0, 0, canvas.width, canvas.height);
            document.getElementById("start").disabled = false;
            document.getElementById("next").disabled = true;
            document.getElementById("prev").disabled = true;
            document.getElementById("pause").disabled = true;
            document.getElementById("stop").disabled = true;


            break;
        case 4:
            console.log(index);
            if (index >= 5) {
                index = 0;
            }
            c.clearRect(0, 0, canvas.width, canvas.height);
            c.drawImage(images[index++], 0, 0, 150, 150);
            document.getElementById("start").disabled = true;
            document.getElementById("next").disabled = false;
            document.getElementById("prev").disabled = false;
            document.getElementById("pause").disabled = true;
            document.getElementById("stop").disabled = false;
            break;
        case 5:
            console.log(index);
            if (index < 0) {
                index = 4;
            }
            c.clearRect(0, 0, canvas.width, canvas.height);
            c.drawImage(images[index--], 0, 0, 150, 150);
            document.getElementById("start").disabled = true;
            document.getElementById("next").disabled = false;
            document.getElementById("prev").disabled = false;
            document.getElementById("pause").disabled = true;
            document.getElementById("stop").disabled = false;
            break;
    }

}