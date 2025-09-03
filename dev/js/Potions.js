'use strict';


js13k.Potion = {


	Water: {

		name: 'Just water',

		ingredients: [],

		desc: [
			'Just a water, please.',
			"I'm thirsty.",
		],

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

	},


	WarmingPotion: {

		name: 'Warming Potion',

		ingredients: [js13k.IngredientWarm],

		desc: [
			'The wind is so cold. I need something to warm me up.',
		],

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

	},


	CoolingPotion: {

		name: 'Cooling Potion',

		ingredients: [js13k.IngredientCold],

		desc: [
			'I am close to a heatstroke!',
		],

		get alternatives() {
			return [js13k.Potion.Water];
		},

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

	},


	HealthDrink: {

		name: 'Health Drink',

		ingredients: [js13k.IngredientLife],

		desc: [
			'Ugh, I feel sick...',
		],

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

	},


	CalmingPotion: {

		name: 'Calming Potion',

		ingredients: [
			js13k.IngredientCold,
			js13k.IngredientEmotion,
		],

		desc: [
			'I need something to calm me down.',
		],

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

	},


	RefreshingEnergizer: {

		name: 'Refreshing Energizer',

		ingredients: [
			js13k.IngredientCold,
			js13k.IngredientLife,
		],

		desc: [
			'I just finished my workout. Got some energizer?',
		],

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

	},


	MeditativePotion: {

		name: 'Meditative Potion',

		ingredients: [
			js13k.IngredientLife,
			js13k.IngredientEmotion,
		],

		desc: [
			"I'm losing my connection to myself. Like I'm watching myself from behind.",
		],

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

	},


	TeeAndBlanketPotion: {

		name: 'Tee-and-a-Blanket Potion',

		ingredients: [
			js13k.IngredientEmotion,
			js13k.IngredientWarm,
		],

		desc: [
			'I had a really bad day...',
		],

		get alternatives() {
			return [js13k.Potion.MeditativePotion];
		},

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

	},


	AmplitudePotion: {

		name: 'Amplitude Potion',

		ingredients: [
			js13k.IngredientCold,
			js13k.IngredientWarm,
			js13k.IngredientEmotion,
		],

		desc: [
			'My emotions feel so... flat. I want to try how *more* feels like.',
		],

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

	},


};