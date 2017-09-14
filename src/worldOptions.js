(function(exports) {
  'use strict';

  var width = 9216;
  var height = 512;
  var pWidth = 128;
  var pHeight = 32;

  var worldOptions = {
    width: width,
    viewWidth: 1024,
    height: height,
    platformWidth: pWidth,
    platformHeight: pHeight,
    gridRows: height / pHeight,
    gridColumns: width / pWidth,
    scrollIncrement: 1,
    playerFriction: 0.5,
    verticalForce: 0.03,
    horizontalForce: 0.0015
  };

  exports.worldOptions = worldOptions;
}(this));
