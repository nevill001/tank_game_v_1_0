export class Block {
  constructor(x, y, context, scale) {
    this.x = x;
    this.y = y;
    this.context = context;
    this.scale = scale;
    this.radius = this.scale / 2;
  }
  draw() {
    this.context.strokeStyle = "#808080";
    this.context.beginPath();
    this.context.roundRect(
      (this.x - 0.5) * this.scale + 1,
      (this.y - 0.5) * this.scale + 1,
      this.scale - 2,
      this.scale - 2,
      2
    );
    this.context.fillStyle = "#A9A9A9";
    this.context.fill();
    this.context.stroke();
  }
}
