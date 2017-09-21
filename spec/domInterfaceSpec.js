'use strict';

describe('DOM interface', function () {
  beforeEach(function () {
    spyOn(document, "getElementById").and.returnValue(player_name_form);
  });

  describe('#eventListeners', function () {
    beforeEach(function () {
      spyOn(document.body, 'addEventListener');
    });

    it('sets up two keypress eventListeners', function () {
      domInterface.eventListeners();
      expect(document.body.addEventListener.calls.count()).toEqual(2);
    });

    it('sets key values to false on keyup', function () {
      domInterface.eventListeners();
      document.body.addEventListener.calls.allArgs()[0][1]({keyCode: 87});
      expect(keys[87]).toBe(false);
    });

    it('sets key values to true on keydown', function () {
      domInterface.eventListeners();
      document.body.addEventListener.calls.allArgs()[1][1]({keyCode: 87});
      expect(keys[87]).toBe(true);
    });

    it('calls a function to add an event listener to the form', function () {
      spyOn(domInterface, 'collectNameAndStart');
      domInterface.eventListeners();
      expect(domInterface.collectNameAndStart).toHaveBeenCalled();
    });
  });

  describe('#gameOpening', function () {
    it('instantiates the OpeningScreen class and assigns it to a variable', function () {
      domInterface.gameOpening();
      expect(opening).toEqual(jasmine.any(OpeningScreen))
    });

    it('calls the opening screen draw function', function () {
      spyOn(OpeningScreen.prototype, 'draw');
      domInterface.gameOpening();
      expect(OpeningScreen.prototype.draw).toHaveBeenCalled();
    });
  });

  describe('#collectNameAndStart', function () {
    var submitEvent = {preventDefault: function () {}}

    beforeEach(function () {
      spyOn(domInterface, 'getInput');
      spyOn(domInterface, 'resetForm');
      spyOn(domInterface, 'hideForm');
      spyOn(domInterface, 'gameStart');
      spyOn(submitEvent, 'preventDefault');
      spyOn(player_name_form, 'addEventListener');
    })

    it('sets an event listener on the form', function () {
      domInterface.collectNameAndStart();
      expect(player_name_form.addEventListener).toHaveBeenCalled();
    });

    it('calls multiple functions in a callback', function () {
      domInterface.collectNameAndStart();
      player_name_form.addEventListener.calls.allArgs()[0][1](submitEvent);
      expect(submitEvent.preventDefault).toHaveBeenCalled();
      expect(domInterface.getInput).toHaveBeenCalled();
      expect(domInterface.resetForm).toHaveBeenCalled();
      expect(domInterface.hideForm).toHaveBeenCalled();
      expect(domInterface.gameStart).toHaveBeenCalled();
    });
  });

  describe('#gameStart', function () {
    beforeEach(function () {
      spyOn(GameController.prototype, 'ready');
      spyOn(GameController.prototype, 'render');
    });

    it('instantiates a game controller and assigns it to a variable', function () {
      domInterface.gameStart();
      expect(gameController).toEqual(jasmine.any(GameController));
    });

    it('calls the game controller ready function', function () {
      domInterface.gameStart();
      expect(GameController.prototype.ready).toHaveBeenCalled();
    });

    it('calls the game controller render function', function () {
      domInterface.gameStart();
      expect(GameController.prototype.render).toHaveBeenCalled();
    });
  });

  describe('#getInput', function () {
    it('assigns the context of the form input box to a variable', function () {
      document.forms[0] = {};
      document.forms[0].player_name = {};
      document.forms[0].player_name.value = "Rum Tum Tugger";
      domInterface.getInput();
      expect(playerName).toEqual("Rum Tum Tugger");
    });
  });

  describe('#resetForm', function () {
    it('calls reset on the player name form', function () {
      spyOn(player_name_form, 'reset');
      domInterface.resetForm();
      expect(player_name_form.reset).toHaveBeenCalled();
    });
  });

  describe('#hideForm', function () {
    it('sets the player_name_form style to hidden', function () {
      domInterface.hideForm();
      expect(player_name_form.style).toEqual("display:none;");
    });
  });

  describe('resetGame', function () {
    beforeEach(function () {
      spyOn(domInterface, 'gameOpening');
      spyOn(gameController, 'endGame');
      domInterface.resetGame();
    });

    it('sets the keys back to nul', function () {
      expect(keys).toEqual([]);
    });

    it('sets the gameController endgame', function () {
      expect(gameController.endGame).toHaveBeenCalled();
    });

    it('restarts the game', function () {
      expect(domInterface.gameOpening).toHaveBeenCalled();
    });
  });
});
