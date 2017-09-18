'use strict';

function WorldBuilder() {
  this.worldBodies = [];
  this.objects = [];
  this.platformGrid = new PlatformGrid();
}

WorldBuilder.prototype.buildCompleteWorld = function () {
  this.buildPlatforms();
  this.createWorldBodies();
  this.nonPlatformBodies();
};

WorldBuilder.prototype.buildPlatforms = function () {
  this.platformGrid.buildPlatforms(worldOptions.gridColumns);
};

WorldBuilder.prototype.getPlatformGrid = function () {
  return this.platformGrid.getGrid();
};

WorldBuilder.prototype.getAllObjects = function () {
  return this.objects;
};


WorldBuilder.prototype.getCollidedObjects = function () {
  return this.objects.filter(function (object) {
    return object.hasCollided();
  });
};

WorldBuilder.prototype.fallenObjectPreciousness = function () {
  var sum = 0;
  this.getCollidedObjects().forEach(function (object) {
    sum += object.getPreciousness();
  });
  return sum;
};

WorldBuilder.prototype.createPreciousObjects = function (xCoordinate) {
  this.objects.push(new PreciousObject(xCoordinate, 0, this.objectOrCactus()));
};

WorldBuilder.prototype.objectCollided = function (body) {
  this.objects.forEach(function (object) {
    if (object.getBody() === body) {
      object.collision();
    }
  });
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
    var y = (worldOptions.height - worldOptions.playerSize) - (i * bHeight);
    var x = j * bWidth - (bWidth/2);
    this.placeObjects(x);
    this.worldBodies.push(Matter.Bodies.rectangle(x, y, bWidth, bHeight, { isStatic: true,
                                                                           label: 'platform'}));
  }
};

WorldBuilder.prototype.nonPlatformBodies = function () {
  var builder = this;
  builder.objects.forEach(function (object) {
    builder.worldBodies.push(object.getBody());
  });
};

WorldBuilder.prototype.placeObjects = function (xCoordinate) {
  if (randomNumberGenerator(0, 2) === 1) {
    this.createPreciousObjects(xCoordinate);
  }
};

WorldBuilder.prototype.objectOrCactus = function () {
  if (randomNumberGenerator(0, 10) === 1) {
    return 'cactus';
  } else {
    return 'object';
  }
};

WorldBuilder.prototype.fallenPreciousObjectsRatio = function () {
  var allPreciousObjects = this.getAllObjects().filter(function (object) {
    return object.getType() !== 'cactus';
  });
  var allFallenObjects = this.getCollidedObjects().filter(function (object) {
    return object.getType() !== 'cactus';
  });
  return (allFallenObjects.length / allPreciousObjects.length);
};
