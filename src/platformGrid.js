'use strict';

function PlatformGrid() {
  this.MIN_X_GAP = 1;
  this.MAX_X_GAP = 3;
  this.MIN_Y_GAP = -3;
  this.MAX_Y_GAP = 3;
  this.FIRST_PLATFORM_X = 2;
  this.FIRST_PLATFORM_Y = 1;
}

PlatformGrid.prototype.buildPlatforms = function (platformNumber) {
  this.setGrid();
  this.setFirstPlatform();
  for (var i = 0; i < platformNumber; i++) {
    this.setPlatform();
  }
};

PlatformGrid.prototype.getGrid = function () {
  return this.grid;
};

PlatformGrid.prototype.setGrid = function () {
  this.grid = [];
  for (var i = 0; i < worldOptions.gridRows; i++) {
    this.grid.push(this.setRow());
  }
};

PlatformGrid.prototype.setRow = function () {
  var row = [];
  for (var i = 0; i < worldOptions.gridColumns; i++) {
    row.push(0);
  }
  return row;
};

PlatformGrid.prototype.setGridElement = function (x, y) {
  this.grid[y][x] = 1;
};

PlatformGrid.prototype.setFirstPlatform = function () {
  this.lastX = this.FIRST_PLATFORM_X;
  this.lastY = this.FIRST_PLATFORM_Y;
  this.setGridElement(this.lastX, this.lastY);
};

PlatformGrid.prototype.setPlatform = function () {
  var x_change = randomNumberGenerator(this.MAX_X_GAP,this.MIN_X_GAP);
  var y_change = randomNumberGenerator(this.MAX_Y_GAP,this.MIN_Y_GAP);
  var new_x;
  var new_y;
  if (this.lastX + x_change < worldOptions.gridColumns) {
    new_x = this.lastX + x_change;
    new_y = this.setYCoordinates(y_change);
    // if (this.lastY + y_change < worldOptions.gridRows && this.lastY + y_change > 0) {
    //   new_y = this.lastY + y_change;
    // } else {
    //   new_y = this.lastY - y_change;
    // }
    if (this.detectInaccessiblePlatform(new_x, new_y)){
      this.setPlatform();
    } else {
      this.placePlatforms(new_x, new_y);
    }
  }
};

PlatformGrid.prototype.detectInaccessiblePlatform = function (x, y) {
  if (y===this.secondlastY){
    return ((this.lastX-this.secondlastX)===1&&(x-this.lastX)===1)
  }
    return false;
};

PlatformGrid.prototype.placePlatforms = function (x, y) {
  this.secondlastX = this.lastX;
  this.secondlastY = this.lastY;
  this.lastX = x;
  this.lastY = y;
  this.setGridElement(this.lastX, this.lastY);
};

PlatformGrid.prototype.setYCoordinates = function (y_change) {
  if (this.lastY + y_change < worldOptions.gridRows && this.lastY + y_change > 0) {
    return this.lastY + y_change;
  } else {
    return this.lastY - y_change;
  }
};
