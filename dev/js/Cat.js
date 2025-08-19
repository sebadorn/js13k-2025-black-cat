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
			startX: this.x,
			startY: this.y,
			targetX: place.x + ( place.w - this.w ) / 2,
			targetY: place.y + place.h - this.h,
			start: this.level.timer,
			duration: js13k.TARGET_FPS,
		};
	}


	/**
	 *
	 * @param {number} timer
	 */
	update( timer ) {
		if( this.animation ) {
			const progress = ( timer - this.animation.start ) / this.animation.duration;

			if( progress > 1 ) {
				this.x = this.animation.targetX;
				this.y = this.animation.targetY;
				this.animation = null;
			}
			else {
				this.x = js13k.interpolate( this.animation.startX, this.animation.targetX, progress );
				this.y = js13k.interpolate( this.animation.startY, this.animation.targetY, progress );
			}
		}
	}


};