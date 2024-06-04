class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  statusBarEndboss = new StatusBarEndboss();
  thorwableObject = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.addToMap(this.character);

    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.thorwableObject);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarEndboss);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  run() {
    setInterval(() => {
      this.checkcollisions();
      this.checkcollisionsFromTop();
      this.checkCollactableCoin();
      this.checkCollactableBottle();
      this.checkThrowObject();
      // this.checkcollisionWithEndboss();
    }, 50);
  }

  checkThrowObject() {
    if (this.statusBarBottle.percentage >= 19) {
      if (this.keyboard.B) {
      let bottle = new ThorwableObject(this.character.x + 60, this.character.y + 73);
      this.thorwableObject.push(bottle);
      let statusbar = this.statusBarBottle.percentage;
      statusbar -= 20;
      this.statusBarBottle.setPercentages(statusbar);
      this.character.removeBottle();
      }
    }
    
  }


  checkcollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
        // console.log("Collision detected");
        this.character.hit();
        this.statusBarHealth.setPercentages(this.character.energy);
      }
    });
  }

  checkcollisionsFromTop() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
        enemy.chickenDead();
        this.character.jump();
        setTimeout(() => {
          this.level.enemies.splice(index, 1);
        }, 600);      
      }
    });
  }

  checkCollactableCoin() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        coin.collectCoinSound();
        this.character.collectCoin();
        this.statusBarCoin.setPercentages(this.character.coins);
        setTimeout(() => {
          this.level.coins.splice(index, 1);
        }, 10);
      }
    });
  }

  checkCollactableBottle() {
    this.level.bottles.forEach((bottle, index) => {
      // debugger
      if (this.character.isColliding(bottle)) {
        bottle.collectBottleSound();
        this.character.collectBottle();
        this.statusBarBottle.setPercentages(this.character.bottles);
        setTimeout(() => {
          this.level.bottles.splice(index, 1);
        }, 10);
      }
    });
  }

  checkcollisionWithEndboss() {
    if (world.thorwableObject.isColliding()) {
      
    }
  }
  
  

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx); // Bilder allgemein zeichnen
    mo.drawFrame(this.ctx); // Bilderrahmen zeichnen
    mo.drawOffsetFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save(); // CTX = Sammlung an Funktionen um etwas zu unseren Canvas hinzufügen. Alle Eigenschaften werden gespeichert.
    this.ctx.translate(mo.width, 0); // Alles um 180deg drehen und im CTX anzeigen
    this.ctx.scale(-1, 1); // Verschiebung des Elements
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore(); // Gespeicherten ungespiegelten Eigenschaften/Inhalte laden
  }
}
