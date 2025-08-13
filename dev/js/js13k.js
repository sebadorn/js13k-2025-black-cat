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
		js13k.Assets.loadAll( () => {
			js13k.Input.init();
			js13k.Renderer.init();
		} );
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
