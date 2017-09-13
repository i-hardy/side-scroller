function Player(body) {
    this._body = body
    this._bodyParts = [body]
    this._object = {};
};

Player.prototype.addParts = function() {
  for (var i = 0; i < arguments.length; i++) {
    this._bodyParts.push(arguments[i])
  };
};

Player.prototype.create = function(friction) {
  this._object = Body.create({  parts: [this.bodyParts],
                                friction: friction
                            });
};

Player.prototype.getBody = function() {
  return this._body;
};

Player.prototype.getObject = function() {
  return this._object;
};
