var Menu = {

    preload : function() {

    },

    create: function () {

        //add background
        background = game.add.sprite(0, 0, 'bgr');
        background.width = w;
        background.height = h;



        logo = game.add.sprite(game.width/2, 150, 'logo');
        logo.anchor.setTo(0.5);
        logo.scale.setTo(settings.logoScale);

        //add Splash screen heading
        textStyle = { font: "36px Baloo Paaji" , fill: '#ff0000', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
        splashHeading = game.add.text(game.width/2, logo.centerY+150, "Dancing With Marty!", textStyle);
        splashHeading.anchor.set(0.5);
        splashHeading.scale.set(0);

        splashMarty = game.add.sprite(-130, game.height+60, "marty1");

        splashMarty.scale.setTo(0.4);
        splashMarty.anchor.setTo(0.5, 1);



        //splashMartyTween = game.add.tween(splashMarty).to( { angle: 45 }, 500, Phaser.Easing.Linear.None, true);

        splashMartyTween = game.add.tween(splashMarty).to({x:game.width/2}, 300, Phaser.Easing.Linear.None);
        splashMartyTween.start();



        var splashHeadingTween = game.add.tween(splashHeading.scale);
        splashHeadingTween.to({x:1,y:1}, 300, Phaser.Easing.Linear.None);
        splashHeadingTween.onComplete.addOnce(function () {

            textStyle = { font: "26px Baloo Paaji" , fill: '#52108c', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
            instructionHeading = game.add.text(game.world.centerX, splashHeading.centerY+55, "Tap to Play", textStyle);
            instructionHeading.anchor.set(0.5);
            instructionHeading.alpha = 0;

            instructionHeadingTween = game.add.tween(instructionHeading).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 800, true);


        }, this);
        splashHeadingTween.start();


        game.input.onTap.add(function(){
            game.state.start('Game');
        }, this);


    }
};