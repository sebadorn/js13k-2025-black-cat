'use strict';


js13k.Level = class {


	/**
	 *
	 * @constructor
	 */
	constructor() {
		this.timer = 0;

		this.cat = new js13k.Cat( 500, 500, js13k.Assets.graphics.cat );

		this.background = [
			new js13k.LevelObject( 300, 100, js13k.Assets.graphics.bookshelf ),
		];

		this.middleground = [
			this.cat,
		];

		this.foreground = [];

		this.places = [
			{ n: 'window', x: 800, y: 100, w: 200, h: 150 },
		];
	}


	/**
	 *
	 * @private
	 * @param {CanvasRenderingContext2D} ctx
	 */
	_drawScenery( ctx ) {
		const cnv = js13k.Renderer.cnv;
		const width = cnv.width / js13k.Renderer.scale;
		const height = cnv.height / js13k.Renderer.scale;

		// Sky
		ctx.fillStyle = '#123349';
		ctx.fillRect( 0, 0, width, height );
		// Floor
		ctx.fillStyle = '#3d2609';
		ctx.fillRect( 0, height * 0.8, width, height * 0.2 );
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		this._drawScenery( ctx );
		this.background.forEach( obj => obj.draw( ctx ) );
		this.middleground.forEach( obj => obj.draw( ctx ) );
		this.foreground.forEach( obj => obj.draw( ctx ) );
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
		const place = this.places.find( p => this.isInside( x, y, p ) );

		if( !place ) {
			return;
		}

		this.cat.moveTo( place );
	}


	/**
	 *
	 * @param {number} dt
	 */
	update( dt ) {
		this.timer += dt;

		this.background.forEach( obj => obj.update( this.timer ) );
		this.middleground.forEach( obj => obj.update( this.timer ) );
		this.foreground.forEach( obj => obj.update( this.timer ) );
	}


};
