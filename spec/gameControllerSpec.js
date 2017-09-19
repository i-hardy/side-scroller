'use strict';

describe('GameController', function () {
  var atticus;
  var joe;

  beforeEach(function () {
    atticus = new GameController();
  });

  describe('#collisionEvents', function () {
    it('creates player collision events via the event manager', function () {
      spyOn(EventManager.prototype, 'playerCollision');
      atticus.collisionEvents();
      expect(EventManager.prototype.playerCollision).toHaveBeenCalled();
    });

    it('creates object-floor collision events via the event manager', function () {
      spyOn(EventManager.prototype, 'objectFloorCollision');
      atticus.collisionEvents();
      expect(EventManager.prototype.objectFloorCollision).toHaveBeenCalled();
    });
  });

  describe('#buildWorld', function () {
    it('tells the world builder to build the world', function () {
      spyOn(WorldBuilder.prototype, 'buildCompleteWorld');
      atticus.buildWorld();
      expect(WorldBuilder.prototype.buildCompleteWorld).toHaveBeenCalled();
    });

    it('passes all worldbuilder bodies into the Matter engine', function () {
      spyOn(Matter.World, 'add');
      atticus.buildWorld();
      expect(Matter.World.add).toHaveBeenCalled();
    });
  });

  describe('#addPlayer', function () {
    it('creates the full player object', function () {
      spyOn(Player.prototype, 'create');
      atticus.addPlayer();
      expect(Player.prototype.create).toHaveBeenCalled();
    });

    it('passes the player body into the Matter engine', function () {
      spyOn(Matter.World, 'add');
      atticus.addPlayer();
      expect(Matter.World.add).toHaveBeenCalled();
    });
  });

  describe('#addGround', function () {
    it('adds a ground object to the Matter engine', function () {
      spyOn(Matter.World, 'add');
      atticus.addGround();
      expect(Matter.World.add).toHaveBeenCalled();
    });
  });

  describe('#calculateScore', function () {
    beforeEach(function () {
      spyOn(atticus, 'render').and.callFake(function () {
        this.renderer = new Renderer;
      })
      atticus.render();
    });

    it('sets the game score based on the preciousness of the fallen objects', function () {
      spyOn(Score.prototype, 'increase');
      spyOn(WorldBuilder.prototype, 'fallenObjectPreciousness').and.returnValue([1, 1]);
      atticus.calculateScore();
      expect(Score.prototype.increase).toHaveBeenCalled();
    });

    it('passes the score points into the renderer', function () {
      spyOn(Renderer.prototype, 'receiveScore');
      atticus.calculateScore();
      expect(Renderer.prototype.receiveScore).toHaveBeenCalled();
    });
  });

  describe('#ready', function () {
    it('creates all collision events', function () {
      spyOn(atticus, 'collisionEvents');
      atticus.ready();
      expect(atticus.collisionEvents).toHaveBeenCalled();
    });

    it('builds the world', function () {
      spyOn(atticus, 'buildWorld');
      atticus.ready();
      expect(atticus.buildWorld).toHaveBeenCalled();
    });

    it('adds the ground', function () {
      spyOn(atticus, 'addGround');
      atticus.ready();
      expect(atticus.addGround).toHaveBeenCalled();
    });

    it('adds the player', function () {
      spyOn(atticus, 'addPlayer');
      atticus.ready();
      expect(atticus.addPlayer).toHaveBeenCalled();
    });
  });

  describe('#render', function () {
    beforeEach(function () {
      spyOn(Matter.Engine, 'run');
      spyOn(Renderer.prototype, 'updateScreen');
      spyOn(window, 'setInterval');
      atticus.render();
    });

    it('runs the Matter engine', function () {
      expect(Matter.Engine.run).toHaveBeenCalled();
    });

    it('creates a renderer and runs its update screen function', function () {
      expect(Renderer.prototype.updateScreen).toHaveBeenCalled();
    });

    it('sets an update interval on the window', function () {
      expect(window.setInterval).toHaveBeenCalled();
    });

    it('passes in its calculateScore method in a callback', function () {
      spyOn(atticus, 'calculateScore');
      window.setInterval.calls.allArgs()[0][0]();
      expect(atticus.calculateScore).toHaveBeenCalled();
    });
  });

  // describe('#playerLoseLifeOnFloor', function() {
  //   it('resets the player position when contact with the floor is made', function() {
  //     // spyOn(atticus, 'calculateScore');
  //     // // atticus.playerLosesLifeOnFloor();
  //     // expect(atticus.calculateScore).toHaveBeenCalled();
  //     spyOn(Renderer.prototype, 'receiveScore');
  //     // atticus.playerLosesLifeOnFloor();
  //     expect(Renderer.prototype.receiveScore).toHaveBeenCalled();
  //   });
  // });
});
