describe('WorldBuilder', function () {
  var jimmy;

  beforeEach(function () {
    jimmy = new WorldBuilder();
  });

  describe('#buildCompleteWorld', function () {
    it('builds the grid', function () {
      spyOn(jimmy, 'buildPlatforms').and.callThrough();
      jimmy.buildCompleteWorld();
      expect(jimmy.buildPlatforms).toHaveBeenCalled();
    });

    it('creates all platform bodies', function () {
      spyOn(jimmy, 'createWorldBodies');
      jimmy.buildCompleteWorld();
      expect(jimmy.createWorldBodies).toHaveBeenCalled();
    });

    it('fetches all precious object bodies', function () {
      spyOn(jimmy, 'preciousObjectBodies');
      jimmy.preciousObjectBodies();
      expect(jimmy.preciousObjectBodies).toHaveBeenCalled();
    });
  });

  describe('#buildPlatforms', function () {
    it('builds the platform grid', function () {
      spyOn(PlatformGrid.prototype, 'buildPlatforms');
      jimmy.buildPlatforms();
      expect(PlatformGrid.prototype.buildPlatforms).toHaveBeenCalled();
    });
  });

  describe('#getPlatformGrid', function () {
    it('returns the platform grid array', function () {
      jimmy.buildPlatforms();
      expect(jimmy.getPlatformGrid()).toEqual(jasmine.any(Array));
    });

    it('returns an array of the correct length', function () {
      jimmy.buildPlatforms();
      expect(jimmy.getPlatformGrid().length).toEqual(worldOptions.gridRows);
    });
  });

  describe('#getPreciousObjects', function () {
    it('returns the precious objects array', function () {
      expect(jimmy.getPreciousObjects()).toEqual(jasmine.any(Array));
    });
  });

  describe('#createPreciousObjects', function () {
    it('populates the precious objects array with instances of the PreciousObject class', function () {
      jimmy.createPreciousObjects(1);
      expect(jimmy.getPreciousObjects()[0]).toEqual(jasmine.any(PreciousObject));
    });
  });

  describe('#getWorldBodies', function () {
    it('returns the worldBodies array', function () {
      expect(jimmy.getWorldBodies()).toEqual(jasmine.any(Array));
    });
  });

  describe('#createWorldBodies', function () {
    it('populates the worldBodies array', function () {
      jimmy.buildPlatforms();
      jimmy.createWorldBodies();
      expect(jimmy.getWorldBodies().length).toBeGreaterThan(0);
    });

  });

  describe('#platformBodies', function () {
    it('creates Matter rectangles', function () {
      spyOn(Matter.Bodies, 'rectangle');
      jimmy.buildPlatforms();
      jimmy.platformBodies(1, 2);
      expect(Matter.Bodies.rectangle).toHaveBeenCalled();
    });

    it('delegates the creation of precious objects', function () {
      spyOn(jimmy, 'placeObjects').and.callThrough();
      jimmy.buildPlatforms();
      jimmy.platformBodies(1, 2);
      expect(jimmy.placeObjects).toHaveBeenCalled();
    });
  });

  describe('#preciousObjectBodies', function () {
    beforeEach(function () {
      jimmy.buildPlatforms();
      jimmy.createWorldBodies();
    });

    it('gets the body associated with each precious object', function () {
      spyOn(PreciousObject.prototype, 'getBody');
      jimmy.preciousObjectBodies();
      expect(PreciousObject.prototype.getBody).toHaveBeenCalled();
    });

    it('adds more bodies to the worldBodies array', function () {
      var priorLength = jimmy.getWorldBodies().length;
      jimmy.preciousObjectBodies();
      expect(jimmy.getWorldBodies().length).toBeGreaterThan(priorLength);
    });
  });

  describe('#placeObjects', function () {
    it('generates objects based on the outcome of a random number call', function () {
      spyOn(RandomNumberGenerator.prototype, 'oneInTwoChance').and.returnValue(true);
      spyOn(jimmy, 'createPreciousObjects');
      jimmy.placeObjects();
      expect(jimmy.createPreciousObjects).toHaveBeenCalled();
    });
  });
});
