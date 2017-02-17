import { Component, OnInit } from '@angular/core';

declare var Phaser: any;
var game: any;
var ball: any;
var paddle: any;
var bricks: any;
var newBrick: any;
var brickInfo: any;

//score
var scoreText: any;
var score: number;

//lives
var lives: number;
var livesText: any;
var lifeLostText: any;

//game states
var gameOverText: any;
var winnerText: any;

//text
var textStyle: any;

//controls
var playing: boolean;
var startButton: any;
@Component({
  selector: 'wall-breaker',
  templateUrl: './wall-breaker.component.html',
  styleUrls: ['./wall-breaker.component.css']
})
export class WallBreakerComponent implements OnInit {


  constructor() {
    game = new Phaser.Game(480, 320, Phaser.AUTO, null, {
      preload: this.preload, create: this.create, update: this.update
    });
  }

  ngOnInit() {

  }

  preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#eee';
    game.load.image('paddle', 'img/paddle.png');
    game.load.image('brick', 'img/brick.png');
    game.load.spritesheet('ball', 'img/head_sprites.png', 104, 104);
    game.load.spritesheet('button', 'img/button.png', 120, 40);
    lives = 3;
    score = 0;
    playing = false;
  }

  create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //ball stuff
    ball = game.add.sprite(game.world.width * 0.5, game.world.height - 25, 'ball');
    ball.animations.add('wobble', [0, 1, 0, 2, 0, 1, 0, 2, 0], 24);
    ball.anchor.set(0.5);
    ball.scale.setTo(0.15, 0.15);
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
    game.physics.arcade.checkCollision.down = false;
    ball.checkWorldBounds = true;
    ball.events.onOutOfBounds.add(function () {
      lives--;
      if (lives) {
        livesText.setText('Egos: ' + lives);
        lifeLostText.visible = true;
        ball.reset(game.world.width * 0.5, game.world.height - 25);
        paddle.reset(game.world.width * 0.5, game.world.height - 5);
        game.input.onDown.addOnce(function () {
          lifeLostText.visible = false;
          ball.body.velocity.set(150, -150);
        }, this);
      }
      else {
        gameOverText.visible = true;
        game.input.onDown.addOnce(function () {
          location.reload();
        });
      }
    }, this);

    //paddle stuff
    paddle = game.add.sprite(game.world.width * 0.5, game.world.height - 5, 'paddle');
    paddle.anchor.set(0.5, 1);
    game.physics.enable(paddle, Phaser.Physics.ARCADE);
    paddle.body.immovable = true;

    //brick stuff
    brickInfo = {
      width: 44,
      height: 22,
      count: {
        row: 8,
        col: 3
      },
      offset: {
        top: 50,
        left: 50
      },
      padding: 10
    }

    bricks = game.add.group();
    for (var c = 0; c < brickInfo.count.col; c++) {
      for (var r = 0; r < brickInfo.count.row; r++) {
        var brickX = (r * (brickInfo.width + brickInfo.padding)) + brickInfo.offset.left;
        var brickY = (c * (brickInfo.height + brickInfo.padding)) + brickInfo.offset.top;
        newBrick = game.add.sprite(brickX, brickY, 'brick');
        game.physics.enable(newBrick, Phaser.Physics.ARCADE);
        newBrick.body.immovable = true;
        newBrick.anchor.set(0.5);
        bricks.add(newBrick);
      }
    }
    textStyle = { font: '18px Arial', fill: '#0095DD' };
    scoreText = game.add.text(5, 5, 'Monies: 0', textStyle);
    livesText = game.add.text(game.world.width - 5, 5, 'Egos: ' + lives, textStyle);
    livesText.anchor.set(1, 0);
    lifeLostText = game.add.text(game.world.width * 0.5, game.world.height * 0.5, 'Ego injured! Click to make America Great Again.', textStyle);
    lifeLostText.anchor.set(0.5);
    lifeLostText.visible = false;

    gameOverText = game.add.text(game.world.width * 0.5, game.world.height * 0.5, 'YUGE Loss! Click to Replay.', textStyle);
    gameOverText.anchor.set(0.5);
    gameOverText.visible = false;

    winnerText = game.add.text(game.world.width * 0.5, game.world.height * 0.5, 'BIGLY Win! Click to Replay', textStyle);
    winnerText.anchor.set(0.5);
    winnerText.visible = false;

    startButton = game.add.button(game.world.width * 0.5,
      game.world.height * 0.5,
      'button', function () {
        startButton.destroy();
        ball.body.velocity.set(150, -150);
        playing = true;
      }, this, 1, 0, 2);
    startButton.anchor.set(0.5);
  }

  update() {
    game.physics.arcade.collide(ball, paddle, function () {
      ball.animations.play('wobble');
      ball.body.velocity.y *= 1.08;
    });
    game.physics.arcade.collide(ball, bricks, function (ball, brick) {
      ball.animations.play('wobble');
      var killTween = game.add.tween(brick.scale);
      killTween.to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None);
      killTween.onComplete.addOnce(function () {
        brick.kill();
      }, this);
      killTween.start();
      score += 10;
      scoreText.setText('Monies: ' + score);
      var count_alive = 0;
      for (var i = 0; i < bricks.children.length; i++) {
        if (bricks.children[i].alive == true) {
          count_alive++;
        }
      }
      if (count_alive == 1) {
        winnerText.visible = true;
        playing = false;
        ball.body.velocity.set(0, 0);
         game.input.onDown.addOnce(function () {
          location.reload();
        });
      }
    });
    if (playing) {
      paddle.x = game.input.x || game.world.width * 0.5;
    }

  }
   ngOnDestroy() {
    game.destroy();
  }
}
