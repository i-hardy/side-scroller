var Matter = {Body: {
              create: function () {},
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
              }
            },
            Events: {
              on: function () {}
            }
          };

var worldBounds = { min: {
                      x: 0,
                      y: 0
                    },
                    max: {
                      x: 0,
                      y: 0
                    }
                  };

const keys = [];
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;

function Audio() {};

Audio.prototype.pause = function () {};
Audio.prototype.play = function () {};

Audio = new Audio
