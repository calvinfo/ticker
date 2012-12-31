

var Flap       = require('./flap')
  , select     = require('select')
  , each       = require('each');

module.exports = FlipNumber;

var testflaps = [
  new Flap({ front : 'img/0-top.jpg'
           , back  : 'img/1-bottom.jpg'}),
  new Flap({ front : 'img/1-top.jpg'
           , back  : 'img/2-bottom.jpg'}),
  new Flap({ front : 'img/2-top.jpg'
           , back  : 'img/3-bottom.jpg'}),
  new Flap({ front : 'img/3-top.jpg'
           , back  : 'img/4-bottom.jpg'}),
  new Flap({ front : 'img/4-top.jpg'
           , back  : 'img/5-bottom.jpg'}),
  new Flap({ front : 'img/5-top.jpg'
           , back  : 'img/6-bottom.jpg'}),
  new Flap({ front : 'img/6-top.jpg'
           , back  : 'img/7-bottom.jpg'}),
  new Flap({ front : 'img/7-top.jpg'
           , back  : 'img/8-bottom.jpg'}),
  new Flap({ front : 'img/8-top.jpg'
           , back  : 'img/9-bottom.jpg'}),
  new Flap({ front : 'img/9-top.jpg'
           , back  : 'img/0-bottom.jpg'})
];


function FlipNumber (ctx) {
  this.ctx = ctx;
  this.number = 0;
  this.width = 45;
  this.height = 90;
  this.x = 30;
  this.y = 30;
  this.flaps = testflaps;
  this.flaps[this.flaps.length - 1].angle = Math.PI;
}


FlipNumber.prototype.advance = function (amount) {

  this.advancing = true;

  var self          = this
    , ctx           = this.ctx
    , iteration     = 0
    , numIterations = 8
    , incr          = Math.PI / numIterations;

  amount = amount || 1;

  var interval = setInterval(function () {

    for (var i = 0; i < amount; i++) {
      if (i < iteration && self.flapAt(-i).angle < Math.PI) {
        self.flapAt(-i).angle += incr;
      }
    }

    self.draw(ctx);

    if (self.flapAt(-(amount - 1)).angle === Math.PI)
      onFinish();

    iteration += 1;
  }, 30);

  var onFinish = function () {

    var down = select(self.flaps, function (flap) {
      return flap.angle === Math.PI;
    });

    var bottom = self.bottomFlap();

    for(var i = 0; i < down.length; i++) {
      if (bottom !== down[i])
        down[i].angle = 0;
    }

    self.number = (self.number + amount) % self.flaps.length;
    console.log(self.number);
    clearInterval(interval);
  };
};

FlipNumber.prototype.draw = function () {

  var ctx = this.ctx;

  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.clearRect(this.width, this.height);
  this.topFlap().draw(ctx);
  this.bottomFlap().draw(ctx);
  this.drawFlaps();

  ctx.restore();
  return this;
};


FlipNumber.prototype.drawFlaps = function () {

  var self = this;

  var flipping = select(this.flaps, function (flap) {
    return Math.sin(flap.angle) !== 0;
  });

  flipping.sort(function (flapA, flapB) {

    var sinA = Math.sin(flapA.angle)
      , sinB = Math.sin(flapB.angle);

    if (sinA < sinB) {
      return -1;
    } else if (sinA > sinB) {
      return 1;
    } else {
      return 0;
    }
  });

  for (var i = 0; i < flipping.length; i++) {
    flipping[i].draw(this.ctx);
  }
};


FlipNumber.prototype.bottomFlap = function () {
  for (var i = 0; i < this.flaps.length; i++) {
    var current = this.flaps[i]
      , next    = this.flaps[(i + 1) % this.flaps.length];

    if (current.angle === Math.PI && next.angle !== Math.PI) {
      return current;
    }
  }
  return this.flaps[0];
};


FlipNumber.prototype.topFlap = function () {

  for (var i = this.flaps.length - 1; i >= 0; i--) {
    var current = this.flaps[i]
      , prev    = this.flaps[(i - 1 + this.flaps.length) % this.flaps.length];

    if (current.angle === 0 && prev.angle !== 0) {
      return current;
    }
  }

  return this.flaps[this.flaps.length - 1];
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