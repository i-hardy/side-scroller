'use strict';

function OpeningScreen() {
  this.title = "Catastrophe!";
  this.rules = ["Your mission: to rid the shelves of their cumbersome objects",
                "Fall to the floor and you'll lose a life",
                "Touch a cactus and you'll lose points",
                "Make it to the end and get a bonus based on how much destruction you cause",
                "Good luck!"];
  this.mute = "music off/on = m";
  this.canvas = document.getElementById('canvas');
  this.ctx = canvas.getContext('2d');
}

OpeningScreen.prototype.getTitle = function () {
  return this.title;
};

OpeningScreen.prototype.getRules = function () {
  return this.rules;
};

OpeningScreen.prototype.getMute = function () {
  return this.mute;
};

OpeningScreen.prototype.drawWall = function () {
  this.ctx.globalAlpha = 0.8;
  this.ctx.drawImage(gameImages.wall, 0, 0);
  this.ctx.globalAlpha = 1;
};

OpeningScreen.prototype.draw = function () {
  this.ctx.clearRect(0, 0, worldOptions.width, worldOptions.height);
  this.ctx.drawImage(gameImages.wall, 0, 0);
  this.ctx.fillStyle = 'white';
  this.ctx.fillRect(75, 50, (worldOptions.viewWidth - 150), (worldOptions.height - 100))
  this.ctx.fillStyle = 'black';
  this.ctx.textAlign = 'center';
  this.ctx.font = '64px Lobster';
  this.ctx.fillText(this.getTitle(), 512, 125);
  this.ctx.font = '20px Bangers';
  this.ctx.fillText(this.getMute(), 875, 75)
  this.ctx.font = '24px Bangers';
  for (var i = 0; i < this.getRules().length; i++) {
    var yHeight = 325 + (i * 24);
    this.ctx.fillText(this.getRules()[i], 512, yHeight);
  }
};
