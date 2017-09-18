(function(exports) {
	'use strict';

	function Sprite() {
		this.image = new Image();
		this.image.src = "assets/images/cats_sprite.png";
		this.width = 70;
		this.height = 70;
		this.numberOfFrames = 5;
		this.currentFrame = 2;
		this.separation = 70;
		this.frameIndexes = [[3,2,1,0], [1, 2, 3, 4],[4]];
	};

	Sprite.prototype.getDirection = function () {
		if (keys[KEY_A]) {return 0};
		if (keys[KEY_D]) {return 1}
    if (!keys[KEY_A] && !keys[KEY_D]) { this.currentFrame = 1; return 1 }
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
