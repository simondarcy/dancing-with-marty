var GameOver = {

    preload : function() {

    },

    create: function () {

        //add background
        background = game.add.sprite(0, 0, 'bgr');
        background.width = w;
        background.height = h;

        logo = game.add.sprite(game.width/2, 150, 'logo');
        logo.anchor.setTo(0.5);

        game.input.onTap.add(function(){
            game.state.start('Game');
        }, this);


    }
};