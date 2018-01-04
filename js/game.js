/**
 * Main Game stage for Dancing with Marty
 */
var houseGap = 250;
var giftSpeed;
var score = 0;
var percent;
var myHealthBar;
var currentDance;
var music;
var talking=false;
var fps = 9;

dances = {
    "idle":{sprite:"dance-idle", frames: [0,1,2,1],speed:fps+1},
    "down":{sprite:"dance-down", frames: [0,1,2,3,2,1],speed:fps},
    "up":{sprite:"dance-up", frames: [0,1,2,3,4,5],speed:fps},
    "left":{sprite:"dance-left", frames: [0,1,2,3,4,5,2,1],speed:fps},
    "right":{sprite:"dance-right", frames: [0,1,2,3,4,5,4,3],speed:fps}
};


//random sounds when you get a marty bonus
soundBites = ['final', 'is-this-thing-on', 'exciting', 'all-aboard'];

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
            score=score-5;
        }
        this.destroy();
    }
};

var Game = {

    preload: function () {

    },
    create: function () {

        giftSpeed = 200;
        score = 0;
        percent = 0;

        bgr = game.add.sprite(0, 0, "bgr");
        bgr.width = game.width;
        bgr.height = game.height;

        cursors = game.input.keyboard.createCursorKeys();

        this.swipe = new Swipe(game);

        //marty
        marty = game.add.sprite((game.width / 2), game.height / 2, "dance-idle");
        game.physics.enable(marty, Phaser.Physics.ARCADE);
        marty.scale.setTo(settings.marty.scale);
        marty.anchor.setTo(0.5);
        this.doDance("idle");

        music = game.add.audio('music');
        music.loop = true;
        music.play();

        textStyle = {
            font: settings.score.font,
            fill: '#52108c',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        scoreText = game.add.text(game.width / 2, settings.score.y, "0", textStyle);
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

        leftArrow = game.add.sprite(game.width - settings.leftBtnPos.x, settings.leftBtnPos.y, "arrows", 2);
        leftArrow.anchor.setTo(0.5);
        game.physics.enable(leftArrow, Phaser.Physics.ARCADE);
        leftArrow.scale.setTo(settings.btnScale);

        this.arrowGroup.add(leftArrow);

        rightArrow = game.add.sprite(game.width - settings.rightBtnPos.x, settings.rightBtnPos.y, "arrows", 3);
        rightArrow.anchor.setTo(0.5);
        game.physics.enable(rightArrow, Phaser.Physics.ARCADE);
        rightArrow.scale.setTo(settings.btnScale);

        this.arrowGroup.add(rightArrow);

        this.houseGroup = game.add.group();
        this.addHouse(this.houseGroup);


        textStyle = {
            font: settings.bonus.font,
            fill: '#00FF00',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        bonusText = game.add.text(game.width / 2, game.height/2, "Marty Bonus!", textStyle);
        bonusText.anchor.setTo(0.5);
        bonusText.alpha = 0;

        var barConfig = {
            x: game.width / 2,
            y: game.height - 50,
            width: game.width - ((game.width / 100) * 10),
            bg: {
                color: '#52108c'
            },
            bar: {
                color: '#FEFF03'
            }
        };
        myHealthBar = new HealthBar(this.game, barConfig);
        // the width will be set to 50% of the actual size so the new value will be 60
        myHealthBar.setPercent(percent);

        setInterval(function () {
            percent = percent + 3;
            myHealthBar.setPercent(percent);
        }, 1000);


    },
    doDance: function (dance) {

        if (dance == currentDance) {
            return;
        }
        currentDance = dance;

        move = dances[dance];
        //load new spritesheet
        marty.loadTexture(move.sprite, 0, false);
        //Add new dance move
        var anim = marty.animations.add("dance", move.frames);
        //Play the dance
        marty.animations.play('dance', move.speed, dance == "idle");
        //When finished, pick a new dance
        anim.onComplete.addOnce(function () {
            //do another dance
            this.doDance("idle");
        }, this);
    },
    addHouse: function (group) {
        var house = new House(game);
        game.add.existing(house);
        group.add(house);
    },
    update: function () {

        if (percent >= 100) {
            game.state.start('GameOver');
        }

        var direction = Game.swipe.check();

        game.physics.arcade.overlap(this.arrowGroup, this.houseGroup, function (s, h) {

            h.alpha = 1;
            offset = Math.abs(Math.round(s.y - h.y));
            offset = Math.ceil(offset / 10);

            //check for swipe event
            if (direction !== null) {

                direction = direction.direction;

                if (direction == 4 && s.frame == 2) {
                    Game.tweenTint(h);
                    Game.updateScore(offset);
                    Game.doDance("left");
                }
                else if (direction == 8 && s.frame == 3) {
                    Game.tweenTint(h);
                    Game.updateScore(offset);
                    Game.doDance("right");
                }
                else if (direction == 1 && s.frame == 0) {
                    Game.tweenTint(h);
                    Game.updateScore(offset);
                    Game.doDance("up");
                }
                else if (direction == 2 && s.frame == 1) {
                    Game.tweenTint(h);
                    Game.updateScore(offset);
                    Game.doDance("down");
                }
                else if (direction == 32 && (s.frame == 0 || s.frame == 2)) {
                    Game.tweenTint(h);
                    Game.updateScore(offset);
                    Game.doDance("left");
                }
                else if (direction == 16 && (s.frame == 0 || s.frame == 3)) {
                    Game.tweenTint(h);
                    Game.updateScore(offset);
                    Game.doDance("right");
                }
                else if (direction == 128 && (s.frame == 1 || s.frame == 2)) {
                    Game.tweenTint(h);
                    Game.updateScore(offset);
                    Game.doDance("left");
                }
                else if (direction == 64 && (s.frame == 1 || s.frame == 3)) {
                    Game.tweenTint(h);
                    Game.updateScore(offset);
                    Game.doDance("right");
                }

            }


            if (cursors.up.isDown && s.frame == 0 && !h.hit) {
                h.hit = true;
                Game.tweenTint(h);
                Game.updateScore(offset);
                Game.doDance("up");

            }
            if (cursors.down.isDown && s.frame == 1 && !h.hit) {
                h.hit = true;
                Game.tweenTint(h);
                Game.updateScore(offset);
                Game.doDance("down");
            }
            if (cursors.left.isDown && s.frame == 2 && !h.hit) {
                h.hit = true;
                Game.tweenTint(h);
                Game.updateScore(offset);
                Game.doDance("left");
            }
            if (cursors.right.isDown && s.frame == 3 && !h.hit) {
                h.hit = true;
                Game.tweenTint(h);
                Game.updateScore(offset);
                Game.doDance("right");
            }


        });

    },
    updateScore: function () {
        giftSpeed = giftSpeed + 3;
        bonus = 0;
        if (offset == 1) {
            bonus = 1;
            console.log("bonus of " + bonus);
        }

        points = (10 - offset) + bonus;

        if (points < 0) {
            points = 0;
        }
        score = score + points;
        scoreText.setText(points);
        /* Only show what you just got */
        scoreText.alpha = 1;
        scoreTween = game.add.tween(scoreText).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);


        if(points>=10){
            bonusText.alpha = 1;
            bonusText.scale.setTo(1);
            bonusTween = game.add.tween(bonusText).to({alpha: 0}, settings.bonus.speed, Phaser.Easing.Linear.None, true);
            bonusTween2 = game.add.tween(bonusText.scale).to({x: 3, y:3}, settings.bonus.speed, Phaser.Easing.Linear.None, true);

            if(!talking.isPlaying) talking =game.sound.play(soundBites[game.rnd.between(0, soundBites.length)])

        }


    },
    render: function () {
    },
    tweenTint: function (obj) {
        var colorTween = game.add.tween(obj.scale);
        colorTween.to({x: 2.5, y: 2.5}, 300, Phaser.Easing.Linear.None);
        colorTween.start();
        colorTween.onComplete.addOnce(function () {
            obj.destroy();
        })
    }
};
