let canvas;
let world;
let keyboard = new Keyboard();
let hover_sound = new Audio("audio/hoverButtons.mp3");
let click_sound = new Audio("audio/click.mp3");
let background_sound = new Audio('audio/background.mp3');
let winning_sound = new Audio('audio/winning.mp3');
let loosing_sound = new Audio('audio/loosing.mp3');
let muted = false;
let winningSoundWasPlayed = false;
let loosingSoundWasPlayed = false;


lastEdited = document.getElementById('startscreen');

window.addEventListener('resize', updateScreenWidth);
  updateScreenWidth(); // Initiale Aktualisierung

function updateScreenWidth() {
  if (window.innerWidth <= 650) {
    lastEdited.classList.add('d-none');
    document.getElementById('rotateHint').classList.remove('d-none');
    document.getElementById('rotateImage').classList.remove('d-none');
  }else {
    lastEdited.classList.remove('d-none');
    document.getElementById('rotateHint').classList.add('d-none');
    document.getElementById('rotateImage').classList.add('d-none');
  }
}

function gamePaused() {
  world.gamePaused = true;
  clearAllIntervals();
  document.getElementById('pauseGameImg').classList.add('d-none');
  document.getElementById('playGameImg').classList.remove('d-none');

}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function gameContinued() {
  world.gamePaused = false;
  checkContinued();
  document.getElementById('pauseGameImg').classList.remove('d-none');
  document.getElementById('playGameImg').classList.add('d-none');
}

function checkContinued() {
  if (this.gamePaused) {
    world.run();
    world.level.enemies.forEach((enemy) => {enemy.animateWalking()});
    world.level.enemies.forEach((enemy) => {enemy.animate()});
    world.level.coins.forEach((coin) => {coin.animateCoin()});
    world.level.clouds.forEach((cloud) => {cloud.animate()});
    world.level.bottles.forEach((bottle) => {bottle.animateBottle()});
    world.throwableObject.forEach((object) => {object.throw()});
    world.throwableObject.forEach((object) => {object.rotateBottle()});
    world.level.endboss[0].animate();
    world.character.animate();
    world.character.applyGravity();

  }
}

function startGame() {
  lastEdited = document.getElementById('gamescreen');
  click_sound.play();
  document.getElementById("loadingscreen").classList.remove("d-none");
  document.getElementById("gamescreen").classList.remove("d-none");
  document.getElementById("headline").classList.add("d-none");
  document.getElementById("startscreen").classList.add("d-none");
  setTimeout(() => {
    initLevel();
    init();
  }, 1500);
  setTimeout(() => {
    showCanvas();
    document.getElementById("headline").classList.remove("d-none");
    document.getElementById("soundControl").classList.remove("d-none");
    document.getElementById("controlsForMobile").classList.remove("d-none");   
  }, 3500);
}



function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("My Character is", world.character);
}

function showCanvas() {
  document.getElementById("loadingscreen").classList.add("d-none");

  document.getElementById("canvas").classList.remove("d-none");
  document.getElementById("startscreen").classList.add("d-none");
}

function playHoverEffect() {
  hover_sound.volume = 0.2;
  hover_sound.play();
}

function stopHoverEffect() {
  hover_sound.pause();
}

function showHint() {
  document.getElementById('hintContent').classList.remove('d-none');
}

function leaveHint() {
  document.getElementById('hintContent').classList.add('d-none');
}

function showControls() {
  lastEdited =   document.getElementById("controlsscreen");
  click_sound.play();
  document.getElementById("startscreen").classList.add("d-none");
  document.getElementById("controlsscreen").classList.remove("d-none");
}

function backToStartscreen() {
  lastEdited =   document.getElementById("startscreen");
  click_sound.play();
  document.getElementById("startscreen").classList.remove("d-none");
  document.getElementById("controlsscreen").classList.add("d-none");
}

function playEndScreen() {
  level1;
  world;
  document.getElementById("gamescreen").classList.add("d-none");
  document.getElementById('winningscreen').classList.remove('d-none');
  document.getElementById('wonImg').classList.add('animateImgWin');
  muted = true;
  setTimeout(() => {
    if (!winningSoundWasPlayed) {
      winning_sound.play();
      winning_sound.volume = 0.5;
      winningSoundWasPlayed = true;
    }
  }, 200);
  
}

function playGameOverScreen() {
  level1;
  world;
  document.getElementById("gamescreen").classList.add("d-none");
  document.getElementById('loosingscreen').classList.remove('d-none');
  document.getElementById('looseImg').classList.add('animateImgLoose');
  muted = true;
  setTimeout(() => {
    if (!loosingSoundWasPlayed) {
      loosing_sound.play();
      loosingSoundWasPlayed = true;
    }
  }, 200);
}

