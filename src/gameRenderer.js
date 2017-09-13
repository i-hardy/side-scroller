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
  for (var i = 0; i < this.canvas.height / this.world.BLOCK_HEIGHT; i++) {
    for (var j = 0; j < this.canvas.width / this.world.BLOCK_WIDTH; j++) {
      if (this.world.getGrid()[i][j] === 1) {
        this.drawSinglePlatform(j,i,this.PLATFORM_COLOR);
      } else if (this.world.getGrid()[i][j] === 2) {
        this.drawSinglePlatform(j,i,this.LAVA_COLOR);
      }  else if (this.world.getGrid()[i][j] === 3) {
        this.drawSinglePlatform(j,i,this.SPIKE_COLOR);
      } else if (this.world.getGrid()[i][j] === 4) {
        this.drawSinglePlatform(j,i,this.WATER_COLOR);
      }
    }
  }
};

GameRenderer.prototype.drawSinglePlatform = function (x,y,color) {
  var bWidth = this.world.BLOCK_WIDTH;
  var bHeight = this.world.BLOCK_HEIGHT;
  this.context.fillStyle = color;
  this.context.fillRect(x * bWidth, y * bHeight, bWidth, bHeight);
};
