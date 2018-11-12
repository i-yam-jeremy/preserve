import 'phaser';
import {config} from './config/config';
import {LevelScene} from './scenes/level';
import {MainMenuScene} from './scenes/main-menu';
import {HowToScene} from './scenes/how-to';
import {LevelSelectScene} from './scenes/level-select';
import {GameCompleteScene} from './scenes/game-complete';

import {LEVEL_COUNT} from './constants/constants';

import {LEVEL_DATA} from './levels/levels';

class Game extends Phaser.Game {

	constructor() {
		super(config);
		
		let levelsUnlocked = {
			'easy': Array.apply(null, Array(LEVEL_COUNT)).map(x => false),
			'medium': Array.apply(null, Array(LEVEL_COUNT)).map(x => false),
			'hard': Array.apply(null, Array(LEVEL_COUNT)).map(x => false),
			needsToRefreshLocks: false
		};
		levelsUnlocked['easy'][0] = true; // first level must be unlocked

		this.scene.add('', new HowToScene());
		this.scene.add('', new LevelSelectScene(levelsUnlocked));
		this.scene.add('', new GameCompleteScene());
		this.scene.add('', new MainMenuScene());
		this.scene.start('main-menu');
	}

}

window.onload = () => {
	window.game = new Game();
};
