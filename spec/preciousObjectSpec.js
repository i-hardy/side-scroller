'use strict';

describe('PreciousObject', function() {
  var preciousObject;

  beforeEach(function() {
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

  describe('#coordinates', function() {
    it('returns the current x coordinate', function () {
      expect(preciousObject.xCoordinate()).toEqual(100);
    });

    it('returns the current y coordinate', function () {
      expect(preciousObject.yCoordinate()).toEqual(150);
    });
  });

  describe('hitting the ground', function() {
    it('returns true when it hits the ground', function() {
      preciousObject.y = 240;
      expect(preciousObject.isOnGround()).toBe(true);
    });
  });
});
