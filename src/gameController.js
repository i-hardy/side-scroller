function GameController () {
  this.engine = Matter.Engine.create();
  this.world = this.engine.world;
  this.worldBuilder = new WorldBuilder();
  this.score = new Score();
  this.player = new Player(Matter.Bodies.rectangle(30,0, worldOptions.playerSize, worldOptions.playerSize, { density:0.002, friction: 0.5 }));
  this.player.addParts(Matter.Bodies.circle(30,45,5, {density:0, friction:0.3, isSensor: true, label: 'playerSensor'}));
  this.soundEngine = new SoundEngine(this.player);
}

GameController.prototype.addCollisionEvent = function (object, label, eventName, action) {
  Matter.Events.on(this.engine, eventName, function(event) {
    event.pairs.forEach(function (pair) {
      if (pair.bodyA.label === label) {
          object[action]();
      } else if (pair.bodyB.label === label) {
          object[action]();
      }
    });
 });
};

GameController.prototype.collisionEvents = function () {
  this.addCollisionEvent(this.player, 'playerSensor', 'collisionEnd', 'notOnFloor');
  this.addCollisionEvent(this.player, 'playerSensor', 'collisionActive', 'onFloor');
  var controller = this;
  Matter.Events.on(this.engine, 'collisionStart', function(event) {
    event.pairs.forEach(function (pair) {
      if (pair.bodyA.label === 'object' && pair.bodyB.label === 'floor') {
        controller.worldBuilder.objectOnFloor(pair.bodyA);
      }
    });
  });
};

GameController.prototype.buildWorld = function () {
  this.worldBuilder.buildCompleteWorld();
  this.setWorldBounds();
  Matter.World.add(this.world, this.worldBuilder.getWorldBodies());
};

GameController.prototype.setWorldBounds = function () {
  this.world.bounds.min.x = 0;
  this.world.bounds.min.y = 0;
  this.world.bounds.max.x = worldOptions.width;
  this.world.bounds.max.y = worldOptions.height;
};

GameController.prototype.addGround = function () {
  var ground = Matter.Bodies.rectangle(worldOptions.width/2,
                                       worldOptions.height,
                                       worldOptions.width + 10, 20,
                                       { isStatic: true,
                                         label: 'floor'});
  Matter.World.add(this.world, [ground]);
};

GameController.prototype.addPlayer = function () {
  this.player.create(worldOptions.playerFriction);
  Matter.World.add(this.world, [this.player.getBodyObject()]);
};

GameController.prototype.calculateScore = function () {
  this.score.increase(this.worldBuilder.fallenObjectPreciousness().reduce(function (sum, value) {
    return sum + value;
  }, 0));
  this.renderer.receiveScore(this.score.showPoints());
};

GameController.prototype.ready = function () {
  this.collisionEvents();
  this.buildWorld();
  this.addGround();
  this.addPlayer();
};

GameController.prototype.render = function () {
  Matter.Engine.run(this.engine);
  this.renderer = new Renderer(this.player, this.world, this.soundEngine);
  this.renderer.updateScreen();
  var controller = this;
  window.setInterval(function () {
    controller.calculateScore();
  }, 1000/60);
};
