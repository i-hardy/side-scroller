'use strict';

describe('SoundEngine', function() {

  var player = {};
  var soundEngine;
  var playerSounds;

  beforeEach(function() {
    soundEngine = new SoundEngine(player);
  });

  it('exists', function() {
    expect(soundEngine).toBeDefined();
  });

  describe('#runSounds', function() {
    it('calls loadPlayerSounds', function() {
      spyOn(PlayerSounds.prototype, 'loadPlayerSounds')
      soundEngine.runSounds();
      expect(PlayerSounds.prototype.loadPlayerSounds).toHaveBeenCalled();
    });
  });
});
