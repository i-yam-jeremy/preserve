import 'phaser';

const LEVEL_COUNT = 16;
const LEVELS_PER_ROW = 4;

const MODES = ['easy', 'medium', 'hard'];

function getNextMode(mode) {
	let index = MODES.indexOf(mode);
	if (index == MODES.length-1) {
		return MODES[0];
	}
	else {
		return MODES[index+1];
	}
}

function getPrevMode(mode) {
	let index = MODES.indexOf(mode);
	if (index == 0) {
		return MODES[MODES.length-1];
	}
	else {
		return MODES[index-1];
	}
}

function contains(p, sprite) {
	return p.x > sprite.x - sprite.width/2 &&
		p.x < sprite.x + sprite.width/2 &&
		p.y > sprite.y - sprite.height/2 &&
		p.y < sprite.y + sprite.height/2;

}

class LevelSelectScene extends Phaser.Scene {

	constructor(levelsUnlocked) {
		super('level-select');
		this.levelMode = 'easy';
	}

	preload() {
		this.load.image('background', 'assets/level-select-background.png');
		this.load.image('arrow-right', 'assets/level-select-arrow-right.png');
		this.load.image('arrow-left', 'assets/level-select-arrow-left.png');
		this.load.image('easy', 'assets/level-select-easy.png');
		this.load.image('medium', 'assets/level-select-medium.png');
		this.load.image('hard', 'assets/level-select-hard.png');
		this.load.image('back', 'assets/level-select-back.png');
		for (let level = 1; level <= LEVEL_COUNT; level++) {
			this.load.image('level-icon-' + level, 'assets/level-icon-' + level + '.png');
		}
	}

	create() {
		this.add.image(0, 0, 'background').setOrigin(0, 0);

		let backButton = this.add.image(416, 605, 'back');

		let modeLabel = this.add.image(416, 160, this.levelMode);
		let leftModeArrow = this.add.image(346, 160, 'arrow-left');
		let rightModeArrow = this.add.image(486, 160, 'arrow-right');	

		let levelIcons = [];
		for (let level = 1; level <= LEVEL_COUNT; level++) {
			let i = level-1;
			let gridX = i % LEVELS_PER_ROW;
			let gridY = Math.floor(i / LEVELS_PER_ROW);
			
			let pixelX = 266 + 100*gridX;
			let pixelY = 225 + 100*gridY;


			let levelIcon = this.add.image(pixelX, pixelY, 'level-icon-' + level);
			levelIcons.push(levelIcon);
		}

		this.input.on('pointermove', (p) => {
			for (let i = 0; i < levelIcons.length; i++) {
				let level = i+1;
				let levelIcon = levelIcons[i];
				if (contains(p, levelIcon)) {
					levelIcon.setTint(0xAAAAAA);
				}
				else {
					levelIcon.setTint(0xFFFFFF);
				}
			}

			if (contains(p, backButton)) {
				backButton.setTint(0xAAAAAA);
			}
			else {
				backButton.setTint(0xFFFFFF);
			}

			if (contains(p, leftModeArrow)) {
				leftModeArrow.setTint(0xAAAAAA);
			}
			else {
				leftModeArrow.setTint(0xFFFFFF);
			}
	
			if (contains(p, rightModeArrow)) {
				rightModeArrow.setTint(0xAAAAAA);
			}
			else {
				rightModeArrow.setTint(0xFFFFFF);
			}
		});
		
		this.input.on('pointerdown', (p) => {
			for (let i = 0; i < levelIcons.length; i++) {
				let level = i+1;
				let levelIcon = levelIcons[i];
				if (contains(p, levelIcon)) {
					if (this.levelsUnlocked[this.mode][level]) {
						levelIcon.setTint(0xFFFFFF);
						this.scene.switch('level-' + level);
					}
				}
			}

			if (contains(p, backButton)) {
				backButton.setTint(0xFFFFFF);
				this.scene.switch('main-menu');
			}
			
			if (contains(p, leftModeArrow)) {
				this.levelMode = getPrevMode(this.levelMode);
				modeLabel.destroy();
				modeLabel = this.add.image(416, 160, this.levelMode);
			}
			else if (contains(p, rightModeArrow)) {
				this.levelMode = getNextMode(this.levelMode);
				modeLabel.destroy();
				modeLabel = this.add.image(416, 160, this.levelMode);	
			}
		});

	}

}

export { LevelSelectScene };
