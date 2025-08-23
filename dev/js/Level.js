'use strict';


js13k.Level = class {


	/**
	 *
	 * @constructor
	 */
	constructor() {
		this.timer = 0;
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		const gradient = ctx.createRadialGradient( js13k.w / 2, js13k.h / 2 + 280, 100, js13k.w / 2, js13k.h / 2 + 280, 600 );
		gradient.addColorStop( 0, '#777' );
		gradient.addColorStop( 1, '#555' );

		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.ellipse( js13k.w / 2, js13k.h / 2 + 260, 500, 340, 0, 0, Math.PI * 2 );
		ctx.fill();

		// ctx.fillStyle = '#777';
		ctx.beginPath();
		ctx.ellipse( js13k.w / 2, js13k.h / 2 + 20, 460, 150, 0, 0, Math.PI * 2 );
		ctx.fill();

		ctx.save();

		ctx.fillStyle = '#555';
		ctx.beginPath();
		ctx.ellipse( js13k.w / 2, js13k.h / 2 + 10, 410, 110, 0, 0, Math.PI * 2 );
		ctx.fill();
		ctx.clip();

		ctx.fillStyle = '#074';
		ctx.beginPath();
		ctx.ellipse( js13k.w / 2, js13k.h / 2 + 70, 390, 100, 0, 0, Math.PI * 2 );
		ctx.fill();

		ctx.restore();

		// Pixelate
		const smallW = js13k.w / 10;
		const smallH = js13k.h / 10;

		if( !this._cnvSmall ) {
			[this._cnvSmall, this._ctxSmall] = js13k.Renderer.getOffscreenCanvas( smallW, smallH );
		}

		this._ctxSmall.clearRect( 0, 0, smallW, smallH );
		this._ctxSmall.drawImage( js13k.Renderer.cnv, 0, 0, smallW, smallH );

		ctx.clearRect( 0, 0, js13k.w, js13k.h );
		ctx.drawImage( this._cnvSmall, 0, 0, js13k.w, js13k.h );
	}


	/**
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {Place} aabb
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
	}


};
