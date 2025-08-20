'use strict';


js13k.Audio = {


	context: new AudioContext(),


	/**
	 *
	 * @param {ArrayBuffer} arrayBuffer
	 * @param {object}      options
	 * @param {number?}     options.volume
	 */
	async play( arrayBuffer, options ) {
		const buffer = await this.context.decodeAudioData( arrayBuffer.slice() );

		const gainNode = this.context.createGain();
		gainNode.connect( this.context.destination );
		gainNode.gain.value = options?.volume || 0.5;

		const source = this.context.createBufferSource();
		source.buffer = buffer;
		source.connect( gainNode );
		source.loop = false;
		source.start();
	},


};