import 'phaser';

class HowToScene extends Phaser.Scene {

	constructor() {
		super('how-to');
	}

	preload() {
		this.load.image('how-to', 'assets/how-to.png');
	}

	create() {
		this.add.image(0, 0, 'how-to').setOrigin(0, 0);

		this.input.keyboard.on('keydown_SPACE', () => {
			this.scene.switch('main-menu');
		}, this);	
	}

}


export { HowToScene };
