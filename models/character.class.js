class Character extends MoveableObject {
  height = 250;
  width = 100;
  y = 190;
  speed = 10;
  world;
  idleStartTime = null; // Variable to store the time when the condition first becomes true

  walking = new Audio('audio/walking.mp3');

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  IMAGES_LONG_IDLE = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.animate();
  }

  animate() {

    setInterval(() => {
        this.walking.pause();
        if (this.world.keyboard.RIGHT && this.x <= this.world.level.level_end_x) {
            this.x += this.speed;
            this.otherDirection = false;
            this.walking.play();
        }
        if (this.world.keyboard.LEFT && this.x >0) {
            this.x -= this.speed;
            this.otherDirection = true;
            this.walking.play();
        }
        this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT == true) {
        this.playAnimation(this.IMAGES_WALKING);
        this.idleStartTime = null;
      }
      
    }, 100);


setInterval(() => {
  const now = Date.now();
  
  // Check if the condition is met
  if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT == false) {
    // If this is the first time the condition is met, record the time
    if (this.idleStartTime === null) {
      this.idleStartTime = now;
    }
    
    // Check how long the condition has been met
    const idleDuration = now - this.idleStartTime;
    
    if (idleDuration >= 10000) { // 10 deconds
      this.playAnimationLongIdle(this.IMAGES_LONG_IDLE);
    } else {
      this.playAnimationIdle(this.IMAGES_IDLE);
    }
  } else {
    // Reset the idleStartTime if the condition is not met
    this.sidleStartTime = null;
  }
  
}, 250);

  }

  jump() {}
}
