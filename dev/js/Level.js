'use strict';


js13k.Level = class {


	/**
	 *
	 * @constructor
	 */
	constructor() {
		this.timer = 0;

		this.catBg = new js13k.CatBg( this );
		this.catFg = new js13k.CatFg( this );
		this.cauldron = new js13k.Cauldron( this );
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		this.catBg.draw( ctx );
		this.cauldron.draw( ctx );
		this.catFg.draw( ctx );
	}


	/**
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {object} aabb
	 * @param {number} aabb.x
	 * @param {number} aabb.y
	 * @param {number} aabb.w
	 * @param {number} aabb.h
	 * @returns {boolean}
	 */
	isInside( x, y, aabb ) {
		return x >= aabb.x &&
			x <= aabb.x + aabb.w &&
			y >= aabb.y &&
			y <= aabb.y + aabb.h;
	}


	/**
	 *
	 * @param {number} x
	 * @param {number} y
	 */
	onClick( x, y ) {
		// TODO:
	}


	/**
	 *
	 * @param {number} dt
	 */
	update( dt ) {
		this.timer += dt;

		this.catBg.update( this.timer );
		this.cauldron.update( this.timer );
		this.catFg.update( this.timer );
	}


};
