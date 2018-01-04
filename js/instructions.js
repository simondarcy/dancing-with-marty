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

        textStyle = { font: settings.instructionsFont ,fill: '#52108c', align:'center'};
        instructionsHeading = game.add.text(game.width/2, 180, settings.instructions, textStyle);
        instructionsHeading.anchor.set(0.5);
        instructionsHeading.wordWrap = true;
        instructionsHeading.wordWrapWidth = game.width - settings.instrunctionPadding;


        arrowsTop = game.add.sprite(game.width/2, instructionsHeading.centerY+150, "arrows");
        arrowsTop.anchor.set(0.5);
        game.physics.enable(arrowsTop, Phaser.Physics.ARCADE);


        this.createBottom();



        textStyle = { font: "23px Baloo Paaji" , fill: '#ff0000', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
        instructionHeading = game.add.text(game.world.centerX, game.height-70, "Tap to boogie!", textStyle);
        instructionHeading.anchor.set(0.5);
        instructionHeading.alpha = 0;

        instructionHeadingTween = game.add.tween(instructionHeading).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 800, true);



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


        if (arrowsBottom.y<=arrowsTop.centerY-30){
            arrowsBottom.body.velocity.y = +1;

            var colorTween = game.add.tween(arrowsBottom.scale);
            colorTween.to({x:2.5,y:2.5  }, 300, Phaser.Easing.Linear.None);
            colorTween.start();
            colorTween.onComplete.addOnce(function () {
                arrowsBottom.kill();
                Instructions.createBottom();
            })
        }




    }
};