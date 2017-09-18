describe('SoundEngine', function() {

  var player = {};
  var playerSounds = { loadPlayerSounds: function() = {} }
  var soundEngine;

  beforeEach(function() {
    soundEngine = new SoundEngine(player, playerSounds);
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
