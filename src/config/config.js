const config = {
	type: Phaser.AUTO,
	parent: 'preserve',
	width: 13*64,
	height: 10*64,
	physics: {
		default: 'matter',
		matter: {
			// debug: true
		}
	}
};

export { config };
