'use strict';


js13k.IngredientWarm = {


	name: 'Wild Berries',
	fluidColor: '#a81646',

	x: 320,
	y: 430,
	w: 150,
	h: 150,


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		if( !this.cnv ) {
			[this.cnv, this.ctx] = js13k.Renderer.getOffscreenCanvas( this.w, this.h );

			// Bottle glas
			this.ctx.lineWidth = 4;
			this.ctx.strokeStyle = '#fff';
			this.ctx.beginPath();
			this.ctx.moveTo( 2, 42 );
			this.ctx.lineTo( 2, this.h - 2 );
			this.ctx.lineTo( this.w - 2, this.h - 2 );
			this.ctx.lineTo( this.w - 2, 42 );
			this.ctx.lineTo( this.w - 40, 42 );
			this.ctx.lineTo( this.w - 40, 12 );
			this.ctx.lineTo( 40, 12 );
			this.ctx.lineTo( 40, 42 );
			this.ctx.closePath();
			this.ctx.stroke();

			// Cork
			this.ctx.fillStyle = '#61401a';
			this.ctx.fillRect( 42, 0, this.w - 84, 52 );

			// Content
			const points = [
				// top row
				[15, 80], [35, 90], [55, 96], [75, 96], [95, 96], [115, 90], [135, 80],
				// second row
				[15, 100], [35, 110], [55, 116], [75, 116], [95, 116], [115, 110], [135, 100],
				// third row
				[15, 120], [35, 130], [55, 136], [75, 136], [95, 136], [115, 130], [135, 120],
				// corners
				[17, 136], [133, 136],
				// darker ones
				[25, 85, 0.9], [50, 90, 0.9], [80, 100, 0.9], [105, 95, 0.9], [130, 85, 0.9],
				[20, 105, 0.9], [40, 108, 0.9], [63, 112, 0.9], [98, 114, 0.9], [120, 106, 0.9],
				[22, 125, 0.9], [42, 135, 0.9], [67, 132, 0.9], [85, 125, 0.9], [110, 135, 0.9], [135, 128, 0.9],
			];

			for( let i = 0; i < points.length; i++ ) {
				const p = points[i];
				this.ctx.filter = `brightness(${p[2] || 1})`;

				this.ctx.fillStyle = '#a81646';
				this.ctx.beginPath();
				this.ctx.arc( p[0], p[1], 10, 0, Math.PI * 2 );
				this.ctx.fill();

				this.ctx.fillStyle = '#ffffff17';
				this.ctx.beginPath();
				this.ctx.arc( p[0] + 4, p[1] - 4, 5, 0, Math.PI * 2 );
				this.ctx.fill();
			}
		}

		ctx.drawImage( this.cnv, this.x, this.y );

		if( this.mouseover ) {
			js13k.Level.drawMouseoverText( ctx, this.name, this.x + this.w / 2, this.y + this.h + 15 );
		}
	},


};


js13k.IngredientCold = {


	name: 'Sparkling Salt',
	fluidColor: '#649fa3',

	x: 100,
	y: 430,
	w: 180,
	h: 150,


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		if( !this.cnv ) {
			[this.cnv, this.ctx] = js13k.Renderer.getOffscreenCanvas( this.w, this.h );

			// Content
			this.ctx.fillStyle = '#d3edee';
			this.ctx.beginPath();
			this.ctx.ellipse( this.w / 2, this.h / 2 + 20, this.w / 2 - 20, this.h / 2 - 40, 0, 0, Math.PI, true );
			this.ctx.fill();

			// Bowl
			this.ctx.fillStyle = '#4d5b6e';
			this.ctx.beginPath();
			this.ctx.ellipse( this.w / 2, this.h / 2 + 10, this.w / 2, this.h / 2, 0, 0, Math.PI );
			this.ctx.fill();
		}

		ctx.drawImage( this.cnv, this.x, this.y );

		if( this.mouseover ) {
			js13k.Level.drawMouseoverText( ctx, this.name, this.x + this.w / 2, this.y + this.h + 15 );
		}
	},


};


