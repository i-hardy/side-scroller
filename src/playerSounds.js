'use strict';

function PlayerSounds(player, soundBank) {
  this.player = player
  this.soundBank = soundBank || new SoundBank
};

PlayerSounds.prototype.setPlayerVols = function () {
  this.soundBank.setPlayerVols();
};

PlayerSounds.prototype.loadPlayerSounds = function () {
  this._playerRunning();
  this._playerJumping();
  this._startTheme();
};

PlayerSounds.prototype._playerRunning = function() {
  this.soundBank.scamper.loop = true;
  this.player.isOnFloor && (keys[KEY_D] || keys[KEY_A]) ? this.soundBank.scamper.play() : this.soundBank.scamper.pause()
};

PlayerSounds.prototype._playerJumping = function() {
  if (keys[KEY_W]) { this.soundBank.meow1.play() };
};

PlayerSounds.prototype._startTheme = function() {
  if (isThemeMuted === true) { this.soundBank.gameTheme.pause(); return };
  this.soundBank.gameTheme.play();
  var buffer = 0.18
  if(this.soundBank.gameTheme.currentTime > this.soundBank.gameTheme.duration - buffer) {
    this.soundBank.resetThemeTime();
    this.soundBank.gameTheme.play();
  };
};
