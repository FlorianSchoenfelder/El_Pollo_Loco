class StatusBarHealth extends DrawableObject {
  percentage = 100;

  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  /**
   * Creates an instance of the HealthContainer class and initializes it with images and dimensions.
   *
   * @constructor
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.setPercentages(100);
    this.x = 20;
    this.y = 10;
    this.width = 200;
    this.height = 55;
  }

  /**
   * Sets the percentage and updates the image of the health indicator based on the percentage value.
   * @param {number} percentage - The percentage value to set (0 to 100).
   */
  setPercentages(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the image index based on the current percentage value for the health indicator.
   * @returns {number} The index of the image in IMAGES_HEALTH array based on percentage categories:
   * - 100: Index 5
   * - 80-99: Index 4
   * - 60-79: Index 3
   * - 40-59: Index 2
   * - 20-39: Index 1
   * - 0-19: Index 0
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 79) {
      return 4;
    } else if (this.percentage > 59) {
      return 3;
    } else if (this.percentage > 39) {
      return 2;
    } else if (this.percentage > 19) {
      return 1;
    } else {
      return 0;
    }
  }
}
