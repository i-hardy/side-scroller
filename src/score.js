function Score() {
  this.points = 0
  this.END_BONUS = 100;
}

Score.prototype.increase = function (points) {
  this.points += points;
};

Score.prototype.endBonus = function () {
  this.increase(this.END_BONUS);
};
