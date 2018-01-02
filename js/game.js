/**
 * Created by sidarcy on 31/10/2017.
 */


var houseGap = 250;
var giftSpeed = 250;
var score = 0;
var percent=50;
var myHealthBar;



//Create Houses
House = function (game) {

    frameNo = game.rnd.between(0, 3);

    ref = ["upBtnPos", "downBtnPos", "leftBtnPos", "rightBtnPos"];
    xVal = (frameNo>1)?game.width-settings[ref[frameNo]].x:settings[ref[frameNo]].x;

    Phaser.Sprite.call(this, game, xVal, (game.height+100), "arrows");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(0, 0.5);
    this.alpha = 0.7;
    this.scale.setTo(settings.btnScale);
    this.body.velocity.y = -giftSpeed;
    this.body.immovable = true;
    this.placeHouse = true;
    var anim = this.animations.add('anim');
    this.frame = frameNo;
    this.gap =  game.rnd.between(100, 400)

};
House.prototype = Object.create(Phaser.Sprite.prototype);
House.prototype.constructor = House;

House.prototype.update = function(){

    if(this.placeHouse && this.y < game.height - this.gap){
        this.placeHouse = false;
        Game.addHouse(this.parent);
    }
    //detroy once left screen
    if(this.y <= -100){

        Game.tweenTint(this, 0xea6045, 0xFF0000, 100);
        if(score>0) {
            score--;
            scoreText.setText(score);
        }

        percent = percent - 0.5;
        myHealthBar.setPercent(percent);
        this.destroy();
    }
};

var Game = {

    preload: function() {

    },
    create : function() {

        score = 0;

        bgr = game.add.sprite(0, 0, "bgr");
        bgr.width = game.width;
        bgr.height = game.height;

        cursors = game.input.keyboard.createCursorKeys();


        this.swipe = new Swipe(game);


        //marty
        marty = game.add.sprite((game.width/2), game.height, "marty1");
        game.physics.enable(marty, Phaser.Physics.ARCADE);
        marty.scale.setTo(0.5);
        marty.anchor.setTo(0.5, 1);
        //var dance = marty.animations.add('dance');
        //marty.animations.play('dance', 2, true);

        music = game.add.audio('music');

        music.play();

        textStyle = {
            font: '60px Arial',
            fill: '#FF0000',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        scoreText = game.add.text(game.width/2, game.height/4, score, textStyle);
        scoreText.anchor.setTo(0.5);
        scoreText.alpha = 0;


        this.arrowGroup = game.add.group();

        upArrow = game.add.sprite(settings.upBtnPos.x, settings.upBtnPos.y, "arrows");
        upArrow.anchor.setTo(0, 0.5);
        game.physics.enable(upArrow, Phaser.Physics.ARCADE);
        upArrow.scale.setTo(settings.btnScale);

        this.arrowGroup.add(upArrow);

        downArrow = game.add.sprite(settings.downBtnPos.x, settings.downBtnPos.y, "arrows", 1);
        downArrow.anchor.setTo(0, 0.5);
        game.physics.enable(downArrow, Phaser.Physics.ARCADE);
        downArrow.scale.setTo(settings.btnScale);

        this.arrowGroup.add(downArrow);

        leftArrow = game.add.sprite(game.width-settings.leftBtnPos.x, settings.leftBtnPos.y, "arrows", 2);
        leftArrow.anchor.setTo(0, 0.5);
        game.physics.enable(leftArrow, Phaser.Physics.ARCADE);
        leftArrow.scale.setTo(settings.btnScale);

        this.arrowGroup.add(leftArrow);

        rightArrow = game.add.sprite(game.width-settings.rightBtnPos.x, settings.rightBtnPos.y, "arrows", 3);
        rightArrow.anchor.setTo(0, 0.5);
        game.physics.enable(rightArrow, Phaser.Physics.ARCADE);
        rightArrow.scale.setTo(settings.btnScale);

        this.arrowGroup.add(rightArrow);

        this.houseGroup = game.add.group();
        this.addHouse(this.houseGroup);



        var barConfig = {x: game.width/2, y: game.height-50};
        myHealthBar = new HealthBar(this.game, barConfig);
        // the width will be set to 50% of the actual size so the new value will be 60
        myHealthBar.setPercent(percent);

    },
    addHouse: function(group){
        var house = new House(game);
        game.add.existing(house);
        group.add(house);
    },
    update : function() {

        if (percent >= 100 || percent<=0) {
            game.state.start('GameOver');
        }

        game.physics.arcade.overlap(this.arrowGroup, this.houseGroup, function(s, h){


            h.alpha = 1;


            var direction = Game.swipe.check();


            if (direction!==null) {
                console.log("Swipe");
                // direction= { x: x, y: y, direction: direction }
                switch(direction.direction) {
                    case Game.swipe.DIRECTION_LEFT:
                        if(s.frame==2){
                            Game.tweenTint(h, 0xea6045, 0x00e226, 500);
                            Game.updateScore();
                        }
                        break;
                    case Game.swipe.DIRECTION_RIGHT:
                        if(s.frame==3){
                            Game.tweenTint(h, 0xea6045, 0x00e226, 500);
                            Game.updateScore();
                        }
                        break;
                    case Game.swipe.DIRECTION_UP:
                        if(s.frame==0){
                            Game.tweenTint(h, 0xea6045, 0x00e226, 500);
                            Game.updateScore();
                        }
                        break;
                    case Game.swipe.DIRECTION_DOWN:
                        if(s.frame==1){
                            Game.tweenTint(h, 0xea6045, 0x00e226, 500);
                            Game.updateScore();
                        }
                        break;
                    case Game.swipe.DIRECTION_UP_LEFT:
                    case Game.swipe.DIRECTION_UP_RIGHT:
                    case Game.swipe.DIRECTION_DOWN_LEFT:
                    case Game.swipe.DIRECTION_DOWN_RIGHT:
                }
            }




            if(cursors.up.isDown && s.frame == 0) {
                Game.tweenTint(h, 0xea6045, 0x00e226, 500);
                Game.updateScore();
            }
            if(cursors.down.isDown && s.frame == 1) {
                Game.tweenTint(h, 0xea6045, 0x00e226, 500);
                Game.updateScore();
            }
            if(cursors.left.isDown && s.frame == 2) {
                Game.tweenTint(h, 0xea6045, 0x00e226, 500);
                Game.updateScore();
            }
            if(cursors.right.isDown && s.frame == 3) {
                Game.tweenTint(h, 0xea6045, 0x00e226, 500);
                Game.updateScore();
            }

        });


    },
    updateScore : function() {
        giftSpeed++;
        score++;
        scoreText.setText(score);
        scoreText.alpha = 1;
        scoreTween = game.add.tween(scoreText).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
        percent = percent + 1;
        myHealthBar.setPercent(percent);

    },
    render: function(){

    },

    tweenTint:function(obj, startColor, endColor, time) {
    // create an object to tween with our step value at 0
    var colorBlend = {step: 0};
    // create the tween on this object and tween its step property to 100
    var colorTween = game.add.tween(colorBlend).to({step: 100}, time);
     // run the interpolateColor function every time the tween updates, feeding it the
     // updated value of our tween each time, and set the result as our tint
     colorTween.onUpdateCallback(function() {
         obj.tint = Phaser.Color.interpolateColor(endColor, endColor, 100, colorBlend.step);
     });

     // set the object to the start color straight away
     //
     obj.tint = startColor;
      // start the tween
      //
      colorTween.start();
        colorTween.onComplete.addOnce(function () {
            console.log("dsfd");
            obj.destroy();
        })
    }



};
