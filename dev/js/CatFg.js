'use strict';


js13k.CatFg = class extends js13k.LevelObject {


	/**
	 *
	 * @param {js13k.Level} level
	 */
	constructor( level ) {
		super( level, 800, 600 );

		// TODO: remove
		/** @type {HTMLCanvasElement} */
		this.cnv;
		/** @type {CanvasRenderingContext2D} */
		this.ctx;
	}


	/**
	 *
	 * @private
	 */
	_drawPaws() {
		this.ctx.fillStyle = '#000';
		this.ctx.beginPath();
		this.ctx.ellipse( 210, 130, 32, 40, 0, 0, Math.PI * 2 );
		this.ctx.ellipse( this.w - 210, 130, 32, 40, 0, 0, Math.PI * 2 );
		this.ctx.fill();
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		if( this._needsRedraw ) {
			this._drawPaws();
		}

		ctx.drawImage( this.cnv, this.calcCenterX(), js13k.h - this.level.cauldron.h );
	}


	/**
	 *
	 * @param {number} timer
	 */
	update( timer ) {
		// TODO:
	}


};