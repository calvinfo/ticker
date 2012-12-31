

module.exports = Flap;


function Flap (options) {
  this.front = new Image();
  this.front.src = options.front;
  this.back  = new Image();
  this.back.src = options.back;
  this.angle = 0;
  this.x = 0;
  this.y = 0;
  this.width = 63;
  this.height = 90;
}


Flap.prototype.draw = function (ctx) {

  if (this.angle === Math.PI / 2)
    return;

  ctx.save();
  var showFront = this.angle < Math.PI / 2;
  var scale   = Math.abs(Math.cos(this.angle));
  var x = 0
    , img = showFront ? this.front : this.back
    , y;

  if (showFront) {
    y   = this.height / 2 * (1 - scale);
  } else {
    y   = this.height / 2;
  }

  ctx.drawImage(img, x, y, img.width, img.height * scale);
  ctx.restore();
  return this;
};