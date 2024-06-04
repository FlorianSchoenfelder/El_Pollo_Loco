class ThorwableObject extends MoveableObject {


  throwingInterval;

  cracking_sound = new Audio('audio/bottleCracked.mp3');


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
    this.throwingInterval = setInterval(() => {
      this.x += 18;
    }, 25);
  }

  splash() {
      if (this.y == 365) {
      this.playAnimation(this.IMAGES_SPLASH);
      this.cracking_sound.play();
      console.log(this.y);
      setTimeout(() => {
        world.thorwableObject.splice(0, 1);
      }, 500);
    }    
  }

  
}
