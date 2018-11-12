
const LEVEL_DATA = [
	{ // Level 1
		width: 13,
		height: 10,
		jamletsNeeded: {easy: 5, medium: 8, hard: 10},
		tiles: [
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1,  4, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1,  2,  0,  3, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1,  2,  0,  0,  0,  3, -1, -1, -1, -1, -1, -1],
			[-1,  2,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, 13]
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
	},	
	{ // Level 5
		width: 13,
		height: 12,
		jamletsNeeded: {easy: 3, medium: 5, hard: 8},
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
	},
];

export { LEVEL_DATA };
