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
