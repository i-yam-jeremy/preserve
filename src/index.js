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
	this.load.json('jar-shape', 'assets/jar-shape.json');
}

let jar;
let cursors;
function create() {
	cursors = this.input.keyboard.createCursorKeys();

	let jarShape = this.cache.json.get('jar-shape');
	this.matter.world.setBounds(0, 0, game.config.width, game.config.height);
	//TODO this.add.image(0, 0, 'background').setOrigin(0, 0);
	console.log(jarShape.jar);
	jar = this.matter.add.sprite(0, 0, 'jar', {shape: jarShape.jar});
	console.log(jar.body);
	jar.setPosition(400 + jar.centerOfMass.x, 200 + jar.centerOfMass.y);
	let jar2 = this.matter.add.sprite(0, 0, 'jar', {shape: jarShape.jar});
	jar2.setPosition(500 + jar2.centerOfMass.x, 325 + jar2.centerOfMass.y);
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

	if (cursors.up.isDown && Math.abs(jar.body.velocity.y) < 0.05) { // TODO add check so you ccan't double jump
		jar.setVelocityY(-12);
	}
}
