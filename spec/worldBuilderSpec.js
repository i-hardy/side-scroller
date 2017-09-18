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

  describe('#getPreciousObjects', function () {
    it('returns the precious objects array', function () {
      expect(jimmy.getPreciousObjects()).toEqual(jasmine.any(Array));
    });
  });

  describe('#getFallenObjects', function () {
    it('returns all precious objects that are on the floor', function () {
      jimmy.createPreciousObjects(1);
      jimmy.getPreciousObjects()[0].fallen();
      expect(jimmy.getFallenObjects()).toContain(jimmy.getPreciousObjects()[0]);
    });
  });

  describe('#fallenObjectPreciousness', function () {
    it('returns the sum of fallen objects preciousness values', function () {
      spyOn(window, 'randomNumberGenerator').and.returnValue(2);
      jimmy.createPreciousObjects(1);
      jimmy.createPreciousObjects(2);
      jimmy.getPreciousObjects()[0].fallen();
      jimmy.getPreciousObjects()[1].fallen();
      expect(jimmy.fallenObjectPreciousness()).toEqual(4);
    });
  });

  describe('#touchedCactiSpikiness', function () {
    it('it returns the sum of touched cacti spikiness values', function () {
      spyOn(window, 'randomNumberGenerator').and.returnValue(2);
      jimmy.createCacti(1);
      jimmy.getCacti()[0].playerTouch();
      jimmy.createCacti(2);
      jimmy.getCacti()[1].playerTouch();
      expect(jimmy.touchedCactiSpikiness()).toEqual(4);
    });
  });

  describe('#getCacti', function () {
    it('returns the array of cacti', function () {
      expect(jimmy.getCacti()).toEqual(jasmine.any(Array));
    });
  });

  describe('#getTouchedCacti', function () {
    it('returns an array of cacti which have been touched', function () {
      jimmy.createCacti(1);
      jimmy.getCacti()[0].playerTouch();
      expect(jimmy.getTouchedCacti()).toContain(jimmy.getCacti()[0]);
    });
  });

  describe('#createPreciousObjects', function () {
    it('populates the precious objects array with instances of the PreciousObject class', function () {
      jimmy.createPreciousObjects(1);
      expect(jimmy.getPreciousObjects()[0]).toEqual(jasmine.any(PreciousObject));
    });
  });

  describe('#createCacti', function () {
    it('populates the cacti array with instances of the cactus class', function () {
      jimmy.createCacti(1);
      expect(jimmy.getCacti()[0]).toEqual(jasmine.any(Cactus));
    });
  });

  describe('#objectOnFloor', function () {
    var body = {};

    beforeEach(function () {
      spyOn(PreciousObject.prototype, 'fallen');
    });

    it('receives an object body, and sets the corresponding PreciousObject to being on the floor', function () {
      spyOn(PreciousObject.prototype, 'getBody').and.returnValue(body);
      jimmy.createPreciousObjects(1);
      jimmy.objectOnFloor(body);
      expect(PreciousObject.prototype.fallen).toHaveBeenCalled();
    });

    it('does nothing if there are no PreciousObjects matching the body', function () {
      jimmy.createPreciousObjects(1);
      jimmy.objectOnFloor(body);
      expect(PreciousObject.prototype.fallen).not.toHaveBeenCalled();
    });
  });

  describe('#cactusTouched', function () {
    var body = {};
    
    beforeEach(function () {
      spyOn(Cactus.prototype, 'playerTouch');
    });

    it('receives a cactus body, and sets the corresponding Cactus to having been touched', function () {
      spyOn(Cactus.prototype, 'getBody').and.returnValue(body);
      jimmy.createCacti(1);
      jimmy.cactusTouched(body);
      expect(Cactus.prototype.playerTouch).toHaveBeenCalled();
    });

    it('does nothing if there are no Cacti matching the body', function () {
      jimmy.createCacti(1);
      jimmy.cactusTouched(body);
      expect(Cactus.prototype.playerTouch).not.toHaveBeenCalled();
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

    it('gets the body associated with each precious object', function () {
      jimmy.createCacti(1);
      spyOn(Cactus.prototype, 'getBody');
      jimmy.nonPlatformBodies();
      expect(Cactus.prototype.getBody).toHaveBeenCalled();
    });

    it('adds more bodies to the worldBodies array', function () {
      var priorLength = jimmy.getWorldBodies().length;
      jimmy.nonPlatformBodies();
      expect(jimmy.getWorldBodies().length).toBeGreaterThan(priorLength);
    });
  });

  describe('#placeObjects', function () {
    it('generates objects based on the outcome of a random number call', function () {
      spyOn(window, 'randomNumberGenerator').and.returnValue(1);
      spyOn(jimmy, 'objectOrCactus');
      jimmy.placeObjects();
      expect(jimmy.objectOrCactus).toHaveBeenCalled();
    });
  });

  describe('#objectOrCactus', function () {
    it('has a one in ten chance to place a cactus', function () {
      spyOn(window, 'randomNumberGenerator').and.returnValue(1);
      spyOn(jimmy, 'createCacti');
      jimmy.objectOrCactus(1);
      expect(jimmy.createCacti).toHaveBeenCalled();
    });

    it('has a nine in ten chance to place an object', function () {
      spyOn(window, 'randomNumberGenerator').and.returnValue(5);
      spyOn(jimmy, 'createPreciousObjects');
      jimmy.objectOrCactus(1);
      expect(jimmy.createPreciousObjects).toHaveBeenCalled();
    });
  });

  describe('#fallenPreciousObjectsRatio', function () {
    it('shows the ratio of fallen objects compared to all precious objects', function () {
      jimmy.createPreciousObjects(1);
      jimmy.createPreciousObjects(2);
      jimmy.getPreciousObjects()[0].fallen();
      expect(jimmy.fallenPreciousObjectsRatio()).toEqual(0.5)
    });
  });
});
