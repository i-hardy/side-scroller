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
    gridRows: Math.floor(height / pHeight),
    gridColumns: width / pWidth,
    objectSize: pHeight,
    scrollIncrement: 3,
    playerFriction: 0.001,
    verticalForce: 0.005,
    horizontalForce: 0.001,
    playerSize: pHeight * 1.5
  };

  exports.worldOptions = worldOptions;
}(this));
