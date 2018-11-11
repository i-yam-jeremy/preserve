import 'phaser';

import {tileWidth} from '../constants/constants';

class LevelScene extends Phaser.Scene {

	constructor(levelData) {
		super(levelData.name);
		this.levelData = levelData;
	}

	preload() {
		this.load.image('jar', 'assets/jar.png');
		this.load.image('tile-grass-top', 'assets/tile-grass-top.png');
		this.load.json('shapes', 'assets/shapes.json');
	}

	create() {
		this.cursors = this.input.keyboard.createCursorKeys();

		let shapes = this.cache.json.get('shapes');
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
		this.jar = this.matter.add.sprite(0, 0, 'jar', '', {shape: shapes.jar});
		this.jar.setPosition(400 + this.jar.centerOfMass.x, 200 + this.jar.centerOfMass.y);

		for (let y = 0; y < this.levelData.height; y++) {
			for (let x = 0; x < this.levelData.width; x++) {
				//TODO check tile type
				if (this.levelData.tiles[y][x] != -1) {
					let tile = this.matter.add.sprite(0, 0, 'tile-grass-top', '', {shape: shapes['tile-grass-top']});
					tile.setPosition(x*tile.width + tile.centerOfMass.x, y*tile.height + tile.centerOfMass.y);
				}
			}
		}	

		console.log(this);
	}

	update() {
		this.cameras.main.centerOn(this.jar.x, this.jar.y);

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

function getRootBody(body) {
	while (body.parent != body) {
		body = body.parent;
	}

	return body;

}

export { LevelScene };
