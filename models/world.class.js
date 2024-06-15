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
  deadEnemys = false;
  throwingButtonPressed = false;
  pepeJumpedOnChicken = false;
  bottleCollisionWithEndboss = false;
  throwableObject = [];

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
      this.checkBottleCollisionWithEnemy();
      this.endbossAttack();
      this.muteAll();
      this.unmuteAll();
    }, 50);
  }

  checkThrowObject() {
    if (this.statusBarBottleNotEmpty()) {
      if (this.isthrowingButtonPressed()) {
        this.setThrowableObject();
        this.updateStatusbar();
        this.removeBottleFromCharacter();
      }
    }
  }

  statusBarBottleNotEmpty() {
    return this.statusBarBottle.percentage >= 19;
  }

  isthrowingButtonPressed() {
    return this.keyboard.B && this.throwingButtonPressed == false;
  }

  

  setThrowableObject() {
    this.throwingButtonPressed = true;
    let bottle = new ThrowableObject(
      this.character.x + 60,
      this.character.y + 73
    );
    this.throwableObject.push(bottle);
  }

  updateStatusbar() {
    let statusbar = this.statusBarBottle.percentage;
    statusbar -= 20;
    this.statusBarBottle.setPercentages(statusbar);
  }

  removeBottleFromCharacter() {
    this.character.removeBottle();
    this.character.idleStartTime = null;
    this.character.snoring_sound.pause();
  }

  checkcollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.isCharacterCollidingWithEnemyOnGround(enemy)) {
        this.characterGetDamage();
      }
    });
  }

  isCharacterCollidingWithEnemyOnGround(enemy) {
    return (
      this.character.isColliding(enemy) &&
      !this.character.isAboveGround() &&
      this.deadEnemys == false
    );
  }

  characterGetDamage() {
    this.pepeJumpedOnChicken = true;
    this.character.hit("character");
    this.statusBarHealth.setPercentages(this.character.energy);
    this.pepeJumpedOnChicken = false;
  }

  checkcollisionsFromTop() {
    this.level.enemies = this.level.enemies.filter((enemy) => {
      if (this.isCharacterJumpOnEnemy(enemy)) {
        this.enemyDyingProcess(enemy);
      }
      return true; // Behalte den enemy im Array
    });
  }

  isCharacterJumpOnEnemy(enemy) {
    return (
      this.character.isColliding(enemy) &&
      this.character.isAboveGround() &&
      this.character.speedY < 15
    );
  }

  enemyDyingProcess(enemy) {
    enemy.chickenDead(); // Diese Funktion wird aufgerufen, wenn die Bedingungen erfüllt sind
    this.deadEnemys = true;
    this.enemiesToRemove.push(enemy); // Füge den enemy zur Liste der zu entfernenden enemies hinzu
    this.removeEnemyAfterShortTime(); // Entferne den enemy aus dem Array (vorerst)
  }

  removeEnemyAfterShortTime() {
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
      if (this.isCharacterCollectingCoin(coin)) {
        this.characterCollectCoin(coin, index);
      }
    });
  }

  isCharacterCollectingCoin(coin) {
    return this.character.isColliding(coin);
  }

  characterCollectCoin(coin, index) {
    coin.collectCoinSound();
    this.character.collectCoin();
    this.statusBarCoin.setPercentages(this.character.coins);
    this.level.coins.splice(index, 1);
  }

  checkCollactableBottle() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.isCharacterCollectingBottle(bottle)) {
        if (this.isStatusBarBottleFull()) {
          bottle.noCollectAwailable();
        } else if (!this.isStatusBarBottleFull()) {
          this.characterCollectBotle(bottle, index);
        }
      }
    });
  }

   isCharacterCollectingBottle(bottle) {
    return this.character.isColliding(bottle);
  }

  characterCollectBotle(bottle, index) {
    bottle.collectBottleSound();
    this.character.collectBottle();
    this.statusBarBottle.setPercentages(this.character.bottles);
    this.level.bottles.splice(index, 1);
  }

  isStatusBarBottleFull() {
    return this.statusBarBottle.percentage == 100;
  }

 

  checkBottleCollisionWithEndboss() {
    this.throwableObject.forEach((bottle, index) => {
      if (this.isBottleCollidingEndboss(bottle)) {
        this.updateEndbossHealth(bottle, index);
        this.updateSpeedOfEndboss();
      }
    });
  }

  isBottleCollidingEndboss(bottle) {
    return (
      bottle.isColliding(this.level.endboss[0]) &&
      !this.bottleCollisionWithEndboss == true
    );
  }

  updateEndbossHealth(bottle, index) {
    this.bottleCollisionWithEndboss = true;
    bottle.splash();
    this.level.endboss[0].hit("endboss");
    this.statusBarEndboss.setPercentages(this.level.endboss[0].endbossEnergy);
    this.level.bottles.splice(index, 1);
  }

  updateSpeedOfEndboss() {
    this.level.endboss[0].speed += 5;
  }

  endbossAttack() {
    if (this.isCharacterCollidingWithEndboss()) {
      this.endbossAttackCharacter();
      this.updateCharacterHealth();
    } else {
      this.attackAnimationPlayed = false;
    }
  }

  endbossAttackCharacter() {
    this.level.endboss[0].attack();
  }

  updateCharacterHealth() {
    this.character.hit("character");
    this.statusBarHealth.setPercentages(this.character.energy);
  }

  isCharacterCollidingWithEndboss() {
    return this.character.isColliding(this.level.endboss[0]);
  }

  checkBottleCollisionWithEnemy() {
    this.throwableObject.forEach((bottle, index) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          this.enemyDyingProcess(enemy);
        }
      });
    });
    
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
      if (
        muted == false &&
        lastEdited == document.getElementById("gamescreen")
      ) {
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
    // mo.drawFrame(this.ctx); // Bilderrahmen zeichnen
    // mo.drawOffsetFrame(this.ctx);

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
