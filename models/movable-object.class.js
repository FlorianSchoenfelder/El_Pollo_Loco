class MoveableObject {
  x = 80;
  y = 315;
  img;
  width = 70;
  height = 120;
  speed = 0.2;
  imageCache = {};
  currentImage = 0;
  otherDirection = false;

  constructor() {}

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  playAnimation(images) {
    let i = this.currentImage % this.IMAGES_WALKING.length; // Modulo Operator vergleicht 0 mit 5 (0/5 = 0, rest 5. Am Ende wird es 1 und zählt von vorne).
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playAnimationIdle(images) {
    let i = this.currentImage % this.IMAGES_IDLE.length; // Modulo Operator vergleicht 0 mit 5 (0/5 = 0, rest 5. Am Ende wird es 1 und zählt von vorne).
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
  
  playAnimationLongIdle(images) {
    let i = this.currentImage % this.IMAGES_LONG_IDLE.length; // Modulo Operator vergleicht 0 mit 5 (0/5 = 0, rest 5. Am Ende wird es 1 und zählt von vorne).
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    console.log("Moving Right");
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 120);
    console.log("Moving Left");
  }
}
