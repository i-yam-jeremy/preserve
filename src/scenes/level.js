import 'phaser';

import {TILE_WIDTH, JAM_BALL_COUNT, LIQUIFY_SPEED} from '../constants/constants';

class LevelScene extends Phaser.Scene {

	constructor(levelData) {
		super(levelData.name);
		this.levelData = levelData;
	}

	preload() {
		this.load.image('background-tile', 'assets/background-tile.png');
		this.load.image('jar', 'assets/jar.png');
		this.load.image('jam-ball', 'assets/jam-ball.png');
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
		this.load.json('shapes', 'assets/shapes.json');
	}

	create() {
		this.cursors = this.input.keyboard.createCursorKeys();


		this.shapes = this.cache.json.get('shapes');
		this.cameras.main.setBounds(0, 0, TILE_WIDTH*this.levelData.width, TILE_WIDTH*this.levelData.height);
		this.matter.world.setBounds(0, 0, TILE_WIDTH*this.levelData.width, TILE_WIDTH*this.levelData.height);

		/*this.matter.world.on('collisionstart', (e) => {
			for (let i = 0; i < e.pairs.length; i++) {
				let bodyA = getRootBody(e.pairs[i].bodyA);
				let bodyB = getRootBody(e.pairs[i].bodyB);
				if (bodyA.label == 'jar' || bodyB.label == 'jar') {
					console.log(bodyA.label == 'jar' ? bodyB : bodyA);
					//TODO handle collision
				}
			}
		}, this);*/


		this.input.keyboard.on('keydown_SPACE', this.toggleLiquify.bind(this), this);

		for (let y = 0; y < this.levelData.height; y++) {
			for (let x = 0; x < this.levelData.width; x++) {
				this.add.image(x*TILE_WIDTH, y*TILE_WIDTH, 'background-tile').setOrigin(0, 0);
				if (this.levelData.tiles[y][x] != -1) {
					let tileName = getTileNameByTypeId(this.levelData.tiles[y][x]);
					let tile = this.matter.add.sprite(0, 0, tileName, '', {shape: this.shapes[tileName]});
					tile.setPosition(x*tile.width + tile.centerOfMass.x, y*tile.height + tile.centerOfMass.y);
				}
			}
		}
		
		let jar = this.matter.add.sprite(0, 0, 'jar', '', {shape: this.shapes.jar});
		jar.setPosition(400 + jar.centerOfMass.x, 200 + jar.centerOfMass.y);
		this.jars = [{sprite: jar, balls: JAM_BALL_COUNT}];		
	}

	update() {
		this.centerCamera();

		if (this.jars) {
			for (let jar of this.jars.map(jar => jar.sprite)) {
				jar.rotation = 0;
				if (this.cursors.left.isDown) {
					jar.setVelocityX(-4);
				}
				else if (this.cursors.right.isDown) {
					jar.setVelocityX(4);
				}
				else {
					jar.setVelocityX(0);
				}


				if (this.cursors.up.isDown && Math.abs(jar.body.velocity.y) < 0.05) { // TODO add check so you ccan't double jump
					jar.setVelocityY(-12);
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
			console.log(this.jars[0].sprite.body.velocity);
			this.liquidBalls = [];
			for (let jar of this.jars) {
				for (let i = 0; i < jar.balls; i++) {
					let ball = this.matter.add.sprite(0, 0, 'jam-ball', '', {shape: this.shapes['jam-ball']});
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

}

function getRootBody(body) {
	while (body.parent != body) {
		body = body.parent;
	}

	return body;

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
	}
}

export { LevelScene };
