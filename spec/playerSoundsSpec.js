'use strict';

describe('PlayerSounds', function() {

  var player = {}
  var playerSounds;

  beforeEach(function() {
    playerSounds = new PlayerSounds(player);
  });

  it('exists', function() {
    expect(playerSounds).toBeDefined();
  });

  describe('#setPlayerVols', function() {
    it('calls setPlayerVols on soundBank', function() {
      spyOn(SoundBank.prototype, 'setPlayerVols')
      playerSounds.setPlayerVols()
      expect(SoundBank.prototype.setPlayerVols).toHaveBeenCalled();
    });
  });

  describe('#loadPlayerSounds', function() {

    beforeEach(function() {
      spyOn(playerSounds, '_playerRunning');
      spyOn(playerSounds, '_playerJumping');
      spyOn(playerSounds, '_startTheme');
      playerSounds.loadPlayerSounds();
    });

    it('calls playerRunning', function() {
      expect(playerSounds._playerRunning).toHaveBeenCalled();
    });

    it('calls playerJumping', function() {
      expect(playerSounds._playerJumping).toHaveBeenCalled();
    });

    it('calls startTheme', function() {
      expect(playerSounds._startTheme).toHaveBeenCalled();
    });
  });

});
