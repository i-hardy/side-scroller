(function(exports) {
	'use strict';

	function Sprite() {
		this.image = new Image();
		this.image.src = "assets/images/cats_sprite1.png";
		this.width = 70;
		this.height = 70;
		this.numberOfFrames = 4;
		this.currentFrame = 2;
		this.separation = 70;
    this.direction = 1
		this.frameIndexes = [[3, 2, 1, 0, 5], [1, 2, 3, 4, 5]]
	};

	Sprite.prototype.getDirection = function () {
		if (keys[KEY_A]) { return this.direction = 0 };
		if (keys[KEY_D]) { return this.direction = 1 };
    if (keys[KEY_W]) { this.currentFrame = 4; return this.direction }
    if (!keys[KEY_A] && !keys[KEY_D]) { this.currentFrame = 1; return this.direction }
	};

	Sprite.prototype.update = function () {
		if (this.currentFrame < this.numberOfFrames - 1) {
			this.currentFrame += 1;
		} else {
			this.currentFrame = 0;
		}
	};

	exports.Sprite = Sprite;
}(this));
