import MainScene from "./MainScreen.js";
// create gamespace
const config = {
  width: 240,
  height: 240,
  type: Phaser.AUTO,
  parent: "snake",
  scene: [MainScene]
};


new Phaser.Game(config);
