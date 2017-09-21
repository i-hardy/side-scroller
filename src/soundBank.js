'use strict';

function SoundBank() {
  this.scamper = new Audio('./assets/sounds/scurrying.wav');
  this.meow1 = new Audio('./assets/sounds/meow1.wav');
  this.gameTheme = new Audio('./assets/sounds/gametheme.mp3');
  this.glassCrash = new Audio('./assets/sounds/glasscrash.mp3');
  this.metalCrash = new Audio('./assets/sounds/metalcrash.mp3');
  this.chinaCrash = new Audio('./assets/sounds/chinacrash.mp3');
  this.woodCrash = new Audio('./assets/sounds/woodcrash.mp3');
  this.ping = new Audio('./assets/sounds/ping.mp3');
}

SoundBank.prototype.setPlayerVols = function () {
  this._setMeowVol();
  this._setScamperVol();
  this._setThemeVol();
};

SoundBank.prototype.setObjectVols = function () {
  this._setGlassCrashVol();
  this._setMetalCrashVol();
  this._setChinaCrashVol();
  this._setWoodCrashVol();
  this._setPingVol();
};

SoundBank.prototype.resetThemeTime = function () {
  this.gameTheme.currentTime = 0;
};

SoundBank.prototype._setThemeVol = function() {
  this.gameTheme.volume = 0.2;
};

SoundBank.prototype._setMeowVol = function() {
  this.meow1.volume = 0.3;
};

SoundBank.prototype._setScamperVol = function() {
  this.scamper.volume = 0.2;
};

SoundBank.prototype._setGlassCrashVol = function() {
  this.glassCrash.volume = 0.2;
};

SoundBank.prototype._setMetalCrashVol = function() {
  this.metalCrash.volume = 0.2;
};

SoundBank.prototype._setChinaCrashVol = function() {
  this.chinaCrash.volume = 0.2;
};

SoundBank.prototype._setWoodCrashVol = function() {
  this.woodCrash.volume = 0.2;
};

SoundBank.prototype._setPingVol = function() {
  this.ping.volume = 0.2;
};
