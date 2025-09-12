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
			'I feel so cold.',
		],
	},

	CoolingPotion: {
		name: 'Cooling Potion',
		ingredients: [js13k.IngredientCold],
		desc: [
			"Ugh, it's so hot!",
			'I need to cool down.',
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
			'I feel sick...',
			'A witchy herbal tee, please.'
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
			'Do you have a cold\nand healthy drink?',
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
			'I need something to calm me down.\nTo help me think straight again.',
			'My fiery temper gets in my way.',
		],
		get alternatives() {
			return [js13k.Potion.TeeAndBlanketPotion];
		},
	},

	MeditativePotion: {
		name: 'Meditative Potion',
		ingredients: [
			js13k.IngredientLife,
			js13k.IngredientEmotion,
		],
		desc: [
			'I have this mental fog...',
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
			'Can you bottle the feeling of\nwrapping yourself in a blanket?',
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
			'My emotions feel so... flat.\nI want to try how *more* feels like.',
			'Give me conflicting feelings.\nYou heard me.',
		],
	},

};