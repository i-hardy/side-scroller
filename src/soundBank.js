'use strict';

function SoundBank() {
  this.scamper = new Audio('./assets/sounds/scurrying.wav')
  this.meow1 = new Audio('./assets/sounds/meow1.wav')
  this.meow2 = new Audio('./assets/sounds/meow2.wav')
  this.meow3 = new Audio('./assets/sounds/meow3.wav')
};

SoundBank.prototype.setPlayerVols = function () {
  this._setMeowVol();
};

SoundBank.prototype._setMeowVol = function() {
  var jumpMeows = [this.meow1, this.meow2, this.meow3];
  for (var i = 0; i < jumpMeows.length; i++) { jumpMeows[i].volume = 0.2 };
};
