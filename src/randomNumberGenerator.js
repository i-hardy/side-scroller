function RandomNumberGenerator() {}

RandomNumberGenerator.prototype.randomNumber = function(max,min) {
  return Math.floor(Math.random()*(max-min) + min);
};

RandomNumberGenerator.prototype.oneInTwoChance = function () {
  return this.randomNumber(2, 0) === 1;
};
