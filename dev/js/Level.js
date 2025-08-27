'use strict';


js13k.Button = class {


	static BOTTLE = 1;
	static RESTART = 2;
	static TASTE = 3;


	/**
	 *
	 * @param {number} id
	 * @param {number} x
	 * @param {number} y
	 */
	constructor( id, x, y ) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.w = 100;
		this.h = 100;
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D}
	 */
	draw( ctx ) {
		if( !this.cnv ) {
			[this.cnv, this.ctx] = js13k.Renderer.getOffscreenCanvas( this.w, this.h );

			this.ctx.fillStyle = '#689cce';
			this.ctx.fillRect( 0, 0, this.w, this.h );
		}

		if( this.id == js13k.Button.BOTTLE ) {
			this.x = js13k.w - 200;
			this.y = ( js13k.h - 100 ) / 2;
		}
		else if( this.id == js13k.Button.RESTART ) {
			this.x = ( js13k.w - 100 ) / 2;
			this.y = js13k.h / 2 + 200;
		}
		else if( this.id == js13k.Button.TASTE ) {
			this.x = js13k.w / 2 + 200;
			this.y = ( js13k.h - 100 ) / 2;
		}

		ctx.drawImage( this.cnv, this.x, this.y );
	}


};


js13k.Level = class {


	/**
	 *
	 * @constructor
	 */
	constructor() {
		this.timer = 0;

		this.doneOrders = 0;
		this.score = 1;

		// 0: Intro
		// 1: Starting with simple potions
		// 2: More ingredients, potions with more ingredients
		// 3: Again more ingredients and potions with more ingredients
		this.stage = 0;

		this.orders = [];
		this.ingredients = [];

		/** @type {PotionOrder?} */
		this.currentOrder = this.orders[0]; // TODO:

		this.btnBottle = new js13k.Button( js13k.Button.BOTTLE );
		this.btnRestart = new js13k.Button( js13k.Button.RESTART );
		this.btnTasteTest = new js13k.Button( js13k.Button.TASTE );

		this.catBg = new js13k.CatBg( this );
		this.catFg = new js13k.CatFg( this );
		this.cauldron = new js13k.Cauldron( this );
	}


	/**
	 *
	 * @private
	 * @param {CanvasRenderingContext2D} ctx
	 */
	_drawButtons( ctx ) {
		this.btnBottle.draw( ctx );
		this.btnRestart.draw( ctx );
		this.btnTasteTest.draw( ctx );
	}


	/**
	 *
	 * @private
	 * @param {CanvasRenderingContext2D} ctx
	 */
	_drawIngredients( ctx ) {
		const maxNum = 7;
		const y = ( js13k.h - maxNum * 120 ) / 2;

		for( let i = 0; i < this.ingredients.length; i++ ) {
			const ing = this.ingredients[i];
			ing.draw();
			ing.x = 60;
			ing.y = y + i * 120;
			ing.w = 100;
			ing.h = 100;
			ctx.drawImage( ing.cnv, ing.x, ing.y, ing.w, ing.h );
		}
	}


	/**
	 *
	 * @private
	 * @param {CanvasRenderingContext2D} ctx
	 */
	_drawOrder( ctx ) {
		if( !this.currentOrder ) {
			return;
		}

		const w = 350;
		const h = 120;
		const x = ( js13k.w - w ) / 2;
		const y = 20;

		const potion = this.currentOrder.potion;

		// Background
		ctx.fillStyle = '#fff';
		ctx.fillRect( x, y, w, h );

		potion.draw();
		ctx.drawImage( potion.cnv, x + 10, y + 10 );

		// Name
		ctx.fillStyle = '#000';
		ctx.textAlign = 'left';
		ctx.font = '600 16px ' + js13k.FONT_SANS;
		ctx.fillText( potion.name.toUpperCase(), x + 120, y + 20 );

		// Info
		ctx.fillText( 'Ingredients: ' + potion.ingredients.length, x + 120, y + 50 );
	}


	/**
	 *
	 * @private
	 * @param {CanvasRenderingContext2D} ctx
	 */
	_drawScore( ctx ) {
		ctx.fillStyle = '#ff0';
		ctx.textAlign = 'right';
		ctx.textBaseline = 'top';
		ctx.font = '600 48px ' + js13k.FONT_SANS;
		ctx.fillText( this.score, js13k.w - 50, 40 );
	}


	/**
	 *
	 * @private
	 * @param {number} stage
	 * @returns {PotionOrder[]}
	 */
	_generateOrders( stage ) {
		// TODO: generate orders for each stage
		return [
			{ potion: js13k.WaterPotion, timeLimit: 10 },
		];
	}


	/**
	 *
	 * @private
	 * @param {Ingredient} ingredient
	 */
	_selectIngredient( ingredient ) {
		this.cauldron.addContent( ingredient );
	}


	/**
	 *
	 * @param {number} newStage
	 */
	changeStage( newStage ) {
		this.stage = newStage;
		this.ingredients = [];

		if( newStage >= 1 ) {
			this.ingredients.push(
				js13k.LizardTail,
				// TODO: start ingredients
			);
		}

		if( newStage >= 2 ) {
			this.ingredients.push(
				// TODO: added ingredients
			);
		}

		if( newStage >= 3 ) {
			this.ingredients.push(
				// TODO: added ingredients
			);
		}

		this.orders = this._generateOrders( newStage );
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
		this._drawOrder( ctx );
		this._drawIngredients( ctx );
		this._drawButtons( ctx );

		if( this.stage == 0 ) {
			ctx.fillStyle = '#0000004f';
			ctx.fillRect( 0, 0, js13k.w, js13k.h );

			const w = 600;
			const h = 200;
			const x = ( js13k.w - w ) / 2;
			ctx.fillStyle = '#fff';
			ctx.fillRect( x, 200, w, h );

			ctx.fillStyle = '#000';
			ctx.textAlign = 'left';
			ctx.font = '500 16px ' + js13k.FONT_SANS;
			ctx.textBaseline = 'top';
			// TODO: better text UI
			ctx.fillText( 'Welcome to the opening of Black Cat Potions!', x + 10, 210 );
			ctx.fillText( 'Do not let your score drop below 1 or you can already close your business again.', x + 10, 226 );
			ctx.fillText( 'You get the ingredients, but unfortunately no recipe book. Eh, you will figure it out.', x + 10, 242 );
			// TODO: add button "Open Shop" and make that the click area
		}
	}


	/**
	 *
	 * @param {number[]} pos
	 * @param {object}   aabb
	 * @param {number}   aabb.x
	 * @param {number}   aabb.y
	 * @param {number}   aabb.w
	 * @param {number}   aabb.h
	 * @returns {boolean}
	 */
	isInside( pos, aabb ) {
		return pos[0] >= aabb.x &&
			pos[0] <= aabb.x + aabb.w &&
			pos[1] >= aabb.y &&
			pos[1] <= aabb.y + aabb.h;
	}


	/**
	 *
	 * @param {number[]} pos
	 */
	onClick( pos ) {
		if( this._clickingDisabled ) {
			return;
		}

		if( this.stage == 0 ) {
			// TODO: limit area to starting message or a button therein
			this.changeStage( 1 );
			return;
		}

		if( this.isInside( pos, this.btnBottle ) ) {
			// TODO: create potion from cauldron contents and check
			return;
		}

		if( this.isInside( pos, this.btnRestart ) ) {
			this.cauldron.updateContent( [] );
			return;
		}

		if( this.isInside( pos, this.btnTasteTest ) ) {
			this._clickingDisabled = true;
			this.tasteTest( () => this._clickingDisabled = false );
			return;
		}

		for( let i = 0; i < this.ingredients.length; i++ ) {
			const ing = this.ingredients[i];

			if( this.isInside( pos, ing ) ) {
				this._selectIngredient( ing );
				return;
			}
		}
	}


	/**
	 *
	 * @param {number[]} pos
	 */
	onMouseMove( pos ) {
		if( this.stage == 0 ) {
			return;
		}

		if( this.isInside( pos, this.btnBottle ) ) {
			// TODO: show description
			return;
		}

		if( this.isInside( pos, this.btnRestart ) ) {
			// TODO: show description
			return;
		}

		if( this.isInside( pos, this.btnTasteTest ) ) {
			// TODO: show description
			return;
		}

		for( let i = 0; i < this.ingredients.length; i++ ) {
			const ing = this.ingredients[i];

			if( this.isInside( pos, ing ) ) {
				// TODO: show name of ingredient
				return;
			}
		}
	}


	/**
	 *
	 * @param {function} cb
	 */
	tasteTest( cb ) {
		this.catBg.state = js13k.CatBg.STATE_REACT;

		// TODO: animation of cat licking fluid, then showing a reaction indicating the current potion effect
		this.catFg.lick( () => {
			this.catBg.react( this.cauldron.contents, cb );
		} );
	}


	/**
	 *
	 * @param {number} dt
	 */
	update( dt ) {
		this.timer += dt;

		if( this.doneOrders === 3 ) {
			this.stage = 2;
			this.ingredients.push(
				// TODO:
			);
			this.orders = this._generateOrders( this.stage );
		}
		else if( this.doneOrders === 8 ) {
			this.stage = 3;
			this.ingredients.push(
				// TODO:
			);
			this.orders = this._generateOrders( this.stage );
		}

		if( this.score <= 0 ) {
			// TODO: game over
		}

		this.catBg.update( this.timer );
		this.cauldron.update( this.timer );
		this.catFg.update( this.timer );
	}


};


/**
 * @typedef {object} Ingredient
 * @property {string}   name
 * @property {function} draw
 */

/**
 * @typedef {object} Potion
 * @property {string}       name
 * @property {Ingredient[]} ingredients
 * @property {function}     draw
 */

/**
 * @typedef {object} PotionOrder
 * @property {Potion} potion
 * @property {number} timeLimit - Time limit for the order in seconds.
 */
