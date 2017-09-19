'use strict';

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
                    bounds: worldBounds,
                    bodies: [mockBody]
                  }
                };
              },
              run: function () {}
            },
            Events: {
              on: function () {}
            }
          };

var context = {
  clearRect: function () {},
  fillRect: function () {},
  translate: function () {},
  beginPath: function () {},
  stroke: function () {},
  moveTo: function () {},
  lineTo: function () {},
  fillText: function () {},
  setTransform: function () {},
  drawImage: function() {}
};

var canvas = {
  getContext: function () {
    return context;
  }
};

var player_name_form = {
  addEventListener: function () {},
  reset: function () {}
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
                      x: 9000,
                      y: 0
                    }
                  };

var mockBody = {vertices: [{x: 0, y: 0}]};

var playerBody = { bounds: { min: {
                      x: 0,
                      y: 0
                    },
                    max: {
                      x: 0,
                      y: 0
                    }
                  },
                  velocity: {
                    x: 0
                  },
                  position: {
                    x: 0
                  }
                };

function Audio() {}
