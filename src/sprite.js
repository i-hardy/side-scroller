(function(exports) {
	'use strict';

	function Sprite() {
		this.image = gameImages.player;
		this.width = 70;
		this.height = 70;
		this.numberOfFrames = 4;
		this.currentFrame = 2;
		this.separation = 70;
    this.direction = 1;
		this.frameIndexes = [[3, 2, 1, 0, 5], [1, 2, 3, 4, 5]]
	}

	Sprite.prototype.getDirection = function () {
		this.leftOrRight();
		this.jumpingOrStanding();
		return this.direction;
	};

	Sprite.prototype.leftOrRight = function () {
		if (keys[KEY_A]) { this.direction = 0 }
		if (keys[KEY_D]) { this.direction = 1 }
	};

	Sprite.prototype.jumpingOrStanding = function () {
		if (keys[KEY_W]) {
			this.currentFrame = 4;
		} else if (!keys[KEY_A] && !keys[KEY_D]) {
			this.currentFrame = 1;
		}
	};

	Sprite.prototype.update = function () {
		if (this.currentFrame < this.numberOfFrames - 1) {
			this.currentFrame += 1;
		} else {
			this.currentFrame = 0;
		}
	};

  Sprite.prototype.getImage = function() {
    return this.image;
  };

  Sprite.prototype.getFrameIndexes = function() {
    return this.frameIndexes;
  };

  Sprite.prototype.getCurrentFrame = function() {
    return this.currentFrame;
  };

  Sprite.prototype.getHeight = function() {
    return this.height;
  };

  Sprite.prototype.getWidth = function() {
    return this.width;
  };

	exports.Sprite = Sprite;
}(this));
