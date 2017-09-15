function PlatformGrid() {
  this.MIN_X_GAP = 1;
  this.MAX_X_GAP = 3;
  this.MIN_Y_GAP = -3;
  this.MAX_Y_GAP = 3;
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
  this.lastX = 2;
  this.lastY = worldOptions.gridRows - 3;
  this.setGridElement(this.lastX, this.lastY);
};

PlatformGrid.prototype.setPlatform = function () {
  var x_change = this.randomNumber(this.MAX_X_GAP,this.MIN_X_GAP);
  var y_change = this.randomNumber(this.MAX_Y_GAP,this.MIN_Y_GAP);
  if (this.lastX + x_change < worldOptions.gridColumns) {
    this.lastX += x_change;
    if (this.lastY + y_change < worldOptions.gridRows && this.lastY + y_change > 0) {
      this.lastY += y_change;
    } else {
      this.lastY -= y_change;
    }
    this.setGridElement(this.lastX, this.lastY);
  }
};

PlatformGrid.prototype.randomNumber = function(max,min) {
  return Math.floor(Math.random()*(max-min) + min);
};
