var GameOver = {

    preload : function() {

    },

    create: function () {

        music.stop();

        //add background
        background = game.add.sprite(0, 0, 'bgr');
        background.width = w;
        background.height = h;

        soundbit = game.add.audio('kerry');
        soundbit.play();

        game.input.onTap.add(function(){
            game.state.start('Game');
        }, this);


        clearInterval(timer);


        paddle = game.add.sprite(game.width/2, game.height + 200, "paddle");
        paddle.anchor.setTo(0.5, 0);
        paddle.scale.setTo(settings.paddle.scale);
        var paddleTween = game.add.tween(paddle).to({y:game.height-paddle.height}, 300, Phaser.Easing.Linear.None);


        paddleTween.onComplete.addOnce(function(){

            textStyle = { font: "68px Baloo Paaji" , fill: '#000000', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };

            scoreTxt = game.add.text(game.world.centerX-10, paddle.y+settings.paddle.textOffset, score, textStyle);
            scoreTxt.anchor.setTo(0.35, 0.1);

        });
        paddleTween.start();





        //add Splash screen heading
        textStyle = { font: "40px Baloo Paaji" , fill: '#52108c', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
        splashHeading = game.add.text(game.world.centerX, 50, "Your Score", textStyle);
        splashHeading.scale.set(0);
        splashHeading.anchor.set(0.5);

        var splashHeadingTween = game.add.tween(splashHeading.scale);
        splashHeadingTween.to({x:1,y:1}, 300, Phaser.Easing.Linear.None);
        splashHeadingTween.onComplete.addOnce(function () {

            textStyle = { font: "23px Baloo Paaji" , fill: '#ff0000', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
            instructionHeading = game.add.text(game.world.centerX, 175, "Tap to play again", textStyle);
            instructionHeading.anchor.set(0.5);
            instructionHeading.alpha = 0;

            instructionHeadingTween = game.add.tween(instructionHeading).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 800, true);


        }, this);
        splashHeadingTween.start();

        //Share panel box
        var shareIcons = game.add.group();

        shareIconsX = game.width/2;

        var facebook = game.add.button(shareIconsX - settings.shareSpacing, splashHeading.y + 60, 'facebook');
        facebook.anchor.setTo(0.5);
        facebook.scale.set(settings.shareScale);

        var twitter = game.add.button(shareIconsX, splashHeading.y + 60, 'twitter');
        twitter.anchor.setTo(0.5);
        twitter.scale.set(settings.shareScale);
        var link;
        if(settings.isMobile) {
            link = game.add.button(shareIconsX + settings.shareSpacing, splashHeading.y + 60, 'whatsapp');

        }
        else{
            link = game.add.button(shareIconsX + settings.shareSpacing, splashHeading.y + 60, 'link');
        }
        link.anchor.setTo(0.5);
        link.scale.set(settings.shareScale);

        facebook.onInputUp.add(function(){
            url = "//www.facebook.com/sharer/sharer.php?u=https://www.rte.ie/dancing-with-marty/";
            window.open(url, "_blank")

        }, this);
        twitter.onInputUp.add(function(){
            shareText = "I just scored " + score + " points dancing with @MartyM_RTE Play Now! @DWTSIRL #DWTS";
            url = "//twitter.com/share?url=https://www.rte.ie/dancing-with-marty/&text="+shareText+"&via=DWTSIRL&hashtags=DWTSIrl";
            window.open(url, "_blank")
        }, this);

        link.onInputUp.add(function(){
            shareText = "I just scored " + score + " points dancing with Marty Morrissey!. Have a go yourself here: https://www.rte.ie/dancing-with-marty/";

            //If mobile open in whatsapp
            if(settings.isMobile){
                url = "whatsapp://send?text=" + shareText;
                window.open(url, "_blank")
            }
            else{
                //If desktop, copy link to clipboard
                var $temp = document.createElement("input");
                document.body.appendChild($temp);
                $temp.value = shareText;
                $temp.focus();
                $temp.select();
                document.execCommand("copy");
                document.body.removeChild($temp);
                alert("Game link copied to clipboard. Thanks for sharing!");
            }

        }, this);

        shareIcons.add(facebook);
        shareIcons.add(twitter);
        shareIcons.add(facebook);
        //make sure logo is above


        game.world.bringToTop(shareIcons);


    }
};