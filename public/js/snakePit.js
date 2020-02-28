import MainScene from "./MainScreen.js";
// create gamespace
const config = {
  width: 480,
  height: 480,
  type: Phaser.AUTO,
  parent: "snake",
  scene: [MainScene]
};


new Phaser.Game(config);
