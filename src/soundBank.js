'use strict';

function SoundBank() {
  this.scamper = new Audio('./assets/sounds/scurrying.wav')
  this.meow1 = new Audio('./assets/sounds/meow1.wav')
  this.gameTheme = new Audio('./assets/sounds/gametheme.mp3')
};

SoundBank.prototype.setPlayerVols = function () {
  this._setMeowVol();
  this._setScamperVol();
  this._setThemeVol();
};

SoundBank.prototype._setThemeVol = function() {
  this.gameTheme.volume = 0.2;
}

SoundBank.prototype._setMeowVol = function() {
  this.meow1.volume = 0.3;
};

SoundBank.prototype._setScamperVol = function() {
  this.scamper.volume = 0.2;
};
