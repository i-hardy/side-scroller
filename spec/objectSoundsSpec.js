describe('ObjectSounds', function() {

  var score = new Score;
  var objectSounds;

  beforeEach(function() {
    objectSounds = new ObjectSounds(score);
  });

  it('exists', function() {
    expect(objectSounds).toBeDefined();
  });

  describe('#setObjectVols', function() {
    it('calls setObjectVols on soundBank', function() {
        spyOn(SoundBank.prototype, 'setObjectVols')
        objectSounds.setObjectVols();
        expect(SoundBank.prototype.setObjectVols).toHaveBeenCalled();
    });
  });

  describe('#loadObjectSounds', function() {
    it('calls _playCrash', function() {
        spyOn(objectSounds, '_playCrash')
        objectSounds.loadObjectSounds();
        expect(objectSounds._playCrash).toHaveBeenCalled();
    });
  });
});
