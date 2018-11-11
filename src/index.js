import 'phaser';

let config = {
	type: Phaser.AUTO,
	parent: 'preserve',
	width: 800,
	height: 600,
	physics: {
		default: 'matter',
		matter: {
			// debug: true
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

let game = new Phaser.Game(config);

function preload() {
	this.load.image('jar', 'assets/jar.png');
	this.load.image('tile-grass-top', 'assets/tile-grass-top.png');
	this.load.json('shapes', 'assets/shapes.json');
}

let jar;
let cursors;
function create() {
	cursors = this.input.keyboard.createCursorKeys();

	let shapes = this.cache.json.get('shapes');
	this.matter.world.setBounds(0, 0, game.config.width, game.config.height);
	//TODO this.add.image(0, 0, 'background').setOrigin(0, 0);
	jar = this.matter.add.sprite(0, 0, 'jar', '', {shape: shapes.jar});
	jar.setPosition(400 + jar.centerOfMass.x, 200 + jar.centerOfMass.y);
	let jar2 = this.matter.add.sprite(0, 0, 'jar', '', {shape: shapes.jar});
	jar2.setPosition(500 + jar2.centerOfMass.x, 325 + jar2.centerOfMass.y);

	let tile = this.matter.add.sprite(0, 0, 'tile-grass-top', '', {shape: shapes['tile-grass-top']});
	tile.setPosition(0 + tile.centerOfMass.x, 600 - tile.centerOfMass.y);

}

function update() {
	jar.rotation = 0;
	if (cursors.left.isDown) {
		jar.setVelocityX(-4);
	}
	else if (cursors.right.isDown) {
		jar.setVelocityX(4);
	}
	else {
		jar.setVelocityX(0);
	}

	console.log(jar.body.totalContacts);

	if (cursors.up.isDown && Math.abs(jar.body.velocity.y) < 0.05) { // TODO add check so you ccan't double jump
		jar.setVelocityY(-12);
	}
}
