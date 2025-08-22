'use strict';


js13k.Level = class {


	/**
	 *
	 * @constructor
	 */
	constructor() {
		this.timer = 0;

		/** @type {js13k.Cat} */
		this.cat = new js13k.Cat( 500, 500, js13k.Assets.graphics.cat_sleeping, this );

		/** @type {js13k.LevelObject[]} */
		this.background = [
			new js13k.LevelObject( 300, 300, js13k.Assets.graphics.bookshelf, this ),
		];

		/** @type {js13k.LevelObject[]} */
		this.middleground = [
			this.cat,
		];

		/** @type {js13k.LevelObject[]} */
		this.foreground = [];

		/** @type {Place[]} */
		this.places = [
			{ n: 'Window', x: 1700, y: 100, w: 200, h: 150 },
			{ n: 'Cauldron', x: 900, y: 600, w: 400, h: 300 },
		];
	}


	/**
	 *
	 * @private
	 * @param {CanvasRenderingContext2D} ctx
	 */
	_drawScenery( ctx ) {
		// Sky
		ctx.fillStyle = '#123349';
		ctx.fillRect( 0, 0, 1920, 1080 );
		// Floor
		ctx.fillStyle = '#41403f';
		ctx.fillRect( 0, 900, 1920, 180 );
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

		// TODO: remove
		this.places.forEach( p => {
			ctx.strokeStyle = '#fff';
			ctx.strokeRect( p.x, p.y, p.w, p.h );
		} );
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


/**
 * @typedef {object} Place
 * @property {string} n - Name
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 */