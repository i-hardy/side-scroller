function Score() {
  this.points = 0
}

Score.prototype.increase = function (points) {
  this.points += points
};
