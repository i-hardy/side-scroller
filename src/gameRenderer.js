function GameRenderer(canvas, context) {
  this.canvas = canvas;
  this.context = context;
  this.world = new WorldBuilder(canvas);
  this.PLATFORM_COLOR = '#228B22';
  this.LAVA_COLOR = '#FF3200';
  this.SPIKE_COLOR = '#0090FF';
  this.WATER_COLOR = '#000000';
}

GameRenderer.prototype.createWorld = function () {
  this.world.setGrid();
  this.world.setFirstPlatform();
  for (var i = 0; i < 30; i++) {
    this.world.setPlatform();
  }
};

GameRenderer.prototype.drawWorld = function () {
  this.context.fillStyle = '#BAFFFF';
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

GameRenderer.prototype.drawPlatforms = function () {
  var bWidth = this.world.BLOCK_WIDTH;
  var bHeight = this.world.BLOCK_HEIGHT;
  for (var i = 0; i < this.canvas.height / bHeight; i++) {
    for (var j = 0; j < this.canvas.width / bWidth; j++) {
      if (this.world.getGrid()[i][j] === 1) {
          this.context.fillStyle = this.PLATFORM_COLOR;
        this.context.fillRect(j * bWidth, i * bHeight, bWidth, bHeight);
      } else if (this.world.getGrid()[i][j] === 2) {
          this.context.fillStyle = this.LAVA_COLOR;
        this.context.fillRect(j * bWidth, i * bHeight, bWidth, bHeight);
      }  else if (this.world.getGrid()[i][j] === 3) {
          this.context.fillStyle = this.SPIKE_COLOR;
        this.context.fillRect(j * bWidth, i * bHeight, bWidth, bHeight);
      } else if (this.world.getGrid()[i][j] === 4) {
          this.context.fillStyle = this.WATER_COLOR;
        this.context.fillRect(j * bWidth, i * bHeight, bWidth, bHeight);
      }
    }
  }
};
