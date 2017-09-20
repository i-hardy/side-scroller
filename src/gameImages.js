(function(exports) {
  'use strict';

  var gameImages = {
    wall: new Image(),
    player: new Image(),
    shelf: new Image(),
    floor: new Image(),
    cactus: new Image(),
    objects: {cupcake: new Image(),
              fishbowl: new Image(),
              macbook: new Image(),
              mario: new Image(),
              mushroom: new Image(),
              pokeball: new Image(),
              pooCake: new Image(),
              ruby: new Image(),
              tardis: new Image(),
              teapot: new Image(),
              teddy: new Image(),
              wine: new Image(),
              wool: new Image()
            },
    loadImages: function () {
      for (var key in gameImages) {
        if (gameImages.hasOwnProperty(key) && key !== "objects") {
          gameImages[key].src = "assets/images/" + key + ".png";
        }
      }
      for (var key in gameImages.objects) {
        if (gameImages.objects.hasOwnProperty(key)) {
          gameImages.objects[key].src = "assets/images/" + key + ".png";
        }
      }
    }
  };

  exports.gameImages = gameImages;
}(this));
