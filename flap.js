
var Flip = require('./flip');


module.exports = Flap;

// Testing stuff.
var seven = {
  flip : new Flip({ front : 'img/7-top.jpg',
                    back  : 'img/8-bottom.jpg' })
, top    : 'img/8-top.jpg'
, bottom : 'img/7-bottom.jpg'
, number : 7
};

var eight = {
  flip : new Flip({ front : 'img/8-top.jpg',
                    back  : 'img/7-bottom.jpg' })
, top    : 'img/7-top.jpg'
, bottom : 'img/8-bottom.jpg'
, number : 8
};

function Flap () {
  this.number = 7;
  this.top = new Image();
  this.top.src = seven.top;
  this.bottom  = new Image();
  this.bottom.src = seven.bottom;
  this.flip  = seven.flip;
  this.angle = 0;
  this.x = 30;
  this.y = 30;
  this.width = 50;
  this.height = 100;
}


Flap.prototype.advance = function (ctx) {

  var self = this;

  var interval = setInterval(function () {

    self.angle += Math.PI / 16;
    self.draw(ctx);

    if (self.angle > Math.PI)
      onFinish();
  }, 50);

  var onFinish = function () {
    self.angle = 0;
    var nextNumber = self.number === 7 ?
                     eight :
                     seven;

    self.number = nextNumber.number;
    self.flip = nextNumber.flip;
    self.top.src = nextNumber.top;
    self.bottom.src = nextNumber.bottom;

    clearInterval(interval);
  };
};






Flap.prototype.draw = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.clearRect(this.width, this.height);
  this._drawBack(ctx);
  this._drawFlip(ctx);
  ctx.restore();
  return this;
};


Flap.prototype._drawFlip = function (ctx) {

  if (this.angle === Math.PI / 2)
    return;

  ctx.save();
  var topFlap = this.angle < Math.PI / 2;
  var scale   = Math.abs(Math.cos(this.angle));
  var x = 0
    , img = this.flip.getImage(this.angle)
    , y;

  if (topFlap) {
    y   = this.height / 2 * (1 - scale);
  } else {
    y   = this.height / 2;
  }

  ctx.drawImage(img, x, y, img.width, img.height * scale);
  ctx.restore();
  return this;
};


Flap.prototype._drawBack = function (ctx) {

  ctx.save();
  ctx.drawImage(this.top, 0, 0);
  ctx.drawImage(this.bottom, 0 , 50);
  ctx.restore();
  return this;
};


