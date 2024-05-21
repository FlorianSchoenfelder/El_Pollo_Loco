class Chicken extends MoveableObject {
    height = 60;
    y = 375;
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 150 + Math.random() * 500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.2;
        }, 1000 / 120);
    }
}