js13k.IngredientLife = {


	name: 'Dried Herbs',
	fluidColor: '#074',

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
				this.ctx.filter = `brightness(${0.8 + i * 0.05})`;
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


	name: 'Curious Mushrooms',
	fluidColor: '#8143a5',

	get x() {
		return js13k.w - this.w - 110;
	},

	get y() {
		return js13k.h - this.h;
	},

	w: 440,
	h: 200,


	/**
	 *
	 * @private
	 * @param {number} x
	 * @param {number} h
	 * @param {number} w
	 * @param {number} brightness
	 */
	_drawMushroom( x, h, w, brightness ) {
		const y = this.h - h;

		this.ctx.filter = `brightness(${brightness})`;

		this.ctx.fillStyle = '#ddd';
		this.ctx.fillRect( x, this.h - h, w, h );

		this.ctx.fillStyle = '#8143a5';
		this.ctx.beginPath();
		this.ctx.ellipse( x + w / 2, y, w * 2, w * 1.5, 0, 0, Math.PI, true );
		this.ctx.fill();
	},


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		if( !this.cnv ) {
			[this.cnv, this.ctx] = js13k.Renderer.getOffscreenCanvas( this.w, this.h );

			this._drawMushroom( 135, 30, 25, 0.65 );
			this._drawMushroom( 260, 20, 25, 0.65 );
			this._drawMushroom( 60, 85, 30, 0.85 );
			this._drawMushroom( 190, 70, 50, 0.9 );
			this._drawMushroom( 320, 80, 30, 0.95 );
			this._drawMushroom( 30, 40, 10, 1 );
			this._drawMushroom( 110, 45, 20, 1 );
			this._drawMushroom( 230, 35, 20, 1.1 );
			this._drawMushroom( 360, 25, 15, 1 );
		}

		ctx.drawImage( this.cnv, this.x, this.y );

		if( this.mouseover ) {
			js13k.Level.drawMouseoverText( ctx, this.name, this.x + this.w / 2, this.y );
		}
	},


};


js13k.IngredientSupercharge = {


	name: 'Feather of this Strange Bird',
	fluidColor: '#e4d944',

	x: 180,

	get y() {
		return js13k.h - this.h;
	},

	w: 220,
	h: 220,


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		if( !this.cnv ) {
			[this.cnv, this.ctx] = js13k.Renderer.getOffscreenCanvas( this.w, this.h );

			this.ctx.strokeStyle = '#61391f';
			this.ctx.lineWidth = 8;

			// Wooden stand
			this.ctx.beginPath();
			this.ctx.moveTo( this.w / 2 + 4, this.h - 100 );
			this.ctx.lineTo( this.w / 2 + 4, this.h );
			this.ctx.moveTo( 68, this.h - 100 );
			this.ctx.lineTo( this.w - 60, this.h - 100 );
			this.ctx.stroke();

			// Feet
			this.ctx.fillStyle = '#cf7c2f';
			this.ctx.fillRect( 85, this.h - 120, 6, 26 );
			this.ctx.fillRect( this.w - 85, this.h - 120, 6, 26 );

			// Body
			this.ctx.fillStyle = '#e4d944';
			this.ctx.beginPath();
			this.ctx.ellipse( this.w / 2 + 4, this.h - 160, 60, 50, 0, 0, Math.PI * 2 );
			this.ctx.fill();

			// Wings
			this.ctx.beginPath();
			this.ctx.moveTo( 54, this.h - 160 );
			this.ctx.lineTo( 54, this.h - 120 );
			this.ctx.lineTo( 114, this.h - 160 );
			this.ctx.fill();
			this.ctx.beginPath();
			this.ctx.moveTo( this.w - 46, this.h - 160 );
			this.ctx.lineTo( this.w - 46, this.h - 120 );
			this.ctx.lineTo( this.w - 106, this.h - 160 );
			this.ctx.fill();

			// Beak
			this.ctx.fillStyle = '#cf7c2f';
			this.ctx.beginPath();
			this.ctx.moveTo( this.w / 2 - 1, this.h - 165 );
			this.ctx.lineTo( this.w / 2 + 9, this.h - 165 );
			this.ctx.lineTo( this.w / 2 + 4, this.h - 150 );
			this.ctx.closePath();
			this.ctx.fill();

			// Eyes
			this.ctx.fillStyle = '#000';
			this.ctx.fillRect( 75, this.h - 170, 12, 3 );
			this.ctx.fillRect( this.w - 80, this.h - 170, 12, 3 );
		}

		ctx.drawImage( this.cnv, this.x, this.y );

		if( this.mouseover ) {
			js13k.Level.drawMouseoverText( ctx, this.name, this.x + this.w / 2, this.y - 40 );
		}
	},


};
