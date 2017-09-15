function GameController () {
  this.engine = Matter.Engine.create();
  this.world = this.engine.world;
  this.player = new Player(Matter.Bodies.rectangle(30,0,50,50));
  this.player.addParts(Matter.Bodies.rectangle(30,0,50,50, {isSensor: true}));
}

GameController.prototype.addCollisionEvent = function (player, eventName, action) {
  Matter.Events.on(this.engine, eventName, function(event) {
     var pairs = event.pairs;
     var playerSensor = player.getBodyParts()[1];

     for (var i = 0, j = pairs.length; i !== j; ++i) {
         var pair = pairs[i];

         if (pair.bodyA === playerSensor) {
             player[action]();
         } else if (pair.bodyB === playerSensor) {
             player[action]();
         }
     }
 });
};

GameController.prototype.collisionEvents = function () {
  this.addCollisionEvent(this.player, 'collisionEnd', 'notOnFloor');
  this.addCollisionEvent(this.player, 'collisionActive', 'onFloor');
};

GameController.prototype.buildWorld = function () {
  this.worldBuilder = new WorldBuilder(canvas);
  this.worldBuilder.setGrid();
  this.worldBuilder.setFirstPlatform();
  for (var i = 0; i < 50; i++) {
    this.worldBuilder.setPlatform();
  }
  this.setWorldBounds();
};

GameController.prototype.setWorldBounds = function () {
  this.world.bounds.min.x = 0;
  this.world.bounds.min.y = 0;
  this.world.bounds.max.x = worldOptions.width;
  this.world.bounds.max.y = worldOptions.height;
};

GameController.prototype.createPlatforms = function () {
  this.createdBodies = [];
  var bWidth = worldOptions.platformWidth;
  var bHeight = worldOptions.platformHeight;
  for (var i = 0; i < worldOptions.gridRows; i++) {
    for (var j = 0; j < worldOptions.gridColumns; j++) {
      if (this.worldBuilder.getGrid()[i][j] !== 0) {
        this.createdBodies.push(Matter.Bodies.rectangle(j * bWidth, i * bHeight, bWidth, bHeight, { isStatic: true }));
      }
    }
  }
};

GameController.prototype.createGround = function () {
  this.createdBodies.push(Matter.Bodies.rectangle(512, 512, worldOptions.width, 20, { isStatic: true }));
};

GameController.prototype.populateWorld = function () {
  this.createPlatforms();
  this.createGround();
  this.player.create(worldOptions.playerFriction);

  this.createdBodies.push(this.player.getBodyObject());
  // create two boxes
  this.createdBodies.push(Matter.Bodies.rectangle(350, 0, 40, 40));
  this.createdBodies.push(Matter.Bodies.rectangle(550, 0, 40, 40));

  Matter.World.add(this.world, this.createdBodies);
};

GameController.prototype.render = function () {
  Matter.Engine.run(this.engine);
  this.renderer = new Renderer(this.player, this.world);
  this.renderer.updateScreen();
};
