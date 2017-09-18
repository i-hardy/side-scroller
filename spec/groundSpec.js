describe ('Ground', function() {
  var ginny;

  beforeEach(function () {
    ginny = new Ground();
  });

  describe('#getGround', function () {
    it('returns the array representing the ground', function () {
      expect(ginny.getGround()).toEqual(jasmine.any(Array));
    });
  });

  describe('#setGround', function () {
    it('sets final row in the grid to 1, 2, 3 or 4', function () {
      ginny.setGround();
      expect(ginny.getGround()[3]).toBeGreaterThan(0);
      expect(ginny.getGround()[3]).toBeLessThan(5);
    });
  });
});
