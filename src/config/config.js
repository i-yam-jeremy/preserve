const config = {
	type: Phaser.AUTO,
	parent: 'preserve',
	width: 800,
	height: 600,
	physics: {
		default: 'matter',
		matter: {
			// debug: true
		}
	}
};

export { config };
