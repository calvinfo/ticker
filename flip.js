

module.exports = Flip;

function Flip (options) {

  this.front = new Image();
  this.back  = new Image();

  this.front.src = options.front;
  this.back.src  = options.back;
}


Flip.prototype.getImage = function (angle) {

  return angle < Math.PI / 2 ?
         this.front :
         this.back;
};