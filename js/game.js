/**
 * Created by sidarcy on 31/10/2017.
 */


var houseGap = 250;
var giftSpeed = 200;
var score = 0;
var percent;
var myHealthBar;
var currentDance;
var music;

var fps = 9;

dances = {
    "idle":{sprite:"dance-idle", frames: [0,1,2,1],speed:fps+1},
    "down":{sprite:"dance-down", frames: [0,1,2,3,2,1],speed:fps},
    "up":{sprite:"dance-up", frames: [0,1,2,3,4,5],speed:fps},
    "left":{sprite:"dance-left", frames: [0,1,2,3,4,5,2,1],speed:fps},
    "right":{sprite:"dance-right", frames: [0,1,2,3,4,5,4,3],speed:fps}
};



//Create Houses
House = function (game) {

    frameNo = game.rnd.between(0, 3);

    ref = ["upBtnPos", "downBtnPos", "leftBtnPos", "rightBtnPos"];
    xVal = (frameNo>1)?game.width-settings[ref[frameNo]].x:settings[ref[frameNo]].x;

    Phaser.Sprite.call(this, game, xVal, (game.height+100), "arrows");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(0.5);
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

        if(score>0) {
            score--;
            scoreText.setText(score);
        }

        this.destroy();
    }
};

var Game = {

    preload: function() {

    },
    create : function() {






        giftSpeed = 250;
        score = 0;
        percent = 0;


        bgr = game.add.sprite(0, 0, "bgr");
        bgr.width = game.width;
        bgr.height = game.height;

        cursors = game.input.keyboard.createCursorKeys();


        this.swipe = new Swipe(game);


        //marty
        marty = game.add.sprite((game.width/2), game.height/2, "dance1");
        game.physics.enable(marty, Phaser.Physics.ARCADE);
        marty.scale.setTo(settings.marty.scale);
        marty.anchor.setTo(0.5);
        this.doDance("idle");

        music = game.add.audio('music');
        music.loop = true;
        music.play();

        textStyle = {
            font: '60px Baloo Paaji',
            fill: '#52108c',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        scoreText = game.add.text(game.width/2, 60, score, textStyle);
        scoreText.anchor.setTo(0.5);
        scoreText.alpha = 0;


        this.arrowGroup = game.add.group();

        upArrow = game.add.sprite(settings.upBtnPos.x, settings.upBtnPos.y, "arrows");
        upArrow.anchor.setTo(0.5);
        game.physics.enable(upArrow, Phaser.Physics.ARCADE);
        upArrow.scale.setTo(settings.btnScale);

        this.arrowGroup.add(upArrow);

        downArrow = game.add.sprite(settings.downBtnPos.x, settings.downBtnPos.y, "arrows", 1);
        downArrow.anchor.setTo(0.5);
        game.physics.enable(downArrow, Phaser.Physics.ARCADE);
        downArrow.scale.setTo(settings.btnScale);

        this.arrowGroup.add(downArrow);

        leftArrow = game.add.sprite(game.width-settings.leftBtnPos.x, settings.leftBtnPos.y, "arrows", 2);
        leftArrow.anchor.setTo(0.5);
        game.physics.enable(leftArrow, Phaser.Physics.ARCADE);
        leftArrow.scale.setTo(settings.btnScale);

        this.arrowGroup.add(leftArrow);

        rightArrow = game.add.sprite(game.width-settings.rightBtnPos.x, settings.rightBtnPos.y, "arrows", 3);
        rightArrow.anchor.setTo(0.5);
        game.physics.enable(rightArrow, Phaser.Physics.ARCADE);
        rightArrow.scale.setTo(settings.btnScale);

        this.arrowGroup.add(rightArrow);

        this.houseGroup = game.add.group();
        this.addHouse(this.houseGroup);



        var barConfig = {x: game.width/2,
            y: game.height-50,
            width:game.width-((game.width / 100) * 10),
            bg: {
                color: '#52108c'
            },
            bar: {
                color: '#FEFF03'
            }};
        myHealthBar = new HealthBar(this.game, barConfig);
        // the width will be set to 50% of the actual size so the new value will be 60
        myHealthBar.setPercent(percent);

        setInterval(function(){
            percent=percent+1.5;
            myHealthBar.setPercent(percent);
        }, 1000);


    },
    doDance:function(dance){


        if (dance == currentDance){
            return;
        }
        currentDance = dance;

        move = dances[dance];
        //load new spritesheet
        marty.loadTexture(move.sprite, 0, false);
        //Add new dance move
        var anim = marty.animations.add("dance", move.frames);
        //Play the dance
        marty.animations.play('dance', move.speed, dance=="idle");
        //When finished, pick a new dance
        anim.onComplete.addOnce(function(){
            //do another dance
            this.doDance("idle");
        }, this);
    },
    addHouse: function(group){
        var house = new House(game);
        game.add.existing(house);
        group.add(house);
    },
    update : function() {

        if (percent>=100) {
            game.state.start('GameOver');
        }

        game.physics.arcade.overlap(this.arrowGroup, this.houseGroup, function(s, h){


            h.alpha = 1;

            offset = Math.abs( Math.round(s.y - h.y) );

            offset = Math.ceil(offset / 10);

            var direction = Game.swipe.check();


            if (direction!==null) {

                // direction= { x: x, y: y, direction: direction }
                switch(direction.direction) {
                    case Game.swipe.DIRECTION_LEFT:
                        if(s.frame==2){
                            Game.tweenTint(h, 0xea6045, 0x02fc2c, 500);
                            Game.updateScore(offset);
                            Game.doDance("left");
                        }
                        break;
                    case Game.swipe.DIRECTION_RIGHT:
                        if(s.frame==3){
                            Game.tweenTint(h, 0xea6045, 0x02fc2c, 500);
                            Game.updateScore(offset);
                            Game.doDance("right");
                        }
                        break;
                    case Game.swipe.DIRECTION_UP:
                        if(s.frame==0){
                            Game.tweenTint(h, 0xea6045, 0x02fc2c, 500);
                            Game.updateScore(offset);
                            Game.doDance("up");
                        }
                        break;
                    case Game.swipe.DIRECTION_DOWN:
                        if(s.frame==1){
                            Game.tweenTint(h, 0xea6045, 0x02fc2c, 500);
                            Game.updateScore(offset);
                            Game.doDance("down");
                        }
                        break;
                    case Game.swipe.DIRECTION_UP_LEFT:
                    case Game.swipe.DIRECTION_UP_RIGHT:
                    case Game.swipe.DIRECTION_DOWN_LEFT:
                    case Game.swipe.DIRECTION_DOWN_RIGHT:
                }
            }

            if(cursors.up.isDown && s.frame == 0 && !h.hit) {
                h.hit = true;
                Game.tweenTint(h, 0xea6045, 0x02fc2c, 500);
                Game.updateScore(offset);
                Game.doDance("up");

            }
            if(cursors.down.isDown && s.frame == 1&& !h.hit) {
                h.hit = true;
                Game.tweenTint(h, 0xea6045, 0x02fc2c, 500);
                Game.updateScore(offset);
                Game.doDance("down");
            }
            if(cursors.left.isDown && s.frame == 2&& !h.hit) {
                h.hit = true;
                Game.tweenTint(h, 0xea6045, 0x02fc2c, 500);
                Game.updateScore(offset);
                Game.doDance("left");
            }
            if(cursors.right.isDown && s.frame == 3&& !h.hit) {
                h.hit = true;
                Game.tweenTint(h, 0xea6045, 0x02fc2c, 500);
                Game.updateScore(offset);
                Game.doDance("right");
            }


        });


    },
    updateScore : function() {
        giftSpeed = giftSpeed+3;
        bonus=0;
        if(offset<=1) {
            bonus=1;
            console.log("bonus of " + bonus);
        }



        score=score+(10-offset)+bonus;
        scoreText.setText(score);
        scoreText.alpha = 1;
        scoreTween = game.add.tween(scoreText).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
    },
    render: function(){

    },

    tweenTint:function(obj, startColor, endColor, time) {


        var colorTween = game.add.tween(obj.scale);
        colorTween.to({x:2.5,y:2.5}, 300, Phaser.Easing.Linear.None);

      colorTween.start();
        colorTween.onComplete.addOnce(function () {
            obj.destroy();
        })
    }



};
