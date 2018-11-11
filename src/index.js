import 'phaser';
import {config} from './config/config';
import {LevelScene} from './scenes/level';


class Game extends Phaser.Game {

	constructor() {
		super(config);
		this.scene.add('Level', new LevelScene());
		this.scene.start('Level');
	}

}

window.onload = () => {
	window.game = new Game();
};
