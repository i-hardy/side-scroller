'use strict';

describe('PreciousObject', function() {
  var preciousObject;
  var jimmy;
  var canvas = {
    width: 512,
    height: 256
  };

  beforeEach(function() {
    preciousObject = new PreciousObject(100, 150);
    jimmy = new WorldBuilder(canvas)
  });

  describe('#instantiation', function() {
    it('can be created as an instance', function() {
      expect(preciousObject).toBeDefined();
    });
    it('has a preciousness', function() {
      expect(preciousObject.preciousness).toBeDefined();
    })
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
    it('returns true when it hits the ground', function (){
      preciousObject.y = (canvas.height - jimmy.BLOCK_HEIGHT*2);
      expect(preciousObject.isOnGround()).toBe(true);
    });
  });
});
