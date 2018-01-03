var Instructions = {

    preload : function() {

    },

    create: function () {

        //add background
        background = game.add.sprite(0, 0, 'bgr');
        background.width = w;
        background.height = h;

        soundbit = game.add.audio('attention');
        soundbit.play();

        //add Splash screen heading
        textStyle = { font: "36px Baloo Paaji" , fill: '#ff0000', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
        splashHeading = game.add.text(game.width/2, 50, "How to Play", textStyle);
        splashHeading.anchor.set(0.5);


        arrowsTop = game.add.sprite(game.width/2, game.height/2, "arrows");
        arrowsTop.anchor.set(0.5);
        game.physics.enable(arrowsTop, Phaser.Physics.ARCADE);


        this.createBottom();


        textStyle = { font: "18px Baloo Paaji" ,fill: '#52108c', align:'center'};
        splashHeading = game.add.text(game.width/2, 120, settings.instructions, textStyle);
        splashHeading.anchor.set(0.5);


        game.input.onTap.add(function(){
            game.state.start('Game');
        }, this);


    },
    createBottom:function(){
        arrowsBottom = game.add.sprite(game.width/2, game.height+100, "arrows");
        arrowsBottom.anchor.set(0.5);
        arrowsBottom.alpha = 0.5;
        game.physics.enable(arrowsBottom, Phaser.Physics.ARCADE);
        arrowsBottom.body.velocity.y = -250;

    },
    update: function(){



        if (arrowsBottom.y<=arrowsTop.centerY){

            var colorTween = game.add.tween(arrowsBottom.scale);
            colorTween.to({x:2.5,y:2.5}, 300, Phaser.Easing.Linear.None);
            colorTween.start();
            arrowsBottom.alpha = 1;
            colorTween.onComplete.addOnce(function () {
                arrowsBottom.kill();
                Instructions.createBottom();
            })
        }




    }
};