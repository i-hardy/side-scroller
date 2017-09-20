describe('ObjectSounds', function() {

  var score = new Score;
  var objectSounds;

  beforeEach(function() {
    objectSounds = new ObjectSounds(score);
  });

  it('exists', function() {
    expect(objectSounds).toBeDefined();
  });
});
