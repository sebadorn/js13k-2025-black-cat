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
	 * @param {number}   x
	 * @param {number}   y
	 * @param {object}   asset
	 * @param {number}   asset.w
	 * @param {number}   asset.h
	 * @param {string[]} asset.data
	 * @param {js13k.Level} level
	 */
	constructor( x, y, asset, level ) {
		this.level = level;
		this._asset = asset;
		this.x = x;
		this.y = y;
		[this.cnv, this.ctx] = js13k.Renderer.getOffscreenCanvas( asset.w, asset.h );

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
		ctx.drawImage( this.cnv, this.getGlobalX(), this.getGlobalY() );
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
		this.ctx.clearRect( 0, 0, this._asset.w, this._asset.h );
		this._asset.render( this.ctx );
	}


	/**
	 *
	 * @param {number} timer
	 */
	update( timer ) {
		// TODO:
	}


};