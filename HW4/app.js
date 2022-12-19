document.addEventListener('DOMContentLoaded', () => {
  const bird = document.querySelector('.bird')
  const gameDisplay = document.querySelector('.game-container')
  const ground = document.querySelector('.ground')

  let birdLeft = 100
  let birdBottom = 200
  let gravity = 2
  let isClick = false

  function startGame() {
    birdBottom -= gravity
    bird.style.bottom = birdBottom + 'px'
    bird.style.left = birdLeft + 'px'
    console.log(birdBottom)
  }
  let timerId = setInterval(startGame, 20)

  function jump() {
    if (birdBottom < 410) birdBottom += 50
    bird.style.bottom = birdBottom + 'px'
  }
  function control(e) {
    // 32 is for space button
    if (e.keyCode == 32 || e.keyCode == 13 || isClick==true) {
      jump()
    }
  }
  function Click() {
    gameDisplay.onclick = function () {
      isClick = true
      console.log('Click just happened')
      console.log(isClick)
    }
  }
  Click()

  document.addEventListener('keyup', control)
  document.addEventListener('click', control)
})
