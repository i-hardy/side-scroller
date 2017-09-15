function SoundEngine(player, soundBank) {
  this.player = player
  this.soundBank = soundBank || new SoundBank
};

SoundEngine.prototype.runSounds = function() {
  this._setVols();
  this._playerSounds();
}

SoundEngine.prototype._setVols = function () {
  this.soundBank.setVols();
};

SoundEngine.prototype._playerSounds = function() {
  this._playerRunning();
  this._playerJumping();
};

SoundEngine.prototype._playerRunning = function() {
  this.soundBank.scamper.loop = true;
  this.soundBank.scamper.volume = 1;
  this.player.isOnFloor && (keys[KEY_D] || keys[KEY_A]) ? this.soundBank.scamper.play() : this.soundBank.scamper.pause()
};

SoundEngine.prototype._playerJumping = function() {
  if (keys[KEY_W]) { this.soundBank.meow1.play() };
};
