let canvas;
let world;
let keyboard = new Keyboard();
let hover_sound = new Audio("audio/hoverButtons.mp3");
let click_sound = new Audio("audio/click.mp3");

function startGame() {
  click_sound.play();
  document.getElementById("loadingscreen").classList.remove("d-none");
  document.getElementById("startscreen").classList.add("d-none");
  setTimeout(() => {
    initLevel();
    init();
  }, 1500);
  setTimeout(() => {
    showCanvas();
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
  hover_sound.play();
}

function stopHoverEffect() {
  hover_sound.pause();
}

function showControls() {
  click_sound.play();
  document.getElementById("startscreen").classList.add("d-none");
  document.getElementById("controlsscreen").classList.remove("d-none");
}

function backToStartscreen() {
  click_sound.play();
  document.getElementById("startscreen").classList.remove("d-none");
  document.getElementById("controlsscreen").classList.add("d-none");
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
