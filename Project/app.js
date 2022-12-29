document.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./sw.js')
      .then(function (registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful ')
      })
      .catch(function (err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ')
      })
  }
  let flyAudio = document.querySelector('#audio')
  let scoreAudio = document.querySelector('#audio2')
  let hitAudio = document.querySelector('#audio3')
  flyAudio.volume = 0.3
  scoreAudio.volume = 0.3
  hitAudio.volume=0.5
  const bird = document.querySelector('.bird')
  const sky = document.querySelector('.sky')
  const gameDisplay = document.querySelector('.game-container')
  const ground = document.querySelector('.ground-moving')
  const heart = document.createElement('div')

  let birdLeft = 100
  let birdBottom = 200
  let hearttop
  let gravity = 1
  let isGameOver = false
  let gap = 430
  var score = 0
  var heartcount = 2
  var high = [0]
  let timer = 10
  let speed = 3000

  if (localStorage.getItem('high') === null) {
    localStorage.setItem('high', JSON.stringify(high))
  } else {
    high = JSON.parse(localStorage.getItem('high'))
  }

  document.getElementById('high').innerHTML = getMax(
    JSON.parse(localStorage.getItem('high')),
  )
  document.getElementById('p3').innerHTML = heartcount
  document.getElementById("instruction").style.display = "inline";
  setTimeout(function() { document.getElementById("instruction").style.display = "none"; }, 3000);
 

  function startGame() {
    
    birdBottom -= gravity
    if (birdBottom > -1) {
      bird.style.bottom = birdBottom + 'px'
    }

    bird.style.left = birdLeft + 'px'
  }

  

  function getMax(arr) {
    if (!arr) {
      return null
    }

    var maxV = arr[0]
    for (a of arr) {
      if (a > maxV) maxV = a
    }
    return maxV
  }

  let gameTimerId = setInterval(startGame, 20)

  function control(e) {
    if (e.keyCode === 32) {
      jump()
    }
  }

  function jump() {
    if (birdBottom < 500) birdBottom += 50
    bird.style.bottom = birdBottom + 'px'
    flyAudio.play()
    //console.log(birdBottom)
  }

  document.addEventListener('keyup', control)
  document.addEventListener('click', jump)

  function generateObstacle() {
    let obstacleLeft = 400
    let randomHeight = Math.random() * 60
    let obstacleBottom = randomHeight
    const obstacle = document.createElement('div')
    const topObstacle = document.createElement('div')
    if (!isGameOver) {
      obstacle.classList.add('obstacle')
      topObstacle.classList.add('topObstacle')
    }
    gameDisplay.appendChild(obstacle)
    gameDisplay.appendChild(topObstacle)
    obstacle.style.left = obstacleLeft + 'px'
    topObstacle.style.left = obstacleLeft + 'px'
    obstacle.style.bottom = obstacleBottom + 'px'
    topObstacle.style.bottom = obstacleBottom + gap + 'px'

    function moveObstacle() {
      obstacleLeft -= 2
      obstacle.style.left = obstacleLeft + 'px'
      topObstacle.style.left = obstacleLeft + 'px'

      if (obstacleLeft === -60) {
        clearInterval(timerId)
        gameDisplay.removeChild(obstacle)
        gameDisplay.removeChild(topObstacle)
      }
      if (obstacleLeft === 40) {
        score++
        document.getElementById('score').innerHTML = score
      }
      if (
        (obstacleLeft > 100 &&
          obstacleLeft < 160 &&
          birdLeft === 100 &&
          (birdBottom < obstacleBottom + 150 ||
            birdBottom > obstacleBottom + gap - 200)) ||
        birdBottom === 0
      ) {
        if (heartcount > 0) {
          heartcount--
          document.getElementById('p3').innerHTML = heartcount
          clearInterval(timerId)
          gameDisplay.removeChild(obstacle)
          gameDisplay.removeChild(topObstacle)
          hitAudio.play()
        } else {
          hitAudio.play()
          high.push(score)
          localStorage.setItem('high', JSON.stringify(high))
          gameOver()
          clearInterval(timerId)
        }
      }
    }

    let timerId = setInterval(moveObstacle, timer)
    if (!isGameOver) {
      setTimeout(generateObstacle, speed)
    }
    if (score % 5 == 0 && score != 0) {
      speed -= 200
    }
  }

  function generateHeart() {
   // console.log('oluşturuldu')
    let heartLeft = 100
    let randomtop = Math.floor(Math.random() * (400 - 150) + 150)
    hearttop = randomtop
    heart.classList.add('heart')
    sky.appendChild(heart)

    heart.style.top = hearttop + 'px'
    heart.style.left = heartLeft + 'px'

    if (!isGameOver) {
      setTimeout(generateHeart, 10000)
    }
  }

  function check() {
    /*
    console.log('heart :', 520 - hearttop)
    console.log('bird :', birdBottom)
    console.log(sky.childNodes.length);
*/
    if (birdBottom > 520 - hearttop&&sky.childNodes.length>5) {
     // console.log('aldı')
      heartcount++
      document.getElementById('p3').innerHTML = heartcount
      scoreAudio.play()
      try {
        sky.removeChild(heart)
      } catch (error) {
        console.log(error);
      }
      
    }
    if (!isGameOver) {
      setTimeout(check, 100)
    }
  }

  generateObstacle()
  generateHeart()
  check()

  function gameOver() {
    clearInterval(gameTimerId)
    console.log('game over')
    isGameOver = true
    document.removeEventListener('keyup', control)
    document.removeEventListener('click', jump)
    ground.classList.add('ground')
    ground.classList.remove('ground-moving')
    document.getElementById("gameover").style.display = "inline";
  }

  
})
