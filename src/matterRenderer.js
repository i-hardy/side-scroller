var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events;

// for reference...

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

// movement

const keys = [];
var playerOnFloor = false;


document.body.addEventListener('keyup', function(e) {
  keys[e.keyCode] = false;
});

document.body.addEventListener('keydown', function(e) {
  keys[e.keyCode] = true;
});

// create an engine
var engine = Engine.create();

// watching for position of player

Events.on(engine, 'collisionEnd', function(event) {
    var pairs = event.pairs;

    for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];

        if (pair.bodyA === playerFloorSensor) {
            playerOnFloor = false;
        } else if (pair.bodyB === playerFloorSensor) {
            playerOnFloor = false;
        };
    };
});

 Events.on(engine, 'collisionActive', function(event) {
    var pairs = event.pairs;

    for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];

        if (pair.bodyA === playerFloorSensor) {
            playerOnFloor = true;
        } else if (pair.bodyB === playerFloorSensor) {
            playerOnFloor = true;
        };
    };
});

// create a renderer
var render = Render.create({
    element: document.body,
    canvas: document.getElementById('canvas'),
    engine: engine,
    options: {
        width: 1024,
        height: 512,
        pixelRatio: 1,
        background: '#BAFFFF',
        wireframeBackground: '#222',
        hasBounds: true,
        wireframes: false,
    }
});

var worldBuilder = new WorldBuilder(render.canvas);
worldBuilder.setGrid();
worldBuilder.setFirstPlatform();
for (var i = 0; i < 10; i++) {
  worldBuilder.setPlatform();
};

var platformOptions = { isStatic: true,
                        render:{
                              sprite: {
                                texture: 'groundTiles.png'
                              },
                              fillStyle: 'green',
                              strokeStyle: 'green'}
                      };

var objectOptions = { render:{
                              sprite: {
                                texture: 'beer.png'
                              }
                            }
                    };

// renamed platforms createdBodies
var createdBodies = [];
var bWidth = worldBuilder.BLOCK_WIDTH;
var bHeight = worldBuilder.BLOCK_HEIGHT;
for (var i = 0; i < worldBuilder.canvas.height / bHeight; i++) {
  for (var j = 0; j < worldBuilder.canvas.width / bWidth; j++) {
    if (worldBuilder.getGrid()[i][j] === 1) {
      createdBodies.push(Bodies.rectangle(j * bWidth, i * bHeight, bWidth, bHeight, platformOptions));
    }
  }
}

// created playerBody
var playerBody = Bodies.rectangle(30,0,20,20, { density: 0.002, friction: 0.5 });
var playerNeck = Bodies.circle(15,0,5,{ density: 0.002, friction: 0.5 });
var playerHead = Bodies.rectangle(5,0,10,10, { density: 0.002, friction: 0.5 });
var playerFloorSensor = Bodies.circle(30,0,10,{density:0, friction:0.3, isSensor: true});
// create player
var player = Body.create({
  parts: [playerBody, playerNeck, playerHead, playerFloorSensor],
  friction: 5
});

Body.setAngle(player, 0);

createdBodies.push(player)
// created starting platform for player
var startingPlatform = Bodies.rectangle(30,worldBuilder.canvas.height-10,50,10, { isStatic: true, render: { fillStyle: 'black' } })
createdBodies.push(startingPlatform)
// create two boxes and a ground
createdBodies.push(Bodies.rectangle(350, 0, 40, 40, objectOptions));
createdBodies.push(Bodies.rectangle(550, 0, 40, 40, objectOptions));
createdBodies.push(Bodies.rectangle(512, 512, 1024, 20, { isStatic: true }));

// add all of the bodies to the world
World.add(engine.world, createdBodies);

// run the engine
Engine.run(engine);

// run the renderer
(function render() {
  Body.setAngle(player, 0);

  if(keys[KEY_W] && playerOnFloor) {
      let force = (-0.05 * player.mass) ;
      Body.applyForce(player,player.position,{x:0,y:force});
  }

  if(keys[KEY_D]){
      let force = (0.0004 * player.mass) ;
      Body.applyForce(player,player.position,{x:force,y:0});
  }
  if(keys[KEY_A]){
      let force = (-0.0004 * player.mass) ;
      Body.applyForce(player,player.position,{x:force,y:0});
  }

  window.requestAnimationFrame(render);

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  for (var i = 0; i < createdBodies.length; i += 1) {
      var vertices = createdBodies[i].vertices;
      ctx.moveTo(vertices[0].x, vertices[0].y);
      for (var j = 1; j < vertices.length; j += 1) {
          ctx.lineTo(vertices[j].x, vertices[j].y);
      }
      ctx.lineTo(vertices[0].x, vertices[0].y);
  };
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#000';
  ctx.stroke();

})();
