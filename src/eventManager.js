'use strict';

function EventManager(engine) {
  this.engine = engine;
}

EventManager.prototype.playerCollisionEvent = function (event, object, action) {
  event.pairs.forEach(function (pair) {
    if (pair.bodyA.label === 'playerSensor') {
        object[action]();
    } else if (pair.bodyB.label === 'playerSensor') {
        object[action]();
    }
  });
};

EventManager.prototype.playerCollision = function (object, eventName, action) {
  var manager = this;
  Matter.Events.on(this.engine, eventName, function(event) {
    manager.playerCollisionEvent(event, object, action);
 });
};

EventManager.prototype.objectFloorCollisionEvent = function (event, worldBuilder) {
  event.pairs.forEach(function (pair) {
    if (pair.bodyA.label === 'object' && pair.bodyB.label === 'floor') {
      worldBuilder.objectOnFloor(pair.bodyA);
    }
  });
};

EventManager.prototype.objectFloorCollision = function (worldBuilder) {
  var manager = this;
  Matter.Events.on(this.engine, 'collisionStart', function(event) {
    manager.objectFloorCollisionEvent(event, worldBuilder);
  });
};

EventManager.prototype.playerFloorCollisionEvent = function (event, player) {
  event.pairs.forEach(function (pair) {
    if (pair.bodyA.label === 'playerSensor' && pair.bodyB.label === 'floor') {
      controller.playerLosesLifeOnFloor();
    }
  });
};

EventManager.prototype.playerFloorCollision = function (player) {
  var manager = this;
  Matter.Events.on(this.engine, 'collisionStart', function(event) {
    manager.playerFloorCollisionEvent(event, player);
  });
};
