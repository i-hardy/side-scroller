describe('SoundEngine', function() {

  var player = {};
  var soundBank = {};
  var soundEngine;

  beforeEach( function() {
    soundEngine = new SoundEngine(player, soundBank);
  });

  it('exists', function() {
    expect(soundEngine).toBeDefined();
  });

  describe('#playerSounds', function() {
    it('calls _playerRunning', function() {
      spyOn(soundEngine, '_playerRunning')
      soundEngine.playerSounds();
      expect(soundEngine._playerRunning).toHaveBeenCalled();
    });
  });
});
