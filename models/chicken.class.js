class Chicken extends MoveableObject {
  height = 60;
  y = 375;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  currentImage = 0;

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 300 + Math.random() * 2200;
    this.speed = 0.15 + Math.random() * 0.4;
    this.animate();
    this.animateWalking();
  }

  animateWalking() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 120);
  }
}
