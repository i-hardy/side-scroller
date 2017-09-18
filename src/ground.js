'use strict';

function Ground () {
  this.ground = [];
}

Ground.prototype.setGround = function () {
  for (var i = 0; i < worldOptions.gridColumns; i++) {
    this.ground.push(randomNumberGenerator(1, 5));
  }
};

Ground.prototype.getGround = function () {
  return this.ground;
};
