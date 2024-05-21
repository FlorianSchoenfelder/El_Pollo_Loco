class MoveableObject {
    x = 80;
    y = 300;
    img;
    width = 70;
    height = 120;

    constructor() {

    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving Right');
    }
    
    moveLeft() {
        console.log('Moving Left');
    }
}