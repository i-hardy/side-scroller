'use strict';

describe('Player', function() {
  var player;
  var body = {};
  var bodyPartTwo = {};
  var bodyPartThree = {};

  beforeEach( function() {
    player = new Player(body);
  });

  describe('#getBodyObject', function() {
    it('returns this._object', function() {
      expect(player.getBodyObject()).toEqual(player.object);
    });
  });

  describe('#addParts', function() {
    it('adds additional objects to this._bodyParts', function() {
      player.addParts(bodyPartTwo);
      player.addParts(bodyPartThree);
      expect(player.getBodyParts()).toEqual([body, bodyPartTwo, bodyPartThree]);
    });
  });

  describe('#isOnASurface', function () {
    it('returns whether or not the player is resting on a solid object', function () {
      expect(player.isOnASurface()).toBe(false);
    });
  });

  describe('#onFloor', function () {
    it('sets the onFloor value to true', function () {
      player.onFloor();
      expect(player.isOnASurface()).toBe(true);
    });
  });

  describe('#notOnFloor', function () {
    it('sets the onFloor value to false', function () {
      player.onFloor();
      player.notOnFloor();
      expect(player.isOnASurface()).toBe(false);
    });
  });

  describe('#create', function() {
    it('updates this._object with a Matter Body.create object', function() {
      spyOn(Matter.Body, "create");
      player.create();
      expect(Matter.Body.create).toHaveBeenCalled();
    });
  });

  describe('#jump', function () {
    beforeEach(function () {
      spyOn(Matter.Body, 'applyForce');
      keys[KEY_W] = true;
    });

    it('applies a force to the player if the W key is active', function () {
      player.onFloor();
      player.jump();
      expect(Matter.Body.applyForce).toHaveBeenCalled();
    });

    it('does not apply the force if the player is not resting on another object', function () {
      player.jump();
      expect(Matter.Body.applyForce).not.toHaveBeenCalled();
    });
  });

  describe('#moveRight', function () {
    beforeEach(function () {
      spyOn(Matter.Body, 'applyForce');
      keys = [];
    });

    it('applies a force if the D key is active', function () {
      keys[KEY_D] = true;
      player.moveRight();
      expect(Matter.Body.applyForce).toHaveBeenCalled();
    });

    it('otherwise does nothing', function () {
      player.moveRight();
      expect(Matter.Body.applyForce).not.toHaveBeenCalled();
    });
  });

  describe('#moveLeft', function () {
    beforeEach(function () {
      spyOn(Matter.Body, 'applyForce');
      keys = [];
    });

    it('applies a force if the A key is active', function () {
      keys[KEY_A] = true;
      player.moveLeft();
      expect(Matter.Body.applyForce).toHaveBeenCalled();
    });

    it('otherwise does nothing', function () {
      player.moveLeft();
      expect(Matter.Body.applyForce).not.toHaveBeenCalled();
    });
  });
});
