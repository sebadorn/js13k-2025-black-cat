'use strict';


js13k.WaterPotion = {


	name: 'Just a water, please',

	ingredients: [],


	/**
	 *
	 */
	draw: function() {
		if( this.cnv ) {
			return;
		}

		[this.cnv, this.ctx] = js13k.Renderer.getOffscreenCanvas( 100, 100 );

		this.ctx.fillStyle = '#00f';
		this.ctx.fillRect( 0, 0, 100, 100 );
	},


};
