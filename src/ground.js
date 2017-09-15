function Ground () {
}

Ground.prototype.setGround = function () {
  var row = [];
  for (var i = 0; i < worldOptions.gridColumns; i++) {
    row.push(this.randomNumber(1, 5));
  }
  return row;
};
