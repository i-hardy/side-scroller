'use strict';

function SoundEngine(player, playerSounds) {
  this.playerSounds = playerSounds || new PlayerSounds(player)
};

SoundEngine.prototype._setVols = function() {
  this.playerSounds.setPlayerVols();
};

SoundEngine.prototype.runSounds = function() {
  this._setVols();
  this.playerSounds.loadPlayerSounds();
};
