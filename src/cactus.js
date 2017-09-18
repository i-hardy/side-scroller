function Cactus(x, y) {
  this.x = x;
  this.y = y;
  this.touched = false;
  this.spikiness = randomNumberGenerator(1, 5);
  this.createBody();
}

Cactus.prototype.getSpikiness = function () {
  return this.spikiness;
};

Cactus.prototype.hasBeenTouched = function () {
  return this.touched;
};

Cactus.prototype.playerTouch = function () {
  this.touched = true;
};

Cactus.prototype.createBody = function () {
  this.body = Matter.Bodies.rectangle(this.x, this.y, worldOptions.objectSize - 10, worldOptions.objectSize - 10, {label: 'cactus'});
};

Cactus.prototype.getBody = function () {
  return this.body;
};
