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
	 */
	constructor( x, y, asset ) {
		this.x = x;
		this.y = y;
		[this.cnv, this.ctx] = js13k.Renderer.getOffscreenCanvas( asset.w, asset.h );

		this._render( asset.data );
	}


	/**
	 *
	 * @private
	 * @param {string[]} data
	 */
	_render( data ) {
		data.forEach( d => {
			const parts = d.split( ',' );
			const type = parts[0];

			if( type === 'fr' ) {
				this.ctx.fillStyle = '#' + parts[5];
				this.ctx.fillRect( parts[1], parts[2], parts[3], parts[4] );
			}
		} );
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		const absHeight = js13k.Renderer.cnv.height / js13k.Renderer.scale;
		ctx.drawImage( this.cnv, this.x, absHeight - this.y - this.cnv.height );
	}


	/**
	 *
	 * @param {number} timer
	 */
	update( timer ) {
		// TODO:
	}


};