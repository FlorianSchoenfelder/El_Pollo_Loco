class ThrowableObject extends MoveableObject {
  throwableObject;
  releaseGravityIntrerval;

  cracking_sound = new Audio("audio/bottleCracked.mp3");

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
  ];

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 70;
    this.throw();
  }

  throw() {
    this.speedY = 16;
    this.applyGravity();
    this.throwableObject = setInterval(() => {
      this.x += 18;
    }, 25);
    this.releaseGravity();
  }

  releaseGravity() {
    this.releaseGravityIntrerval = setInterval(() => {
      if (this.y >= 360) {
        this.y = 365;
        this.speedY = 0;
        this.splash();
      }
    }, 100);
  }

  splash() {
    clearInterval(this.releaseGravityIntrerval);
    clearInterval(this.throwableObject);
    clearInterval(this.applyGravityInterval);
    this.playAnimation(this.IMAGES_SPLASH);
    if (!muted) {
    this.cracking_sound.play();      
    }
    console.log(this.y);
    setTimeout(() => {
      world.throwableObject.splice(0, 1);
    }, 25);
  }
}
