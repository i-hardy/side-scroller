describe('RandomNumberGenerator', function () {
  var meg;

  beforeEach(function () {
    meg = new RandomNumberGenerator();
  });

  describe('#randomNumber', function() {
    it('returns a random number larger than the min value', function() {
      expect(meg.randomNumber(3,7)).toBeGreaterThan(2);
    });
    it('returns a random number smaller than the max value', function() {
      expect(meg.randomNumber(3,7)).toBeLessThan(7);
    });
  });

  describe('#oneInTwoChance', function () {
    it('returns true if the outcome of randomNumber(2, 0) is 1', function () {
      spyOn(meg, 'randomNumber').and.returnValue(1);
      expect(meg.oneInTwoChance()).toEqual(true);
    });
  });
});
