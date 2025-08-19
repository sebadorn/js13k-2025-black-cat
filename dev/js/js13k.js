'use strict';


/**
 * @namespace js13k
 */
// eslint-disable-next-line no-redeclare
const js13k = {


	// Config
	FONT_MONO: '"Courier New", monospace',
	FONT_SANS: 'Arial, sans-serif',
	FONT_SERIF: '"Times New Roman", serif',
	TARGET_FPS: 60,
	TITLE: 'js13k 2025: Black Cat',


	/**
	 *
	 */
	init() {
		js13k.Assets.load( () => {
			js13k.Input.init();
			js13k.Renderer.init();

			js13k.Renderer.level = new js13k.Level();
			js13k.Renderer.mainLoop();
		} );
	},


	/**
	 *
	 * @param {number} start
	 * @param {number} target
	 * @param {number} progress - [0.0, 1.0]
	 * @returns {number}
	 */
	interpolate( start, target, progress ) {
		return start * ( 1 - progress ) + target * progress;
	},


	/**
	 *
	 * @return {object?}
	 */
	loadGame() {
		const json = localStorage.getItem( '2025_sd.save' );
		return json ? JSON.parse( json ) : null;
	},


	/**
	 *
	 * @param {number} levelId
	 */
	saveGame( levelId ) {
		localStorage.setItem(
			'2025_sd.save',
			JSON.stringify( { level: levelId } )
		);
	},


};


window.addEventListener( 'load', () => js13k.init() );
