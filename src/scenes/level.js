import 'phaser';

import {tileWidth} from '../constants/constants';

class LevelScene extends Phaser.Scene {

	constructor(levelData) {
		super(levelData.name);
		this.levelData = levelData;
	}

	preload() {
		this.load.image('jar', 'assets/jar.png');
		this.load.image('jam-ball', 'assets/jam-ball.png');
		this.load.image('tile-grass-top-middle', 'assets/tile-grass-top-middle.png');
		this.load.image('tile-grass-top-left', 'assets/tile-grass-top-left.png');
		this.load.image('tile-grass-top-right', 'assets/tile-grass-top-right.png');
		this.load.image('tile-grass-middle-middle', 'assets/tile-grass-middle-middle.png');
		this.load.image('tile-grass-top-cap', 'assets/tile-grass-top-cap.png');
		this.load.json('shapes', 'assets/shapes.json');
	}

	create() {
		this.cursors = this.input.keyboard.createCursorKeys();


		this.shapes = this.cache.json.get('shapes');
		this.cameras.main.setBounds(0, 0, tileWidth*this.levelData.width, tileWidth*this.levelData.height);
		this.matter.world.setBounds(0, 0, tileWidth*this.levelData.width, tileWidth*this.levelData.height);

		this.matter.world.on('collisionstart', (e) => {
			for (let i = 0; i < e.pairs.length; i++) {
				let bodyA = getRootBody(e.pairs[i].bodyA);
				let bodyB = getRootBody(e.pairs[i].bodyB);
				if (bodyA.label == 'jar' || bodyB.label == 'jar') {
					console.log(bodyA.label == 'jar' ? bodyB : bodyA);
					//TODO handle collision
				}
			}
		}, this);

		//TODO this.add.image(0, 0, 'background').setOrigin(0, 0);

		this.jar = this.matter.add.sprite(0, 0, 'jar', '', {shape: this.shapes.jar});
		this.jar.setPosition(400 + this.jar.centerOfMass.x, 200 + this.jar.centerOfMass.y);

		this.input.keyboard.on('keydown_SPACE', this.toggleLiquify.bind(this), this);

		for (let y = 0; y < this.levelData.height; y++) {
			for (let x = 0; x < this.levelData.width; x++) {
				//TODO check tile type
				if (this.levelData.tiles[y][x] != -1) {
					let tileName = getTileNameByTypeId(this.levelData.tiles[y][x]);
					let tile = this.matter.add.sprite(0, 0, tileName, '', {shape: this.shapes[tileName]});
					tile.setPosition(x*tile.width + tile.centerOfMass.x, y*tile.height + tile.centerOfMass.y);
				}
			}
		}	
	}

	update() {
		this.centerCamera();

		if (this.jar) {
			this.jar.rotation = 0;
			if (this.cursors.left.isDown) {
				this.jar.setVelocityX(-4);
			}
			else if (this.cursors.right.isDown) {
				this.jar.setVelocityX(4);
			}
			else {
				this.jar.setVelocityX(0);
			}


			if (this.cursors.up.isDown && Math.abs(this.jar.body.velocity.y) < 0.05) { // TODO add check so you ccan't double jump
				this.jar.setVelocityY(-12);
			}
		}
	}

	centerCamera() {
		let x, y;
		if (this.jar) {
			x = this.jar.x;
			y = this.jar.y;
		}
		else {
			x = 0;
			y = 0;

			for (let ball of this.liquidBalls) {
				x += ball.x;
				y += ball.y;
			}

			x /= this.liquidBalls.length;
			y /= this.liquidBalls.length;
		}

		this.cameras.main.centerOn(x, y);
	}

	toggleLiquify() {
		if (this.jar) {
			this.liquidBalls = [];
			for (let i = 0; i < 10; i++) {
				let ball = this.matter.add.sprite(0, 0, 'jam-ball', '', {shape: this.shapes['jam-ball']});
				ball.setPosition(this.jar.x + ball.centerOfMass.x, this.jar.y + ball.centerOfMass.y);
				this.liquidBalls.push(ball);
			}
			this.jar.destroy();
			this.jar = undefined;
		}
		else {
			let clumps = [];
			for (let ball of this.liquidBalls) {
				let inClump = false;
				for (let clump of clumps) {
					for (let ball2 of clump) {
						if (ball != ball2) {
							let dist = Math.sqrt(Math.pow(ball.x-ball2.x, 2) + Math.pow(ball.y-ball2.y, 2));
							if (dist < 16+2) {
								clump.push(ball);
								inClump = true;
							}
						}
					}
				}

				if (!inClump) {
					clumps.push([ball]);
				}
			}
		
			for (let clump of clumps) {
				let sumPos = clump.reduce((a, b) => {
					return {x: a.x+b.x, y: a.y+b.y};
				});
				let avgPos = {
					x: sumPos.x / clump.length,
					y: sumPos.y / clump.length
				};
					
				let jar = this.matter.add.sprite(0, 0, 'jar', '', {shape: this.shapes.jar});
				jar.setPosition(avgPos.x + jar.centerOfMass.x, avgPos.y + jar.centerOfMass.y);
			}

			//this.liquidBalls.map(ball => ball.destroy());
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
	}
}

export { LevelScene };
