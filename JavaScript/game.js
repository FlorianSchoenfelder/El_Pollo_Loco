let canvas;
let world;
let keyboard = new Keyboard();


function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("My Character is", world.character);
}



window.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 37:
        case 65:
           console.log("Left key");
           keyboard.LEFT = true;
        break;
        case 38:
        case 87:
            console.log("Up key");
            keyboard.UP = true;
        break;
        case 39:
        case 68:
            console.log("Right key");
            keyboard.RIGHT = true;
        break;
        case 40:
        case 83:
            console.log("Down key");
            keyboard.DOWN = true;
        break;
        case 66:
            console.log("B key");
            keyboard.LETTER = true;
        break;
        case 32:
            console.log("Space key");
            keyboard.SPACE = true;
        break;
     }
     console.log(e.keyCode);
    });

    window.addEventListener("keyup", (e) => {
        switch (e.keyCode) {
            case 37:
            case 65:
               console.log("Left key");
               keyboard.LEFT = false;
            break;
            case 38:
            case 87:
                console.log("Up key");
                keyboard.UP = false;
            break;
            case 39:
            case 68:
                console.log("Right key");
                keyboard.RIGHT = false;
            break;
            case 40:
            case 83:
                console.log("Down key");
                keyboard.DOWN = false;
            break;
            case 66:
                console.log("B key");
                keyboard.LETTER = false;
            break;
            case 32:
                console.log("Space key");
                keyboard.SPACE = false;
            break;
         }
         console.log(e.keyCode);
        });
