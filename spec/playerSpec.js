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

  describe('#spriteImage', function () {
    it('returns the associated sprite image', function () {
      spyOn(Sprite.prototype, 'getImage');
      player.spriteImage();
      expect(Sprite.prototype.getImage).toHaveBeenCalled();
    });
  });

  describe('#spriteFrameIndexes', function () {
    it('returns the associated sprite frame indexes', function () {
      spyOn(Sprite.prototype, 'getFrameIndexes');
      player.spriteFrameIndexes();
      expect(Sprite.prototype.getFrameIndexes).toHaveBeenCalled();
    });
  });

  describe('#spriteCurrentFrame', function () {
    it('returns the associated sprite current frame', function () {
      spyOn(Sprite.prototype, 'getCurrentFrame');
      player.spriteCurrentFrame();
      expect(Sprite.prototype.getCurrentFrame).toHaveBeenCalled();
    });
  });

  describe('#spriteHeight', function () {
    it('returns the associated sprite height', function () {
      spyOn(Sprite.prototype, 'getHeight');
      player.spriteHeight();
      expect(Sprite.prototype.getHeight).toHaveBeenCalled();
    });
  });

  describe('#spriteWidth', function () {
    it('returns the associated sprite width', function () {
      spyOn(Sprite.prototype, 'getWidth');
      player.spriteWidth();
      expect(Sprite.prototype.getWidth).toHaveBeenCalled();
    });
  });

  describe('#spriteDirection', function () {
    it('returns the associated sprite direction', function () {
      spyOn(Sprite.prototype, 'getDirection');
      player.spriteDirection();
      expect(Sprite.prototype.getDirection).toHaveBeenCalled();
    });
  });

  describe('#spriteUpdate', function () {
    it('calls the associated sprite update function', function () {
      spyOn(Sprite.prototype, 'update');
      player.spriteUpdate();
      expect(Sprite.prototype.update).toHaveBeenCalled();
    });
  });

  describe('#getLives', function () {
    it('defaults to nine', function () {
      expect(player.getLives()).toEqual(9);
    });
  });

  describe('#decreaseLives', function () {
    it('decrases lives', function () {
      player.decreaseLives();
      expect(player.getLives()).toEqual(8);
    });
  });

  describe('#isDead', function () {
    it('returns true if lives are zero', function () {
      for (var i = 0; i < 9; i++) {
        player.decreaseLives();
      }
      expect(player.isDead()).toEqual(true);
    });

    it('returns true if lives are zero', function () {
      expect(player.isDead()).toEqual(false);
    });
  });

  describe('#livesText', function () {
    it('returns current lives as a string', function () {
      expect(player.livesText()).toEqual("Lives: " + player.getLives());
    });
  });
});
