var game = new Phaser.Game(w, h, Phaser.AUTO, 'game');
game.state.add('Preloader', Preloader);
game.state.add('Game', Game);
game.state.start('Preloader');
