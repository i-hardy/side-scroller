var KEY_W = 87;
var KEY_A = 65;
var KEY_S = 83;
var KEY_D = 68;
var keys = [];
var playerName;
var gameController;
var opening;
var isThemeMuted = false;

(function(exports) {
  'use strict';

  var domInterface = {
    eventListeners: function () {
      document.body.addEventListener('keyup', function(e) {
        keys[e.keyCode] = false;
      });
      document.body.addEventListener('keydown', function(e) {
        keys[e.keyCode] = true;
        if (e.keyCode === 77) {
          isThemeMuted = !isThemeMuted;
        }
      });
      domInterface.resetButtonClicked();
      domInterface.collectNameAndStart();
    },

    resetButtonClicked: function () {
      document.getElementById('reset_game')
        .addEventListener('click', function(e) {
          domInterface.hideResetButton();
          domInterface.showForm();
          domInterface.resetGame();
        });
    },

    gameOpening: function() {
      opening = new OpeningScreen();
      opening.draw();
    },

    collectNameAndStart: function() {
      document
        .getElementById("player_name_form")
        .addEventListener("submit", function(submitEvent) {
          submitEvent.preventDefault();
          domInterface.getInput();
          domInterface.resetForm();
          domInterface.hideForm();
          domInterface.gameStart();
        });
    },

    gameStart: function() {
      gameController = new GameController();
      gameController.ready();
      gameController.render();
    },

    getInput: function () {
      playerName = document.forms[0].player_name.value;
    },

    resetForm: function () {
      document
        .getElementById("player_name_form")
        .reset();
    },

    hideForm: function () {
      document
        .getElementById("player_name_form")
        .style = "display:none;";
    },

    showForm: function () {
      document
        .getElementById("player_name_form")
        .style = "display: block;";
    },

    showResetButton: function () {
      document
        .getElementById("reset_game")
        .style = "display: initial;";
    },

    hideResetButton: function () {
      document
        .getElementById("reset_game")
        .style = "display: none;";
    },

    resetGame: function () {
      keys = [];
      domInterface.gameOpening();
    }
  };

  exports.domInterface = domInterface;
}(this));
