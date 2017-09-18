'use strict';

describe('Cactus', function () {
  var rodrigo;

  beforeEach(function () {
    spyOn(window, 'randomNumberGenerator').and.returnValue(1);
    rodrigo = new Cactus();
  });

  describe('#getSpikiness', function () {
    it('returns the spikiness of the cactus', function () {
      expect(rodrigo.getSpikiness()).toEqual(1);
    });
  });

  describe('hasBeenTouched', function () {
    it('returns whether or not the player has touched the cactus', function () {
      expect(rodrigo.hasBeenTouched()).toBe(false);
    });
  });

  describe('playerTouch', function () {
    it('changes the touched value to true', function () {
      rodrigo.playerTouch();
      expect(rodrigo.hasBeenTouched()).toBe(true);
    });
  });

  describe('#createBody', function () {
    it('creates a Matter body for the cactus', function () {
      spyOn(Matter.Bodies, 'rectangle');
      rodrigo.createBody();
      expect(Matter.Bodies.rectangle).toHaveBeenCalled();
    });
  });

  describe('#getBody', function () {
    it('returns the Matter body', function () {
      spyOn(Matter.Bodies, 'rectangle').and.returnValue({name: 'Body'});
      rodrigo.createBody();
      expect(rodrigo.getBody()).toEqual({name: 'Body'});
    });
  });
});
