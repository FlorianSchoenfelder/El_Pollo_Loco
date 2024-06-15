class Character extends MoveableObject {
  height = 250;
  width = 100;
  y = 190;
  speed = 6;
  world;
  idleStartTime = null; // Variable to store the time when the condition first becomes true
  deadAnimationPlayed = false;
  now;

  animationInterval;
  movingInterval;

  walking_sound = new Audio("audio/walking.mp3");
  snoring_sound = new Audio("audio/snoring.mp3");
  jumping_sound = new Audio("audio/jump.mp3");
  hurt_sound = new Audio("audio/hurt.mp3");

  offset = {
    top: 100,
    left: 15,
    right: 30,
    bottom: 10,
  };

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD_ANIMATION = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_DEAD_LAST = ["img/2_character_pepe/5_dead/D-57.png"];

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD_ANIMATION);
    this.loadImages(this.IMAGES_DEAD_LAST);
    this.applyGravity();
    this.animate();
  }

  animate() {
    this.movingInterval = setInterval(() => this.moveCharacter(), 1000 / 60);
    this.animationInterval = setInterval(() => this.playCharacter(), 150);
  }

  moveCharacter() {
    this.walking_sound.pause();
    if (this.canMoveRight() && this.isBeforeEndboss()) {
      this.moveRight();
    }
    if (this.canMoveLeft()) {
      this.moveLeft();
    }
    if (this.canJump()) {
      this.jump();
    }
    this.world.camera_x = -this.x + 100;
  }

  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x <= this.world.level.level_end_x;
  }

  isBeforeEndboss() {
    return this.world.keyboard.RIGHT && this.x <= this.world.level.endboss[0].x;
  }

  moveRight() {
    if (this.isEndbossDead()) {
      super.moveRight(); // Nach rechts laufen und Bild normal
      this.otherDirection = false;
    }
    if (!muted) {
      this.walking_sound.play(); // Sound vom laufen abspielen
    }
    this.snoring_sound.pause();
  }

  isEndbossDead() {
    return !this.world.level.endboss[0].deadAnimationPlayed;
  }

  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  moveLeft() {
    if (this.isEndbossDead()) {
      super.moveLeft(); // Nach links laufen und Bild gedreht
      this.otherDirection = true;
    }
    if (!muted) {
      this.walking_sound.play(); // Sound vom laufen abspielen
    }
    this.snoring_sound.pause();
  }

  canJump() {
    return (
      (this.world.keyboard.UP && !this.isAboveGround()) ||
      (this.world.keyboard.SPACE && !this.isAboveGround())
    );
  }

  jump() {
    if (this.isEndbossDead()) {
      super.jump();
    }
    if (!muted) {
      this.jumping_sound.play();
    }
  }

  playCharacter() {
    if (this.isHurt()) {
      this.getHurt();
    } else if (this.isDead()) {
      this.playDeadSequence();
    } else if (this.isAboveGround()) {
      this.playJumping();
    } else if (this.isMoving()) {
      this.playMoving();
    } else if (!this.isMoving()) {
      this.playIdle();
    }
  }

  getHurt() {
    this.playAnimation(this.IMAGES_HURT);
    if (!muted) {
      this.hurt_sound.play();
    }
  }

  playDeadSequence() {
    if (!this.deadAnimationPlayed) {
      this.playAnimation(this.IMAGES_DEAD_ANIMATION);
      this.deadAnimationPlayed = true;
    } else {
      this.playAnimation(this.IMAGES_DEAD_LAST);
      setTimeout(() => {
        playGameOverScreen();
        this.world = null;
      }, 500);
    }
  }

  playJumping() {
    this.playAnimation(this.IMAGES_JUMPING);
    this.idleStartTime = null; // Zurücksetzen des Timer für Idling des Charakter
    this.snoring_sound.pause();
  }

  isMoving() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  playMoving() {
    this.idleStartTime = null; // Zurücksetzen des Timer für Idling des Charakter
    this.playAnimation(this.IMAGES_WALKING);
  }

  playIdle() {
    this.now = Date.now();
    if (this.idleStartTime === null) {
      this.idleStartTime = this.now;
    }
    const idleDuration = this.now - this.idleStartTime;
    if (idleDuration >= 6000) {
      this.playSnoring();
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  playSnoring() {
    this.playAnimation(this.IMAGES_LONG_IDLE);
    if (!muted) {
      this.snoring_sound.play();
    }
  }
}
