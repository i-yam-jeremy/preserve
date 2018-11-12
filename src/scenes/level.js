import 'phaser';

import {TILE_WIDTH, JAM_BALL_COUNT, LIQUIFY_SPEED, LEVEL_COUNT} from '../constants/constants';

class LevelScene extends Phaser.Scene {

	constructor(levelMode, level, levelData, levelsUnlocked) {
		super('level');
		this.levelData = levelData;
		this.jamletsFinished = 0;
		this.levelMode = levelMode;
		this.level = level;
		this.levelsUnlocked = levelsUnlocked;
	}

	preload() {
		this.load.image('background-tile', 'assets/background-tile.png');
		this.load.image('jar', 'assets/jar.png');
		this.load.image('jamlet', 'assets/jamlet.png');
		this.load.image('tile-grass-top-middle', 'assets/tile-grass-top-middle.png');
		this.load.image('tile-grass-top-left', 'assets/tile-grass-top-left.png');
		this.load.image('tile-grass-top-right', 'assets/tile-grass-top-right.png');
		this.load.image('tile-grass-middle-middle', 'assets/tile-grass-middle-middle.png');
		this.load.image('tile-grass-top-cap', 'assets/tile-grass-top-cap.png');
		this.load.image('tile-grass-slope-right-start', 'assets/tile-grass-slope-right-start.png');
		this.load.image('tile-grass-slope-right', 'assets/tile-grass-slope-right.png');
		this.load.image('tile-grass-slope-right-connective', 'assets/tile-grass-slope-right-connective.png');
		this.load.image('tile-grass-slope-left-start', 'assets/tile-grass-slope-left-start.png');
		this.load.image('tile-grass-slope-left', 'assets/tile-grass-slope-left.png');
		this.load.image('tile-grass-slope-left-connective', 'assets/tile-grass-slope-left-connective.png');
		this.load.image('tile-button-up', 'assets/tile-button-up.png');
		this.load.image('tile-button-down', 'assets/tile-button-down.png');
		this.load.image('tile-gate', 'assets/tile-gate.png');
		this.load.image('tile-finish', 'assets/tile-finish.png');
		this.load.image('tile-grass-pipe-horizontal', 'assets/tile-grass-pipe-horizontal.png');
		this.load.image('tile-grass-pipe-vertical', 'assets/tile-grass-pipe-vertical.png');
		this.load.image('tile-grass-pipe-horizontal-narrow', 'assets/tile-grass-pipe-horizontal-narrow.png');
		this.load.image('tile-grass-pipe-vertical-narrow', 'assets/tile-grass-pipe-vertical-narrow.png');
		this.load.image('tile-spikes', 'assets/tile-spikes.png');
		this.load.image('back-to-level-select', 'assets/back-to-level-select.png');

		this.load.json('shapes', 'assets/shapes.json');
	}

