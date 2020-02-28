// Main Screen will house all game components
import Snake from "./Snake.js";

export default class MainScreen extends Phaser.Scene {
  constructor() {
    super('MainScreen')
  }

  create() {
    this.snake = new Snake(this);
  }

  update(time) {
    this.snake.update(time);
  }


}
