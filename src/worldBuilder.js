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

WorldBuilder.prototype.createPreciousObjects = function (xCoordinate) {
  this.preciousObjects.push(new PreciousObject(xCoordinate, 0));
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
    this.createPreciousObjects(j * bWidth);
    this.worldBodies.push(Matter.Bodies.rectangle(j * bWidth, i * bHeight, bWidth, bHeight, { isStatic: true }));
  }
};

WorldBuilder.prototype.preciousObjectBodies = function () {
  var builder = this;
  builder.preciousObjects.forEach(function (object) {
    builder.worldBodies.push(object.getBody());
  });
};

WorldBuilder.prototype.setGround = function () {
  var row = [];
  for (var i = 0; i < worldOptions.gridColumns; i++) {
    row.push(this.randomNumber(1, 5));
  }
  return row;
};
