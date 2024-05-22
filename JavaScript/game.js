let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);

  console.log("My Character is", world.character);
}

window.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 37:
        case 65:
           console.log("Left key");
           keyboard.RIGHT = true;
        break;
        case 38:
        case 87:
            keyboard.UP = true;
            console.log("Up key");
        break;
        case 39:
        case 68:
            keyboard.RIGHT = true;
            console.log("Right key");
        break;
        case 40:
        case 83:
            keyboard.DOWN = true;
            console.log("Down key");
        break;
        case 66:
            keyboard.LETTER = true;
            console.log("B key");
        break;
        case 32:
            keyboard.SPACE = true;
            console.log("Space key");
        break;
     }
     console.log(e.keyCode);
    });
