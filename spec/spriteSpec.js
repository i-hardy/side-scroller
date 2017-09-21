'use strict';

describe('Sprite', function() {

  var sprite;

  beforeEach(function() {
    sprite = new Sprite;
  });

  describe('#getFrameIndexes', function () {
    it('returns this.frameIndexes', function () {
      expect(sprite.getFrameIndexes()).toEqual(jasmine.any(Array));
    });
  });

  describe('#getDirection', function () {
    beforeEach(function () {
      keys = [];
      spyOn(sprite, 'leftOrRight').and.callThrough();
      spyOn(sprite, 'jumpingOrStanding').and.callThrough();
    });

    it('checks the horizontal orientation of the sprite', function () {
      sprite.getDirection();
      expect(sprite.leftOrRight).toHaveBeenCalled();
    });

    it('checks if the player is airborne or not moving at all', function () {
      sprite.getDirection();
      expect(sprite.jumpingOrStanding).toHaveBeenCalled();
    });

    it('returns 1 if the W key is active', function () {
      keys[KEY_W] = true;
      expect(sprite.getDirection()).toEqual(1);
    });

    it('returns 1 if the D key is active', function () {
      keys[KEY_D] = true;
      expect(sprite.getDirection()).toEqual(1);
    });

    it('returns 0 if the A key is active', function () {
      keys[KEY_A] = true;
      expect(sprite.getDirection()).toEqual(0);
    });
  });

  describe('#leftOrRight', function () {
    beforeEach(function () {
      keys = [];
    });

    it('sets direction to 1 if the D key is active', function () {
      keys[KEY_D] = true;
      sprite.leftOrRight();
      expect(sprite.getDirection()).toEqual(1);
    });

    it('sets direction to 0 if the A key is active', function () {
      keys[KEY_A] = true;
      sprite.leftOrRight();
      expect(sprite.getDirection()).toEqual(0);
    });
  });

  describe('#jumpingOrStanding', function () {
    beforeEach(function () {
      keys = [];
    });

    it('sets the current frame to 4 if the W key is active', function () {
      keys[KEY_W] = true;
      sprite.jumpingOrStanding();
      expect(sprite.getCurrentFrame()).toEqual(4);
    });

    it('sets the current frame to 1 if the A & D keys are inactive', function () {
      keys[KEY_A] = false;
      keys[KEY_D] = false;
      sprite.jumpingOrStanding();
      expect(sprite.getCurrentFrame()).toEqual(1);
    });
  });

  describe('#update', function () {
    it('increments the frame number if the animation has not ended', function () {
      sprite.update();
      expect(sprite.getCurrentFrame()).toEqual(3);
    });

    it('resets the animation if it has ended', function () {
      sprite.currentFrame = 4;
      sprite.update();
      expect(sprite.getCurrentFrame()).toEqual(0);
    });
  });

  describe('#getImage', function () {
    it('returns this.image', function () {
      expect(sprite.getImage()).toEqual(jasmine.any(Image));
    });
  });

  describe('#getCurrentFrame', function () {
    it('returns this.currentFrame', function () {
      expect(sprite.getCurrentFrame()).toEqual(jasmine.any(Number));
    });
  });

  describe('#getHeight', function () {
    it('returns this.currentFrame', function () {
      expect(sprite.getHeight()).toEqual(jasmine.any(Number));
    });
  });

  describe('#getWidth', function () {
    it('returns this.currentFrame', function () {
      expect(sprite.getWidth()).toEqual(jasmine.any(Number));
    });
  });

});
