'use strict';


js13k.CatFg = class extends js13k.LevelObject {


	static STATE_IDLE = 1;


	/**
	 *
	 * @param {js13k.Level} level
	 */
	constructor( level ) {
		super( level, 800, 600 );

		this.state = js13k.CatFg.STATE_IDLE;

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
		let x = 240;
		let y = 120;
		let rx = 40;
		let ry = 48;
		this.ctx.fillStyle = '#000';
		this.ctx.beginPath();
		this.ctx.ellipse( x, y, rx, ry, 0, 0, Math.PI * 2 );
		this.ctx.ellipse( this.w - x, y, rx, ry, 0, 0, Math.PI * 2 );
		this.ctx.fill();
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		if( this._needsRedraw ) {
			this.ctx.clearRect( 0, 0, this.w, this.h );
			this._drawPaws();
		}

		ctx.drawImage( this.cnv, this.calcCenterX(), js13k.h - this.level.cauldron.h );
	}


	/**
	 *
	 * @param {number} timer
	 */
	update( timer ) {
		this.animation?.do();
	}


};