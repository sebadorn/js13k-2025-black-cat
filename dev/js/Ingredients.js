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
		this.ctx.fillRect( 0, 0, 100, 100 );
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
		this.ctx.fillRect( 0, 0, 100, 100 );
	},


};


js13k.IngredientLife = {


	name: 'Forest Herbs',


	/**
	 *
	 */
	draw: function() {
		if( this.cnv ) {
			return;
		}

		[this.cnv, this.ctx] = js13k.Renderer.getOffscreenCanvas( 100, 100 );

		this.ctx.fillStyle = '#305e25';
		this.ctx.fillRect( 0, 0, 100, 100 );
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
