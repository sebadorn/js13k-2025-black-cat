'use strict';


js13k.CatFg = class extends js13k.LevelObject {


	/**
	 *
	 * @param {js13k.Level} level
	 */
	constructor( level ) {
		super( level, 800, 600 );

		this.state = js13k.CatFg.STATE_IDLE;
		this.timer = 0;

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
		const rx = 48;
		const ry = 40;
		this.ctx.fillStyle = '#111';
		this.ctx.beginPath();
		this.ctx.ellipse( 380, 120, rx, ry, 0, 0, Math.PI * 2 );
		this.ctx.ellipse( this.w - 340, 160, rx, ry, 0, 0, Math.PI * 2 );
		this.ctx.fill();
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		if( this._needsRedraw ) {
			this.ctx.clearRect( 0, 0, this.w, this.h );
			this.ctx.fillStyle = '#534320';
			this.ctx.fillRect( 400, 0, 40, 340 );
			this._drawPaws();
		}

		let timer = this.level.timer / 40;
		let x = this.calcCenterX() + Math.sin( timer ) * 200 - 20;
		let y = js13k.h - this.level.cauldron.h - 80 + Math.cos( timer ) * 30;

		const centerX = x + this.w / 2 + 20;
		const centerY = y + this.h / 2 - 170;

		ctx.translate( centerX, centerY );
		ctx.rotate( Math.sin( timer ) * 10 * Math.PI / 180 );
		ctx.translate( -centerX, -centerY );

		ctx.drawImage( this.cnv, x, y );

		ctx.setTransform( js13k.Renderer.scale, 0, 0, js13k.Renderer.scale, 0, 0 ); // reset
	}


};