	create() {

		this.cursors = this.input.keyboard.createCursorKeys();


		this.shapes = this.cache.json.get('shapes');
		this.cameras.main.setBounds(0, 0, TILE_WIDTH*this.levelData.width, TILE_WIDTH*this.levelData.height);
		this.matter.world.setBounds(0, 0, TILE_WIDTH*this.levelData.width, TILE_WIDTH*this.levelData.height);

		this.matter.world.on('collisionstart', (e) => {
			for (let i = 0; i < e.pairs.length; i++) {
				let bodyA = getRootBody(e.pairs[i].bodyA);
				let bodyB = getRootBody(e.pairs[i].bodyB);
	
				let bodyLabels = [bodyA.label, bodyB.label];
				
				if (bodyLabels.indexOf('jamlet') != -1 && bodyLabels.indexOf('tile-finish') != -1) {
					let jamletBody = bodyA.label == 'jamlet' ? bodyA : bodyB;
					let index = this.liquidBalls.indexOf(jamletBody.gameObject);
					this.liquidBalls.splice(index, 1);
					jamletBody.gameObject.destroy();
					this.jamletsFinished++;
					this.jamletsLabel.setText("Jamlets: " + this.jamletsFinished + "/" + this.levelData.jamletsNeeded)

					if (this.jamletsFinished >= this.levelData.jamletsNeeded) {
						this.unlockNextLevel();
						this.scene.switch('level-select');
						this.scene.remove('level');
					}
				}

				if (bodyLabels.indexOf('jamlet') != -1 && bodyLabels.indexOf('tile-spikes') != -1) {
					let jamletBody = bodyA.label == 'jamlet' ? bodyA : bodyB;
					let index = this.liquidBalls.indexOf(jamletBody.gameObject);
					this.liquidBalls.splice(index, 1);
					jamletBody.gameObject.destroy();

					if (this.liquidBalls.length == 0) {
						this.scene.switch('level-select');
						this.scene.remove('level');
					}
				}
	
				if (this.jars) {
					for (let jar of this.jars) {
						if (jar.sprite.body == bodyA || jar.sprite.body == bodyB) {
							jar.onGround = true;
						}
					}
				}
			}
		});

		setInterval(() => {
			if (this.jars) {
				for (let button of this.buttons) {
					let closeJar = false;
					for (let jar of this.jars) {
						let dist = Math.sqrt(Math.pow(jar.sprite.x - button.x, 2) + Math.pow(jar.sprite.y - button.y, 2));
						dist -= Math.sqrt(Math.pow(jar.sprite.width/2, 2) + Math.pow(jar.sprite.height/2, 2));
						dist -= Math.sqrt(Math.pow(button.width/2, 2) + Math.pow(button.height/2, 2));

						if (dist < 1) {
							closeJar = true;
							break;
						}
					}
					if (closeJar) {
						this.pressButton(button);
					}
					else {
						this.releaseButton(button);	
					}
				}
			}
			else {
				for (let button of this.buttons) {
					this.releaseButton(button);
				}
			}
		}, 500);
		
		this.matter.world.on('collisionend', (e) => {
			for (let i = 0; i < e.pairs.length; i++) {
				let bodyA = getRootBody(e.pairs[i].bodyA);
				let bodyB = getRootBody(e.pairs[i].bodyB);
	
				if (this.jars) {
					for (let jar of this.jars) {
						if (jar.sprite.body == bodyA || jar.sprite.body == bodyB) {
							jar.onGround = false;
						}
					}
				}
			}
		});


		this.input.keyboard.on('keydown_SPACE', this.toggleLiquify.bind(this), this);

		this.gates = [];
		this.buttons = [];
		for (let y = 0; y < this.levelData.height; y++) {
			for (let x = 0; x < this.levelData.width; x++) {
				this.add.image(x*TILE_WIDTH, y*TILE_WIDTH, 'background-tile').setOrigin(0, 0);
				if (this.levelData.tiles[y][x] != -1) {
					let tileName = getTileNameByTypeId(this.levelData.tiles[y][x]);

					let tile = this.matter.add.sprite(0, 0, tileName, '', {shape: this.shapes[tileName]});
					tile.setPosition(x*TILE_WIDTH + tile.centerOfMass.x, y*TILE_WIDTH + tile.centerOfMass.y);
				
					if (tileName == 'tile-gate') {
						this.gates.push({x: x, y: y, sprite: tile});
					}
			
					if (tileName == 'tile-button-up') {
						this.buttons.push(tile);
					}
				}
			}
		}
		
		let jar = this.matter.add.sprite(0, 0, 'jar', '', {shape: this.shapes.jar});
		jar.setPosition(0 + jar.centerOfMass.x, TILE_WIDTH*this.levelData.height - jar.centerOfMass.y);
		this.jars = [{sprite: jar, balls: JAM_BALL_COUNT}];


		this.jamletsLabel = this.add.text(0, 0, "Jamlets: " + this.jamletsFinished + "/" + this.levelData.jamletsNeeded, {
			fontSize: '24px',
			fontFamily: 'Courier',
			color: '#FFC200',
			backgroundColor: '#8899AA'
		});
		
		this.backButton = this.add.image(0, 0, 'back-to-level-select');
		this.backButton.setPosition(this.backButton.width/2, this.cameras.main.displayHeight - this.backButton.height/2);

		this.input.on('pointermove', (p) => {
			let adjustedP = { // point adjusted for camera scroll
				x: p.x + this.cameras.main.scrollX,
				y: p.y + this.cameras.main.scrollY
			};
			if (contains(adjustedP, this.backButton)) {
				this.backButton.setTint(0xAAAAAA);	
			}
			else {
				this.backButton.setTint(0xFFFFFF);
			}
		}, this);
		
		this.input.on('pointerdown', (p) => {
			let adjustedP = { // point adjusted for camera scroll
				x: p.x + this.cameras.main.scrollX,
				y: p.y + this.cameras.main.scrollY
			};
			if (contains(adjustedP, this.backButton)) {
				this.backButton.setTint(0xFFFFFF);
				this.scene.switch('level-select');
				this.scene.remove('level');
			}
		}, this);
	}

