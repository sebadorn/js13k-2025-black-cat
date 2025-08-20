'use strict';


js13k.Renderer = {


	/** @type {HTMLCanvasElement?} */
	cnv: null,
	/** @type {HTMLCanvasElement?} */
	cnvUI: null,

	/** @type {CanvasRenderingContext2D?} */
	ctx: null,
	/** @type {CanvasRenderingContext2D?} */
	ctxUI: null,

	/** @type {js13k.Level?} */
	level: null,

	// Last known cursor position as position on the canvas.
	cursor: [-1, -1],

	isPaused: false,
	last: 0,
	timer: 0,

	center: [0, 0],
	offset: [0, 0],
	scale: 1,
	translateX: 0,
	translateY: 0,


	/**
	 *
	 * @private
	 */
	_drawCursor() {
		// Use negative x value to indicate hidden cursor.
		if( this.cursor[0] < 0 ) {
			return;
		}

		let [x, y] = this.getScaledCursor();
		const w = this._cursorCnv.width;
		const h = this._cursorCnv.height;
		x = Math.round( x - w / 2 );
		y = Math.round( y - h / 6 );

		this.ctxUI.drawImage( this._cursorCnv, x, y );
	},


	/**
	 * Clear the canvas.
	 */
	clear() {
		this.ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		this.ctx.clearRect( 0, 0, window.innerWidth, window.innerHeight );
		this.ctxUI.setTransform( 1, 0, 0, 1, 0, 0 );
		this.ctxUI.clearRect( 0, 0, window.innerWidth, window.innerHeight );
	},


	/**
	 * Draw to the canvas.
	 */
	draw() {
		this.clear();
		this.ctx.setTransform( this.scale, 0, 0, this.scale, this.translateX, this.translateY );
		this.ctxUI.setTransform( this.scale, 0, 0, this.scale, 0, 0 );

		this.level?.draw( this.ctx );
		this._drawCursor();
	},


	/**
	 * Draw the pause screen.
	 */
	drawPause() {
		this.ctxUI.setTransform( 1, 0, 0, 1, 0, 0 );
		this.ctxUI.clearRect( 0, 0, window.innerWidth, window.innerHeight );

		this.ctxUI.setTransform( this.scale, 0, 0, this.scale, 0, 0 );
		this.ctxUI.fillStyle = '#0006';
		this.ctxUI.fillRect( 0, 0, this.cnvUI.width / this.scale, this.cnvUI.height / this.scale );

		this.ctxUI.fillStyle = '#fff';
		this.ctxUI.font = '600 56px ' + js13k.FONT_SANS;
		this.ctxUI.textAlign = 'center';
		this.ctxUI.textBaseline = 'top';
		this.ctxUI.fillText( 'PAWSED', this.center.x, this.center.y - 56 );
	},


	/**
	 * Get an offset canvas and its context.
	 * @param  {number} w
	 * @param  {number} h
	 * @return {[HTMLCanvasElement, CanvasRenderingContext2D]}
	 */
	getOffscreenCanvas( w, h ) {
		const canvas = document.createElement( 'canvas' );
		canvas.width = w;
		canvas.height = h;

		const ctx = canvas.getContext( '2d', { alpha: true } );

		return [canvas, ctx];
	},


	/**
	 *
	 * @returns {number[]}
	 */
	getScaledCursor() {
		return this.cursor.map( c => c / this.scale );
	},


	/**
	 *
	 */
	init() {
		[this.cnv, this.ctx] = this.getOffscreenCanvas();
		[this.cnvUI, this.ctxUI] = this.getOffscreenCanvas();
		this.cnv.style.zIndex = 1;
		this.cnvUI.style.zIndex = 10;
		document.body.append( this.cnv, this.cnvUI );

		const cursorAsset = js13k.Assets.graphics.cursor;
		[this._cursorCnv, this._cursorCtx] = this.getOffscreenCanvas( cursorAsset.w, cursorAsset.h );
		cursorAsset.render( this._cursorCtx );

		this.registerEvents();
	},


	/**
	 * Start the main loop. Update logic, render to the canvas.
	 * @param {number} [timestamp = 0]
	 */
	mainLoop( timestamp = 0 ) {
		if( timestamp && this.last ) {
			const timeElapsed = timestamp - this.last; // Time that passed between frames. [ms]

			// Target speed of 60 FPS (=> 1000 / 60 ~= 16.667 [ms]).
			const dt = timeElapsed / ( 1000 / js13k.TARGET_FPS );

			if( this.isPaused ) {
				this.drawPause();
				return; // Stop the loop.
			}

			this.timer += dt;

			this.level.update( dt );
			this.draw();

			// Draw FPS info
			this.ctxUI.fillStyle = '#fff';
			this.ctxUI.font = '600 12px ' + js13k.FONT_MONO;
			this.ctxUI.textAlign = 'left';
			this.ctxUI.fillText(
				~~( js13k.TARGET_FPS / dt ) + ' FPS, ' + Math.round( this.scale * 1000 ) / 1000,
				10, 20
			);
		}

		this.last = timestamp;

		requestAnimationFrame( t => this.mainLoop( t ) );
	},


	/**
	 *
	 */
	pause() {
		this.isPaused = true;
	},


	/**
	 *
	 */
	registerEvents() {
		window.addEventListener( 'resize', _ev => this.resize() );
		this.resize();

		js13k.Input.onKeyUp( 'Escape', () => this.togglePause() );

		this.cnvUI.addEventListener( 'mouseleave', _ev => {
			this.cursor[0] = -1;
		} );

		this.cnvUI.addEventListener( 'mousemove', ev => {
			this.cursor[0] = ev.clientX - this.offset[0];
			this.cursor[1] = ev.clientY - this.offset[1];
		} );

		this.cnvUI.addEventListener( 'click', ev => {
			this.cursor[0] = ev.clientX - this.offset[0];
			this.cursor[1] = ev.clientY - this.offset[1];

			this.level?.onClick( ...this.getScaledCursor() );
		} );
	},


	/**
	 * Resize the canvas.
	 */
	resize() {
		const targetRatio = 1920 / 1080;

		let height = window.innerHeight;
		let width = Math.round( height * targetRatio );

		if( width > window.innerWidth ) {
			width = window.innerWidth;
			height = width / targetRatio;
		}

		this.scale = height / 1080;

		this.center.x = width / 2 / this.scale;
		this.center.y = height / 2 / this.scale;

		let posTop = Math.round( ( window.innerHeight - height ) / 2 );
		let posLeft = Math.round( ( window.innerWidth - width ) / 2 );

		this.cnv.width = width;
		this.cnv.height = height;
		this.cnv.style.top = posTop + 'px';
		this.cnv.style.left = posLeft + 'px';

		this.cnvUI.width = width;
		this.cnvUI.height = height;
		this.cnvUI.style.top = posTop + 'px';
		this.cnvUI.style.left = posLeft + 'px';

		this.offset = [posLeft, posTop];

		if( this.isPaused ) {
			clearTimeout( this._timeoutDrawPause );
			this._timeoutDrawPause = setTimeout( () => this.drawPause(), 100 );
		}
	},


	/**
	 *
	 */
	togglePause() {
		this.isPaused ? this.unpause() : this.pause();
	},


	/**
	 *
	 */
	unpause() {
		if( this.isPaused ) {
			this.isPaused = false;
			this.mainLoop();
		}
	},


};