function GameController () {
  this.engine = Matter.Engine.create();
  this.world = this.engine.world;
  this.worldBuilder = new WorldBuilder();
  this.player = new Player(Matter.Bodies.rectangle(30,0, worldOptions.playerSize, worldOptions.playerSize, { density:0.002, friction: 0.5 }));
  this.player.addParts(Matter.Bodies.circle(30,45,5, {density:0, friction:0.3, isSensor: true}));
}

GameController.prototype.addCollisionEvent = function (player, eventName, action) {
  Matter.Events.on(this.engine, eventName, function(event) {
     var pairs = event.pairs;
     var playerSensor = player.getBodyParts()[2];

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
  var ground = Matter.Bodies.rectangle(worldOptions.width/2, worldOptions.height, worldOptions.width + 10, 20, { isStatic: true });
  Matter.World.add(this.world, [ground]);
};

GameController.prototype.addPlayer = function () {
  this.player.create(worldOptions.playerFriction);
  Matter.World.add(this.world, [this.player.getBodyObject()]);
};

GameController.prototype.ready = function () {
  this.collisionEvents();
  this.buildWorld();
  this.addGround();
  this.addPlayer();
};

GameController.prototype.render = function () {
  Matter.Engine.run(this.engine);
  this.renderer = new Renderer(this.player, this.world);
  this.renderer.updateScreen();
};
