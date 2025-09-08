'use strict';


js13k.Cauldron = class extends js13k.LevelObject {


	/**
	 *
	 * @param {js13k.Level} level
	 */
	constructor( level ) {
		super( level, 800, 650 );

		// TODO: remove
		/** @type {HTMLCanvasElement} */
		this.cnv;
		/** @type {CanvasRenderingContext2D} */
		this.ctx;

		/** @type {Ingredient[]} */
		this.contents = [];

		[this.cnvFluid, this.ctxFluid] = js13k.Renderer.getOffscreenCanvas( this.w * 0.72, this.h * 0.28 );
	}


	/**
	 *
	 * @private
	 * @param {number} x
	 * @param {number} y
	 * @param {number} timeOffset
	 */
	_drawBubble( x, y, timeOffset ) {
		const state = ( ( this.level.timer + timeOffset ) / 25 ) % 4;

		this.ctx.lineWidth = 3;
		this.ctx.strokeStyle = '#ffffff4f';
		this.ctx.beginPath();

		if( state < 3 ) {
			const progress = state / 3;
			this.ctx.lineWidth *= progress;
			this.ctx.arc( x, y, progress * progress * 12, Math.PI, 0 );
		}
		else {
			const alpha = 1 - state + 3;
			this.ctx.globalAlpha = alpha * alpha * alpha;
			this.ctx.moveTo( x, y - 8 );
			this.ctx.lineTo( x, y - 18 );
			this.ctx.moveTo( x - 7, y - 6 );
			this.ctx.lineTo( x - 15, y - 13 );
			this.ctx.moveTo( x + 7, y - 6 );
			this.ctx.lineTo( x + 15, y - 13 );
		}

		this.ctx.stroke();
		this.ctx.globalAlpha = 1;
	}


	/**
	 *
	 * @private
	 */
	_updateFluid() {
		const w = this.cnvFluid.width;
		const h = this.cnvFluid.height;

		const rx = w / 2;
		const ry = h / 2;

		this.ctxFluid.clearRect( 0, 0, w, h );

		// Just water
		let fluidColor = '#2d7feb';

		const numIngs = this.contents.length;

		if( numIngs > 0 ) {
			fluidColor = this.contents[numIngs - 1].fluidColor;
		}

		this.ctxFluid.fillStyle = fluidColor;
		this.ctxFluid.beginPath();
		this.ctxFluid.ellipse( w / 2, h / 2, rx, ry, 0, 0, Math.PI * 2 );
		this.ctxFluid.fill();
	}


	/**
	 *
	 * @param {Ingredient} ingredient
	 */
	addContent( ingredient ) {
		this.contents.push( ingredient );
		this._needsRedraw = true;
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		this.ctx.clearRect( 0, 0, this.w, this.h );

		const x = this.w / 2;
		const y = this.h * 0.2 + 2;
		const same = [0, 0, Math.PI * 2];

		const gradient = this.ctx.createRadialGradient(
			x, y + this.h * 0.37, this.h * 0.14,
			x, y + this.h * 0.37, this.h * 0.82
		);
		gradient.addColorStop( 0, '#666' );
		gradient.addColorStop( 1, '#444' );

		this.ctx.strokeStyle = '#444';
		this.ctx.lineWidth = 4;

		// big bottom
		this.ctx.fillStyle = gradient;
		this.ctx.beginPath();
		this.ctx.ellipse( x, y + this.h * 0.33, this.w * 0.5, this.h * 0.47, ...same );
		this.ctx.fill();

		// upper rim
		this.ctx.beginPath();
		this.ctx.ellipse( x, y, this.w * 0.45, this.h * 0.2, ...same );
		this.ctx.fill();
		this.ctx.stroke();

		// inner area
		this.ctx.fillStyle = '#444';
		this.ctx.beginPath();
		this.ctx.ellipse( x, y - this.h * 0.01, this.w * 0.39, this.h * 0.15, ...same );
		this.ctx.fill();

		// fluid
		this._updateFluid();
		this.ctx.save();
		this.ctx.clip();
		this.ctx.drawImage( this.cnvFluid, x / 2 - 90, y - this.h * 0.06 );
		this.ctx.restore();

		// bubbles
		this._drawBubble( x - 180, y + 25, 75 );
		this._drawBubble( x - 100, y + 50, 50 );
		this._drawBubble( x - 30, y + 10, 0 );
		this._drawBubble( x + 30, y + 60, 25 );
		this._drawBubble( x + 100, y + 20, 50 );
		this._drawBubble( x + 180, y + 40, 75 );

		ctx.drawImage( this.cnv, this.calcCenterX(), js13k.h - this.h + 100 );

		if( Math.random() < 0.01 ) {
			js13k.Audio.play( js13k.Audio.bubble, Math.random() * 0.3 );
		}
	}


	/**
	 *
	 * @param {Ingredient[]} newContent
	 */
	updateContent( newContent ) {
		this.contents = newContent;
		this._needsRedraw = true;
	}


};