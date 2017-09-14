function GameController () {
  this.Game = {Engine: Matter.Engine,
                World: Matter.World,
                Bodies: Matter.Bodies,
                Bounds: Matter.Bounds,
                Body: Matter.Body,
                Events: Matter.Events
              };
  this.engine = this.Game.Engine.create();
  this.player = new Player(this.Game.Bodies.rectangle(30,0,20,20, { density: 0.002, friction: 0.5 }));
  this.player.addParts(this.Game.Bodies.circle(30,0,10,{density:0, friction:0.3, isSensor: true}));
}

GameController.prototype.addCollisionEvent = function (player, eventName, action) {
  this.Game.Events.on(this.engine, eventName, function(event) {
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
  for (var i = 0; i < 10; i++) {
    this.worldBuilder.setPlatform();
  }
  this.setWorldBounds();
};

GameController.prototype.setWorldBounds = function () {
  this.engine.world.bounds.min.x = 0;
  this.engine.world.bounds.min.y = 0;
  this.engine.world.bounds.max.x = 3072;
  this.engine.world.bounds.max.y = canvas.height;
};

GameController.prototype.createPlatforms = function () {
  this.createdBodies = [];
  var bWidth = this.worldBuilder.BLOCK_WIDTH;
  var bHeight = this.worldBuilder.BLOCK_HEIGHT;
  for (var i = 0; i < this.worldBuilder.canvas.height / bHeight; i++) {
    for (var j = 0; j < this.worldBuilder.canvas.width / bWidth; j++) {
      if (this.worldBuilder.getGrid()[i][j] === 1) {
        this.createdBodies.push(this.Game.Bodies.rectangle(j * bWidth, i * bHeight, bWidth, bHeight, { isStatic: true }));
      }
    }
  }
};

GameController.prototype.createGround = function () {
  this.createdBodies.push(this.Game.Bodies.rectangle(512, 512, 4000, 20, { isStatic: true }));
};

GameController.prototype.populateWorld = function () {
  this.createPlatforms();
  this.createGround();
  // create player
  this.player.create(0.5);

  this.createdBodies.push(this.player.getBodyObject());
  // create two boxes
  this.createdBodies.push(this.Game.Bodies.rectangle(350, 0, 40, 40));
  this.createdBodies.push(this.Game.Bodies.rectangle(550, 0, 40, 40));

  // add all of the bodies to the world
  this.Game.World.add(this.engine.world, this.createdBodies);
};

GameController.prototype.render = function () {
  this.Game.Engine.run(this.engine);
  this.renderer = new Renderer(this.player, this.engine.world);
  this.renderer.updateScreen();
};
