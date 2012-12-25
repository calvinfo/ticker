

var Flap = require('./flap');

module.exports = FlipNumber;

var testflaps = [
  new Flap({ front : 'img/7-top.jpg'
           , back  : 'img/8-bottom.jpg'}),
  new Flap({ front : 'img/8-top.jpg'
           , back  : 'img/7-bottom.jpg'}),
  new Flap({ front : 'img/7-top.jpg'
           , back  : 'img/8-bottom.jpg'}),
  new Flap({ front : 'img/8-top.jpg'
           , back  : 'img/7-bottom.jpg'}),
  new Flap({ front : 'img/7-top.jpg'
           , back  : 'img/8-bottom.jpg'}),
  new Flap({ front : 'img/8-top.jpg'
           , back  : 'img/7-bottom.jpg'}),
  new Flap({ front : 'img/7-top.jpg'
           , back  : 'img/8-bottom.jpg'}),
  new Flap({ front : 'img/8-top.jpg'
           , back  : 'img/7-bottom.jpg'}),
  new Flap({ front : 'img/7-top.jpg'
           , back  : 'img/8-bottom.jpg'}),
  new Flap({ front : 'img/8-top.jpg'
           , back  : 'img/7-bottom.jpg'})
];


function FlipNumber (ctx) {
  this.ctx = ctx;
  this.number = 0;
  this.width = 50;
  this.height = 100;
  this.x = 30;
  this.y = 30;
  this.flaps = testflaps;
  this.flaps[this.flaps.length - 1].angle = Math.PI;
}


FlipNumber.prototype.advance = function (amount) {

  var self      = this
    , ctx       = this.ctx
    , iteration = 0;

  amount = amount || 1;
  self.prevFlap().angle = 0;

  var interval = setInterval(function () {

    for (var i = 0; i < amount; i++) {
      if (i < iteration) {
        self.flapAt(i).angle += Math.PI / 8;
      }
    }

    self.draw(ctx);

    if (self.flapAt(0).angle === Math.PI)
      onFinish();

    iteration += 1;
  }, 30);

  var onFinish = function () {
    self.number = (self.number + 1) % self.flaps.length;
    clearInterval(interval);
  };
};

FlipNumber.prototype.draw = function () {

  var ctx = this.ctx;

  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.clearRect(this.width, this.height);
  this.prevFlap().draw(ctx);
  this.nextFlap().draw(ctx);
  this.currentFlap().draw(ctx);
  ctx.restore();
  return this;
};


FlipNumber.prototype.flapAt = function (offset) {

  var index = (this.number + offset + this.flaps.length) % this.flaps.length;
  return this.flaps[index];
};


FlipNumber.prototype.currentFlap = function () {

  return this.flapAt(0);
};


FlipNumber.prototype.nextFlap = function () {
  return this.flapAt(1);
};


FlipNumber.prototype.prevFlap = function () {
  return this.flapAt(-1);
};