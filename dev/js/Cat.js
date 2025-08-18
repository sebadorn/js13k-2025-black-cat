'use strict';


js13k.Cat = class extends js13k.LevelObject {


	/**
	 *
	 * @param {object} place
	 * @param {number} place.x
	 * @param {number} place.y
	 * @param {number} place.w
	 * @param {number} place.h
	 */
	moveTo( place ) {
		this.x = place.x + ( this.w - place.w ) / 2;
		this.y = place.y + place.h - this.h;
	}


};