'use strict';

describe('SoundEngine', function() {

  var player = {};
  var score = new Score();
  var soundEngine;

  beforeEach(function() {
    soundEngine = new SoundEngine(player, score);
  });

  it('exists', function() {
    expect(soundEngine).toBeDefined();
  });

  describe('#runSounds', function() {
    beforeEach(function() {
      spyOn(soundEngine, '_setVols')
      spyOn(PlayerSounds.prototype, 'loadPlayerSounds')
      spyOn(ObjectSounds.prototype, 'loadObjectSounds')
    });

    it('calls _setVols', function() {
      soundEngine.runSounds();
      expect(soundEngine._setVols).toHaveBeenCalled();
    });

    it('calls loadPlayerSounds', function() {
      soundEngine.runSounds();
      expect(PlayerSounds.prototype.loadPlayerSounds).toHaveBeenCalled();
    });

    it('calls loadObjectSounds', function() {
      soundEngine.runSounds();
      expect(ObjectSounds.prototype.loadObjectSounds).toHaveBeenCalled();
    });
  });

  describe('#_setVols', function () {
    it('sets the player sounds volumes', function () {
      spyOn(PlayerSounds.prototype, 'setPlayerVols');
      soundEngine._setVols();
      expect(PlayerSounds.prototype.setPlayerVols).toHaveBeenCalled();
    });

    it('sets the object sounds volumes', function () {
      spyOn(ObjectSounds.prototype, 'setObjectVols');
      soundEngine._setVols();
      expect(ObjectSounds.prototype.setObjectVols).toHaveBeenCalled();
    });
  });
});
