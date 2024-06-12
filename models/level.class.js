class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    endboss
    level_end_x = 2800;

    constructor(enemies, endboss, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.endboss = endboss;
    }
}