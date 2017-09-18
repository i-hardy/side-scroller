'use strict';

describe('PreciousObject', function() {
  var preciousObject;

  beforeEach(function() {
    spyOn(window, 'randomNumberGenerator').and.returnValue(2);
    spyOn(PreciousObject.prototype, 'createBody').and.callThrough();
    preciousObject = new PreciousObject(100, 150);
  });

  describe('#instantiation', function() {
    it('has a preciousness', function() {
      expect(preciousObject.preciousness).toBeDefined();
    });

    it('creates a Matter Body', function () {
      expect(PreciousObject.prototype.createBody).toHaveBeenCalled();
    });
  });

  describe('#getPreciousness', function () {
    it('returns the preciousness', function () {
      expect(preciousObject.getPreciousness()).toEqual(2);
    });
  });

  describe('#getBody', function () {
    it('returns the Matter Body relating to the precious object', function () {
      spyOn(Matter.Bodies, 'rectangle').and.returnValue({name: 'Body'});
      preciousObject.createBody();
      expect(preciousObject.getBody()).toEqual({name: 'Body'});
    });
  });

  describe('#createBody', function () {
    it('generates a Matter Body at its x and y coordinates', function () {
      spyOn(Matter.Bodies, 'rectangle').and.callThrough();
      preciousObject.createBody();
      expect(Matter.Bodies.rectangle).toHaveBeenCalled();
    });
  });

  describe('#isOnFloor', function () {
    it('returns whether or not the object is on the floor', function () {
      expect(preciousObject.isOnFloor()).toBe(false);
    });
  });

  describe('#fallen', function() {
    it('sets onFloor to true', function() {
      preciousObject.fallen();
      expect(preciousObject.isOnFloor()).toBe(true);
    });
  });
});
