'use strict';

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
      spyOn(jimmy, 'nonPlatformBodies');
      jimmy.buildCompleteWorld();
      expect(jimmy.nonPlatformBodies).toHaveBeenCalled();
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

  describe('#getAllObjects', function () {
    it('returns the objects array', function () {
      expect(jimmy.getAllObjects()).toEqual(jasmine.any(Array));
    });
  });

  describe('#getCollidedObjects', function () {
    it('returns all precious objects that are on the floor', function () {
      jimmy.createPreciousObjects(1);
      jimmy.getAllObjects()[0].collision();
      expect(jimmy.getCollidedObjects()).toContain(jimmy.getAllObjects()[0]);
    });
  });

  describe('#fallenObjectPreciousness', function () {
    it('returns the sum of collision objects preciousness values', function () {
      spyOn(window, 'randomNumberGenerator').and.returnValue(2);
      jimmy.createPreciousObjects(1);
      jimmy.createPreciousObjects(2);
      jimmy.getAllObjects()[0].collision();
      jimmy.getAllObjects()[1].collision();
      expect(jimmy.fallenObjectPreciousness()).toEqual(4);
    });
  });

  describe('#createPreciousObjects', function () {
    it('populates the precious objects array with instances of the PreciousObject class', function () {
      jimmy.createPreciousObjects(1);
      expect(jimmy.getAllObjects()[0]).toEqual(jasmine.any(PreciousObject));
    });
  });

  describe('#objectCollided', function () {
    var body = {};

    beforeEach(function () {
      spyOn(PreciousObject.prototype, 'collision');
    });

    it('receives an object body, and sets the corresponding PreciousObject to being on the floor', function () {
      spyOn(PreciousObject.prototype, 'getBody').and.returnValue(body);
      jimmy.createPreciousObjects(1);
      jimmy.objectCollided(body);
      expect(PreciousObject.prototype.collision).toHaveBeenCalled();
    });

    it('does nothing if there are no PreciousObjects matching the body', function () {
      jimmy.createPreciousObjects(1);
      jimmy.objectCollided(body);
      expect(PreciousObject.prototype.collision).not.toHaveBeenCalled();
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
    beforeEach(function () {
      spyOn(jimmy, 'placeObjects');
    });

    it('creates Matter rectangles', function () {
      spyOn(Matter.Bodies, 'rectangle');
      jimmy.buildPlatforms();
      jimmy.platformBodies(1, 1);
      expect(Matter.Bodies.rectangle).toHaveBeenCalled();
    });

    it('delegates the creation of precious objects', function () {
      spyOn(jimmy, 'getPlatformGrid').and.returnValue([[1]])
      jimmy.buildPlatforms();
      jimmy.platformBodies(0, 0);
      expect(jimmy.placeObjects).toHaveBeenCalled();
    });

    it('prevents an object being created on the first platform', function () {
      jimmy.buildPlatforms();
      jimmy.platformBodies(1, 1);
      expect(jimmy.placeObjects).not.toHaveBeenCalled();
    });
  });

  describe('#endGamePlatform', function () {
    it('creates a special platform at the right edge of the world', function () {
      spyOn(Matter.Bodies, 'rectangle');
      jimmy.endGamePlatform();
      expect(Matter.Bodies.rectangle).toHaveBeenCalled();
    });
  });

  describe('#nonPlatformBodies', function () {
    beforeEach(function () {
      jimmy.buildPlatforms();
      jimmy.createWorldBodies();
    });

    it('gets the body associated with each precious object', function () {
      spyOn(PreciousObject.prototype, 'getBody');
      jimmy.nonPlatformBodies();
      expect(PreciousObject.prototype.getBody).toHaveBeenCalled();
    });

    it('adds more bodies to the worldBodies array', function () {
      var priorLength = jimmy.getWorldBodies().length;
      jimmy.nonPlatformBodies();
      expect(jimmy.getWorldBodies().length).toBeGreaterThan(priorLength);
    });
  });

  describe('#placeObjects', function () {
    it('generates objects based on the outcome of a random number call', function () {
      spyOn(window, 'randomNumberGenerator').and.returnValue(4);
      spyOn(jimmy, 'objectOrCactus');
      jimmy.placeObjects();
      expect(jimmy.objectOrCactus).toHaveBeenCalled();
    });
  });

  describe('#objectOrCactus', function () {
    it('has a one in ten chance to return cactus', function () {
      spyOn(window, 'randomNumberGenerator').and.returnValue(1);
      expect(jimmy.objectOrCactus()).toEqual('cactus');
    });

    it('has a nine in ten chance to return object', function () {
      spyOn(window, 'randomNumberGenerator').and.returnValue(5);
      expect(jimmy.objectOrCactus()).toEqual('object');
    });
  });

  describe('#fallenPreciousObjectsRatio', function () {
    it('shows the ratio of fallen objects compared to all precious objects', function () {
      spyOn(jimmy, 'objectOrCactus').and.returnValue('object');
      jimmy.createPreciousObjects(1);
      jimmy.createPreciousObjects(2);
      jimmy.getAllObjects()[0].collision();
      expect(jimmy.fallenPreciousObjectsRatio()).toEqual(0.5)
    });

    it('does not include objects that are cacti', function () {
      spyOn(window, 'randomNumberGenerator').and.returnValue(5);
      jimmy.createPreciousObjects(1);
      jimmy.createPreciousObjects(1);
      spyOn(jimmy, 'objectOrCactus').and.returnValue('cactus');
      jimmy.createPreciousObjects(2);
      jimmy.getAllObjects()[0].collision();
      jimmy.getAllObjects()[2].collision();
      expect(jimmy.fallenPreciousObjectsRatio()).toEqual(0.5)
    });
  });
});
