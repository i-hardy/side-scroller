function PreciousObject(x, y) {
  this.x = x;
  this.y = y;
  this.onFloor = false;
  this.preciousness = randomNumberGenerator(1, 5);
  this.createBody();
}

PreciousObject.prototype.getPreciousness = function () {
  return this.preciousness;
};

PreciousObject.prototype.getBody = function () {
  return this.body;
};

PreciousObject.prototype.createBody = function () {
  this.body = Matter.Bodies.rectangle(this.x, this.y, worldOptions.objectSize, worldOptions.objectSize, {label: 'object'});
};

PreciousObject.prototype.fallen = function () {
  this.onFloor = true;
};

PreciousObject.prototype.isOnFloor = function () {
  return this.onFloor;
};
