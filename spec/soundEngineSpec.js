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
});
