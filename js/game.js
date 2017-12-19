/**
 * Created by sidarcy on 31/10/2017.
 */


var houseGap = 250;
var giftSpeed = 250;
var score = 0;





//Create Houses
House = function (game) {



    frameNo = game.rnd.between(0, 3);

    Phaser.Sprite.call(this, game, (frameNo*100)+(game.width/4), (game.height+100), "arrows");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(0, 0.5);
    this.scale.setTo(settings.houseScale);
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
    if(this.y <= 0){

        Game.tweenTint(this, 0xea6045, 0xFF0000, 100);
        if(score>0) {
            score--;
            scoreText.setText("Score: " + score);
        }

        this.destroy();
    }
};

var Game = {

    preload: function() {

    },
    create : function() {



        score = 0;


        cursors = game.input.keyboard.createCursorKeys();


        //marty
        marty = game.add.sprite((game.width-(game.cache.getImage('dance').width/4)), game.height, "dance");
        game.physics.enable(marty, Phaser.Physics.ARCADE);
        marty.scale.setTo(0.5);
        marty.anchor.setTo(0.5, 1);
        var dance = marty.animations.add('dance');
        marty.animations.play('dance', 2, true);



        textStyle = {
            font: '42px Arial',
            fill: '#ffffff',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        scoreText = game.add.text(game.width/4, game.height/2, score, textStyle);


        scoreText.setText("Score: 0");


        this.arrowGroup = game.add.group();

        upArrow = game.add.sprite((game.width/4), 100, "arrows");
        upArrow.anchor.setTo(0, 0.5);
        game.physics.enable(upArrow, Phaser.Physics.ARCADE);

        this.arrowGroup.add(upArrow);

        downArrow = game.add.sprite(100+(game.width/4), 100, "arrows", 1);
        downArrow.anchor.setTo(0, 0.5);
        game.physics.enable(downArrow, Phaser.Physics.ARCADE);

        this.arrowGroup.add(downArrow);

        leftArrow = game.add.sprite(200+(game.width/4), 100, "arrows", 2);
        leftArrow.anchor.setTo(0, 0.5);
        game.physics.enable(leftArrow, Phaser.Physics.ARCADE);

        this.arrowGroup.add(leftArrow);

        rightArrow = game.add.sprite(300+(game.width/4), 100, "arrows", 3);
        rightArrow.anchor.setTo(0, 0.5);
        game.physics.enable(rightArrow, Phaser.Physics.ARCADE);

        this.arrowGroup.add(rightArrow);





        this.houseGroup = game.add.group();
        this.addHouse(this.houseGroup);

    },
    addHouse: function(group){
        var house = new House(game);
        game.add.existing(house);
        group.add(house);
    },
    update : function() {



        game.physics.arcade.overlap(this.arrowGroup, this.houseGroup, function(s, h){



            if(cursors.up.isDown && s.frame == 0) {
                score++;
                Game.tweenTint(h, 0xea6045, 0x00e226, 500);
                //h.destroy();
                console.log(score)
                giftSpeed++
                scoreText.setText("Score: "+score);
            }

            if(cursors.down.isDown && s.frame == 1) {
                score++;
                Game.tweenTint(h, 0xea6045, 0x00e226, 500);
                console.log(score)
                giftSpeed++
                scoreText.setText("Score: "+score);
            }
            if(cursors.left.isDown && s.frame == 2) {
                score++;
                Game.tweenTint(h, 0xea6045, 0x00e226, 500);
                console.log(score)
                giftSpeed++
                scoreText.setText("Score: "+score);
            }
            if(cursors.right.isDown && s.frame == 3) {
                score++;
                Game.tweenTint(h, 0xea6045, 0x00e226, 500);
                console.log(score)
                giftSpeed++
                scoreText.setText("Score: "+score);
            }

        });





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
            console.log("argh")
            obj.destroy();

        })
    }



};
