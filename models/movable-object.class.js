class MoveableObject {
  x = 80;
  y = 315;
  img;
  width = 70;
  height = 120;
  speed = 0.2;
  imageCache = {};
  currentImage = 0;

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
