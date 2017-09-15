'use strict';

describe('GameController', function () {
  var atticus;

  beforeEach(function () {
    atticus = new GameController();
  });

  describe('#addCollisionEvent', function () {
    it('creates an event on the game engine', function () {
      spyOn(Matter.Events, 'on');
      atticus.addCollisionEvent();
      expect(Matter.Events.on).toHaveBeenCalled();
    });
  });

  describe('#collisionEvents', function () {
    it('creates collision events', function () {
      spyOn(atticus, 'addCollisionEvent');
      atticus.collisionEvents();
      expect(atticus.addCollisionEvent).toHaveBeenCalled();
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
});
