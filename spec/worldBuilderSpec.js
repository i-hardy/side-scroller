describe('WorldBuilder', function () {
  var jimmy;
  var canvas = {
    width: 512,
    height: 256
  };

  beforeEach(function () {
    jimmy = new WorldBuilder(canvas);
    jimmy.setGrid();
  });

  describe('#setGrid', function () {
    it('creates an array based on the canvas height', function () {
      expect(jimmy.getGrid().length).toEqual(jimmy.canvas.height/jimmy.BLOCK_HEIGHT);
    });

    it('contains rows full of zeros', function () {
      expect(jimmy.getGrid()[0][0]).toEqual(0);
    });

    it('contains rows of a length based on the canvas width', function () {
      expect(jimmy.getGrid()[0].length).toEqual(jimmy.canvas.width/jimmy.BLOCK_WIDTH);
    });
  });

  describe('#setRow', function () {
    it('creates an array based on the canvas width', function () {
      expect(jimmy.setRow().length).toEqual(jimmy.canvas.width/jimmy.BLOCK_WIDTH);
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
      expect(jimmy.getGrid()[jimmy.canvas.height / jimmy.BLOCK_HEIGHT - 3][2]).toEqual(1);
    });

    it('records the x index of the platform', function () {
      jimmy.setFirstPlatform();
      expect(jimmy.lastX).toEqual(2);
    });

    it('records the y index of the platform', function () {
      jimmy.setFirstPlatform();
      expect(jimmy.lastY).toEqual(jimmy.canvas.height / jimmy.BLOCK_HEIGHT - 3);
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
      expect(jimmy.lastX).toBeGreaterThan(2);
      expect(jimmy.lastX).toBeLessThan(6);
    });

    it('sets subsequent y indices randomly, and does not set platforms which have indices off the grid', function() {
      jimmy.setFirstPlatform();
      jimmy.setPlatform();
      expect(jimmy.lastY).toBeGreaterThan(0);
      expect(jimmy.lastY).toBeLessThan(jimmy.canvas.height / jimmy.BLOCK_HEIGHT);
    });

    it('does not create new platforms for x indices that are off the grid', function() {
      jimmy.setFirstPlatform();
      jimmy.setPlatform();
      expect(jimmy.lastX).toBeLessThan(jimmy.canvas.width / jimmy.BLOCK_WIDTH);
    });
  });

  describe('#randomNumber', function() {
    it('returns a random number larger than the min value', function() {
      expect(jimmy.randomNumber(3,7)).toBeGreaterThan(2)
    });
    it('returns a random number smaller than the max value', function() {
      expect(jimmy.randomNumber(3,7)).toBeLessThan(7)
    });
  });

  describe('#setGround', function () {
    it('sets final row in the grid to 1, 2, 3 or 4', function () {
      expect(jimmy.getGrid()[7][3]).toBeGreaterThan(0);
      expect(jimmy.getGrid()[7][3]).toBeLessThan(5);
    });
  });
});
