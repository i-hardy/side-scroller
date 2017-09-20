'use strict';

describe('SoundEngine', function() {

  var player = {};
  var score = new Score();
  var soundEngine;
  var playerSounds;

  beforeEach(function() {
    soundEngine = new SoundEngine(player, score);
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
