class Character extends MoveableObject {
  height = 250;
  width = 100;
  y = 190;
  speed = 10;
  world;
  walking = new Audio('audio/walking.mp3');

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
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
        
      }
    }, 100);
  }

  jump() {}
}
