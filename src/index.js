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
	this.load.image('jam-jar', 'assets/jam-jar.png');
	this.load.json('jam-jar-shape', 'assets/jam-jar-shape.json');
}

function create() {
	let jarShape = this.cache.json.get('jam-jar-shape');
	this.matter.world.setBounds(0, 0, game.config.width, game.config.height);
	//TODO this.add.image(0, 0, 'background').setOrigin(0, 0);
	let jar = this.matter.add.sprite(0, 0, 'jam-jar', {shape: jarShape['jam-jar']});
	jar.setPosition(400 + jar.centerOfMass.x, 300 + jar.centerOfMass.y);
	jar.scaleX = jar.scaleY = 2.0;
	let jar2 = this.matter.add.sprite(0, 0, 'jam-jar', {shape: jarShape['jam-jar']});
	jar2.setPosition(410 + jar2.centerOfMass.x, 325 + jar2.centerOfMass.y);
}

function update() {

}
