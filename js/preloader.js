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
        game.load.audio('all-aboard', ['audio/all-aboard.mp3', 'audio/all-aboard.ogg', 'audio/all-aboard.wav']);
        game.load.audio('attention', ['audio/attention.mp3', 'audio/attention.ogg', 'audio/attention.wav']);
        game.load.audio('exciting', ['audio/exciting.mp3', 'audio/exciting.ogg', 'audio/exciting.wav']);
        game.load.audio('final', ['audio/final.mp3', 'audio/final.ogg', 'audio/final.wav']);
        game.load.audio('is-this-thing-on', ['audio/is-this-thing-on.mp3', 'audio/is-this-thing-on.ogg', 'audio/is-this-thing-on.wav']);
        game.load.audio('kerry', ['audio/kerry.mp3', 'audio/kerry.ogg', 'audio/kerry.ogg']);

        //Main Game Assets

        game.load.spritesheet('dance-idle', 'img/dance-idle.png?v=2', 330, 520, 4);
        game.load.spritesheet('dance-down', 'img/dance-down.png?v=2', 330, 520, 4);
        game.load.spritesheet('dance-right', 'img/dance-right.png?v=2', 330, 520, 6);
        game.load.spritesheet('dance-up', 'img/dance-up.png?v=2', 330, 520, 6);
        game.load.spritesheet('dance-left', 'img/dance-left.png?v=2', 330, 520, 6);

        game.load.spritesheet('arrows', 'img/arrows.png?v=2', 100, 100, 4);
        game.load.image('logo', 'img/logo.png');
        game.load.image('paddle', 'img/paddle.png');
        game.load.image('bgr', 'img/bgr.png');
        game.load.image('marty1', 'img/marty.png');

        //Share icons
        game.load.image('facebook', 'img/share_facebook.png');
        game.load.image('twitter', 'img/share_twitter.png');
        game.load.image('link', 'img/share_link.png');
        game.load.image('whatsapp', 'img/share_whatsapp.png');

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