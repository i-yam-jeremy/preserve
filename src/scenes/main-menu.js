import 'phaser';

class MainMenuScene extends Phaser.Scene {

	constructor() {
		super('main-menu');
	}

	preload() {
		this.load.image('menu-background', 'assets/menu-background.png');
		this.load.image('title', 'assets/title.png');
		this.load.spritesheet('button-levels', 'assets/button-levels.png', { frameWidth: 160, frameHeight: 80 });
		this.load.spritesheet('button-how-to', 'assets/button-how-to.png', { frameWidth: 160, frameHeight: 80 });
		this.load.audio('preserve-theme', ['assets/audio/preserve-theme.m4a']);
	}

	create() {
		let themeMusic = this.sound.add('preserve-theme');
		//themeMusic.play({loop: true});

		this.add.image(0, 0, 'menu-background').setOrigin(0, 0);
		let levelsButton = this.add.sprite(416, 360, 'button-levels');
		let howToButton = this.add.sprite(416, 480, 'button-how-to');

		this.generateSingleFrameAnim('button-levels', 'button-levels-up', 0);
		this.generateSingleFrameAnim('button-levels', 'button-levels-hover', 1);
		this.generateSingleFrameAnim('button-levels', 'button-levels-down', 2);
		this.generateSingleFrameAnim('button-how-to', 'button-how-to-up', 0);
		this.generateSingleFrameAnim('button-how-to', 'button-how-to-hover', 1);
		this.generateSingleFrameAnim('button-how-to', 'button-how-to-down', 2);

		this.input.on('pointermove', (p) => {
			if (p.x > levelsButton.x - levelsButton.width/2 &&
			    p.x < levelsButton.x + levelsButton.width/2 &&
			    p.y > levelsButton.y - levelsButton.height/2 &&
			    p.y < levelsButton.y + levelsButton.height/2) {

				levelsButton.play('button-levels-hover');
			}
			else {
				levelsButton.play('button-levels-up');
			}
			
			if (p.x > howToButton.x - howToButton.width/2 &&
			    p.x < howToButton.x + howToButton.width/2 &&
			    p.y > howToButton.y - howToButton.height/2 &&
			    p.y < howToButton.y + howToButton.height/2) {

				howToButton.play('button-how-to-hover');
			}
			else {
				howToButton.play('button-how-to-up');
			}
		}, this);

		this.input.on('pointerdown', (p) => {
			if (p.x > levelsButton.x - levelsButton.width/2 &&
			    p.x < levelsButton.x + levelsButton.width/2 &&
			    p.y > levelsButton.y - levelsButton.height/2 &&
			    p.y < levelsButton.y + levelsButton.height/2) {

				levelsButton.play('button-levels-down');
				this.scene.switch('level-select');
			}
			else if (p.x > howToButton.x - howToButton.width/2 &&
			    p.x < howToButton.x + howToButton.width/2 &&
			    p.y > howToButton.y - howToButton.height/2 &&
			    p.y < howToButton.y + howToButton.height/2) {

				howToButton.play('button-how-to-down');
				this.scene.switch('how-to');
			}
		}, this);
		
		this.input.on('pointerup', (p) => {
			if (p.x > levelsButton.x - levelsButton.width/2 &&
			    p.x < levelsButton.x + levelsButton.width/2 &&
			    p.y > levelsButton.y - levelsButton.height/2 &&
			    p.y < levelsButton.y + levelsButton.height/2) {

				levelsButton.play('button-levels-hover');
			}
			else {
				levelsButton.play('button-levels-up');
			}
	
			if (p.x > howToButton.x - howToButton.width/2 &&
			    p.x < howToButton.x + howToButton.width/2 &&
			    p.y > howToButton.y - howToButton.height/2 &&
			    p.y < howToButton.y + howToButton.height/2) {

				howToButton.play('button-how-to-hover');
			}
			else {
				howToButton.play('button-how-to-up');
			}
		}, this);
	}

	generateSingleFrameAnim(spriteName, animName, frame) {
		let config = {
			key: animName,
			frames: this.anims.generateFrameNumbers(spriteName, {start: frame, end: frame, first: frame}),
			frameRate: 1,
			repeat: -1
		};

		this.anims.create(config);
	}

}




export { MainMenuScene };
