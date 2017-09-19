(function(exports) {
  'use strict';

  var gameImages = {
    background: new Image(),
    player: new Image(),
    loadImages: function () {
      gameImages.background.src = "assets/images/wall.jpg";
      gameImages.player.src = "assets/images/cats_sprite1.png";
    }
  };

  exports.gameImages = gameImages;
}(this));
