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
};

PlayerSounds.prototype._playerRunning = function() {
  this.soundBank.scamper.loop = true;
  this.player.isOnFloor && (keys[KEY_D] || keys[KEY_A]) ? this.soundBank.scamper.play() : this.soundBank.scamper.pause()
};

PlayerSounds.prototype._playerJumping = function() {
  if (keys[KEY_W]) { this.soundBank.meow1.play() };
};
