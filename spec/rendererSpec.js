'use strict';

describe('Renderer', function () {
  var moomin;
  var player;
  var world;
  var soundEngine;

  beforeEach(function () {
    player = new Player();
    world = Matter.Engine.create().world;
    soundEngine = new SoundEngine();
    moomin = new Renderer(player, world, soundEngine);
  });

  describe('#sounds', function () {
    it('plays the player sounds', function () {
      spyOn(soundEngine, 'playerSounds');
      moomin.sounds();
      expect(soundEngine.playerSounds).toHaveBeenCalled();
    })
  });

  describe('#playerMovement', function () {
    beforeEach(function () {
      spyOn(Matter.Body, 'setAngle');
      spyOn(player, 'jump');
      spyOn(player, 'moveLeft');
      spyOn(player, 'moveRight');
      moomin.playerMovement()
    });

    it('maintains the player body angle', function () {
      expect(Matter.Body.setAngle).toHaveBeenCalled();
    });

    it('checks if the player is jumping', function () {
      expect(player.jump).toHaveBeenCalled();
    });

    it('checks if the player is moving left', function () {
      expect(player.moveLeft).toHaveBeenCalled();
    });

    it('checks if the player is moving right', function () {
      expect(player.moveRight).toHaveBeenCalled();
    });
  });

  describe('#reverseVelocity', function () {
    beforeEach(function () {
      spyOn(player, 'getBodyObject').and.returnValue(playerBody);
      spyOn(Matter.Body, 'applyForce');
    });

    it('applies a force to the player', function () {
      moomin.reverseVelocity();
      expect(Matter.Body.applyForce).toHaveBeenCalled();
    });
  });

  describe('#checkBorder', function () {
    beforeEach(function () {
      spyOn(player, 'getBodyObject').and.returnValue(playerBody);
      spyOn(moomin, 'reverseVelocity');
    });

    it('applies a reverse force if the player tries to exit the world to the left', function () {
      playerBody.bounds.min.x = -1;
      moomin.checkBorder();
      expect(moomin.reverseVelocity).toHaveBeenCalled();
    });

    it('applies a reverse force if the player tries to exit the world to the right', function () {
      playerBody.bounds.max.x = worldOptions.viewWidth + 1;
      moomin.checkBorder();
      expect(moomin.reverseVelocity).toHaveBeenCalled();
    });

    it('otherwise does nothing', function () {
      playerBody.bounds.min.x = 10;
      playerBody.bounds.max.x = 10;
      moomin.checkBorder();
      expect(moomin.reverseVelocity).not.toHaveBeenCalled();
    });
  });

  describe('#scroll', function () {
    beforeEach(function () {
      spyOn(player, 'getBodyObject').and.returnValue(playerBody);
    });

    it('moves the view rightwards if the player moves to the right half of the screen', function () {
      playerBody.position.x = (worldOptions.viewWidth * 0.5) + 1;
      var priorRightEdge = moomin.viewport.rightEdge;
      moomin.scroll();
      expect(moomin.viewport.rightEdge).toBeGreaterThan(priorRightEdge);
    });

    it('otherwise leaves the view in position', function () {
      playerBody.position.x = (worldOptions.viewWidth * 0.5) - 1;
      var priorRightEdge = moomin.viewport.rightEdge;
      moomin.scroll();
      expect(moomin.viewport.rightEdge).toEqual(priorRightEdge);
    });
  });

  describe('#scoreText', function () {
    it('returns the current score as a string', function () {
      expect(moomin.scoreText()).toEqual('Score: 0');
    });
  });

  describe('#receiveScore', function () {
    it('sets the score to be the received number', function () {
      moomin.receiveScore(1);
      expect(moomin.scoreText()).toEqual('Score: 1');
    });
  });

  describe('#updateScreen', function () {
    beforeEach(function () {
      spyOn(moomin, 'playerMovement');
      spyOn(moomin, 'checkBorder');
      spyOn(moomin, 'sounds');
      spyOn(moomin, 'scroll');
      spyOn(context, 'beginPath');
      spyOn(window, 'requestAnimationFrame');
      moomin.updateScreen()
    });

    it('calls the playerMovement function', function () {
      expect(moomin.playerMovement).toHaveBeenCalled();
    });

    it('calls the checkBorder function', function () {
      expect(moomin.checkBorder).toHaveBeenCalled();
    });

    it('calls the sounds function', function () {
      expect(moomin.sounds).toHaveBeenCalled();
    });

    it('calls the scroll function', function () {
      expect(moomin.scroll).toHaveBeenCalled();
    });

    it('calls requestAnimationFrame with itself as a callback', function () {
      spyOn(moomin, 'updateScreen');
      window.requestAnimationFrame.calls.allArgs()[0][0]();
      expect(moomin.updateScreen).toHaveBeenCalled();
    });
  });
});
