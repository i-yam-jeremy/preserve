import 'phaser';
import {config} from './config/config';
import {LevelScene} from './scenes/level';
import {MainMenuScene} from './scenes/main-menu';
import {HowToScene} from './scenes/how-to';
import {LevelSelectScene} from './scenes/level-select';

class Game extends Phaser.Game {

	constructor() {
		super(config);
		const levelData = {
			name: 'level-1',
			width: 13,
			height: 12,
			jamletsNeeded: 5,
			tiles: [
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 12, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  4, 13],
				[-1, -1, -1, -1, -1, -1, -1, -1,  2,  1,  1,  0,  0],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1,  6,  9, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1,  6,  7, 10,  9, -1, -1, -1, -1, -1, -1],
				[-1, -1,  6,  7,  0,  0, 10,  9, -1, -1, -1, -1, -1],
				[-1,  6,  7,  0,  0,  0,  0, 10,  9, -1, -1, -1, -1],
				[-1,  0,  0,  0,  0,  0,  0,  0, 10,  9, -1, -1, -1],
				[-1,  0,  0,  0,  0,  0,  0,  0,  0, 10, 11, -1, -1]
			],
			buttonHandler: (level, tileX, tileY, action) => {
				if (tileX == 10 && tileY == 11) {
					if (action == 'down') {
						level.openGate(11, 2);
					}
					else if (action == 'up') {
						level.closeGate(11, 2);
					}	
				}
			}
		};
		this.scene.add('', new LevelScene(levelData));
		this.scene.add('', new HowToScene());
		this.scene.add('', new LevelSelectScene());
		this.scene.add('', new MainMenuScene());
		this.scene.start('level-select');
	}

}

window.onload = () => {
	window.game = new Game();
};
