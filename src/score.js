function Score() {
  this.points = 0
  this.END_BONUS = 100;
  this.preciousObject = new PreciousObject(150, 150)
}

Score.prototype.increase = function (points) {
  this.points += points;
};

Score.prototype.endBonus = function () {
  this.increase(this.END_BONUS);
};

Score.prototype.hitGroundScore = function () {
  if (this.preciousObject.isOnGround) {
    this.increase(this.preciousObject.preciousness);
  }
};
