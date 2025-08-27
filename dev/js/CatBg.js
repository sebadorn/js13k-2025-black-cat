'use strict';


js13k.CatBg = class extends js13k.LevelObject {


	static STATE_IDLE = 1;
	static STATE_REACT = 2;


	/**
	 *
	 * @param {js13k.Level} level
	 */
	constructor( level ) {
		super( level, 800, 800 );

		this.offsetY = 0;
		this.state = js13k.CatBg.STATE_IDLE;

		// TODO: remove
		/** @type {HTMLCanvasElement} */
		this.cnv;
		/** @type {CanvasRenderingContext2D} */
		this.ctx;
	}


	/**
	 *
	 * @private
	 * @param {number} w
	 * @returns {number}
	 */
	_centerX( w ) {
		return ( this.w - w ) / 2;
	}


	/**
	 *
	 * @private
	 * @param {number} bodyW
	 */
	_drawEars( bodyW ) {
		let y = 260;
		let x = this._centerX( bodyW ) - 20;
		let w = 80;
		let h = 100;

		this.ctx.fillStyle = '#000';

		this.ctx.beginPath();
		this.ctx.moveTo( x, y );
		this.ctx.lineTo( x, y - h );
		this.ctx.lineTo( x + w, y );
		this.ctx.closePath();
		this.ctx.fill();

		this.ctx.beginPath();
		this.ctx.moveTo( this.w - x, y );
		this.ctx.lineTo( this.w - x - w, y );
		this.ctx.lineTo( this.w - x, y - h );
		this.ctx.closePath();
		this.ctx.fill();
	}


	/**
	 *
	 * @private
	 * @param {number} bodyW
	 */
	_drawFace( bodyW ) {
		let y = 140;
		let x = this._centerX( bodyW );
		const bodyWHalf = bodyW / 2;

		// Whiskers
		let yWhisker = y + 270;

		this.ctx.strokeStyle = '#000';
		this.ctx.lineWidth = 6;
		this.ctx.beginPath();

		// left
		this.ctx.moveTo( x, yWhisker );
		this.ctx.lineTo( x - 100, yWhisker - 10 );
		this.ctx.moveTo( x, yWhisker + 10 );
		this.ctx.lineTo( x - 100, yWhisker + 10 );
		this.ctx.moveTo( x, yWhisker + 20 );
		this.ctx.lineTo( x - 100, yWhisker + 30 );
		// right
		this.ctx.moveTo( this.w - x, yWhisker );
		this.ctx.lineTo( this.w - x + 100, yWhisker - 10 );
		this.ctx.moveTo( this.w - x, yWhisker + 10 );
		this.ctx.lineTo( this.w - x + 100, yWhisker + 10 );
		this.ctx.moveTo( this.w - x, yWhisker + 20 );
		this.ctx.lineTo( this.w - x + 100, yWhisker + 30 );

		this.ctx.stroke();

		// Mouth
		let rx = 22;
		let ry = 16;
		let yMouth = y + 300;

		this.ctx.strokeStyle = '#fff';
		this.ctx.lineWidth = 4;
		this.ctx.beginPath();
		this.ctx.ellipse( x + bodyWHalf - rx, yMouth, rx, ry, 0, 0, Math.PI * 0.9 );
		this.ctx.stroke();
		this.ctx.beginPath();
		this.ctx.ellipse( x + bodyWHalf + rx, yMouth, rx, ry, 0, Math.PI * 0.1, Math.PI );
		this.ctx.stroke();

		// Eyes
		let yEyes = y + 240;
		let rX = 40;
		let rY = 30;

		this.ctx.fillStyle = '#ff0';
		this.ctx.beginPath();
		this.ctx.ellipse( x + bodyW * 0.15, yEyes, rX, rY, 0, 0, Math.PI * 2 );
		this.ctx.ellipse( x + bodyW * 0.85, yEyes, rX, rY, 0, 0, Math.PI * 2 );
		this.ctx.fill();

		rX = 35;
		rY = 25;
		this.ctx.fillStyle = '#000';
		this.ctx.beginPath();
		this.ctx.ellipse( x + bodyW * 0.16, yEyes + 10, rX, rY, 0, 0, Math.PI * 2 );
		this.ctx.ellipse( x + bodyW * 0.84, yEyes + 10, rX, rY, 0, 0, Math.PI * 2 );
		this.ctx.fill();
	}


	/**
	 *
	 * @private
	 */
	_drawHat() {
		let y = 220;

		this.ctx.fillStyle = '#6a267a';
		this.ctx.beginPath();

		this.ctx.moveTo( 0, y + 100 );
		this.ctx.lineTo( 150, y );
		this.ctx.lineTo( 250, y );

		this.ctx.lineTo( 320, y - 200 );
		this.ctx.lineTo( this.w - 100, y - 150 );
		this.ctx.lineTo( this.w - 300, y - 100 );

		this.ctx.lineTo( this.w - 250, y );
		this.ctx.lineTo( this.w - 150, y );
		this.ctx.lineTo( this.w, y + 100 );
		this.ctx.closePath();

		this.ctx.fill();

		this.ctx.fillStyle = '#54245f';
		this.ctx.beginPath();
		this.ctx.moveTo( 240, y + 30 );
		this.ctx.lineTo( 256, y - 30 );
		this.ctx.lineTo( this.w - 260, y - 30 );
		this.ctx.lineTo( this.w - 240, y + 30 );
		this.ctx.closePath();
		this.ctx.fill();
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		if( this._needsRedraw ) {
			const bodyW = this.w * 0.4;

			// Body
			this.ctx.fillStyle = '#000';
			this.ctx.fillRect( this._centerX( bodyW ), 250, bodyW, this.h - 250 );

			this._drawFace( bodyW );
			this._drawHat();
			this._drawEars( bodyW );
		}

		ctx.drawImage(
			this.cnv,
			this.calcCenterX(),
			js13k.h - this.level.cauldron.h - this.h / 2 + this.offsetY
		);
	}


	/**
	 *
	 * @param {Ingredient[]} contents
	 * @param {function}     cb
	 */
	react( contents, cb ) {
		this.animation = new js13k.Animation(
			1.5,
			progress => {
				// TODO: animate reaction
			},
			() => {
				this.animation = null;
				this.state = js13k.CatBg.STATE_IDLE;
				cb();
			},
		);
	}


	/**
	 *
	 * @param {number} timer
	 */
	update( timer ) {
		if( this.state == js13k.CatBg.STATE_IDLE ) {
			timer *= 0.05;
			this.offsetY = Math.sin( timer ) * 4;
		}

		this.animation?.do();
	}


};