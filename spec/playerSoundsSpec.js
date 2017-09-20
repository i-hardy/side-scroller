'use strict';

describe('PlayerSounds', function() {

  var player = {}
  var playerSounds;

  var audioOriginal, audioMock;

  beforeEach(function() {
    audioOriginal = window.Audio;
    audioMock = {play: function () {}, pause: function () {}};
    window.Audio = function() { return audioMock; };
    playerSounds = new PlayerSounds(player);
  });

  afterEach(function() {
    window.Audio = audioOriginal;
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

  describe('#_playerRunning', function () {
    beforeEach(function () {
      spyOn(audioMock, 'play');
      spyOn(audioMock, 'pause');
      keys = [];
    });

    it('plays a sound if the player is running left', function () {
      player.isOnFloor = true;
      keys[KEY_A] = true;
      playerSounds._playerRunning();
      expect(audioMock.play).toHaveBeenCalled();
    });

    it('plays a sound if the player is running right', function () {
      player.isOnFloor = true;
      keys[KEY_D] = true;
      playerSounds._playerRunning();
      expect(audioMock.play).toHaveBeenCalled();
    });

    it('pauses the sound if the player is not running', function () {
      player.isOnFloor = true;
      playerSounds._playerRunning();
      expect(audioMock.pause).toHaveBeenCalled();
    });

    it('pauses the sound if the player is not on the floor', function () {
      player.isOnFloor = false;
      keys[KEY_D] = true;
      playerSounds._playerRunning();
      expect(audioMock.pause).toHaveBeenCalled();
    });
  });

  describe('#_playerJumping', function () {
    beforeEach(function () {
      spyOn(audioMock, 'play');
      keys = [];
    });

    it('plays a sound if the player has jumped', function () {
      keys[KEY_W] = true;
      playerSounds._playerJumping();
      expect(audioMock.play).toHaveBeenCalled();
    });

    it('otherwise does nothing', function () {
      playerSounds._playerJumping();
      expect(audioMock.play).not.toHaveBeenCalled();
    });
  });

  describe('#_startTheme', function () {
    beforeEach(function () {
      spyOn(audioMock, 'play');
      spyOn(SoundBank.prototype, 'resetThemeTime');
    });

    it('plays the game theme', function () {
      playerSounds._startTheme();
      expect(audioMock.play).toHaveBeenCalled();
    });

    it('loops the theme if it has exceeded its duration', function () {
      playerSounds.soundBank.gameTheme.duration = 1;
      playerSounds.soundBank.gameTheme.currentTime = 2;
      playerSounds._startTheme();
      expect(SoundBank.prototype.resetThemeTime).toHaveBeenCalled();
    });

    it('does not loop the theme otherwise', function () {
      playerSounds._startTheme();
      expect(SoundBank.prototype.resetThemeTime).not.toHaveBeenCalled();
    });
  });
});
