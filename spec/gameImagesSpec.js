'use strict';

describe('gameImages', function () {
  describe('#loadImages', function () {
    beforeEach(function () {
      gameImages.loadImages();
    });

    it('sets the src url of every top-level property of gameImages', function () {
      for (var key in gameImages) {
        if (gameImages.hasOwnProperty(key) && key !== 'objects') {
          expect(gameImages[key].src).toBeDefined();
        }
      }
    });

    it('sets the src url of every property of gameImages.objects', function () {
      for (var key in gameImages.objects) {
        if (gameImages.objects.hasOwnProperty(key)) {
          expect(gameImages.objects[key].src).toBeDefined();
        }
      }
    });
  });
});
