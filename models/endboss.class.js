class Endboss extends MoveableObject {
  height = 360;
  width = 190;
  y = 100;
  speed = 5;
  endbossHurtInterval;
  angryBossInterval;
  walkingInterval;
  checkforCharacterPositionIntertval;
  deadAnimationPlayed = false;
  attackAnimationPlayed = false;

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

  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ]

  IMAGES_DEAD_ANIMATION = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ]

  IMAGES_DEAD_LAST = [
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ]

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD_ANIMATION);
    this.loadImages(this.IMAGES_DEAD_LAST);
    this.loadImages(this.IMAGES_ATTACK);
    this.x = 2900;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.isEndbossDead()) {
        this.endbossDead();
        console.log('DEAD');
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        console.log('HURT');
      } else if (this.calculatedDistance() <= 580) {
        this.endbossWalk();
      } else if(!this.isHurt() && this.endbossDetectedPepe == false) {
        this.playAnimation(this.IMAGES_ALERT);
      }
    }, 200);
  }

  calculatedDistance() {
    let distance = this.x - world.character.x;
    return distance;
  }

  endbossDead() {
    if (!this.deadAnimationPlayed) {
      this.playAnimation(this.IMAGES_DEAD_ANIMATION);
      setTimeout(() => {
      this.deadAnimationPlayed = true;
        
      }, 1000);
    } else {
      this.playAnimation(this.IMAGES_DEAD_LAST);
      setTimeout(() => {
        playEndScreen();
      }, 1500);
    }
  }

  attack() {
    if (!this.attackAnimationPlayed) {
      this.playAnimation(this.IMAGES_ATTACK);
      setTimeout(() => {
      this.attackAnimationPlayed = false;
        
      }, 1000);
    }
  }

  animateWalking() {
      this.playAnimation(this.IMAGES_WALKING);
  }

  endbossWalk() {
    this.endbossDetectedPepe = true;
    this.moveLeft();
    this.animateWalking();

  }
}
