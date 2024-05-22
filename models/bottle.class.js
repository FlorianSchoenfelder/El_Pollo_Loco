class Bottle extends MoveableObject {

    height = 70;
    y = 365;

    IMAGES_WALKING = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];
    
        constructor() {
            super().loadImage(this.IMAGES_WALKING[0]);
            this.loadImages(this.IMAGES_WALKING);
            this.x = 250 +Math.random() * 1900;
            this.animateCoin();
        }
    
        animateCoin() {
            setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING);
            }, 1200);
        }
}