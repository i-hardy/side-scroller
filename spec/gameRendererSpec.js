describe('GameRenderer', function () {
  var fernando;
  var canvas = {
    width: 512,
    height: 256
  };
  var context = {
    fillRect: function () {}
  };

  beforeEach(function () {
    fernando = new GameRenderer(canvas, context);
  });

  describe('#createWorld', function () {
    it('calls the world builder setGrid function', function () {
      spyOn(fernando.world, 'setGrid').and.callThrough();
      fernando.createWorld();
      expect(fernando.world.setGrid).toHaveBeenCalled();
    });

    it('calls the world builder setFirstPlatform function', function () {
      spyOn(fernando.world, 'setFirstPlatform').and.callThrough();
      fernando.createWorld();
      expect(fernando.world.setFirstPlatform).toHaveBeenCalled();
    });

    it('calls the world builder setPlatform function to create another platform', function () {
      spyOn(fernando.world, 'setPlatform');
      fernando.createWorld();
      expect(fernando.world.setPlatform).toHaveBeenCalled();
    });
  });

  describe('#drawWorld', function () {
    it('calls fillRect on the context', function () {
      spyOn(fernando.context, 'fillRect');
      fernando.drawWorld();
      expect(fernando.context.fillRect).toHaveBeenCalled();
    });
  });

  describe('drawPlatforms', function () {
    it('iterates through the world grid and calls fillRect if it finds a 1', function () {
      spyOn(fernando.context, 'fillRect');
      fernando.createWorld();
      fernando.drawPlatforms();
      expect(fernando.context.fillRect).toHaveBeenCalled();
    });

    it('does not draw anything when there are no 1s', function () {
      spyOn(fernando.context, 'fillRect');
      fernando.world.setGrid();
      fernando.drawPlatforms();
      expect(fernando.context.fillRect).not.toHaveBeenCalled();
    });
  });
});
