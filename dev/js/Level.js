'use strict';


js13k.Level = class {


	/**
	 *
	 * @constructor
	 */
	constructor() {
		this.timer = 0;

		this.score = 1;
		this.stage = 1;
		this.currentOrder = null;

		this.orders = this._generateOrders();

		this.catBg = new js13k.CatBg( this );
		this.catFg = new js13k.CatFg( this );
		this.cauldron = new js13k.Cauldron( this );
	}


	/**
	 *
	 * @private
	 * @param {CanvasRenderingContext2D} ctx
	 */
	_drawOrder( ctx ) {
		// TODO:
	}


	/**
	 *
	 * @private
	 * @param {CanvasRenderingContext2D} ctx
	 */
	_drawScore( ctx ) {
		ctx.fillStyle = '#fff';
		ctx.textAlign = 'right';
		ctx.textBaseline = 'top';
		ctx.font = '600 48px ' + js13k.FONT_SANS;
		ctx.fillText( this.score, js13k.w - 50, 40 );
	}


	/**
	 *
	 * @private
	 * @returns {PotionOrder[]}
	 */
	_generateOrders() {
		return []; // TODO:
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		this.catBg.draw( ctx );
		this.cauldron.draw( ctx );
		this.catFg.draw( ctx );

		this._drawScore( ctx );
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
		// TODO:
	}


	/**
	 *
	 * @param {number} dt
	 */
	update( dt ) {
		this.timer += dt;

		this.catBg.update( this.timer );
		this.cauldron.update( this.timer );
		this.catFg.update( this.timer );
	}


};


/**
 * @typedef {object} PotionOrder
 * @property {Potion} potion
 * @property {number} timeLimit
 */
