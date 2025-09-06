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

		/** @type {string} */
		this.fluidColor = '#2d7feb';

		/** @type {js13k.Ingredient[]} */
		this.contents = [];
	}


	/**
	 *
	 * @private
	 * @param {number} x
	 * @param {number} y
	 */
	_drawFluid( x, y ) {
		y += this.h * 0.08;

		// Just water
		this.fluidColor = '#2d7feb';

		if( this.contents.length == 1 ) {
			this.fluidColor = this.contents[0].fluidColor;
		}
		else if( this.contents.length == 2 ) {
			// TODO:
		}

		this.ctx.fillStyle = this.fluidColor;
		this.ctx.beginPath();
		this.ctx.ellipse( x, y, this.w * 0.36, this.h * 0.14, 0, 0, Math.PI * 2 );
		this.ctx.fill();
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
		if( this._needsRedraw ) {
			this.ctx.clearRect( 0, 0, this.w, this.h );

			this._needsRedraw = false;

			let x = this.w / 2;
			let y = this.h * 0.2 + 2;
			let same = [0, 0, Math.PI * 2];

			const gradient = this.ctx.createRadialGradient(
				x, y + this.h * 0.37, this.h * 0.14,
				x, y + this.h * 0.37, this.h * 0.82
			);
			gradient.addColorStop( 0, '#777' );
			gradient.addColorStop( 1, '#555' );

			this.ctx.strokeStyle = '#555';
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
			this.ctx.fillStyle = '#555';
			this.ctx.beginPath();
			this.ctx.ellipse( x, y - this.h * 0.01, this.w * 0.39, this.h * 0.15, ...same );
			this.ctx.fill();

			this.ctx.save();
			this.ctx.clip();
			this._drawFluid( x, y );
			this.ctx.restore();

			js13k.Renderer.pixelate( this.cnv, this.ctx );
		}

		ctx.drawImage( this.cnv, this.calcCenterX(), js13k.h - this.h + 100 );
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