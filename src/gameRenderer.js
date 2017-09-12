function GameRenderer(canvas, context) {
  this.canvas = canvas;
  this.context = context;
  this.world = new WorldBuilder(canvas);
}

GameRenderer.prototype.createWorld = function () {
  this.world.setGrid();
  this.world.setFirstPlatform();
  this.world.setPlatform();
};

GameRenderer.prototype.drawWorld = function () {
  this.context.fillStyle = '#BAFFFF';
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

GameRenderer.prototype.drawPlatforms = function () {
  var bWidth = this.world.BLOCK_WIDTH;
  var bHeight = this.world.BLOCK_HEIGHT;
  this.context.fillStyle = '#228B22';
  for (var i = 0; i < this.canvas.height / bHeight; i++) {
    for (var j = 0; j < this.canvas.width / bWidth; j++) {
      if (this.world.getGrid()[i][j] === 1) {
        this.context.fillRect(j * bWidth, i * bHeight, bWidth, bHeight);
      }
    }
  }
};
