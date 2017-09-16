'use strict';

(function(exports) {
  function randomNumberGenerator(min, max) {
    return Math.floor(Math.random()*(max-min) + min);
  }
  exports.randomNumberGenerator = randomNumberGenerator;
}(this));
