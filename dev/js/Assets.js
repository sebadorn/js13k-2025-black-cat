'use strict';


js13k.Asset = class {


	/**
	 *
	 * @param {object}  options
	 * @param {string?} options.data
	 * @param {object?} options.colors
	 * @param {number}  options.w
	 * @param {number}  options.h
	 * @param {number}  [options.frames = 1]
	 * @param {number}  [options.frameTimeSlowDown = 1]
	 * @param {number}  [options.scale = 1]
	 * @param {function?} options.render
	 */
	constructor( options ) {
		this.options = options;
		this.options.frames ??= 1;
		this.options.frameTimeSlowDown ??= 1;
		this.options.scale ??= 1;

		this.frames = [];

		for( let i = 0; i < this.options.frames; i++ ) {
			const [cnv, ctx] = js13k.Renderer.getOffscreenCanvas( this.options.w, this.options.h );
			this.frames.push( { cnv, ctx } );
		}

		const [cnv, ctx] = js13k.Renderer.getOffscreenCanvas( this.options.w, this.options.h );
		this.bg = { cnv, ctx };
	}


	/**
	 *
	 * @returns {number}
	 */
	get w() {
		return this.options.w * this.options.scale;
	}


	/**
	 *
	 * @returns {number}
	 */
	get h() {
		return this.options.h * this.options.scale;
	}


	/**
	 *
	 * @private
	 */
	_drawBackground() {
		const w = this.options.w;
		const h = this.options.h;

		this.bg.ctx.strokeStyle = '#000';
		this.bg.ctx.lineWidth = 10;
		this.bg.ctx.lineCap = 'square';

		this.bg.ctx.beginPath();
		const offset = 2;
		let i = 1;

		if( w > h ) {
			const segments = Math.floor( w / 16 );
			this.bg.ctx.moveTo( offset, h - 5 );

			for( ; i < segments + 2; i++ ) {
				this.bg.ctx.lineTo( offset + i * 10, 5 );
				this.bg.ctx.lineTo( offset + i * 10, h - 5 );
			}

			this.bg.ctx.lineTo( offset + i * 10, 5 );
		}
		else {
			const segments = Math.floor( h / 16 );
			this.bg.ctx.moveTo( w - 5, offset );

			for( ; i < segments + 2; i++ ) {
				this.bg.ctx.lineTo( 5, offset + i * 10 );
				this.bg.ctx.lineTo( w - 5, offset + i * 10 );
			}

			this.bg.ctx.lineTo( 5, offset + i * 10 );
		}

		this.bg.ctx.stroke();
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} x
	 * @param {number} y
	 * @param {number} [frame = 0]
	 */
	draw( ctx, x, y, frame = 0 ) {
		if( !this.options.render ) {
			ctx.drawImage( this.bg.cnv, x, y, this.w, this.h );
		}

		ctx.drawImage( this.frames[frame].cnv, x, y, this.w, this.h );
	}


	/**
	 *
	 */
	render() {
		if( this._isRendered ) {
			return;
		}

		this._isRendered = true;

		if( this.options.render ) {
			this.options.render.call( this, this.frames[0].ctx, this.options.w, this.options.h );
			return;
		}

		this._drawBackground();

		const size = this.options.w * this.options.h;

		for( let i = 0; i < this.frames.length; i++ ) {
			const frame = this.frames[i];
			const imageData = frame.ctx.createImageData( this.options.w, this.options.h );

			for( let j = 0; j < this.options.data.length; j++ ) {
				const d = this.options.data[i * size + j];
				const color = this.options.colors[d];

				let r = 0;
				let g = 0;
				let b = 0;
				let a = 0;

				if( !color ) {
					continue;
				}

				[r, g, b, a] = color;

				imageData.data[j * 4 + 0] = r;
				imageData.data[j * 4 + 1] = g;
				imageData.data[j * 4 + 2] = b;
				imageData.data[j * 4 + 3] = a;
			}

			frame.ctx.putImageData( imageData, 0, 0 );
		}
	}


};


