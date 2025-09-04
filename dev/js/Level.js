'use strict';


js13k.Button = class {


	static INTRO = 1;
	static BOTTLE = 2;
	static RESTART = 3;
	static TASTE = 4;


	/**
	 *
	 * @param {number} id
	 * @param {number} x
	 * @param {number} y
	 * @param {number} [w = 100]
	 * @param {number} [h = 100]
	 */
	constructor( id, x, y, w = 100, h = 100 ) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;

		// TODO: remove
		/** @type {HTMLCanvasElement} */
		this.cnv;
		/** @type {CanvasRenderingContext2D} */
		this.ctx;
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		if( !this.cnv ) {
			[this.cnv, this.ctx] = js13k.Renderer.getOffscreenCanvas( this.w, this.h );

			if( this.id == js13k.Button.INTRO ) {
				this.ctx.fillStyle = '#000';
				this.ctx.font = '600 20px ' + js13k.FONT_SANS;
				this.ctx.textAlign = 'center';
				this.ctx.textBaseline = 'middle';
				this.ctx.fillText( 'Open Shop!', this.w / 2, this.h / 2 );
			}
			else {
				this.ctx.fillStyle = '#000';
				this.ctx.strokeStyle = '#fff';
				this.ctx.lineWidth = 3;
				this.ctx.beginPath();
				this.ctx.arc( this.w / 2, this.h / 2, this.w / 2 - 2, 0, Math.PI * 2 );
				this.ctx.fill();
				this.ctx.stroke();

				if( this.id == js13k.Button.BOTTLE ) {
					const w3 = this.w / 3;

					this.ctx.fillStyle = '#1e61ad';
					this.ctx.beginPath();
					this.ctx.moveTo( w3 - 10, 50 );
					this.ctx.lineTo( w3 * 2 + 6, 50 );
					this.ctx.lineTo( w3 + 7, this.h - 18 );
					this.ctx.lineTo( w3 - 16, this.h - 40 );
					this.ctx.closePath();
					this.ctx.fill();

					this.ctx.save();
					this.ctx.translate( this.w / 2, this.h / 2 );
					this.ctx.rotate( 45 * Math.PI / 180 );
					this.ctx.translate( -this.w / 2, -this.h / 2 );

					this.ctx.beginPath();
					this.ctx.moveTo( w3, this.h - 20 );
					this.ctx.lineTo( w3 * 2, this.h - 20 );
					this.ctx.lineTo( w3 * 2, 35 );
					this.ctx.lineTo( w3 * 1.7, 35 );
					this.ctx.lineTo( w3 * 1.7, 15 );
					this.ctx.lineTo( w3 * 1.3, 15 );
					this.ctx.lineTo( w3 * 1.3, 35 );
					this.ctx.lineTo( w3, 35 );
					this.ctx.closePath();
					this.ctx.stroke();

					this.ctx.fillStyle = '#5e3f1c';
					this.ctx.fillRect( w3 * 1.3 + 1.5, 13, w3 * 0.4 - 3, 10 );

					this.ctx.restore();
				}
				else if( this.id == js13k.Button.RESTART ) {
					// Curved arrow
					this.ctx.beginPath();
					this.ctx.arc( this.w / 2, this.h / 2, this.w / 2 - 25, Math.PI * 0.75, Math.PI * 1.5 );
					this.ctx.moveTo( this.w / 2 - 8, 15 );
					this.ctx.lineTo( this.w / 2 + 2, 25 );
					this.ctx.lineTo( this.w / 2 - 8, 35 );
					this.ctx.stroke();

					// Curved arrow
					this.ctx.beginPath();
					this.ctx.arc( this.w / 2, this.h / 2, this.w / 2 - 25, Math.PI * 1.75, Math.PI / 2 );
					this.ctx.moveTo( this.w / 2 + 8, this.h - 15 );
					this.ctx.lineTo( this.w / 2 - 2, this.h - 25 );
					this.ctx.lineTo( this.w / 2 + 8, this.h - 35 );
					this.ctx.stroke();
				}
				else if( this.id == js13k.Button.TASTE ) {
					const rx = 14;

					// Tongue
					this.ctx.fillStyle = '#d00';
					this.ctx.beginPath();
					this.ctx.rect( this.w / 3 + 2, this.h / 4 + 2, this.w / 3 - 4, this.h / 3 );
					this.ctx.arc( this.w / 2, this.h / 2 + 10, this.w / 6 - 2, 0, Math.PI * 2 );
					this.ctx.fill();

					// Mouth
					this.ctx.fillStyle = '#000';
					this.ctx.strokeStyle = '#fff';

					this.ctx.beginPath();
					this.ctx.ellipse( this.w / 2 - rx, this.h / 4, rx, 10, 0, 0, Math.PI * 0.9 );
					this.ctx.fill();
					this.ctx.stroke();

					this.ctx.beginPath();
					this.ctx.ellipse( this.w / 2 + rx, this.h / 4, rx, 10, 0, Math.PI * 0.1, Math.PI );
					this.ctx.fill();
					this.ctx.stroke();
				}
			}
		}

		let text = null;

		if( this.id == js13k.Button.INTRO ) {
			this.x = ( js13k.w - this.w ) / 2;
		}
		else if( this.id == js13k.Button.BOTTLE ) {
			this.x = js13k.w - 200;
			this.y = ( js13k.h - 100 ) / 2;
			text = 'Finish Potion';
		}
		else if( this.id == js13k.Button.RESTART ) {
			this.x = ( js13k.w - 100 ) / 2;
			this.y = js13k.h / 2 + 280;
			text = 'Start Over';
		}
		else if( this.id == js13k.Button.TASTE ) {
			this.x = js13k.w / 2 + 200;
			this.y = ( js13k.h - 100 ) / 2;
			text = 'Taste Test';
		}

		ctx.globalAlpha = ( this.id == js13k.Button.INTRO || this.mouseover ) ? 1 : 0.4;
		ctx.drawImage( this.cnv, this.x, this.y );
		ctx.globalAlpha = 1;

		if( this.mouseover ) {
			js13k.Level.drawMouseoverText( ctx, text, this.x + this.w / 2, this.y + this.h + 10 );
		}
	}


};


