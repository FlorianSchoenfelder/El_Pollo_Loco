class Coin extends MoveableObject {
  // y = 355;

  coinCollecting_sound = new Audio("audio/coinCollected.mp3");

  offset = {
    top: 70,
    left: 20,
    right: 40,
    bottom: 35,
  };

  IMAGES_WALKING = [
    "img/8_coin/coin_1.png",
    "img/8_coin/coin_2.png",
    "img/8_coin/coin_1.png",
    "img/8_coin/coin_2.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 350 + Math.random() * 1900;
    this.y = 70 + Math.random() * 180;
    this.animateCoin();
  }

  animateCoin() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 750);
  }

  collectCoinSound() {
    if (!muted) {
      this.coinCollecting_sound.play();
    }
  }
}
