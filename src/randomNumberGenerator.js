function RandomNumberGenerator() {}

RandomNumberGenerator.prototype.randomNumber = function(max,min) {
  return Math.floor(Math.random()*(max-min) + min);
};
