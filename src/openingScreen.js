'use strict';

function OpeningScreen() {
  this.title = "KittyGame";
  this.rules = ["Your mission: to rid the shelves of their cumbersome objects",
                "Fall to the floor and you'll lose a life",
                "Touch a cactus and you'll lose points",
                "Make it to the end and get a bonus based on how much destruction you managed",
                "Good luck!"];
  this.canvas = document.getElementById('canvas');
  this.ctx = canvas.getContext('2d');
}

OpeningScreen.prototype.getTitle = function () {
  return this.title;
};

OpeningScreen.prototype.getRules = function () {
  return this.rules;
};

OpeningScreen.prototype.draw = function () {
  this.ctx.fillStyle = 'black';
  this.ctx.textAlign = 'center';
  this.ctx.font = '24px sans-serif';
  this.ctx.fillText(this.getTitle(), 512, 100);
  this.ctx.font = '16px sans-serif';
  for (var i = 0; i < this.getRules().length; i++) {
    var yHeight = 300 + (i * 16);
    this.ctx.fillText(this.getRules()[i], 512, yHeight);
  }
};
