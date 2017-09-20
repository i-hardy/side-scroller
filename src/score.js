'use strict';

function Score() {
  this.points = 0;
  this.END_BONUS = 100;
}

Score.prototype.showPoints = function () {
  return this.points + JSON.parse(sessionStorage.getItem('score'));
};

Score.prototype.increase = function (points) {
  this.points = points;
};

Score.prototype.endBonus = function (ratio) {
  this.destructionRatio = ratio;
  this.points += this.END_BONUS*ratio;
};

Score.prototype.calculateDestructionPercentage = function () {
  return this.destructionRatio * 100 + "%";
};
