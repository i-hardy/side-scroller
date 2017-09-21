'use strict';

function SoundEngine(player, score) {
  this.playerSounds = new PlayerSounds(player);
  this.objectSounds = new ObjectSounds(score);
}

SoundEngine.prototype.runSounds = function() {
  this._setVols();
  this.playerSounds.loadPlayerSounds();
  this.objectSounds.loadObjectSounds();
};

SoundEngine.prototype._setVols = function() {
  this.playerSounds.setPlayerVols();
  this.objectSounds.setObjectVols();
};
