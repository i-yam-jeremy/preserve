import {tileWidth} from '../constants/constants';

const config = {
	type: Phaser.AUTO,
	parent: 'preserve',
	width: 13*tileWidth,
	height: 10*tileWidth,
	physics: {
		default: 'matter',
		matter: {
			// debug: true
		}
	}
};

export { config };
