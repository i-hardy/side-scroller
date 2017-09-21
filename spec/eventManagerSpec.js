'use strict';

describe('EventManager', function () {
  var carolyn;
  var object;
  var event;
  var engine;
  var worldBuilder;

  beforeEach(function () {
    worldBuilder = new WorldBuilder();
    engine = {};
    carolyn = new EventManager(engine);
    object = {action: function () {}};
    event = {pairs: [{bodyA: {label: ''}, bodyB: {label: ''}}]};
  });

  describe('#playerCollisionEvent', function () {
    it('calls the specified object and action if bodyA is a player sensor', function () {
      event.pairs[0].bodyA.label = 'playerSensor';
      spyOn(object, 'action');
      carolyn.playerCollisionEvent(event, object, 'action');
      expect(object.action).toHaveBeenCalled();
    });

    it('calls the specified object and action if bodyB is a player sensor', function () {
      event.pairs[0].bodyB.label = 'playerSensor';
      spyOn(object, 'action');
      carolyn.playerCollisionEvent(event, object, 'action');
      expect(object.action).toHaveBeenCalled();
    });


    it('otherwise does nothing', function () {
      spyOn(object, 'action');
      carolyn.playerCollisionEvent(event, object, 'action');
      expect(object.action).not.toHaveBeenCalled();
    });
  });

  describe('#playerCollision', function () {
    beforeEach(function () {
      spyOn(Matter.Events, 'on');
    });

    it('creates a Matter event on the game engine', function () {
      carolyn.playerCollision(object, 'eventName', 'action');
      expect(Matter.Events.on).toHaveBeenCalled();
    });

    it('passes in the playerCollisionEvent function in a callback', function () {
      spyOn(carolyn, 'playerCollisionEvent');
      carolyn.playerCollision();
      Matter.Events.on.calls.allArgs()[0][2]();
      expect(carolyn.playerCollisionEvent).toHaveBeenCalled();
    });
  });

  describe('#pairBodyLabels', function () {
    it('returns a sorted string of labels of each body in the given pair', function () {
      event.pairs[0].bodyA.label = 'object';
      event.pairs[0].bodyB.label = 'floor';
      expect(carolyn.pairBodyLabels(event.pairs[0])).toEqual('floor,object');
    });
  });

  describe('#isBodyPlayer', function () {
    it('returns true if the passed in body is the player sensor', function () {
      event.pairs[0].bodyA.label = 'playerSensor';
      expect(carolyn.isBodyPlayer(event.pairs[0].bodyA)).toBe(true);
    });

    it('otherwise returns false', function () {
      event.pairs[0].bodyA.label = 'object';
      expect(carolyn.isBodyPlayer(event.pairs[0].bodyA)).toBe(false);
    });
  });

  describe('#validCollisionPairs', function () {
    it('returns true if the pair is an object and the floor', function () {
      event.pairs[0].bodyA.label = 'object';
      event.pairs[0].bodyB.label = 'floor';
      expect(carolyn.validCollisionPairs(event.pairs[0])).toBe(true);
    });

    it('returns true if the pair is a cactus and the player', function () {
      event.pairs[0].bodyA.label = 'cactus';
      event.pairs[0].bodyB.label = 'player';
      expect(carolyn.validCollisionPairs(event.pairs[0])).toBe(true);
    });

    it('returns true if the pair is the player and a cactus', function () {
      event.pairs[0].bodyA.label = 'player';
      event.pairs[0].bodyB.label = 'cactus';
      expect(carolyn.validCollisionPairs(event.pairs[0])).toBe(true);
    });

    it('otherwise returns false', function () {
      event.pairs[0].bodyA.label = 'player';
      event.pairs[0].bodyB.label = 'floor';
      expect(carolyn.validCollisionPairs(event.pairs[0])).toBe(false);
    });
  });

  describe('#objectCollisionEvent', function () {
    beforeEach(function () {
      spyOn(worldBuilder, 'objectCollided');
    });

    it('calls objectOnFloor on the passed-in worldBuilder if both conditions are met', function () {
      event.pairs[0].bodyA.label = 'object';
      event.pairs[0].bodyB.label = 'floor';
      carolyn.objectCollisionEvent(event, worldBuilder);
      expect(worldBuilder.objectCollided).toHaveBeenCalled();
    });

    it('does nothing if bodyA is not an object', function () {
      event.pairs[0].bodyA.label = 'player';
      event.pairs[0].bodyB.label = 'floor';
      carolyn.objectCollisionEvent(event, worldBuilder);
      expect(worldBuilder.objectCollided).not.toHaveBeenCalled();
    });

    it('does nothing if bodyB is not the floor', function () {
      event.pairs[0].bodyA.label = 'object';
      event.pairs[0].bodyB.label = 'platform';
      carolyn.objectCollisionEvent(event, worldBuilder);
      expect(worldBuilder.objectCollided).not.toHaveBeenCalled();
    });

    it('does nothing if neither body matches the conditions', function () {
      event.pairs[0].bodyA.label = 'player';
      event.pairs[0].bodyB.label = 'platform';
      carolyn.objectCollisionEvent(event, worldBuilder);
      expect(worldBuilder.objectCollided).not.toHaveBeenCalled();
    });

    it('calls cactusTouched on the worldBuilder if bodyA is the player and bodyB is a cactus', function () {
      event.pairs[0].bodyA.label = 'player';
      event.pairs[0].bodyB.label = 'cactus';
      carolyn.objectCollisionEvent(event, worldBuilder);
      expect(worldBuilder.objectCollided).toHaveBeenCalled();
    });

    it('calls cactusTouched on the worldBuilder if bodyB is the player and bodyA is a cactus', function () {
      event.pairs[0].bodyA.label = 'cactus';
      event.pairs[0].bodyB.label = 'player';
      carolyn.objectCollisionEvent(event, worldBuilder);
      expect(worldBuilder.objectCollided).toHaveBeenCalled();
    });

    it('does nothing if bodyA is the player but bodyB is not a cactus', function () {
      event.pairs[0].bodyA.label = 'player';
      event.pairs[0].bodyB.label = 'floor';
      carolyn.objectCollisionEvent(event, worldBuilder);
      expect(worldBuilder.objectCollided).not.toHaveBeenCalled();
    });

    it('does nothing if bodyB is a cactus but bodyA is not the player', function () {
      event.pairs[0].bodyA.label = 'object';
      event.pairs[0].bodyB.label = 'platform';
      carolyn.objectCollisionEvent(event, worldBuilder);
      expect(worldBuilder.objectCollided).not.toHaveBeenCalled();
    });

    it('does nothing if bodyB is the player but bodyA is not a cactus', function () {
      event.pairs[0].bodyA.label = 'floor';
      event.pairs[0].bodyB.label = 'player';
      carolyn.objectCollisionEvent(event, worldBuilder);
      expect(worldBuilder.objectCollided).not.toHaveBeenCalled();
    });

    it('does nothing if bodyA is a cactus but bodyB is not the player', function () {
      event.pairs[0].bodyA.label = 'cactus';
      event.pairs[0].bodyB.label = 'platform';
      carolyn.objectCollisionEvent(event, worldBuilder);
      expect(worldBuilder.objectCollided).not.toHaveBeenCalled();
    });

    it('does nothing if neither body is a cactus or the player', function () {
      event.pairs[0].bodyA.label = 'object';
      event.pairs[0].bodyB.label = 'platform';
      carolyn.objectCollisionEvent(event, worldBuilder);
      expect(worldBuilder.objectCollided).not.toHaveBeenCalled();
    });
  });

  describe('#collisionStarts', function () {
    beforeEach(function () {
      spyOn(Matter.Events, 'on');
    });

    it('creates a Matter event on the game engine', function () {
      carolyn.collisionStarts();
      expect(Matter.Events.on).toHaveBeenCalled();
    });

    it('passes in the given function in a callback', function () {
      spyOn(carolyn, 'objectCollisionEvent');
      carolyn.collisionStarts(worldBuilder, 'objectCollisionEvent');
      Matter.Events.on.calls.allArgs()[0][2]();
      expect(carolyn.objectCollisionEvent).toHaveBeenCalled();
    });
  });

  describe('#lifeAndDeathCollisionEvent', function () {
    beforeEach(function () {
      spyOn(gameController, 'playerLosesLifeOnFloor');
      spyOn(gameController, 'endGame');
    });

    it('calls playerLosesLifeOnFloor if a collision occurs between the player and the floor', function () {
      event.pairs[0].bodyA.label = 'playerSensor';
      event.pairs[0].bodyB.label = 'floor';
      carolyn.lifeAndDeathCollisionEvent(event, gameController);
      expect(gameController.playerLosesLifeOnFloor).toHaveBeenCalled();
    });

    it('ends the game if a collision occurs between the player and the end game platform', function () {
      event.pairs[0].bodyA.label = 'playerSensor';
      event.pairs[0].bodyB.label = 'endGamePlatform';
      carolyn.lifeAndDeathCollisionEvent(event, gameController);
      expect(gameController.endGame).toHaveBeenCalled();
    });

    it('does nothing if bodyA is not the player', function () {
      event.pairs[0].bodyA.label = 'object';
      event.pairs[0].bodyB.label = 'endGamePlatform';
      carolyn.lifeAndDeathCollisionEvent(event, gameController);
      expect(gameController.endGame).not.toHaveBeenCalled();
    });

    it('does not call playerLosesLifeOnFloor if bodyB is not the floor', function () {
      event.pairs[0].bodyA.label = 'player';
      event.pairs[0].bodyB.label = 'object';
      carolyn.lifeAndDeathCollisionEvent(event, gameController);
      expect(gameController.playerLosesLifeOnFloor).not.toHaveBeenCalled();
    });

    it('does not call endGame if bodyB is not the end game platform', function () {
      event.pairs[0].bodyA.label = 'playerSensor';
      event.pairs[0].bodyB.label = 'platform';
      carolyn.lifeAndDeathCollisionEvent(event, gameController);
      expect(gameController.endGame).not.toHaveBeenCalled();
    });
  });
});
