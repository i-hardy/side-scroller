'use strict';

function Renderer(player, world, soundEngine) {
  this.player = player;
  this.world = world;
  this.score = 0;
  this.soundEngine = soundEngine;
  this.canvas = document.getElementById('canvas');
  this.ctx = canvas.getContext('2d');
  this.viewport = {
      centreX: worldOptions.viewWidth * 0.5,
      rightEdge: worldOptions.viewWidth,
      leftEdge: 0
  };
}

Renderer.prototype.sounds = function() {
  this.soundEngine.runSounds();
};

Renderer.prototype.playerMovement = function () {
  Matter.Body.setAngle(this.player.getBodyObject(), 0);
  this.player.jump();
  this.player.moveLeft();
  this.player.moveRight();
};

Renderer.prototype.drawPlayer = function() {
  this.ctx.drawImage(
    this.player.spriteImage(),
    0 + this.player.spriteFrameIndexes()[this.player.spriteDirection()][this.player.spriteCurrentFrame()] * this.player.spriteWidth(),
    0 + this.player.spriteDirection() * this.player.spriteHeight(),
    this.player.spriteWidth(),
    this.player.spriteHeight(),
    this.player.getBodyObject().position.x - 42,
    this.player.getBodyObject().position.y - 42,
    90,
    90);
};

Renderer.prototype.drawShelf = function () {
    var bubble = this;
    this.world.bodies.forEach(function(body) {
      if (body.label === "object") {
        bubble.ctx.drawImage(document.getElementById("cupcake_img"), body.position.x-20, body.position.y-20);
      } else if (body.label === "platform") {
        bubble.ctx.drawImage(document.getElementById("shelf_img"), body.position.x-64, body.position.y-20);
      }
  }
)};


Renderer.prototype.checkBorder = function () {
  var playerBounds = this.player.getBodyObject().bounds;
  if (playerBounds.min.x < this.viewport.leftEdge || playerBounds.max.x > this.viewport.rightEdge) {
    this.reverseVelocity();
  }
};

Renderer.prototype.reverseVelocity = function () {
  var horizonalVelocity = this.player.getBodyObject().velocity.x;
  Matter.Body.applyForce(this.player.getBodyObject(),
                          this.player.getBodyObject().position,
                          {x:(-horizonalVelocity/50), y:0});
};

Renderer.prototype.scroll = function () {
  var playerX = this.player.getBodyObject().position.x;
  var worldEdge = this.world.bounds.max.x;
  if (playerX > this.viewport.centreX && worldEdge > this.viewport.rightEdge) {
    this.viewport.leftEdge += worldOptions.scrollIncrement;
    this.viewport.centreX += worldOptions.scrollIncrement;
    this.viewport.rightEdge += worldOptions.scrollIncrement;
  }
};

Renderer.prototype.receiveScore = function (number) {
  this.score = number;
};

Renderer.prototype.receiveDestructionPercentage = function (percentage) {
  this.destructionPercentage = percentage;
};

Renderer.prototype.scoreText = function () {
  return 'Score: ' + this.score;
};

Renderer.prototype.showDestructionPercentage = function () {
  return this.destructionPercentage;
};

Renderer.prototype.updateScreen = function () {
  this.playerMovement();
  this.checkBorder();
  this.sounds();
  this.scroll();
  var bodies = this.world.bodies;

  this.ctx.clearRect(0, 0, worldOptions.viewWidth, worldOptions.height);
  this.ctx.translate(-this.viewport.leftEdge, 0);

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
  this.ctx.font = '24px sans-serif';
  this.ctx.fillText(this.scoreText(), this.viewport.centreX, 50);

  this.drawPlayer();
  this.player.spriteUpdate();

  this.drawShelf();

  this.ctx.setTransform(1, 0, 0, 1, 0, 0);

  var renderer = this;

  window.requestAnimationFrame(function () {
    renderer.updateScreen();
  });
};

Renderer.prototype.endGameScreen = function () {
  this.ctx.font = '24px sans-serif';
  this.ctx.fillText(this.scoreText(), this.viewport.centreX, 50);
  this.ctx.fillText(this.showDestructionPercentage(), this.viewport.centreX, 100);
};
