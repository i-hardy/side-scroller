function SoundEngine(player, soundBank) {
  this.player = player
  this.soundBank = soundBank || new SoundBank
};

SoundEngine.prototype.playerSounds = function() {
  this._playerRunning();
};

SoundEngine.prototype._playerRunning = function() {
  this.soundBank.scamper.loop = true;
  this.player.isOnFloor && (keys[KEY_D] || keys[KEY_A] ) ? this.soundBank.scamper.play() : this.soundBank.scamper.pause()
};
