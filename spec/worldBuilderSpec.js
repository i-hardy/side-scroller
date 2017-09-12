describe('WorldBuilder', function () {
  var jimmy;
  var canvas = {
    width: 512,
    height: 256
  };

  beforeEach(function () {
    jimmy = new WorldBuilder(canvas);
  });

  describe('#setGrid', function () {
    it('creates an array based on the canvas height', function () {
      jimmy.setGrid();
      expect(jimmy.getGrid().length).toEqual(256/8);
    });

    it('contains rows full of zeros', function () {
      jimmy.setGrid();
      expect(jimmy.getGrid()[0][0]).toEqual(0);
    });

    it('contains rows of a length based on the canvas width', function () {
      jimmy.setGrid();
      expect(jimmy.getGrid()[0].length).toEqual(512/16);
    });
  });

  describe('#setRow', function () {
    it('creates an array based on the canvas width', function () {
      expect(jimmy.setRow().length).toEqual(512/16);
    });
  });
});