	update() {
		this.centerCamera();
		this.jamletsLabel.setPosition(this.cameras.main.scrollX, this.cameras.main.scrollY);
		this.backButton.setPosition(this.cameras.main.scrollX + this.backButton.width/2,
			this.cameras.main.scrollY + this.cameras.main.displayHeight - this.backButton.height/2);

		if (this.jars) {
			for (let jar of this.jars) {
				let sprite = jar.sprite;
				sprite.rotation = 0;
				if (this.cursors.left.isDown) {
					sprite.setVelocityX(-4);
				}
				else if (this.cursors.right.isDown) {
					sprite.setVelocityX(4);
				}
				else {
					sprite.setVelocityX(0);
				}


				if (this.cursors.up.isDown && jar.onGround) {
					sprite.setVelocityY(-12);
				}
			}
		}
	}

	centerCamera() {
		let sprites;
		if (this.jars) {
			sprites = this.jars.map(jar => jar.sprite);
		}
		else {
			sprites = this.liquidBalls;
		}
			
		let x = 0;
		let y = 0;

		for (let sprite of sprites) {
			x += sprite.x;
			y += sprite.y;
		}

		x /= sprites.length;
		y /= sprites.length;

		this.cameras.main.centerOn(x, y);
	}

	toggleLiquify() {
		if (this.jars) {
			this.liquidBalls = [];
			for (let jar of this.jars) {
				for (let i = 0; i < jar.balls; i++) {
					let ball = this.matter.add.sprite(0, 0, 'jamlet', '', {shape: this.shapes['jamlet']});
					ball.setPosition(jar.sprite.x + ball.centerOfMass.x, jar.sprite.y + ball.centerOfMass.y);
					ball.setVelocity(
						jar.sprite.body.velocity.x + LIQUIFY_SPEED*(2*Math.random() - 1),
						jar.sprite.body.velocity.y + LIQUIFY_SPEED*(2*Math.random() - 1));
					this.liquidBalls.push(ball);
				}
			}

			this.jars.map(jar => jar.sprite.destroy());
			this.jars = undefined;
		}
		else {
			let clumps = [];
			for (let ball of this.liquidBalls) {
				let inClump = false;
				for (let clump of clumps) {
					if (inClump) {
						break;
					}
					for (let ball2 of clump) {
						if (ball != ball2) {
							let dist = Math.sqrt(Math.pow(ball.x-ball2.x, 2) + Math.pow(ball.y-ball2.y, 2));
							if (dist < 16+2) {
								clump.push(ball);
								inClump = true;
								break;
							}
						}
					}
				}

				if (!inClump) {
					clumps.push([ball]);
				}
			}
		
			this.jars = [];
			for (let clump of clumps) {
				let sumPos = clump.reduce((a, b) => {
					return {
						x: a.x+b.x,
						y: a.y+b.y
					};
				});
				let avgPos = {
					x: sumPos.x / clump.length,
					y: sumPos.y / clump.length
				};
					
				let jar = this.matter.add.sprite(0, 0, 'jar', '', {shape: this.shapes.jar});
				jar.setPosition(avgPos.x, avgPos.y);
				jar.setScale(Math.sqrt(clump.length / JAM_BALL_COUNT)); // sqrt to scale with area
				this.jars.push({sprite: jar, balls: clump.length});
			}


			this.liquidBalls.map(ball => ball.destroy());
			this.liquidBalls = undefined;
		}

	}

