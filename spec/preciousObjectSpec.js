'use strict';

describe('PreciousObject', function() {
  var mrFancyPants;

  beforeEach(function() {
    spyOn(window, 'randomNumberGenerator').and.returnValue(2);
    spyOn(PreciousObject.prototype, 'createBody').and.callThrough();
    mrFancyPants = new PreciousObject(100, 150, 'object');
  });

  describe('#instantiation', function() {
    it('has a preciousness', function() {
      expect(mrFancyPants.preciousness).toBeDefined();
    });

    it('creates a Matter Body', function () {
      expect(PreciousObject.prototype.createBody).toHaveBeenCalled();
    });

    it('has a type', function () {
      expect(mrFancyPants.getType()).toEqual('object');
    });
  });

  describe('#getPreciousness', function () {
    it('returns the preciousness', function () {
      expect(mrFancyPants.getPreciousness()).toEqual(2);
    });

    it('requests negative preciousness if the type is cactus', function () {
      var cactus = new PreciousObject(100, 150, 'cactus');
      expect(window.randomNumberGenerator.calls.allArgs()[1]).toEqual([-5, -1]);
    });
  });

  describe('#getBody', function () {
    it('returns the Matter Body relating to the object', function () {
      spyOn(Matter.Bodies, 'rectangle').and.returnValue({name: 'Body'});
      mrFancyPants.createBody();
      expect(mrFancyPants.getBody()).toEqual({name: 'Body'});
    });
  });

  describe('#createBody', function () {
    it('generates a Matter Body at its x and y coordinates', function () {
      spyOn(Matter.Bodies, 'rectangle').and.callThrough();
      mrFancyPants.createBody();
      expect(Matter.Bodies.rectangle).toHaveBeenCalled();
    });
  });

  describe('#hasCollided', function () {
    it('returns whether or not the object has registered a collision', function () {
      expect(mrFancyPants.hasCollided()).toBe(false);
    });
  });

  describe('#collision', function() {
    it('sets collided to true', function() {
      mrFancyPants.collision();
      expect(mrFancyPants.hasCollided()).toBe(true);
    });
  });
});
