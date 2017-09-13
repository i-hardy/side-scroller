var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

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


var platforms = [];
var bWidth = worldBuilder.BLOCK_WIDTH;
var bHeight = worldBuilder.BLOCK_HEIGHT;
for (var i = 0; i < worldBuilder.canvas.height / bHeight; i++) {
  for (var j = 0; j < worldBuilder.canvas.width / bWidth; j++) {
    if (worldBuilder.getGrid()[i][j] === 1) {
      platforms.push(Bodies.rectangle(j * bWidth, i * bHeight, bWidth, bHeight, platformOptions));
    }
  }
}


// create two boxes and a ground
platforms.push(Bodies.rectangle(350, 0, 40, 40, objectOptions));
platforms.push(Bodies.rectangle(550, 0, 40, 40, objectOptions));
// platforms.push(Bodies.rectangle(512, 512, 1024, 20, { isStatic: true }));

// add all of the bodies to the world
World.add(engine.world, platforms);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
