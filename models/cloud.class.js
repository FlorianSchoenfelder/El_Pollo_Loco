class Cloud extends MoveableObject {
    y = 15;
    width = 575;
    height = 250;
    speed = 0.1;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x =-440 + Math.random() * 2440;
        this.animate();
    }

    animate() {
        setInterval(() => {
        this.moveLeft();
            
        }, 1000 / 30);
    }
}