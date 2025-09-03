'use strict';


js13k.IngredientWarm = {


	name: 'Lizard Tail',


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		if( !this.cnv ) {
			[this.cnv, this.ctx] = js13k.Renderer.getOffscreenCanvas( 100, 100 );

			this.ctx.fillStyle = '#c47816';
			this.ctx.beginPath();
			this.ctx.moveTo( 60, 15 );
			this.ctx.quadraticCurveTo( 0, 55, 30, 85 );
			this.ctx.quadraticCurveTo( 30, 50, 80, 40 );
			this.ctx.closePath();
			this.ctx.fill();
		}

		// ctx.drawImage( this.cnv, this.x, this.y );

		// if( this.mouseover ) {
		// 	ctx.save();
		// 	ctx.shadowBlur = 30;
		// 	ctx.shadowColor = '#000';
		// 	ctx.fillStyle = '#fff';
		// 	ctx.font = 'italic 600 32px ' + js13k.FONT_SERIF;
		// 	ctx.textAlign = 'left';
		// 	ctx.textBaseline = 'middle';
		// 	ctx.fillText( this.name, this.x + this.w + 10, this.y + this.h / 2 );
		// 	ctx.restore();
		// }
	},


};


js13k.IngredientCold = {


	name: 'Blue Peach',


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
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


	name: 'Dried Herbs',

	x: 140,
	y: 0,
	w: 500,
	h: 240,


	/**
	 *
	 * @private
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} x
	 * @param {number} h
	 */
	_drawLeaf( ctx, x, y, h ) {
		ctx.strokeStyle = '#37460e';
		ctx.fillStyle = '#adb639';
		ctx.lineWidth = 2;

		for( let i = y; i < h; i += 20 ) {
			let offsetX = x;
			let progress = i / h;

			if( progress < 0.5 ) {
				offsetX -= progress * 20;
			}
			else {
				offsetX -= ( 1 - progress ) * 20;
			}

			// Branches left and right
			ctx.beginPath();
			ctx.moveTo( offsetX, i );
			ctx.lineTo( offsetX - 30, i + 20 );
			ctx.moveTo( offsetX, i );
			ctx.lineTo( offsetX + 30, i + 20 );
			ctx.stroke();

			// Leaves/Flowers at end of branches
			ctx.beginPath();
			ctx.ellipse( offsetX - 25, i + 18, 5, 7, Math.PI / 4, 0, Math.PI * 2 );
			ctx.ellipse( offsetX + 25, i + 18, 5, 7, Math.PI / -4, 0, Math.PI * 2 );
			ctx.fill();
		}

		// Stem
		ctx.strokeStyle = '#305e25';
		ctx.lineWidth = 4;

		ctx.beginPath();
		ctx.moveTo( x, 0 );
		ctx.quadraticCurveTo( x - 20, h / 2, x, h );
		ctx.stroke();
	},


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		if( !this.cnv ) {
			[this.cnv, this.ctx] = js13k.Renderer.getOffscreenCanvas( this.w, this.h );

			const step = this.w / 6;

			for( let i = 1; i < 7; i++ ) {
				const h = this.h * ( i % 2 ? 1 : 0.8 );
				this._drawLeaf( this.ctx, step * i - 40, i % 2 ? -5 : -15, h - 30 );
			}
		}

		ctx.drawImage( this.cnv, this.x, this.y );

		if( this.mouseover ) {
			js13k.Level.drawMouseoverText( ctx, this.name, this.x + this.w / 2, this.y + this.h );
		}
	},


};


js13k.IngredientEmotion = {


	name: 'Mind Mushroom',


	/**
	 *
	 */
	draw() {
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
	draw() {
		if( this.cnv ) {
			return;
		}

		[this.cnv, this.ctx] = js13k.Renderer.getOffscreenCanvas( 100, 100 );

		this.ctx.fillStyle = '#e4d944';
		this.ctx.fillRect( 0, 0, 100, 100 );
	},


};
