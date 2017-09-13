var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_SPACE = 32;
const KEY_SHIFT = 16;

var keys = [];
console.log(keys)

document.body.addEventListener("keyup", function(e) {
  console.log('keyup fired')
  console.log(e.keyCode)
  keys[e.keyCode] = false;
});
document.body.addEventListener("keydown", function(e) {
  console.log('keydown fired')
  keys[e.keyCode] = true;
});

// create an engine
var engine = Engine.create();

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
}

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
// create player
var player = Body.create({
  parts: [playerBody],
  friction: 0
});
createdBodies.push(player)

// movement?
if(keys[KEY_D]){
    let force = (0.0004 * player.mass) ;
    console.log(force)
    Body.applyForce(player,player.position,{x:force,y:0});
    console.log(player.position);
};

if(keys[KEY_A]){
    let force = (-0.0004 * player.mass) ;
    console.log(force)
    Body.applyForce(player,player.position,{x:force,y:0});
    console.log(player.position);
};
// created starting platform for player
var startingPlatform = Bodies.rectangle(30,worldBuilder.canvas.height-10,50,10, { isStatic: true, render: { fillStyle: 'black' } })
createdBodies.push(startingPlatform)
// create two boxes and a ground
createdBodies.push(Bodies.rectangle(350, 0, 40, 40, objectOptions));
createdBodies.push(Bodies.rectangle(550, 0, 40, 40, objectOptions));
// createdBodies.push(Bodies.rectangle(512, 512, 1024, 20, { isStatic: true }));

// add all of the bodies to the world
World.add(engine.world, createdBodies);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
