'use strict';


js13k.Ingredient = class extends js13k.LevelObject {


	/**
	 * 
	 * @param {js13k.Level} level
	 * @param {string} name
	 */
	constructor( level, name ) {
		super( level, 100, 100 );
		this.name = name;
	}


};


js13k.LizardTailIng = class extends js13k.Ingredient {


	/**
	 *
	 * @param {js13k.Level} level
	 */
	constructor( level ) {
		super( level, 'Lizard Tail' );
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		// TODO:
	}


};
