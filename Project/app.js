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
  const bird = document.querySelector('.bird')
  const gameDisplay = document.querySelector('.game-container')
  const ground = document.querySelector('.ground-moving')

  let birdLeft = 100
  let birdBottom = 200
  let gravity = 1
  let isGameOver = false
  let gap = 430
  var score = 0
  var heartcount = 0
  var high = [0]
  let timer = 20
  let speed = 3000

  if (localStorage.getItem('high') === null) {
    localStorage.setItem('high', JSON.stringify(high))
  } else {
    high = JSON.parse(localStorage.getItem('high'))
  }

  document.getElementById('high').innerHTML = getMax(
    JSON.parse(localStorage.getItem('high')),
  )

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
    //console.log(birdBottom)
  }

  document.addEventListener('keyup', control)
  document.addEventListener('click', jump)
  document.addEventListener('keyup', reGame)

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
          clearInterval(timerId)
          gameDisplay.removeChild(obstacle)
          gameDisplay.removeChild(topObstacle)
        } else {
          high.push(score)
          localStorage.setItem('high', JSON.stringify(high))
          gameOver()
          clearInterval(timerId)
        }
      }
    }
    let timerId = setInterval(moveObstacle, timer)
    if (!isGameOver) setTimeout(generateObstacle, speed)
    if (score % 3 == 0 && score != 0) {
      timer -= 3
      speed -= 500
    }
  }
  function generateHeart() {
    let heartLeft = 100
    let randomtop = Math.floor(Math.random() * (400 - 250) + 250)
    let hearttop = randomtop
    const heart = document.createElement('div')
    if (!isGameOver) {
      heart.classList.add('heart')
    }
    gameDisplay.appendChild(heart)

    heart.style.left = heartLeft + 'px'

    heart.style.top = hearttop + 'px'

    if (!isGameOver) setTimeout(generateHeart, 10000)

    //console.log(birdBottom + 45)
    if (birdBottom + 45 > 250) {
      heartcount++
      gameDisplay.removeChild(heart)
    }
  }

  generateObstacle()
  generateHeart()

  function gameOver() {
    clearInterval(gameTimerId)
    console.log('game over')
    isGameOver = true
    document.removeEventListener('keyup', control)
    document.removeEventListener('click', jump)
    ground.classList.add('ground')
    ground.classList.remove('ground-moving')
  }

  function reGame(e) {
    if (e.keyCode == 13) {
      this.location.reload()
      console.log('new game')
    }
  }
})
