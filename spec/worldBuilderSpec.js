describe('WorldBuilder', function () {
  var jimmy;
  var meg;
  var canvas = {
    width: 512,
    height: 256
  };

  beforeEach(function () {
    jimmy = new WorldBuilder(canvas);
    meg = new RandomNumberGenerator();
    jimmy.setGrid();
  });

  describe('#setGrid', function () {
    it('creates an array based on the canvas height', function () {
      expect(jimmy.getGrid().length).toEqual(worldOptions.gridRows);
    });

    it('contains rows full of zeros', function () {
      expect(jimmy.getGrid()[0][0]).toEqual(0);
    });

    it('contains rows of a length based on the canvas width', function () {
      expect(jimmy.getGrid()[0].length).toEqual(worldOptions.gridColumns);
    });
  });

  describe('#setRow', function () {
    it('creates an array based on the canvas width', function () {
      expect(jimmy.setRow().length).toEqual(worldOptions.gridColumns);
    });
  });

  describe('#setGridElement', function () {
    it('can set a grid element to 1', function () {
      jimmy.setGridElement(0, 0)
      expect(jimmy.getGrid()[0][0]).toEqual(1);
    });
  });

  describe('#setFirstPlatform', function () {
    it('sets the first platform', function () {
      jimmy.setFirstPlatform();
      expect(jimmy.getGrid()[worldOptions.gridRows - 2][0]).toEqual(1);
    });

    it('records the x index of the platform', function () {
      jimmy.setFirstPlatform();
      expect(jimmy.lastX).toEqual(0);
    });

    it('records the y index of the platform', function () {
      jimmy.setFirstPlatform();
      expect(jimmy.lastY).toEqual(worldOptions.gridRows - 2);
    });
  });

  describe('#setPlatform', function() {
    it('sets subsequent platforms randomly', function() {
      jimmy.setFirstPlatform();
      jimmy.setPlatform();
      expect(jimmy.getGrid()[jimmy.lastY][jimmy.lastX]).toEqual(1);
    });

    it('sets an x index greater than the last x index', function() {
      jimmy.setFirstPlatform();
      jimmy.setPlatform();
      expect(jimmy.lastX).toBeGreaterThan(0);
      expect(jimmy.lastX).toBeLessThan(3);
    });

    it('sets subsequent y indices randomly, and does not set platforms which have indices off the grid', function() {
      jimmy.setFirstPlatform();
      jimmy.setPlatform();
      expect(jimmy.lastY).toBeGreaterThan(0);
      expect(jimmy.lastY).toBeLessThan(worldOptions.gridRows);
    });

    it('does not create new platforms for x indices that are off the grid', function() {
      jimmy.setFirstPlatform();
      jimmy.setPlatform();
      expect(jimmy.lastX).toBeLessThan(worldOptions.gridColumns);
    });
  });
});
