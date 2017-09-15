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
