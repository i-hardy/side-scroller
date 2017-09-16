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

  describe('#objectFloorCollisionEvent', function () {
    beforeEach(function () {
      spyOn(worldBuilder, 'objectOnFloor');
    });

    it('calls objectOnFloor on the passed-in worldBuilder if both conditions are met', function () {
      event.pairs[0].bodyA.label = 'object';
      event.pairs[0].bodyB.label = 'floor';
      carolyn.objectFloorCollisionEvent(event, worldBuilder);
      expect(worldBuilder.objectOnFloor).toHaveBeenCalled();
    });

    it('does nothing if only one condition is met', function () {
      event.pairs[0].bodyA.label = 'platform';
      event.pairs[0].bodyB.label = 'floor';
      carolyn.playerCollisionEvent(event, worldBuilder);
      expect(worldBuilder.objectOnFloor).not.toHaveBeenCalled();
    });


    it('otherwise does nothing', function () {
      carolyn.playerCollisionEvent(event, worldBuilder);
      expect(worldBuilder.objectOnFloor).not.toHaveBeenCalled();
    });
  });

  describe('#objectFloorCollision', function () {
    beforeEach(function () {
      spyOn(Matter.Events, 'on');
    });

    it('creates a Matter event on the game engine', function () {
      carolyn.objectFloorCollision();
      expect(Matter.Events.on).toHaveBeenCalled();
    });

    it('passes in the objectFloorCollisionEvent function in a callback', function () {
      spyOn(carolyn, 'objectFloorCollisionEvent');
      carolyn.objectFloorCollision();
      Matter.Events.on.calls.allArgs()[0][2]();
      expect(carolyn.objectFloorCollisionEvent).toHaveBeenCalled();
    });
  });
});
