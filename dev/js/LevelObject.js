'use strict';


js13k.LevelObject = class {


	_needsRedraw = true;


	/**
	 *
	 * @param {js13k.Level} level
	 * @param {number} w
	 * @param {number} h
	 */
	constructor( level, w , h ) {
		this.level = level;
		this.w = w;
		this.h = h;

		[this.cnv, this.ctx] = js13k.Renderer.getOffscreenCanvas( w, h );
	}


	/**
	 *
	 * @returns {number}
	 */
	calcCenterX() {
		return ( js13k.w - this.w ) / 2;
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {}


	/**
	 *
	 * @param {number} timer
	 */
	update( timer ) {}


};


js13k.Animation = class {


	/**
	 *
	 * @param {number}   duration - Duration in seconds.
	 * @param {function} onUpdate
	 * @param {function} onDone 
	 */
	constructor( duration, onUpdate, onDone ) {
		this.timer = new js13k.Timer( js13k.Renderer.level, duration );
		this.onUpdate = onUpdate;
		this.onDone = onDone;
	}


	/**
	 *
	 */
	do() {
		if( !this.timer ) {
			return;
		}

		if( this.timer.elapsed() ) {
			this.onDone();
			this.timer = null;
		}
		else {
			this.onUpdate( this.timer.progress() );
		}
	}


};