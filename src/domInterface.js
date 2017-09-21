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
        };
      });
      domInterface.collectNameAndStart();
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
    }
  };

  exports.domInterface = domInterface;
}(this));
