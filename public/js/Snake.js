export default class Snake {
  constructor(screen) {
    this.screen = screen;
    this.lastMoveTime = 0;
    this.moveInterval = 500;
    this.tileSize = 16;
    this.direction = Phaser.Math.Vector2.RIGHT;
    this.body = [];

    this.body.push(
      this.screen.add
        .rectangle(
          this.screen.game.config.width / 2, this.screen.game.config.height / 2,
          this.tileSize,
          this.tileSize,
          0x66ff00
        )
        .setOrigin(0)
    );

    this.apple = this.screen.add.rectangle(
      0,
      0,
      this.tileSize,
      this.tileSize,
      0xff0800
    ).setOrigin(0);

    this.pickApples();

    screen.input.keyboard.on('keydown', e => {
      this.keydown(e);
    });
  }

  pickApples() {
    this.apple.x = Math.floor((Math.random() * this.screen.game.config.width) / this.tileSize) * this.tileSize;
    this.apple.y = Math.floor((Math.random() * this.screen.game.config.height) / this.tileSize) * this.tileSize;
  }

  keydown(event) {
    console.log(event);
    switch(event.keyCode) {
      case 37:
        this.direction = Phaser.Math.Vector2.LEFT;
        break;
      case 38:
        this.direction = Phaser.Math.Vector2.UP;
        break;
      case 39:
        this.direction = Phaser.Math.Vector2.RIGHT;
        break;
      case 40:
        this.direction = Phaser.Math.Vector2.DOWN;
        break;
    }
  }

  update(time) {
    if (time >= this.lastMoveTime + this.moveInterval) {
      this.lastMoveTime = time;
      this.move();
    }
  }

  move() {
    for (let index = this.body.length - 1; index > 0; index--) {
      this.body[index].x = this.body[index - 1].x;
      this.body[index].y = this.body[index - 1].y;
    }
    this.body[0].x += this.direction.x * this.tileSize;
    this.body[0].y += this.direction.y * this.tileSize;
  }
}
