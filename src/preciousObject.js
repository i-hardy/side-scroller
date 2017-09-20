'use strict';

function PreciousObject(x, y, type) {
  this.x = x;
  this.y = y;
  this.collided = false;
  this.type = type;
  this.preciousness = this.type === 'cactus' ? randomNumberGenerator(-5, -1) : randomNumberGenerator(1, 5);
  this.createBody();
}

PreciousObject.prototype.getPreciousness = function () {
  return this.preciousness;
};

PreciousObject.prototype.getBody = function () {
  return this.body;
};

PreciousObject.prototype.getType = function () {
  return this.type;
};

PreciousObject.prototype.createBody = function () {
  this.body = Matter.Bodies.rectangle(this.x, this.y, worldOptions[this.type], worldOptions[this.type], {label: this.type});
};

PreciousObject.prototype.collision = function () {
  this.collided = true;
};

PreciousObject.prototype.hasCollided = function () {
  return this.collided;
};
