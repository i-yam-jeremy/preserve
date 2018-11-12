
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
		]
	},
	{ // Level 2
		width: 13,
		height: 10,
		jamletsNeeded: {easy: 5, medium: 8, hard: 10},
		tiles: [
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1,  2,  1,  3, -1, -1, -1],
			[-1, -1, -1, -1,  4, -1, -1, -1, -1,  0,  3, -1, -1],
			[-1, -1, -1,  2,  0,  3, -1, -1, -1, -1,  0, -1, -1],
			[-1, -1,  2,  0,  0,  0,  3, -1, -1, -1,  0, -1, -1],
			[-1,  2,  0,  0,  0,  0,  0, -1, -1, -1,  0, -1, -1],
			[-1,  0,  0,  0,  0,  0,  0, -1, -1, -1,  0, -1, -1],
			[-1,  0,  0,  0,  0,  0,  0, -1, -1, -1,  0, -1, 13]
		]
	},
	{ // Level 3
		width: 15,
		height: 10,
		jamletsNeeded: {easy: 5, medium: 8, hard: 10},
		tiles: [
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1,  2,  1,  3, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1,  4, -1, -1, -1, -1,  0,  3, -1, -1, -1, -1],
			[-1, -1, -1,  2,  0,  3, -1, -1, -1, -1,  0, -1, -1, -1, 13],
			[-1, -1,  2,  0,  0,  0,  3, -1, -1, -1,  0, -1, -1, -1,  1],
			[-1,  2,  0,  0,  0,  0,  0, -1, -1, -1,  0, -1,  2,  1,  0],
			[-1,  0,  0,  0,  0,  0,  0, -1, -1, -1,  0, -1, -1, -1, -1],
			[-1,  0,  0,  0,  0,  0,  0, -1, -1, -1,  0, -1, -1, -1, -1]
		]
	},
	{ // Level 4
		width: 15,
		height: 10,
		jamletsNeeded: {easy: 5, medium: 8, hard: 10},
		tiles: [
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1,  2,  1,  3, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1,  4, -1, -1, -1, -1,  0,  3, -1, -1, -1, -1],
			[-1, -1, -1,  2,  0,  3, -1, -1, -1, -1,  0, -1, -1, -1, -1],
			[-1, -1,  2,  0,  0,  0,  3, -1, -1, -1,  0, -1, -1, -1,  1],
			[-1,  2,  0,  0,  0,  0,  0, -1, -1, -1,  0, -1,  2,  1,  0],
			[-1,  0,  0,  0,  0,  0,  0, -1, -1, -1,  0, -1,  0, -1, -1],
			[-1,  0,  0,  0,  0,  0,  0, -1, -1, -1,  0, -1, 14, -1, 13]
		]
	},
	{ // Level 5
		width: 15,
		height: 10,
		jamletsNeeded: {easy: 5, medium: 8, hard: 10},
		tiles: [
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1,  2,  1,  3, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1,  4, -1, -1, -1, -1,  0,  3, -1, -1, -1, -1],
			[-1, -1, -1,  2,  0,  3, -1, -1, -1, -1,  0, -1, -1, -1, -1],
			[-1, -1,  2,  0,  0,  0,  3, -1, -1, -1,  0, -1, -1, -1,  1],
			[-1,  2,  0,  0,  0,  0,  0, -1, -1, -1,  0, -1,  2, 17,  0],
			[-1,  0,  0,  0,  0,  0,  0, -1, -1, -1,  0, -1,  0, -1, -1],
			[-1,  0,  0,  0,  0,  0,  0, -1, -1, -1,  0, -1,  0, -1, 13]
		]
	},
	{ // Level 6
		width: 13,
		height: 10,
		jamletsNeeded: {easy: 5, medium: 8, hard: 10},
		tiles: [
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1,  2, 17,  3, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1,  2,  0, 17,  0,  3, -1, -1, -1, -1, -1, -1],
			[-1,  2,  0,  0, 17,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0, 17,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0, 13,  0,  0, -1, -1, -1, -1, -1, -1]
		]
	},
	{ // Level 7
		width: 13,
		height: 25,
		jamletsNeeded: {easy: 5, medium: 8, hard: 10},
		tiles: [
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1,  2, 17,  3, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1,  2,  0, 17,  0,  3, -1, -1, -1, -1, -1, -1],
			[-1,  2,  0,  0, 17,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0, 17,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0, 17,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0, 17,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0, 17,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0, 17,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0, 17,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0, 17,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0, 17,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0, 17,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0, 17,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0, 17,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0, 17,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0, 17,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0, 17,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0, 17,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0, 17,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0, 13,  0,  0, -1, -1, -1, -1, -1, -1]
		]
	},
	{ // Level 8
		width: 13,
		height: 10,
		jamletsNeeded: {easy: 4, medium: 7, hard: 9},
		tiles: [
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1,  4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, 11,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1,  2,  0,  1,  1,  1,  3, -1,  2,  1,  3, -1, -1],
			[-1,  0,  0,  0,  0,  0,  0, -1, 12, 13,  0, -1, -1]
		],
		buttonHandler: (level, tileX, tileY, action) => {
			if (action == 'down') {
				level.openGate(8, 9);
			}
			else if (action == 'up') {
				level.closeGate(8, 9);
			}	
		}
	},
	{ // Level 9
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
			[-1,  2,  7,  0,  0,  0,  0, 10,  9, -1, -1, -1, -1],
			[-1,  0,  0,  0,  0,  0,  0,  0, 10,  9, -1, -1, -1],
			[-1,  0,  0,  0,  0,  0,  0,  0,  0, 10, 11, -1, -1]
		],
		buttonHandler: (level, tileX, tileY, action) => {
			if (action == 'down') {
				level.openGate(11, 2);
			}
			else if (action == 'up') {
				level.closeGate(11, 2);
			}	
		}
	},
	{ // Level 10
		width: 13,
		height: 10,
		jamletsNeeded: {easy: 3, medium: 5, hard: 8},
		tiles: [
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 12, 12, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  4,  4, 13],
			[-1, -1, -1, -1, -1, -1, -1, -1,  2,  1,  0,  0,  0],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1,  4, -1, -1, -1, -1, -1, -1],
			[-1,  4, -1,  4, -1, 11,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0, 11,  0,  1,  0,  0, -1, -1, -1, -1, -1, -1],
			[-1,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1]
		],
		buttonHandler: (level, tileX, tileY, action) => {
			if (tileX == 2 && tileY == 8) {
				if (action == 'down') {
					level.openGate(10, 2);
				}
				else if (action == 'up') {
					level.closeGate(10, 2);
				}
			}
			else if (tileX == 5 && tileY == 7) {
				if (action == 'down') {
					level.openGate(11, 2);
				}
				else if (action == 'up') {
					level.closeGate(11, 2);
				}
			}	
		}
	},
	{ // Level 11
		width: 13,
		height: 10,
		jamletsNeeded: {easy: 4, medium: 7, hard: 9},
		tiles: [
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1,  4, 18, 18, 18, 18, 18, 13, 18, 18, -1, -1, -1]
		]
	},
	{ // Level 12
		width: 13,
		height: 10,
		jamletsNeeded: {easy: 5, medium: 8, hard: 10},
		tiles: [
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1,  2, 17,  3, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1,  0, 17,  0, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1,  0, 17,  0,  1,  1,  3, -1, -1, -1, -1],
			[-1, -1,  2,  0, -1, -1, -1, -1,  0, -1, -1, -1, -1],
			[-1, -1,  0,  0, -1, -1, -1, -1,  0, -1, -1, -1, -1],
			[-1,  2,  0,  0, 18, 18, 18, 13,  0, -1, -1, -1, -1]
		]
	},
	{ // Level 13
		width: 13,
		height: 10,
		jamletsNeeded: {easy: 4, medium: 7, hard: 9},
		tiles: [
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1,  2, 17,  3, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1,  0, 17,  0, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1,  0, 17,  0,  1,  1,  3, -1, -1, -1, -1],
			[-1, -1,  2,  0, -1,  0, -1, -1,  0, -1, -1, -1, -1],
			[-1, -1,  0,  0, -1, 12, -1, -1,  0, -1, -1, -1, -1],
			[-1,  2,  0,  0, 18,  4, 18, 13,  0, 11, -1, -1, -1]
		],
		buttonHandler: (level, tileX, tileY, action) => {
			if (action == 'down') {
				level.openGate(5, 8);
			}
			else if (action == 'up') {
				level.closeGate(5, 8);
			}
		}
	},
	{ // Level 14
		width: 20,
		height: 10,
		jamletsNeeded: {easy: 4, medium: 6, hard: 8},
		tiles: [
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1,  2, 17,  3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1,  0, 17,  0, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1,  0, 17,  0,  1,  1,  1,  1,  1,  3, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1,  2,  0, -1,  0, -1, -1,  0, -1, -1,  0, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1,  0,  0, -1, 12, -1, -1,  0, -1, -1,  0, -1, -1, -1, -1, -1, -1, -1, 11],
			[-1,  2,  0,  0, 18,  4, 18, -1, 12, -1, 13,  0,  3, -1, -1, -1, -1, -1, -1,  2]
		],
		buttonHandler: (level, tileX, tileY, action) => {
			if (tileX == 6 && tileY == 5) {
				if (action == 'down') {
					level.openGate(5, 8);
				}
				else if (action == 'up') {
					level.closeGate(5, 8);
				}
			}
			else if (tileX == 19 && tileY == 8) {
				if (action == 'down') {
					level.openGate(8, 9);
				}
				else if (action == 'up') {
					level.closeGate(8, 9);
				}
			}	
		}
	},
	{ // Level 15
		width: 20,
		height: 10,
		jamletsNeeded: {easy: 3, medium: 5, hard: 7},
		tiles: [
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1,  2, 17,  3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1,  0, 17,  0, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1,  0, 17,  0,  1,  1,  1,  1,  1,  3, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1,  2,  0, -1,  0,  0,  0,  0, -1, -1,  0, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1,  0,  0, -1, 12, 12, -1,  0, -1, -1,  0, 11, -1, -1, -1, -1, -1, -1, 11],
			[-1,  2,  0,  0, 18,  2,  3, -1, 12, -1, 13,  0,  3, -1, -1, -1, -1, -1, -1,  2]
		],
		buttonHandler: (level, tileX, tileY, action) => {
			if (tileX == 6 && tileY == 5) {
				if (action == 'down') {
					level.openGate(5, 8);
				}
				else if (action == 'up') {
					level.closeGate(5, 8);
				}
			}
			else if (tileX == 12 && tileY == 8) {
				if (action == 'down') {
					level.openGate(6, 8);
				}
				else if (action == 'up') {
					level.closeGate(6, 8);
				}
			}
			else if (tileX == 19 && tileY == 8) {
				if (action == 'down') {
					level.openGate(8, 9);
				}
				else if (action == 'up') {
					level.closeGate(8, 9);
				}
			}	
		}
	},
];

export { LEVEL_DATA };
