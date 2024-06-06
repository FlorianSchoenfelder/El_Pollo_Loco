class StatusBarEndboss extends DrawableObject {
  IMAGES_ENDBOSS = [
    "img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES_ENDBOSS);
    this.setPercentages(100);
    this.x = 500;
    this.y = 16;
    this.width = 200;
    this.height = 55;
  }

  setPercentages(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_ENDBOSS[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

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
