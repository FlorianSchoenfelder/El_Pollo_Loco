class MoveableObject extends DrawableObject {
  
  speed = 0.2;
  speedY = 0;
  acceleration = 1;
  otherDirection = false;
  energy = 100;

  lastHit = 0;

  

  

  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.75;
  }

  isDead() {
    return this.energy == 0;
  }

  // isColliding(obj) { // Bessere Formel für später
  //   return (
  //     this.x + this.width >= obj.x &&
  //     this.x <= obj.x + obj.width &&
  //     this.y + this.offsety + this.height >= obj.y &&
  //     this.y + this.offsety <= obj.y + obj.height &&
  //     obj.onCollisionCourse
  //   ); // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
  // }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 60);
  }

  isAboveGround() {
    return this.y <= 189;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // Modulo Operator vergleicht 0 mit 5 (0/5 = 0, rest 5. Am Ende wird es 1 und zählt von vorne).
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    this.speedY = 20;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }
}
