describe('ObjectSounds', function() {

  var score = new Score;
  var objectSounds;

  beforeEach(function() {
    audioOriginal = window.Audio;
    audioMock = {play: function () {}};
    window.Audio = function() { return audioMock; };
    objectSounds = new ObjectSounds(score);
  });

  afterEach(function() {
    window.Audio = audioOriginal;
  });

  it('exists', function() {
    expect(objectSounds).toBeDefined();
  });

  describe('#setObjectVols', function() {
    it('calls setObjectVols on soundBank', function() {
        spyOn(SoundBank.prototype, 'setObjectVols');
        objectSounds.setObjectVols();
        expect(SoundBank.prototype.setObjectVols).toHaveBeenCalled();
    });
  });

  describe('#loadObjectSounds', function() {
    it('calls _playCrash', function() {
        spyOn(objectSounds, '_playCrash');
        objectSounds.loadObjectSounds();
        expect(objectSounds._playCrash).toHaveBeenCalled();
    });
  });

  describe('#_playCrash', function () {
    it('plays a crash sound if the score has increased', function () {
      spyOn(Score.prototype, 'showPoints').and.returnValue(5);
      spyOn(objectSounds, '_selectCrash').and.callThrough();
      objectSounds._playCrash();
      expect(objectSounds._selectCrash).toHaveBeenCalled();
    });

    it('plays a ping sound if the score has decreased', function () {
      spyOn(Score.prototype, 'showPoints').and.returnValue(-1);
      spyOn(objectSounds, '_playPing').and.callThrough();
      objectSounds._playCrash();
      expect(objectSounds._playPing).toHaveBeenCalled();
    });
  });

  describe('#_selectCrash', function () {
    it('selects a sound at random from the crashes array', function () {
      spyOn(Math, 'floor').and.returnValue(1);
      expect(objectSounds._selectCrash()).toEqual(objectSounds.crashes[1]);
    });
  });

  describe('#_playPing', function () {
    it('plays the ping sound', function () {
      spyOn(audioMock, 'play');
      objectSounds._playPing();
      expect(audioMock.play).toHaveBeenCalled();
    });
  });
});
