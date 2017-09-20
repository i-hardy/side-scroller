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
      expect(EventManager.prototype.playerCollision.calls.count()).toEqual(2);
    });

    it('creates object collision events via the event manager', function () {
      spyOn(EventManager.prototype, 'objectCollision');
      atticus.collisionEvents();
      expect(EventManager.prototype.objectCollision).toHaveBeenCalled();
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
      spyOn(WorldBuilder.prototype, 'fallenObjectPreciousness').and.returnValue(4);
      spyOn(atticus, 'render').and.callFake(function () {
        this.renderer = new Renderer;
      })
      atticus.render();
    });

    it('checks the values of fallen objects and touched cacti', function () {
      atticus.calculateScore();
      expect(WorldBuilder.prototype.fallenObjectPreciousness).toHaveBeenCalled();
    });

    it('sets the game score based on fallen objects and touched cacti', function () {
      spyOn(Score.prototype, 'increase');
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
      spyOn(Renderer.prototype, 'gameLoop');
      spyOn(atticus, 'calculateScore');
      spyOn(Renderer.prototype, 'spriteLoop');
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

    it('passes in the renderer spriteLoop method in a callback', function () {
      window.setInterval.calls.allArgs()[0][0]();
      expect(Renderer.prototype.spriteLoop).toHaveBeenCalled();
    });

    it('passes in the renderer gameLoop method in a second callback', function () {
      window.setInterval.calls.allArgs()[1][0]();
      expect(Renderer.prototype.gameLoop).toHaveBeenCalled();
    });

    it('passes in its calculateScore method in a second callback', function () {
      window.setInterval.calls.allArgs()[1][0]();
      expect(atticus.calculateScore).toHaveBeenCalled();
    });
  });


  describe('#playerLoseLifeOnFloor', function() {
    beforeEach(function () {
      spyOn(atticus, 'render').and.callFake(function () {
        this.renderer = new Renderer;
      })
      atticus.render();
    });

    it('resets the player when contact with the floor is made', function() {
      spyOn(atticus, 'returnPlayerToStart');
      atticus.playerLosesLifeOnFloor();
      expect(atticus.returnPlayerToStart).toHaveBeenCalled();
    });

    it('sets the player back to starting position', function() {
      spyOn(Renderer.prototype, 'returnViewToStart');
      atticus.playerLosesLifeOnFloor();
      expect(Renderer.prototype.returnViewToStart).toHaveBeenCalled();
    })
  });

  describe('#addEndBonus', function () {
    beforeEach(function () {
      spyOn(atticus, 'render').and.callFake(function () {
        this.renderer = new Renderer;
      })
      atticus.render();
    });

    it('adds end bonus when called - when game ends', function () {
      spyOn(Score.prototype, 'endBonus');
      atticus.addEndBonus();
      expect(Score.prototype.endBonus).toHaveBeenCalled();
    });

    it('passes the correct ratio argument for end bonus calculation', function () {
      spyOn(WorldBuilder.prototype, 'fallenPreciousObjectsRatio');
      atticus.addEndBonus();
      expect(WorldBuilder.prototype.fallenPreciousObjectsRatio).toHaveBeenCalled();
    });

    it('passes the score points into the renderer', function () {
      spyOn(Renderer.prototype, 'receiveScore');
      atticus.addEndBonus();
      expect(Renderer.prototype.receiveScore).toHaveBeenCalled();
    });

    it('passes the destruction percentage into the renderer', function () {
      spyOn(Renderer.prototype, 'receiveDestructionPercentage');
      atticus.addEndBonus();
      expect(Renderer.prototype.receiveDestructionPercentage).toHaveBeenCalled();
    });
  });
