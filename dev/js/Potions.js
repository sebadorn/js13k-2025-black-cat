'use strict';


js13k.Potion = class extends js13k.LevelObject {


	/**
	 * 
	 * @param {js13k.Level}        level
	 * @param {string}             name
	 * @param {js13k.Ingredient[]} ingredients
	 */
	constructor( level, name, ingredients ) {
		super( level, 100, 100 );
		this.name = name;
		this.ingredients = ingredients;
	}


};


js13k.WaterPotion = class extends js13k.Potion {


	/**
	 *
	 * @param {js13k.Level} level
	 */
	constructor( level ) {
		super( level, 'Just a water, please', [] );
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		// TODO:
	}


};
