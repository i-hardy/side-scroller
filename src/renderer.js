function Renderer(player, world) {
  this.player = player;
  this.world = world;
  this.canvas = document.getElementById('canvas');
  this.ctx = canvas.getContext('2d');
  this.viewportCentre = {
      x: this.canvas.width * 0.5,
      y: this.canvas.height * 0.5
  };
  this.increment = 0;
}

Renderer.prototype.playerMovement = function () {
  Matter.Body.setAngle(this.player.getBodyObject(), 0);
  this.player.jump();
  this.player.moveLeft();
  this.player.moveRight();
};

Renderer.prototype.scroll = function () {
  if (this.player.getBodyObject().position.x > this.viewportCentre.x) {
    this.increment += 1;
    this.viewportCentre.x += 1;
  }
};

Renderer.prototype.updateScreen = function () {
  this.playerMovement();
  this.scroll();
  var bodies = this.world.bodies;

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
