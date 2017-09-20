(function(exports) {
  'use strict';

  var width = 9216;
  var height = 512;
  var pWidth = 128;
  var pHeight = 40;

  var worldOptions = {
    width: width,
    viewWidth: 1024,
    height: height,
    platformWidth: pWidth,
    platformHeight: pHeight,
    gridRows: Math.floor(height / pHeight) - 2,
    gridColumns: width / pWidth,
    object: pHeight-10,
    cactus: pHeight-10,
    scrollIncrement: 3,
    playerFriction: 0.001,
    verticalForce: 0.01,
    horizontalForce: 0.001,
    playerSize: pHeight * 1.5,
    preciousObjectsImg: ["wine_img",
                    "cupcake_img",
                    "fishbowl_img",
                    "macbook_img",
                    "mario_img",
                    "mushroom_img",
                    "pokeball_img",
                    "poo-cake_img",
                    "ruby_img",
                    "tardis_img",
                    "teapot_img",
                    "teddy_img",
                    "wool_img"
                  ]
  };

  exports.worldOptions = worldOptions;
}(this));
