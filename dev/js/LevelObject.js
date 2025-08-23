'use strict';


js13k.LevelObject = class {


	/** @type {HTMLCanvasElement} */
	cnv = null;

	/** @type {CanvasRenderingContext2D} */
	ctx = null;

	/** @type {js13k.LevelObject?} */
	parent = null;

	/** @type {js13k.LevelObject[]} */
	children = [];


	/**
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {js13k.Asset|object} asset
	 * @param {js13k.Level}        level
	 */
	constructor( x, y, asset, level ) {
		this.level = level;
		this._asset = asset;
		this.x = x;
		this.y = y;
		this.frame = 0;

		this.render();
	}


	/**
	 *
	 * @returns {number}
	 */
	get h() {
		return this._asset.h;
	}


	/**
	 *
	 * @returns {number}
	 */
	get w() {
		return this._asset.w;
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		this._asset.draw( ctx, this.getGlobalX(), this.getGlobalY(), this.frame );
	}


	/**
	 *
	 * @returns {number}
	 */
	getGlobalX() {
		return ( this.parent?.getGlobalX() || 0 ) + this.x;
	}


	/**
	 *
	 * @returns {number}
	 */
	getGlobalY() {
		return ( this.parent?.getGlobalY() || 0 ) + this.y;
	}


	/**
	 *
	 * @private
	 */
	render() {
		this._asset.render();
	}


	/**
	 *
	 * @param {number} timer
	 */
	update( timer ) {
		if( this._asset.options.frames > 1 ) {
			timer /= this._asset.options.frameTimeSlowdown;
			this.frame = Math.floor( timer % this._asset.options.frames );
		}
	}


};