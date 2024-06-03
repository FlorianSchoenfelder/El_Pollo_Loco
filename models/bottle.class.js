class Bottle extends MoveableObject {

    height = 70;
    y = 365;
    bottleCollecting_sound = new Audio("audio/bollteCollected.mp3");


    offset = {
        top: 10,
        left: 20,
        right: 30,
        bottom: 0,
      };

    IMAGES_Bottle_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];
    
        constructor() {
            super().loadImage(this.IMAGES_Bottle_GROUND[0]);
            this.loadImages(this.IMAGES_Bottle_GROUND);
            this.x = 250 +Math.random() * 1900;
            this.animateBottle();
        }
    
        animateBottle() {
            setInterval(() => {
                this.playAnimation(this.IMAGES_Bottle_GROUND);
            }, 1200);
        }

        collectBottleSound() {
            this.bottleCollecting_sound.play();
          }
}