function backToStartscreen() {
  click_sound.play();
  setTimeout(() => {
    location.reload();
  }, 200);
  
}

function muteSound() {
  muted = true;
  click_sound.play();
  document.getElementById('soundOnImg').classList.add('d-none');
  document.getElementById('soundOffImg').classList.remove('d-none');
}

function unmuteSound() {
  muted = false;
  click_sound.play();
  document.getElementById('soundOnImg').classList.remove('d-none');
  document.getElementById('soundOffImg').classList.add('d-none');
}

function openImprint() {
  click_sound.play();
  document.getElementById('menuscreen').classList.add('d-none');
  document.getElementById('imprintscreen').classList.remove('d-none');
}

function openDataProtection() {
  click_sound.play();
  document.getElementById('menuscreen').classList.add('d-none');
  document.getElementById('dataProtectionscreen').classList.remove('d-none');
}

function openInformationCard() {
  lastEdited = document.getElementById('informationscreen');
  click_sound.play();
  document.getElementById('startscreen').classList.add('d-none');
  document.getElementById('informationscreen').classList.remove('d-none');
}

function backToInformationScreen(value) {
  lastEdited = document.getElementById('informationscreen');

  click_sound.play();
  if (value == 'imprint') {
    document.getElementById('menuscreen').classList.remove('d-none');
  document.getElementById('imprintscreen').classList.add('d-none');
  } else if (value == 'data') {
    document.getElementById('menuscreen').classList.remove('d-none');
  document.getElementById('dataProtectionscreen').classList.add('d-none');
  }
  else if (value == 'about') {
    document.getElementById('menuscreen').classList.remove('d-none');
    document.getElementById('aboutTheGamescreen').classList.add('d-none');
  }
}

function openAboutTheGame() {
  click_sound.play();
  document.getElementById('menuscreen').classList.add('d-none');
  document.getElementById('aboutTheGamescreen').classList.remove('d-none');
}

window.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 37:
    case 65:
      //    console.log("Left key");
      keyboard.LEFT = true;
      break;
    case 38:
    case 87:
      // console.log("Up key");
      keyboard.UP = true;
      break;
    case 39:
    case 68:
      // console.log("Right key");
      keyboard.RIGHT = true;
      break;
    case 40:
    case 83:
      // console.log("Down key");
      keyboard.DOWN = true;
      break;
    case 66:
      // console.log("B key");
      keyboard.B = true;
      break;
    case 32:
      // console.log("Space key");
      keyboard.SPACE = true;
      break;
  }
  //  console.log(e.keyCode);
});

window.addEventListener("keyup", (e) => {
  switch (e.keyCode) {
    case 37:
    case 65:
      //    console.log("Left key");
      keyboard.LEFT = false;
      break;
    case 38:
    case 87:
      // console.log("Up key");
      keyboard.UP = false;
      break;
    case 39:
    case 68:
      // console.log("Right key");
      keyboard.RIGHT = false;
      break;
    case 40:
    case 83:
      // console.log("Down key");
      keyboard.DOWN = false;
      break;
    case 66:
      // console.log("B key");
      keyboard.B = false;
      break;
    case 32:
      // console.log("Space key");
      keyboard.SPACE = false;
      break;
  }
  //  console.log(e.keyCode);
});

document.getElementById('btnLeft').addEventListener('pointerdown', (e) => {
  e.preventDefault();
  keyboard.LEFT = true;
});

document.getElementById('btnLeft').addEventListener('pointerup', (e) => {
  e.preventDefault();
  keyboard.LEFT = false;
});

document.getElementById('btnRight').addEventListener('pointerdown', (e) => {
  e.preventDefault();
  keyboard.RIGHT = true;
});

document.getElementById('btnRight').addEventListener('pointerup', (e) => {
  e.preventDefault();
  keyboard.RIGHT = false;
});

document.getElementById('jump').addEventListener('pointerdown', (e) => {
  e.preventDefault();
  keyboard.SPACE = true;
});

document.getElementById('jump').addEventListener('pointerup', (e) => {
  e.preventDefault();
  keyboard.SPACE = false;
});

document.getElementById('bottleThrow').addEventListener('pointerdown', (e) => {
  e.preventDefault();
  keyboard.B = true;
});

document.getElementById('bottleThrow').addEventListener('pointerup', (e) => {
  e.preventDefault();
  keyboard.B = false;
});