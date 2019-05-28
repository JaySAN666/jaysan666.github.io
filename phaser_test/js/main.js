var GameState = {
	preload: function(){
		this.load.image('corn', 'assets/images/corn.png');
	},
	create: function(){
		this.corn = this.game.add.sprite(0,0,'corn');
	},
	update: function(){

	};

var game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState')
