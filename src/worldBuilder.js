'use strict';

function WorldBuilder() {
  this.worldBodies = [];
  this.preciousObjects = [];
  this.platformGrid = new PlatformGrid();
}

WorldBuilder.prototype.buildCompleteWorld = function () {
  this.buildPlatforms();
  this.createWorldBodies();
  this.preciousObjectBodies();
};

WorldBuilder.prototype.buildPlatforms = function () {
  this.platformGrid.buildPlatforms(worldOptions.gridColumns);
};

WorldBuilder.prototype.getPlatformGrid = function () {
  return this.platformGrid.getGrid();
};

WorldBuilder.prototype.getPreciousObjects = function () {
  return this.preciousObjects;
};

WorldBuilder.prototype.getFallenObjects = function () {
  return this.preciousObjects.filter(function (object) {
    return object.isOnFloor();
  });
};

WorldBuilder.prototype.fallenObjectPreciousness = function () {
  return this.getFallenObjects().map(function (object) {
    return object.preciousness;
  });
};

WorldBuilder.prototype.createPreciousObjects = function (xCoordinate) {
  this.preciousObjects.push(new PreciousObject(xCoordinate, 0));
};

WorldBuilder.prototype.objectOnFloor = function (body) {
  this.preciousObjects.forEach(function (object) {
    if (object.getBody() === body) {
      object.fallen();
    }
  });
};

WorldBuilder.prototype.objectsStillOnPlatforms = function () {
  return this.preciousObjects > this.getFallenObjects();
};

WorldBuilder.prototype.getWorldBodies = function () {
  return this.worldBodies;
};

WorldBuilder.prototype.createWorldBodies = function () {
  for (var i = 0; i < worldOptions.gridRows; i++) {
    for (var j = 0; j < worldOptions.gridColumns; j++) {
      this.platformBodies(i, j);
    }
  }
};

WorldBuilder.prototype.platformBodies = function (i, j) {
  var bWidth = worldOptions.platformWidth;
  var bHeight = worldOptions.platformHeight;
  if (this.getPlatformGrid()[i][j] === 1) {
    var y = 452 - (i * bHeight);
    var x = j * bWidth - (bWidth/2);
    this.placeObjects(x);
    this.worldBodies.push(Matter.Bodies.rectangle(x, y, bWidth, bHeight, { isStatic: true,
                                                                           label: 'platform'}));
  }
};

WorldBuilder.prototype.preciousObjectBodies = function () {
  var builder = this;
  builder.preciousObjects.forEach(function (object) {
    builder.worldBodies.push(object.getBody());
  });
};

WorldBuilder.prototype.placeObjects = function (xCoordinate) {
  if (randomNumberGenerator(0, 2) === 1) {
    this.createPreciousObjects(xCoordinate);
  }
};
