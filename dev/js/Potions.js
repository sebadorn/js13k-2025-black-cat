'use strict';


js13k.Potion = {

	// Starter ingredients available

	Water: {
		name: 'Just water',
		ingredients: [],
		desc: [
			'Just a water, please.',
			"I'm thirsty.",
		],
	},

	WarmingPotion: {
		name: 'Warming Potion',
		ingredients: [js13k.IngredientWarm],
		desc: [
			'Something to warm me up.',
		],
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
	},

	// Ingredient Life added

	HealthDrink: {
		name: 'Health Drink',
		ingredients: [js13k.IngredientLife],
		desc: [
			'Ugh, I feel sick...',
		],
	},

	RefreshingEnergizer: {
		name: 'Refreshing Energizer',
		ingredients: [
			js13k.IngredientCold,
			js13k.IngredientLife,
		],
		desc: [
			'Just finished workout. Got\nsome refreshing energizer?',
		],
	},

	// Ingredient Emotion added

	CalmingPotion: {
		name: 'Calming Potion',
		ingredients: [
			js13k.IngredientCold,
			js13k.IngredientEmotion,
		],
		desc: [
			'I need something to calm me down.',
		],
	},

	MeditativePotion: {
		name: 'Meditative Potion',
		ingredients: [
			js13k.IngredientLife,
			js13k.IngredientEmotion,
		],
		desc: [
			"I'm losing my connection to myself.\nLike I'm watching myself from behind.",
		],
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
	},

};