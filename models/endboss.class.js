class Endboss extends MoveableObject {
  height = 360;
  width = 190;
  y = 100;
  speed = 5;
  endbossHurtInterval;
  angryBossInterval;
  walkingInterval;
  checkforCharacterPositionIntertval;

  offset = {
    top: 10,
    left: 20,
    right: 30,
    bottom: 0,
  };

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 2600;
    this.animateAlert();
    this.checkCharacterPositionToWalk();
  }

  animateAlert() {
    this.angryBossInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ALERT);
    }, 700);
  }

  animateWalking() {
    this.walkingImagesInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }

  checkCharacterPositionToWalk() {
    this.checkforCharacterPositionIntertval = setInterval(() => {
      if (world && world.character.x > 2012) {
        this.walk();
      }
    }, 100);
  }

  walk() {
    clearInterval(this.angryBossInterval);
    this.moveLeft();
    this.animateWalking();

  }

  endbossHurt() {
    this.playAnimation(this.IMAGES_HURT);
    setTimeout(() => {
      clearInterval(this.endbossHurtInterval);
    }, 1500);
  }
}
