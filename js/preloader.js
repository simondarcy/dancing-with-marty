var loadingText;


var Preloader = {

    preload : function() {



        loadingText = game.add.text(32, 100, 'Loading...', { font:"23px Arial", fill: '#FFF'});

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.scale.refresh();

        game.load.onLoadStart.add(this.loadStart, this);
        game.load.onFileComplete.add(this.fileComplete, this);
        game.load.onLoadComplete.add(this.loadComplete, this);

        // Load all the needed resources for the menu.

        //Global Assets
        game.stage.backgroundColor = '#f9e1ad';

        //Main Game Assets

        game.load.audio('music', ['audio/music.wav']);
        game.load.spritesheet('dance', 'dance-sprite.png?v=1', 648, 910, 2);
        game.load.spritesheet('arrows', 'arrows.png?v=1', 100, 100, 4);
        game.load.image('logo', 'logo.png');
        game.load.image('bgr', 'bgr.png');
        game.load.image('marty1', 'marty.png');

        //backroudn parallax

        game.load.start();


    },
    loadStart : function(){
        loadingText.setText("Loading ...");
    },
    loadComplete : function(){
        game.state.start('Menu');
    },
    fileComplete : function(progress, cacheKey, success, totalLoaded, totalFiles){
        loadingText.setText("Loading: " + progress + "% - " + totalLoaded + " of " + totalFiles);
    },
    create: function () {

    }
};