js13k.Assets = {


	graphics: {
		bookshelf: new js13k.Asset( {
			w: 400,
			h: 560,
			/**
			 *
			 * @param {CanvasRenderingContext2D} ctx
			 * @param {number} w
			 * @param {number} h
			 */
			render: ( ctx, w, h ) => {
				ctx.fillStyle = '#968a73ff';
				ctx.fillRect( 0, 0, w, h );

				const gradient = ctx.createLinearGradient( w, 0, 0, h );
				gradient.addColorStop( 0, '#0000006f' );
				gradient.addColorStop( 1, '#0000002f' );

				for( let i = 0; i < 4; i++ ) {
					ctx.fillStyle = gradient;
					ctx.fillRect( 30, 15 + i * 135, w - 60, 120 );
					ctx.fillStyle = '#0000004f';
					ctx.fillRect( 30, 15 + i * 135, w - 60, 4 );
					ctx.fillRect( w - 34, 15 + i * 135, 4, 120 );
				}

				ctx.fillRect( 0, 0, 4, h );
			},
		} ),

		cat_sleeping: new js13k.Asset( {
			data: '                                                                                                                                                                                                                                                                                                                                                                                                      aaaaaa                                                          aa   aaaaaaaaaaaaaaaaa                                           aaa aaa             aaaaaaaaaaaaaaaaaaaaaaa                       aaa             a                       aa                      aa              aa                       aaa                    a          a     aa                        aaa                  a          aaa    a                          a                 aa            aaa  a                          a              aa a               aaaa                          aa              aaa                 aa                      a    a            a  aa  aa                                     aa   a            aaaaa   aaaa  aa                               a   a                a          aaaaaa                          a   a            aaaaa                 aaaaaa                   a   a                a                 a                        a   a               aaa                aaa                     aa   a               aaaaaa            aaaaaaa                 aa    a              aa    aaa            aa              aaaaaaa    aa              aa      a             aa          aaaa          a                aaa    aaaaaa                   aa            aa                  aaa  aa   aaa                 a           aaa                     aaa a    aaa                aaaaaaaaaaaaa                           aaa   aaaaaaaaa        aaaaaaaaaaa                                aaaaa       aaaaaaaaaa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          aaaaaaaaa                            aaaaaa              aaaaaaaa       aaaa                         aa   aaaaaaaaaaaaaaaa                 aaaa                       aaa aaa                                 aaa                       aaa             a                       aa                      aa              aa                       aaa                    a          a     aa                        aaa                  a          aaa    a                          a                 aa            aaa  a                          a              aa a               aaaa                          aa              aaa                 aa                      a    a            a  aa  aa                                     aa   a            aaaaa   aaaa  aa                               a   a                a          aaaaaa                          a   a            aaaaa                 aaaaaa                   a   a                a                 a                        a   a               aaa                aaa                     aa   a               aaaaaa            aaaaaaa                 aa    a              aa    aaa            aa              aaaaaaa    aa              aa      a             aa          aaaa          a                aaa    aaaaaa                   aa            aa                  aaa  aa   aaa                 a           aaa                     aaa a    aaa                aaaaaaaaaaaaa                           aaa   aaaaaaaaa        aaaaaaaaaaa                                aaaaa       aaaaaaaaaa                                                                                                                                                         ',
			colors: {
				'a': [255, 255, 255, 255],
			},
			w: 64,
			h: 32,
			frames: 2,
			frameTimeSlowdown: 140,
			scale: 2,
		} ),

		cursor: new js13k.Asset( {
			w: 20,
			h: 30,
			/**
			 *
			 * @param {CanvasRenderingContext2D} ctx
			 * @param {number} w
			 * @param {number} h
			 */
			render: ( ctx, w, h ) => {
				ctx.fillStyle = '#000';
				ctx.fillRect( 0, 0, w, h );

				ctx.fillStyle = '#fff';
				const step = Math.round( w / 4 );
				const length = Math.round( h / 3 );
				ctx.fillRect( step, 0, 2, length );
				ctx.fillRect( step * 2, 0, 2, length );
				ctx.fillRect( step * 3, 0, 2, length );
			},
		} ),

		window: new js13k.Asset( {
			w: 200,
			h: 200,
			/**
			 *
			 * @param {CanvasRenderingContext2D} ctx
			 * @param {number} w
			 * @param {number} h
			 */
			render: ( ctx, w, h ) => {
				// Sky
				ctx.fillStyle = '#25303dff';
				ctx.fillRect( 0, 0, w, h );
				// Moon
				ctx.shadowColor = ctx.fillStyle = '#ffff46ff';
				ctx.beginPath();
				ctx.arc( w / 3, h / 2, 60, 0, Math.PI * 2 );
				ctx.fill();

				ctx.shadowColor = ctx.fillStyle = '#25303dff';
				ctx.beginPath();
				ctx.arc( w / 3 + 30, h / 2 + 10, 40, 0, Math.PI * 2 );
				ctx.fill();
				ctx.shadowBlur = 0;
				// Border
				ctx.strokeStyle = '#4e4231';
				ctx.lineWidth = 40;
				ctx.strokeRect( 0, 0, w, h );
				// Window sill
				ctx.fillStyle = '#383126';
				ctx.fillRect( 0, h - 30, w, 30 );
			},
		} ),
	},


	audio: {
		// Source: https://freesound.org/people/AlexMurphy53/sounds/330429/
		// License: https://creativecommons.org/licenses/by-nc/4.0/
		// Changes: Using only a part of the audio, reduced audio quality a lot
		meow: new Uint8Array( [255,243,132,196,0,0,0,0,0,0,0,0,0,88,105,110,103,0,0,0,15,0,0,0,26,0,0,3,192,0,8,8,8,16,16,16,16,32,32,32,32,40,40,40,40,56,56,56,56,72,72,72,72,80,80,80,96,96,96,96,104,104,104,104,120,120,120,120,136,136,136,136,144,144,144,144,152,152,152,160,160,160,160,168,168,168,168,176,176,176,176,184,184,184,184,192,192,192,192,200,200,200,200,208,208,208,216,216,216,216,224,224,224,224,232,232,232,232,240,240,240,240,248,248,248,248,255,255,255,0,0,0,57,76,65,77,69,51,46,49,48,48,2,30,0,0,0,0,0,0,0,0,20,8,36,3,200,34,0,0,8,0,0,3,192,229,212,162,251,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,243,20,196,0,2,128,6,80,0,0,132,0,88,62,250,4,255,229,63,63,254,32,201,255,243,20,196,1,2,168,190,152,0,0,68,160,7,22,70,255,255,169,133,167,252,186,111,255,243,36,196,1,6,49,30,160,40,3,206,193,7,200,74,210,255,55,255,246,83,197,64,32,35,27,9,13,255,253,88,108,53,27,158,94,56,0,48,81,127,252,249,205,216,193,49,255,243,20,196,11,5,96,202,188,0,1,88,200,48,63,16,203,108,245,12,1,144,104,202,255,243,36,196,0,6,57,6,180,0,1,218,177,231,158,32,5,234,233,255,247,112,120,36,3,192,128,64,0,176,36,83,255,234,156,70,254,55,96,64,36,3,132,153,127,144,210,127,255,243,36,196,10,6,73,14,216,120,0,76,173,245,66,87,155,9,175,255,255,133,230,230,214,145,193,185,42,106,210,37,3,182,73,5,156,241,185,46,114,155,86,95,175,52,51,255,255,243,20,196,19,6,80,206,208,120,3,78,167,240,200,193,142,38,185,170,12,82,128,100,255,243,36,196,4,6,8,210,180,88,3,94,206,241,74,153,53,15,255,208,122,81,132,232,127,190,62,29,5,187,158,33,10,213,12,67,224,98,168,63,101,109,255,245,59,50,73,7,255,243,20,196,14,6,17,34,164,88,3,68,209,65,58,127,164,253,31,138,28,88,118,213,255,243,36,196,0,6,25,34,180,88,3,78,195,28,194,128,86,62,129,206,112,93,191,254,170,62,97,200,4,136,127,111,111,83,134,195,97,74,8,143,12,59,224,186,140,214,70,154,255,243,36,196,10,5,216,210,144,80,4,222,204,127,254,203,69,42,5,50,39,28,176,38,77,242,85,38,29,195,214,182,255,255,240,80,70,196,144,79,95,255,255,128,53,42,168,58,255,243,20,196,21,2,128,206,168,32,3,88,204,20,191,255,255,145,125,85,12,102,7,138,255,243,20,196,22,2,8,206,176,0,1,210,204,127,255,250,145,136,200,149,136,128,5,255,255,243,20,196,24,2,8,206,176,0,3,86,204,255,245,97,18,136,2,183,255,255,226,234,255,243,20,196,26,2,144,202,176,32,2,146,204,12,33,66,255,255,255,168,138,68,51,224,255,243,20,196,26,1,248,202,192,0,1,76,204,102,253,127,255,241,172,33,127,255,254,153,255,243,20,196,29,1,144,198,200,0,1,68,192,60,253,6,134,244,2,40,47,235,255,254,255,243,20,196,33,1,224,198,196,40,1,68,192,161,24,183,255,179,47,175,84,66,42,70,255,243,20,196,36,3,233,38,148,0,4,26,192,96,224,45,255,203,152,255,213,8,197,191,255,243,20,196,31,4,137,38,220,120,1,198,214,255,254,64,226,85,71,14,36,239,252,87,255,243,20,196,23,2,56,102,200,48,0,12,20,254,177,85,216,66,191,253,110,79,223,44,255,243,20,196,25,1,208,190,180,0,1,196,192,40,255,43,135,127,239,254,68,147,4,85,255,243,20,196,28,2,32,94,184,8,0,4,18,22,255,226,194,226,191,138,138,11,126,42,255,243,20,196,30,2,56,94,148,0,0,68,160,76,65,77,69,51,46,49,48,48,170,170,255,243,20,196,32,2,88,2,140,0,0,0,0,170,170,170,170,170,170,170,170,170,170,170,255,243,20,196,33,2,184,1,204,0,8,0,0,170,170,170,170,170,170,170,170,170,170,170] ),
	},


};