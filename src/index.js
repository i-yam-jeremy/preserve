import 'phaser';
import {config} from './config/config';
import {LevelScene} from './scenes/level';


class Game extends Phaser.Game {

	constructor() {
		super(config);
		const levelData = {
			name: 'level-1',
			width: 13,
			height: 12,
			tiles: [
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  4, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1,  2,  1,  1,  0, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1,  6,  9, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1,  6,  7, 10,  9, -1, -1, -1, -1, -1, -1],
				[-1, -1,  6,  7,  0,  0, 10,  9, -1, -1, -1, -1, -1],
				[-1,  6,  7,  0,  0,  0,  0, 10,  9, -1, -1, -1, -1],
				[-1,  0,  0,  0,  0,  0,  0,  0, 10,  9, -1, -1, -1],
				[-1,  0,  0,  0,  0,  0,  0,  0,  0, 10, 11, -1, -1]
			]
		};
		this.scene.add('', new LevelScene(levelData));
		this.scene.start('level-1');
	}

}

window.onload = () => {
	window.game = new Game();
};
