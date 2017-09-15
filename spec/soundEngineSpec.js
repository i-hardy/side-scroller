describe('SoundEngine', function() {

  var player = {};
  var soundBank = new SoundBank();
  var soundEngine;

  beforeEach(function() {
    soundEngine = new SoundEngine(player, soundBank);
  });

  it('exists', function() {
    expect(soundEngine).toBeDefined();
  });

  describe('#playerSounds', function() {
    it('calls _playerRunning', function() {
      spyOn(soundEngine, '_playerRunning')
      soundEngine.runSounds();
      expect(soundEngine._playerRunning).toHaveBeenCalled();
    });

    it('calls _playerJumping', function() {
      spyOn(soundEngine, '_playerJumping')
      soundEngine.runSounds();
      expect(soundEngine._playerJumping).toHaveBeenCalled();
    });
  });
});
