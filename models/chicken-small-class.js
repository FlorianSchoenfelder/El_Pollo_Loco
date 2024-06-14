class ChickenSmall extends MoveableObject {
    height = 45;
    width = 45;
    y = 385;

    chickenDead_sound = new Audio("audio/chickenDead.mp3");

IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
]

IMAGES_DEAD = [
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
]

offset = {
    top: 0,
    left: 5,
    right: 5,
    bottom: 0,
} 

constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 600 + Math.random() * 1900;
    this.speed = 0.1 + Math.random() * 0.2;
    this.animate();
    this.animateWalking();
  }

  animateWalking() {
    this.walkingImagesInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }

  animate() {
    this.walkingInterval = setInterval(() => {
      this.moveLeft();
    }, 1000 / 120);
  }

  chickenDead() {
    this.playAnimation(this.IMAGES_DEAD);
    clearInterval(this.walkingImagesInterval);
    clearInterval(this.walkingInterval);
    if (!muted) {
      this.chickenDead_sound.play();
    }
    
  }

}