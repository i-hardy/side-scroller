'use strict';

function Score() {
  this.points = 0;
  this.END_BONUS = 100;
}

Score.prototype.showPoints = function () {
  return this.points;
};

Score.prototype.increase = function (points) {
  this.points = points;
};

Score.prototype.endBonus = function () {
  this.points += this.END_BONUS;
};
