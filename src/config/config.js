import {TILE_WIDTH} from '../constants/constants';

const config = {
	type: Phaser.AUTO,
	parent: 'preserve',
	width: 13*TILE_WIDTH,
	height: 10*TILE_WIDTH,
	physics: {
		default: 'matter',
		matter: {
			// debug: true
		}
	}
};

export { config };
