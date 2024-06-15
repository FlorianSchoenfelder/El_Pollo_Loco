class DrawableObject {
  x = 80;
  y = 315;
  img;
  width = 70;
  height = 120;
  imageCache = {};
  currentImage = 0;





  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src>
    this.img.src = path;
  }

  loadImages(arr) { // - ['img/image1.png', 'img/image2.png', ...]
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

//   drawFrame(ctx) {
//     if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof Bottle || this instanceof Endboss) {
//       // Zeichnet nur die Rahmen von Charakter oder Chicken
//       ctx.beginPath();
//       ctx.lineWidth = "3";
//       ctx.strokeStyle = "blue";
//       ctx.rect(this.x, this.y, this.width, this.height);
//       ctx.stroke();
//     }
//   }

//   drawOffsetFrame(ctx) {
//     if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof Bottle || this instanceof Endboss) {
//         ctx.beginPath();
//         ctx.lineWidth = '2';
//         ctx.strokeStyle = 'red';
//         ctx.rect(this.x + this.offset.left, this.y + this.offset.top - this.offset.bottom, this.width - this.offset.right, this.height - this.offset.top);
//         ctx.stroke();
//     }
// }
}