js13k.Level = class {


	/**
	 *
	 * @constructor
	 */
	constructor() {
		this.timer = 0;
		this.score = 1;

		// 0: Intro
		// 1: Starting with simple potions
		// 2: More ingredients, potions with more ingredients
		// 3: Again more ingredients and potions with more ingredients
		this.stage = 0;

		/** @type {PotionOrder[]} */
		this.orders = [];

		/** @type {PotionOrder[]} */
		this.doneOrders = [];

		/** @type {PotionOrder[]} */
		this.failedOrders = [];

		/** @type {PotionOrder?} */
		this.currentOrder = null;

		/** @type {Ingredient[]} */
		this.ingredients = [];

		this.btnIntroStart = new js13k.Button( js13k.Button.INTRO, 0, 400 - 60, 200, 40 );
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
		// TODO: draw shelf/shelves for ingredients

		for( let i = 0; i < this.ingredients.length; i++ ) {
			const ing = this.ingredients[i];
			ing.draw( ctx );
		}
	}


	/**
	 *
	 * @private
	 * @param {CanvasRenderingContext2D} ctx
	 */
	_drawIntro( ctx ) {
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
		ctx.fillText( 'Do not let your score drop below 1 or you can close your business again.', x + 10, 226 );
		ctx.fillText( 'You have the ingredients, but alas! no recipe book.', x + 10, 242 );

		this.btnIntroStart.draw( ctx );
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
		const x = js13k.w - w - 40;
		const y = 40;

		const potion = this.currentOrder.potion;

		// Background
		ctx.fillStyle = '#fff';
		ctx.fillRect( x, y, w, h );

		// Time left
		const timeProgress = this.currentOrder.timer.progress();
		ctx.fillStyle = '#777';
		ctx.fillRect( x, y, w * ( 1 - timeProgress ), 10 );

		// Name
		ctx.fillStyle = '#000';
		ctx.textAlign = 'left';
		ctx.font = '500 16px ' + js13k.FONT_SANS;
		ctx.fillText( this.currentOrder.desc, x + 20, y + 20 );

		// Info
		if( potion.ingredients.length > 0 ) {
			ctx.fillText( 'Ingredients: ' + potion.ingredients.length, x + 20, y + 50 );
		}
	}


	/**
	 *
	 * @private
	 * @param {CanvasRenderingContext2D} ctx
	 */
	_drawScore( ctx ) {
		ctx.fillStyle = '#ff0';
		ctx.strokeStyle = '#ff0';
		ctx.lineWidth = 6;

		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';
		ctx.font = '600 48px ' + js13k.FONT_SANS;
		ctx.fillText( this.score, js13k.w / 2, 40 );

		ctx.beginPath();
		ctx.arc( js13k.w / 2, 60, 36, 0, Math.PI * 2 );
		ctx.stroke();
		ctx.fillStyle = '#ffff004f';
		ctx.fill();
	}


	/**
	 *
	 * @private
	 * @param {number} stage
	 * @returns {PotionOrder[]}
	 */
	_generateOrders( stage ) {
		const possiblePotions = {};

		for( const key in js13k.Potion ) {
			/** @type {Potion} */
			const potion = js13k.Potion[key];
			const numIngredients = potion.ingredients.length;

			possiblePotions[numIngredients] ??= [];
			possiblePotions[numIngredients].push( potion );
		}

		// TODO: Some smart algo:
		// - Orders should start with and mostly contain potions with the max number of ingredients currently allowed
		// - But also some lower ones
		// - Every potion should appear at least once
		// - Repeat failed orders later again

		/** @type {Potion[]} */
		const list = [];

		if( stage == 1 ) {
			list.push( js13k.Potion.Water, js13k.Potion.Water );

			for( let i = 0; i < 8; i++ ) {
				const rnd = Math.round( Math.random() * ( possiblePotions[1].length - 1 ) );
				const potion = possiblePotions[1][rnd];
				list.push( potion );
			}
		}
		else if( stage == 2 ) {
			list.push( js13k.Potion.Water );

			for( let i = 0; i < 3; i++ ) {
				const rnd = Math.round( Math.random() * ( possiblePotions[1].length - 1 ) );
				const potion = possiblePotions[1][rnd];
				list.push( potion );
			}

			for( let i = 0; i < 6; i++ ) {
				const rnd = Math.round( Math.random() * ( possiblePotions[2].length - 1 ) );
				const potion = possiblePotions[2][rnd];
				list.push( potion );
			}
		}
		else if( stage == 3 ) {
			list.push( js13k.Potion.Water );

			for( let i = 0; i < 2; i++ ) {
				const rnd = Math.round( Math.random() * ( possiblePotions[1].length - 1 ) );
				const potion = possiblePotions[1][rnd];
				list.push( potion );
			}

			for( let i = 0; i < 3; i++ ) {
				const rnd = Math.round( Math.random() * ( possiblePotions[2].length - 1 ) );
				const potion = possiblePotions[2][rnd];
				list.push( potion );
			}

			for( let i = 0; i < 4; i++ ) {
				const rnd = Math.round( Math.random() * ( possiblePotions[3].length - 1 ) );
				const potion = possiblePotions[3][rnd];
				list.push( potion );
			}
		}

		js13k.shuffle( list );

		return list.map( potion => {
			return {
				potion: potion,
				timeLimit: ( potion.ingredients.length + 1 ) * 25,
			};
		} );
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
		if( this.stage == newStage ) {
			return;
		}

		this.stage = newStage;
		this.ingredients = [];

		if( newStage >= 1 ) {
			this.ingredients.push(
				js13k.IngredientWarm,
				js13k.IngredientCold,
				js13k.IngredientLife,
			);
		}

		if( newStage >= 2 ) {
			this.ingredients.push(
				js13k.IngredientEmotion,
			);
		}

		if( newStage >= 3 ) {
			this.ingredients.push(
				js13k.IngredientSupercharge,
			);
		}

		this.orders = this._generateOrders( newStage );
		this.nextOrder();
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
			this._drawIntro( ctx );
		}
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {string} text
	 * @param {number} x
	 * @param {number} y
	 */
	static drawMouseoverText( ctx, text, x, y ) {
		ctx.save();
		ctx.shadowBlur = 30;
		ctx.shadowColor = '#000';
		ctx.fillStyle = '#fff';
		ctx.font = 'italic 600 32px ' + js13k.FONT_SERIF;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';
		ctx.fillText( text, x, y );
		ctx.restore();
	}


	/**
	 *
	 * @param {Ingredient[]?} contents
	 * @returns {Potion?}
	 */
	getPotion( contents ) {
		if( !contents ) {
			return null;
		}

		const numIngredients = contents.length;

		if( numIngredients == 0 ) {
			return js13k.Potion.Water;
		}

		for( const key in js13k.Potion ) {
			/** @type {Potion} */
			const potion = js13k.Potion[key];

			if( potion.ingredients.length != numIngredients ) {
				continue;
			}

			let numMatches = 0;

			for( const ingredient of potion.ingredients ) {
				if( contents.includes( ingredient ) ) {
					numMatches++;
				}
			}

			if( numMatches == numIngredients ) {
				return potion;
			}
		}

		return null;
	}


	/**
	 *
	 * @param {number[]} pos - [x, y]
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
	 */
	nextOrder() {
		this.currentOrder = this.orders.splice( 0, 1 )[0];

		const rnd = Math.round( Math.random() * ( this.currentOrder.potion.desc.length - 1 ) );
		this.currentOrder.desc =this.currentOrder.potion.desc[rnd];
		this.currentOrder.timer = new js13k.Timer( this, this.currentOrder.timeLimit );
	}


	/**
	 *
	 * @param {number[]} pos - [x, y]
	 */
	onClick( pos ) {
		if( this._clickingDisabled ) {
			return;
		}

		if( this.stage == 0 ) {
			if( this.isInside( pos, this.btnIntroStart ) ) {
				this.changeStage( 1 );
			}
			return;
		}

		if( this.isInside( pos, this.btnBottle ) ) {
			this.verifyPotion( this.cauldron.contents );
			this.cauldron.updateContent( [] );
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
	 * @param {number[]} pos - [x, y]
	 */
	onMouseMove( pos ) {
		if( this.stage == 0 ) {
			return;
		}

		this.btnBottle.mouseover = false;
		this.btnRestart.mouseover = false;
		this.btnTasteTest.mouseover = false;

		let targetFound = false;

		for( let i = 0; i < this.ingredients.length; i++ ) {
			const ing = this.ingredients[i];
			ing.mouseover = false;

			if( !targetFound && this.isInside( pos, ing ) ) {
				targetFound = true;
				ing.mouseover = true;
			}
		}

		if( !targetFound && this.isInside( pos, this.btnBottle ) ) {
			targetFound = true;
			this.btnBottle.mouseover = true;
		}

		if( !targetFound && this.isInside( pos, this.btnRestart ) ) {
			targetFound = true;
			this.btnRestart.mouseover = true;
		}

		if( !targetFound && this.isInside( pos, this.btnTasteTest ) ) {
			targetFound = true;
			this.btnTasteTest.mouseover = true;
		}
	}


	/**
	 *
	 * @param {Potion?} potion
	 * @returns {number} Score: -1 for a wrong order, 0 for an alternative potion, +1 for the correct one
	 */
	scoreOrder( potion ) {
		// Not a valid potion
		if( !potion ) {
			return -1;
		}

		// Correct potion
		if( this.currentOrder.potion == potion ) {
			return 1;
		}

		const alternatives = this.currentOrder.potion.alternatives || [];

		if( alternatives.includes( potion ) ) {
			return 0;
		}

		// Wrong potion
		return -1;
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

		// Time is up, failed to provide a potion.
		if( this.currentOrder?.timer?.elapsed() ) {
			this.verifyPotion();
		}

		if( this.doneOrders.length == 6 ) {
			this.changeStage( 2 );
		}
		else if( this.doneOrders.length == 12 ) {
			this.changeStage( 3 );
		}

		if( this.score <= 0 ) {
			// TODO: game over
		}

		this.catBg.update( this.timer );
		this.cauldron.update( this.timer );
		this.catFg.update( this.timer );
	}


	/**
	 *
	 * @param {Ingredient[]?} contents
	 */
	verifyPotion( contents ) {
		const potion = this.getPotion( contents );
		const result = this.scoreOrder( potion );

		this.score += result;
		this.currentOrder.score = result;

		if( result > 0 ) {
			this.doneOrders.push( this.currentOrder );
		}
		else {
			this.failedOrders.push( this.currentOrder );
		}

		if( this.orders.length == 0 ) {
			this.orders = this._generateOrders( this.stage );
		}

		this.nextOrder();
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
 * @property {string[]}     desc
 * @property {Ingredient[]} ingredients
 * @property {Potion[]?}    alternatives - Alternatives to this potion the customer will also accept, but for not as many points.
 * @property {function}     draw
 */

/**
 * @typedef {object} PotionOrder
 * @property {Potion}       potion
 * @property {string}       desc      - A randomly picked description.
 * @property {number}       timeLimit - Time limit for the order in seconds.
 * @property {js13k.Timer?} timer     - Timer started when the order was selected as current one.
 * @property {number?}      score     - The scoring result when this order was finished.
 */
