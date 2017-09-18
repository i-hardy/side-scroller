'use strict';

describe('SoundEngine', function() {

  var player = {};
  var playerSounds;
  var soundEngine;

  beforeEach(function() {
    playerSounds = { loadPlayerSounds: function() {} }
    soundEngine = new SoundEngine(player);
  });

  it('exists', function() {
    expect(soundEngine).toBeDefined();
  });

  describe('#runSounds', function() {
    it('calls loadPlayerSounds', function() {
      spyOn(playerSounds, 'loadPlayerSounds')
      soundEngine.runSounds();
      expect(playerSounds.loadPlayerSounds()).toHaveBeenCalled();
    });
  });
});
