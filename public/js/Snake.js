export default class Snake {
  constructor(screen) {
    this.screen = screen;
    this.lastMoveTime = 0;
    this.moveInterval = 400;
    this.tileSize = 8;
    this.direction = Phaser.Math.Vector2.RIGHT;
    this.body = [];

    // create initial `head` in middle of screen
    this.body.push(
      this.screen.add
        .rectangle(
          this.screen.game.config.width / 2, this.screen.game.config.height / 2,
          this.tileSize,
          this.tileSize,
          0xff5349
        )
        .setOrigin(0)
    );
    // added second square in green for VHC cosmetics
    this.body.push(
      this.screen.add
        .rectangle(
          (this.screen.game.config.width / 2), (this.screen.game.config.height / 2),
          this.tileSize,
          this.tileSize,
          0x66ff00
        )
        .setOrigin(0)
    );

    this.fruit = this.screen.add
      .rectangle(0,0,this.tileSize,this.tileSize,0x6a0dad)
      .setOrigin(0);

    this.pickFruits();

    screen.input.keyboard.on('keydown', e => {
      this.keydown(e);
    });
  }

  pickFruits() {
    this.fruit.x = Math.floor((Math.random() * this.screen.game.config.width) / this.tileSize) * this.tileSize;
    this.fruit.y = Math.floor((Math.random() * this.screen.game.config.height) / this.tileSize) * this.tileSize;
  }

  // movement controls; `if` statement prevents going opposite direction/Game Over
  keydown(event) {
    console.log(event);
    switch(event.keyCode) {
      case 37:
        if(this.direction != Phaser.Math.Vector2.RIGHT) {
          this.direction = Phaser.Math.Vector2.LEFT;
        }
        break;
      case 38:
        if (this.direction != Phaser.Math.Vector2.DOWN) {
          this.direction = Phaser.Math.Vector2.UP;
        }
        break;
      case 39:
        if (this.direction != Phaser.Math.Vector2.LEFT) {
          this.direction = Phaser.Math.Vector2.RIGHT;
        }
        break;
      case 40:
        if (this.direction != Phaser.Math.Vector2.UP) {
          this.direction = Phaser.Math.Vector2.DOWN;
        }
        break;
    }
  }

  update(time) {
    if (time >= this.lastMoveTime + this.moveInterval) {
      this.lastMoveTime = time;
      this.move();
    }
  }

  // let startBtn = document.getElementById('startBtn');

  move() {
    // where head (`body[0]`) is moving to, saved as variables `x` and `y`
    let x = this.body[0].x + this.direction.x * this.tileSize;
    let y = this.body[0].y + this.direction.y * this.tileSize;

    // if fruit and head are in same tile, eat fruit
    if (this.fruit.x === x && this.fruit.y === y) {
      // push new rectangle to body array
      this.body.push(
        this.screen.add
        .rectangle(0,0,this.tileSize,this.tileSize,0x66ff00)
        .setOrigin(0)
      );
      // remove eaten fruit
      this.pickFruits();
      // for every 3 eaten, decrease moveInterval
      if (this.body.length % 3 === 0) {
        this.moveInterval -= 50;
      }
    }

    // render `body.length`
    for (let index = this.body.length - 1; index > 0; index--) {
      this.body[index].x = this.body[index - 1].x;
      this.body[index].y = this.body[index - 1].y;
    }

    // direction `head` is going
    this.body[0].x = x;
    this.body[0].y = y;


    // snake dies
    // if snake goes off board...
    if (this.body[0].x  < 0 || this.body[0].x >= this.screen.game.config.width || this.body[0].y < 0 || this.body[0].y >= this.screen.game.config.height) {
      // snake dies, game restarts
      this.screen.scene.restart();
    }

    // dies running over tail
    let tail = this.body.slice(1);
    // if `head` goes over any `tailSquare`...
    if (tail.filter(tailSquare => tailSquare.x === this.body[0].x && tailSquare.y === this.body[0].y).length > 0) {
      // snake dies, game restarts
      this.screen.scene.restart();
    }
  }
}
