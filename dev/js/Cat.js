'use strict';


js13k.Cat = class extends js13k.LevelObject {


	/** @type {Place?} */
	currentPlace = null;

	/** @type {object?} */
	animation = null;


	/**
	 *
	 * @param {Place} place
	 */
	moveTo( place ) {
		if( this.currentPlace === place || this.animation ) {
			return;
		}

		this.currentPlace = place;

		this.animation = {
			start: {
				x: this.x,
				y: this.y,
			},
			target: {
				x: place.x + ( place.w - this.w ) / 2,
				y: place.y + place.h - this.h,
			},
			timerStart: this.level.timer,

			apply( self, timer ) {
				const progress = ( timer - this.timerStart ) / js13k.TARGET_FPS;

				if( progress >= 1 ) {
					self.x = this.target.x;
					self.y = this.target.y;

					return true;
				}

				self.x = js13k.interpolate( this.start.x, this.target.x, progress );
				self.y = js13k.interpolate( this.start.y, this.target.y, progress );

				return false;
			},
		};
	}


	/**
	 *
	 * @param {number} timer
	 */
	update( timer ) {
		if( this.animation?.apply( this, timer ) ) {
			this.animation = null;
		}
	}


};