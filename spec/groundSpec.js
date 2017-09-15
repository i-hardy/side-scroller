describe ('Ground', function() {
  var jimmy;
  var ginny;
  var canvas = {
    width: 512,
    height: 256
  };

  beforeEach(function () {
    jimmy = new WorldBuilder(canvas);
    jimmy.setGrid();
    ginny = new Ground();
  });

  describe('#setGround', function () {
    it('sets final row in the grid to 1, 2, 3 or 4', function () {
      expect(jimmy.getGrid()[worldOptions.gridRows][3]).toBeGreaterThan(0);
      expect(jimmy.getGrid()[worldOptions.gridRows][3]).toBeLessThan(5);
    });
  });
};
