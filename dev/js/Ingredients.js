'use strict';


js13k.IngredientWarm = {


	name: 'Lizard Tail',


	/**
	 *
	 */
	draw: function() {
		if( this.cnv ) {
			return;
		}

		[this.cnv, this.ctx] = js13k.Renderer.getOffscreenCanvas( 100, 100 );

		this.ctx.fillStyle = '#c47816';
		this.ctx.beginPath();
		this.ctx.moveTo( 60, 15 );
		this.ctx.quadraticCurveTo( 0, 55, 30, 85 );
		this.ctx.quadraticCurveTo( 30, 50, 80, 40 );
		this.ctx.closePath();
		this.ctx.fill();
	},


};


js13k.IngredientCold = {


	name: 'Blue Peach',


	/**
	 *
	 */
	draw: function() {
		if( this.cnv ) {
			return;
		}

		[this.cnv, this.ctx] = js13k.Renderer.getOffscreenCanvas( 100, 100 );

		this.ctx.fillStyle = '#3c73c5';
		this.ctx.beginPath();
		this.ctx.ellipse( 45, 50, 30, 30, 0, 0, Math.PI * 2 );
		this.ctx.ellipse( 55, 50, 30, 30, 0, 0, Math.PI * 2 );
		this.ctx.fill();
	},


};


js13k.IngredientLife = {


	name: 'Forest Herbs',


	/**
	 *
	 * @private
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} x
	 * @param {number} y
	 */
	_drawLeaf( ctx, x, y ) {
		ctx.fillStyle = '#305e25';

		ctx.beginPath();
		ctx.moveTo( x - 12, y + 20 );
		ctx.lineTo( x, y );
		ctx.lineTo( x + 12, y + 20 );
		ctx.arc( x, y + 29, 15, 0, Math.PI * 2 );
		ctx.fill();
	},


	/**
	 *
	 */
	draw: function() {
		if( this.cnv ) {
			return;
		}

		[this.cnv, this.ctx] = js13k.Renderer.getOffscreenCanvas( 100, 100 );

		this._drawLeaf( this.ctx, 50, 20 );
		// this._drawLeaf( this.ctx, 20, 60 );
		// this._drawLeaf( this.ctx, 70, 55 );
	},


};


js13k.IngredientEmotion = {


	name: 'Mind Mushroom',


	/**
	 *
	 */
	draw: function() {
		if( this.cnv ) {
			return;
		}

		[this.cnv, this.ctx] = js13k.Renderer.getOffscreenCanvas( 100, 100 );

		this.ctx.fillStyle = '#8143a5';
		this.ctx.fillRect( 0, 0, 100, 100 );
	},


};


js13k.IngredientSupercharge = {


	name: 'Mockingbird Feather',


	/**
	 *
	 */
	draw: function() {
		if( this.cnv ) {
			return;
		}

		[this.cnv, this.ctx] = js13k.Renderer.getOffscreenCanvas( 100, 100 );

		this.ctx.fillStyle = '#e4d944';
		this.ctx.fillRect( 0, 0, 100, 100 );
	},


};
