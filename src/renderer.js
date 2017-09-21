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

Renderer.prototype.drawObjects = function () {
    var bubble = this;
    var objects = [];
    for (var key in gameImages.objects) {
      if (gameImages.objects.hasOwnProperty(key)) {
        objects.push(gameImages.objects[key]);
      }
    }
    var platformNumber = this.world.bodies.filter(function(body){
        return body.label === "platform";
      }).length;

    this.world.bodies.forEach(function(body, i) {
      var sprite = body.render.sprite;
      var texture;

      if (body.label === "object") {
          texture = objects[(i-platformNumber)%objects.length];
          //bubble.ctx.drawImage(objects[(i-platformNumber)%objects.length], body.position.x-20, body.bounds.max.y-40);

      } else if (body.label === "cactus") {
        texture = gameImages.cactus;
        //bubble.ctx.drawIrmage(gameImages.cactus, body.position.x-10, body.bounds.max.y-40);

      } else if (body.label === "platform") {
                //texture = gameImages.shelf;
                bubble.ctx.drawImage(gameImages.shelf, body.position.x-64, body.position.y-20);


      } else if (body.label === "floor") {
        bubble.ctx.drawImage(gameImages.floor, body.position.x-4608, body.bounds.max.y-20);
      }

      if (texture != null) {
        bubble.ctx.translate(body.position.x, body.position.y);
        bubble.ctx.rotate(body.angle);
        bubble.ctx.drawImage(texture,
                              texture.width * -sprite.xOffset * sprite.xScale,
                              texture.height * -sprite.yOffset * sprite.yScale,
                              texture.width * sprite.xScale,
                              texture.height * sprite.yScale
                            );
        bubble.ctx.rotate(-body.angle);
        bubble.ctx.translate(-body.position.x, -body.position.y)
      }
    });
};


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

Renderer.prototype.returnViewToStart = function () {
  this.viewport.leftEdge = 0;
  this.viewport.centreX = worldOptions.viewWidth * 0.5;
  this.viewport.rightEdge = worldOptions.viewWidth;
};

Renderer.prototype.receiveScore = function (number) {
  this.score = number;
};

Renderer.prototype.receiveDestructionPercentage = function (percentage) {
  this.destructionPercentage = percentage;
};

Renderer.prototype.scoreText = function () {
  return playerName + "'s score: " + this.score;
};

Renderer.prototype.showDestructionPercentage = function () {
  return this.destructionPercentage;
};

Renderer.prototype.drawWall = function () {
  this.ctx.globalAlpha = 0.8;
  this.ctx.drawImage(gameImages.wall, 0, 0);
  this.ctx.globalAlpha = 1;
};

Renderer.prototype.gameLoop = function () {
  this.playerMovement();
  this.checkBorder();
  this.sounds();
  this.scroll();
};

Renderer.prototype.spriteLoop = function () {
  this.player.spriteUpdate();
};

Renderer.prototype.updateScreen = function () {
  var bodies = this.world.bodies;

  this.ctx.clearRect(0, 0, worldOptions.viewWidth, worldOptions.height);
  this.ctx.translate(-this.viewport.leftEdge, 0);

  this.drawWall();

  this.ctx.font = '24px Bangers';
  this.ctx.fillText(this.scoreText(), this.viewport.centreX, 50);
  this.ctx.fillText(this.player.getLives(), this.viewport.centreX, 80);

  this.drawObjects();

  this.drawPlayer();
  this.ctx.setTransform(1, 0, 0, 1, 0, 0);

  var renderer = this;

  if (gameController.isGameOver()) {
    renderer.endGameScreen();
  } else {
    window.requestAnimationFrame(function () {
      renderer.updateScreen();
    });
  }
};

Renderer.prototype.endGameScreen = function () {
  domInterface.showResetButton();
  this.ctx.clearRect(0, 0, worldOptions.viewWidth, worldOptions.height);
  this.ctx.fillStyle = 'black';
  this.ctx.font = '24px Bangers';
  this.ctx.fillText(this.scoreText(), this.viewport.centreX, 50);
  this.ctx.fillText(this.showDestructionPercentage(), this.viewport.centreX, 100);
};
