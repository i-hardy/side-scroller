function Renderer(player, world, soundEngine) {
  this.player = player;
  this.world = world;
  this.soundEngine = soundEngine;
  this.canvas = document.getElementById('canvas');
  this.ctx = canvas.getContext('2d');
  this.viewport = {
      centreX: worldOptions.viewWidth * 0.5,
      rightEdge: worldOptions.viewWidth
  };
  this.increment = 0;
}

Renderer.prototype.sounds = function() {
  this.soundEngine.playerSounds();
};

Renderer.prototype.playerMovement = function () {
  Matter.Body.setAngle(this.player.getBodyObject(), 0);
  this.player.jump();
  this.player.moveLeft();
  this.player.moveRight();
};

Renderer.prototype.scroll = function () {
  var playerX = this.player.getBodyObject().position.x;
  var worldEdge = this.world.bounds.max.x;
  if (playerX > this.viewport.centreX && worldEdge > this.viewport.rightEdge) {
    this.increment += worldOptions.scrollIncrement;
    this.viewport.centreX += worldOptions.scrollIncrement;
    this.viewport.rightEdge += worldOptions.scrollIncrement;
  }
};

Renderer.prototype.updateScreen = function () {
  Matter.Body.setAngle(this.player.getBodyObject(), 0)
  this.playerMovement();
  this.sounds();
  this.scroll();
  var bodies = this.world.bodies;

  this.ctx.clearRect(0, 0, worldOptions.viewWidth, worldOptions.height);
  this.ctx.translate(-this.increment, 0);

  this.ctx.beginPath();
  for (var i = 0; i < bodies.length; i += 1) {
    var vertices = bodies[i].vertices;
    this.ctx.moveTo(vertices[0].x, vertices[0].y);
    for (var j = 1; j < vertices.length; j += 1) {
        this.ctx.lineTo(vertices[j].x, vertices[j].y);
    }
    this.ctx.lineTo(vertices[0].x, vertices[0].y);
  }
  this.ctx.lineWidth = 1;
  this.ctx.strokeStyle = '#000';
  this.ctx.stroke();
  this.ctx.setTransform(1, 0, 0, 1, 0, 0);

  var renderer = this;

  window.requestAnimationFrame(function () {
    renderer.updateScreen();
  });
};
