class MoveableObject extends DrawableObject {
  speed = 0.2;
  speedY = 0;
  acceleration = 1;
  otherDirection = false;
  energy = 100;
  endbossEnergy = 100;
  coins = 0;
  bottles = 0;

  lastHit = 0;

  applyGravityInterval;


  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  collectCoin() {
    this.coins += 20;
    console.log(this.coins,"Coins");
  }

  collectBottle() {
    this.bottles += 20;
    console.log(this.bottles, 'Bottles');
  }

  removeBottle() {
    this.bottles -= 20;
  }

  hit(identification) {
    if (identification == 'endboss') {
      this.endbossEnergy -= 20;
      if (this.endbossEnergy <= 0) {
        this.endbossEnergy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
    } else if (identification == 'character') {
      this.energy -= 1;
        if (this.energy <= 0) {
          this.energy = 0;
        } else {
          this.lastHit = new Date().getTime();
        }
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  isEndbossDead() {
    return this.endbossEnergy == 0;
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  applyGravity() {
    this.applyGravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 60 );
  } 

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y <= 189;
    }
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

  moveEndbossLeft() {
    this.x -= this.speed;
  }
}
