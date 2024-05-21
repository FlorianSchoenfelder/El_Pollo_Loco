class MoveableObject {
  x = 80;
  y = 315;
  img;
  width = 70;
  height = 120;
  imageCache = {};

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
    console.log("Moving Left");
  }
}
