import 'phaser';

class GameCompleteScene extends Phaser.Scene {

	constructor() {
		super('game-complete');
	}

	preload() {
		this.load.image('game-complete', 'assets/game-complete.png');
	}

	create() {
		this.add.image(0, 0, 'game-complete').setOrigin(0, 0);

		this.input.keyboard.on('keydown_SPACE', () => {
			this.scene.switch('main-menu');
		}, this);	
	}

}


export { GameCompleteScene };
