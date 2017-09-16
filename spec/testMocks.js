var Matter = {Body: {
              create: function () {},
              setAngle: function () {},
              applyForce: function () {}
              },
            Bodies: {
              rectangle: function () {},
              circle: function () {}
            },
            World: {
              add: function () {}
            },
            Engine: {
              create: function () {
                return {world: {
                    bounds: worldBounds
                  }
                };
              },
              run: function () {}
            },
            Events: {
              on: function () {}
            }
          };

var context = {};

var canvas = {
  getContext: function () {
    return context;
  }
};

var KEY_W = 87;
var KEY_A = 65;
var KEY_S = 83;
var KEY_D = 68;

var keys = [];

var worldBounds = { min: {
                      x: 0,
                      y: 0
                    },
                    max: {
                      x: 0,
                      y: 0
                    }
                  };

function Audio() {}
