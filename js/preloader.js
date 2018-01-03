var loadingText;


WebFontConfig = {
    active: function() {
        game.time.events.add(Phaser.Timer.SECOND, function() {
        }, this);
    },
    google: {
        families: ['Baloo Paaji']
    }
};


var Preloader = {

    preload : function() {


        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        //Loading text
        loadingText = game.add.text(game.width/2, game.height/2, 'Loading...', { font:"23px Baloo Paaji", fill: '#52108c', align:'center', boundsAlignH: "center", boundsAlignV: "middle"});
        loadingText.anchor.setTo(0.5);

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

        //Audio
        game.load.audio('music', ['audio/music.wav']);
        game.load.audio('all-aboard', ['audio/all-aboard.ogg']);
        game.load.audio('attention', ['audio/attention.ogg']);
        game.load.audio('exciting', ['audio/exciting.ogg']);
        game.load.audio('final', ['audio/final.ogg']);
        game.load.audio('is-this-thing-on', ['audio/is-this-thing-on.ogg']);
        game.load.audio('kerry', ['audio/kerry.ogg']);

        //Main Game Assets





        game.load.spritesheet('dance-idle', 'dance-idle.png?v=2', 330, 520, 4);
        game.load.spritesheet('dance-down', 'dance-down.png?v=2', 330, 520, 4);
        game.load.spritesheet('dance-right', 'dance-right.png?v=2', 330, 520, 6);
        game.load.spritesheet('dance-up', 'dance-up.png?v=2', 330, 520, 6);
        game.load.spritesheet('dance-left', 'dance-left.png?v=2', 330, 520, 6);

        game.load.spritesheet('arrows', 'arrows.png?v=2', 100, 100, 4);
        game.load.image('logo', 'logo.png');
        game.load.image('paddle', 'paddle.png');
        game.load.image('bgr', 'bgr.png');
        game.load.image('marty1', 'marty.png');


        //Share icons
        game.load.image('facebook', 'share_facebook.png');
        game.load.image('twitter', 'share_twitter.png');
        game.load.image('link', 'share_link.png');
        game.load.image('whatsapp', 'share_whatsapp.png');

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