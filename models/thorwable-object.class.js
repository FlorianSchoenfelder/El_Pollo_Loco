class ThrowableObject extends MoveableObject {
  throwableObject;
  releaseGravityIntrerval;

  cracking_sound = new Audio("audio/bottleCracked.mp3");

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  IMAGES_ROTATE = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ]

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_SPLASH);
    this.loadImages(this.IMAGES_ROTATE);
    this.x = x;
    this.y = y;
    this.height = 70;
    this.throw();
    this.rotateBottle();
  }

  throw() {
    this.speedY = 16;
    this.applyGravity();
    this.throwableObject = setInterval(() => {
      this.rotateBottle();
      this.x += 18;
    }, 30);
    
    this.releaseGravity();
  }

  rotateBottle() {

      // setInterval(() => {
    this.playAnimation(this.IMAGES_ROTATE)
        
      // }, 50);
    }


  releaseGravity() {
    this.releaseGravityIntrerval = setInterval(() => {
      if (this.y >= 360) {
        this.y = 365;
        this.speedY = 0;
        clearInterval(this.throwableObject);

        this.splash();
      }
    }, 25);
  }

  splash() {
    clearInterval(this.throwableObject);

    this.speedY = 0;
    clearInterval(this.releaseGravityIntrerval);
    clearInterval(this.applyGravityInterval);
    this.playAnimation(this.IMAGES_SPLASH);
    if (!muted) {
    this.cracking_sound.play();      
    }
    console.log(this.y);
    setTimeout(() => {
      world.throwableObject.splice(0, 1);
      world.bottleCollisionWithEndboss = false;
    }, 225);
  }
}
