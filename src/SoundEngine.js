function SoundEngine(player, playerSounds) {
  this.playerSounds = playerSounds || new PlayerSounds(player)
};

SoundEngine.prototype.setVols = function() {
  this.playerSounds.setPlayerVols();
};

SoundEngine.prototype.runSounds = function() {
  this.playerSounds.loadPlayerSounds();
};
