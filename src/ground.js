function Ground () {
}

Ground.prototype.setGround = function () {
  var row = [];
  for (var i = 0; i < worldOptions.gridColumns; i++) {
    row.push(this.rng.randomNumberGenerator(1, 5));
  }
  return row;
};
