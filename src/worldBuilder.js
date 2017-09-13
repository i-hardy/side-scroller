function WorldBuilder(canvas) {
  this.canvas = canvas
  this.BLOCK_WIDTH = 16
  this.BLOCK_HEIGHT = 8
  this.MIN_X_GAP = 1
  this.MAX_X_GAP = 3
  this.MIN_Y_GAP = -3
  this.MAX_Y_GAP = 3
}

WorldBuilder.prototype.getGrid = function () {
  return this.grid
};

WorldBuilder.prototype.setGrid = function () {
  this.grid = []
  for (var i = 0; i < this.canvas.height / this.BLOCK_HEIGHT; i++) {
    this.grid.push(this.setRow())
  }
};

WorldBuilder.prototype.setRow = function () {
  var row = []
  for (var i = 0; i < this.canvas.width / this.BLOCK_WIDTH; i++) {
    row.push(0)
  }
  return row
};

WorldBuilder.prototype.setGridElement = function (x, y) {
  this.grid[y][x] = 1;
};

WorldBuilder.prototype.setFirstPlatform = function () {
  this.lastX = 0;
  this.lastY = this.canvas.height / this.BLOCK_HEIGHT - 8;
  this.setGridElement(this.lastX, this.lastY);
};

WorldBuilder.prototype.setPlatform = function () {
  var x_change = this.randomNumber(this.MAX_X_GAP,this.MIN_X_GAP);
  var y_change = this.randomNumber(this.MAX_Y_GAP,this.MIN_Y_GAP);
  if (this.lastX + x_change < this.canvas.width/this.BLOCK_WIDTH) {
    this.lastX += x_change;
    if (this.lastY + y_change < this.canvas.height / this.BLOCK_HEIGHT && this.lastY + y_change > 0) {
      this.lastY += y_change;
    } else {
      this.lastY -= y_change;
    };
    this.setGridElement(this.lastX, this.lastY);
  };
};

WorldBuilder.prototype.randomNumber = function(max,min) {
  return Math.floor(Math.random()*(max-min) + min);
};
