function WorldBuilder(canvas) {
  this.canvas = canvas
  this.BLOCK_WIDTH = 64
  this.BLOCK_HEIGHT = 32
  this.MIN_GAP = 2
  this.MAX_GAP = 4
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
  this.lastX = 2;
  this.lastY = this.canvas.height / this.BLOCK_HEIGHT - 3;
  this.setGridElement(this.lastX, this.lastY);
};

WorldBuilder.prototype.setPlatform = function () {
  this.lastX += this.randomNumber(this.MAX_GAP,this.MIN_GAP);
  this.lastY = this.randomNumber(this.canvas.height / this.BLOCK_HEIGHT,0);
  this.setGridElement(this.lastX, this.lastY);
};

WorldBuilder.prototype.randomNumber = function(max,min) {
  return Math.floor(Math.random()*(max-min) + min);
};
