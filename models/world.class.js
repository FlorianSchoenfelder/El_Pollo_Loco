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
  
  enemiesToRemove = [];
  deadEnemys= false;
  bottleNotCollected = false;
  throwingButtonPressed = false;
  pepeJumpedOnChicken = false;
  bottleCollisionWithEndboss = false;
  throwableObject = [];

  gamePaused = false;
  intervalIds = [];

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
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.level.endboss);

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
      this.checkBottleCollisionWithEndboss();
      this.endbossAttack();
      this.muteAll();
      this.unmuteAll();
    }, 50);
  }

  
  checkThrowObject() {
    if (this.statusBarBottle.percentage >= 19) {
      if (this.keyboard.B && this.throwingButtonPressed == false) {

      this.throwingButtonPressed = true;
      let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 73);
      this.throwableObject.push(bottle);

      
      let statusbar = this.statusBarBottle.percentage;
      statusbar -= 20;
      this.statusBarBottle.setPercentages(statusbar);
      this.character.removeBottle();


      this.character.idleStartTime = null;
      this.character.snoring_sound.pause();
      setTimeout(() => {
        this.throwingButtonPressed = false;
      }, 1500);
      }
    }
    
  }


  checkcollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isAboveGround() && this.deadEnemys == false) {
            this.pepeJumpedOnChicken = true;
            this.character.hit('character');
            this.statusBarHealth.setPercentages(this.character.energy);
            this.pepeJumpedOnChicken = false;
      }
    });
  }

 // Erstelle ein neues Array, um enemies zu speichern, die entfernt werden sollen
 
  
  checkcollisionsFromTop() {
   
  
    // Filtere die enemies, um nur diejenigen zu behalten, die nicht kollidieren oder die anderen Bedingungen nicht erfüllen
    this.level.enemies = this.level.enemies.filter((enemy) => {
      if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 15) {
        enemy.chickenDead(); // Diese Funktion wird aufgerufen, wenn die Bedingungen erfüllt sind
        this.deadEnemys = true;
        this.enemiesToRemove.push(enemy); // Füge den enemy zur Liste der zu entfernenden enemies hinzu
        this.returnLong(); // Entferne den enemy aus dem Array (vorerst)
      }
      return true; // Behalte den enemy im Array
    });
  }
    
returnLong() {
  // Entferne die enemies nach 0,5 Sekunden aus dem Array
  setTimeout(() => {
    this.enemiesToRemove.forEach((enemy) => {
      const index = this.level.enemies.indexOf(enemy);
      if (index !== -1) {
        this.level.enemies.splice(index, 1);
      }
    });
    this.deadEnemys = false;
    return false;
  }, 250);
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
      if (this.character.isColliding(bottle)) {
        if (this.statusBarBottle.percentage == 100) {
          bottle.noCollectAwailable();
        } else if (this.statusBarBottle.percentage <= 100) {
          bottle.collectBottleSound();
        this.character.collectBottle();
        this.statusBarBottle.setPercentages(this.character.bottles);
        setTimeout(() => {
          this.level.bottles.splice(index, 1);
        }, 10);
        }
        
      }
    });
  }

  checkBottleCollisionWithEndboss() {
    this.throwableObject.forEach((bottle, index) => {
      if (bottle.isColliding(this.level.endboss[0]) && !this.bottleCollisionWithEndboss == true ) {
        this.bottleCollisionWithEndboss = true
          bottle.splash();
          this.level.endboss[0].hit('endboss');
          this.statusBarEndboss.setPercentages(this.level.endboss[0].endbossEnergy);
          this.level.bottles.splice(index, 1);
      }
    });
  }

  endbossAttack() {
    if (this.character.isColliding(this.level.endboss[0])) {
      console.log('collision with endboss');
        this.level.endboss[0].attack();
        this.character.hit('character');
        this.statusBarHealth.setPercentages(this.character.energy);
    }else {
      this.attackAnimationPlayed = false;
    }
  }

  muteAll() {
    setInterval(() => {
      if (muted == true) {
      this.character.snoring_sound.pause();
      background_sound.pause();
      background_sound.currentTime = 0;
      this.character.snoring_sound.currentTime = 0;
    }
    }, 500); 
  }

  unmuteAll() {
    setInterval(() => {
      if (muted == false && lastEdited == document.getElementById('gamescreen')) {
        background_sound.play();
        background_sound.volume = 0.4;
      }
    }, 1800);
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
