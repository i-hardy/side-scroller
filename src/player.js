function Player(body) {
  this.bodyParts = [body];
  this.body = this.bodyParts[0];
  this.object = {};
  this.isOnFloor = false;
}

Player.prototype.addParts = function(bodyPart) {
  this.bodyParts.push(bodyPart);
};

Player.prototype.create = function(frictionValue) {
  this.object = Matter.Body.create({ parts: this.bodyParts,
                              friction: frictionValue
                            });
};

Player.prototype.jump = function() {
  if(keys[KEY_W] && this.isOnFloor){
      var force = (-0.03 * this.object.mass);
      Matter.Body.applyForce(this.object,this.object.position,{x:0,y:force});
  }
};

Player.prototype.moveLeft = function() {
  if(keys[KEY_D]){
      var force = (0.003 * this.object.mass);
      Matter.Body.applyForce(this.object,this.object.position,{x:force,y:0});
  }
};

Player.prototype.moveRight = function() {
  if(keys[KEY_A]){
      var force = (-0.003 * this.object.mass);
      Matter.Body.applyForce(this.object,this.object.position,{x:force,y:0});
  }
};

Player.prototype.onFloor = function() {
  this.isOnFloor = true;
};

Player.prototype.notOnFloor = function() {
  this.isOnFloor = false;
};

Player.prototype.getBodyParts = function() {
  return this.bodyParts;
};

Player.prototype.getBodyObject = function() {
  return this.object;
};
