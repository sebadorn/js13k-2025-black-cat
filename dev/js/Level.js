'use strict';


js13k.Level = class {


	/**
	 *
	 * @constructor
	 */
	constructor() {
		this.timer = 0;

		this.background = [
			new js13k.LevelObject( 300, 100, js13k.Assets.graphics.bookshelf ),
		];
		this.middleground = [];
		this.foreground = [];
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

		this.background.forEach( obj => obj.update( this.timer ) );
		this.middleground.forEach( obj => obj.update( this.timer ) );
		this.foreground.forEach( obj => obj.update( this.timer ) );
	}


};
