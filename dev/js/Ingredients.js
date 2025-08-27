'use strict';


js13k.LizardTail = {


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
