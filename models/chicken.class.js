class Chicken extends MoveableObject {
    height = 60;
    y = 375;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    currentImage = 0;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 150 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.4;
        this.animate();
        this.animateWalking();
    }

    animateWalking() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; // Modulo Operator vergleicht 0 mit 5 (0/5 = 0, rest 5. Am Ende wird es 1 und zählt von vorne).
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (this.currentImage == 5) {
                this.currentImage = 0;
            }
        }, 200);
    }

    animate() {
        this.moveLeft();
    }
}