	openGate(tileX, tileY) {
		for (let gate of this.gates) {
			if (gate.x == tileX && gate.y == tileY) {
				gate.sprite.destroy();
				gate.sprite = undefined;
			}
		}
	}
	
	closeGate(tileX, tileY) {
		for (let gate of this.gates) {
			if (gate.x == tileX && gate.y == tileY && gate.sprite == undefined) {
				let tileName = 'tile-gate';
				let tile = this.matter.add.sprite(0, 0, tileName, '', {shape: this.shapes[tileName]});
				tile.setPosition(gate.x*TILE_WIDTH + tile.centerOfMass.x, gate.y*TILE_WIDTH + tile.centerOfMass.y);
				gate.sprite = tile;
			}
		}
	}

	unlockNextLevel() {
		if (this.level == LEVEL_COUNT) {
			if (this.levelMode == 'hard') {
				//TODO add game win screen
			}
			else {
				let newMode = getNextMode(this.levelMode);
				this.levelsUnlocked[newMode][0] = true;
			}
		}
		else {
			let index = this.level-1;
			this.levelsUnlocked[this.levelMode][index+1] = true;
		}
		this.levelsUnlocked.needsToRefreshLocks = true;
	}

	releaseButton(button) {
		let tileName = 'tile-button-up';
		let tile = this.matter.add.sprite(0, 0, tileName, '', {shape: this.shapes[tileName]});
		tile.setPosition(button.x, button.y - button.centerOfMass.y + tile.centerOfMass.y);
		let tileX = (button.x - button.centerOfMass.x) / TILE_WIDTH;
		let tileY = (button.y - button.centerOfMass.y) / TILE_WIDTH;

		let index = this.buttons.indexOf(button);

		button.destroy();

		this.buttons[index] = tile; // insert new button and remove old one

		this.levelData.buttonHandler(this, tileX, tileY, 'up');
	}

	pressButton(button) {
		let tileName = 'tile-button-down';
		let tile = this.matter.add.sprite(0, 0, tileName, '', {shape: this.shapes[tileName]});
		tile.setPosition(button.x, button.y - button.centerOfMass.y + tile.centerOfMass.y);
		
		let tileX = (button.x - button.centerOfMass.x) / TILE_WIDTH;
		let tileY = (button.y - button.centerOfMass.y) / TILE_WIDTH;
		
		let index = this.buttons.indexOf(button);

		button.destroy();
	
		this.buttons[index] = tile; // insert new button and remove old one

		this.levelData.buttonHandler(this, tileX, tileY, 'down');
	}

}

function getNextMode(mode) {
	if (mode == 'easy') {
		return 'medium';
	}
	else if (mode == 'medium') {
		return 'hard';
	}
}

function getRootBody(body) {
	while (body.parent != body) {
		body = body.parent;
	}

	return body;

}

function contains(p, sprite) {
	return p.x > sprite.x - sprite.width/2 &&
		p.x < sprite.x + sprite.width/2 &&
		p.y > sprite.y - sprite.height/2 &&
		p.y < sprite.y + sprite.height/2;
}


function getTileNameByTypeId(id) {
	switch (id) {
		case 0:
			return 'tile-grass-middle-middle';
		case 1:
			return 'tile-grass-top-middle';
		case 2:
			return 'tile-grass-top-left';
		case 3:
			return 'tile-grass-top-right';
		case 4:
			return 'tile-grass-top-cap';
		case 5:
			return 'tile-grass-slope-left-start';
		case 6:
			return 'tile-grass-slope-left';
		case 7:
			return 'tile-grass-slope-left-connective';
		case 8:
			return 'tile-grass-slope-right-start';
		case 9:
			return 'tile-grass-slope-right';
		case 10:
			return 'tile-grass-slope-right-connective';
		case 11:
			return 'tile-button-up';
		case 12:
			return 'tile-gate';
		case 13:
			return 'tile-finish';
		case 14:
			return 'tile-grass-pipe-horizontal';
		case 15:
			return 'tile-grass-pipe-vertical';
		case 16:
			return 'tile-grass-pipe-horizontal-narrow';
		case 17:
			return 'tile-grass-pipe-vertical-narrow';
		case 18:
			return 'tile-spikes';
	}
}

export { LevelScene };
