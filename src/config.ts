import { MainScene } from './scenes/main-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'questaventura-minigame',
  url: 'https://hummingflight.com',
  version: '1.0',
  width: 1080,
  height: 1920,
  backgroundColor: 0x3a404d,
  type: Phaser.WEBGL,
  parent: 'phaser-game',
  autoCenter: Phaser.Scale.CENTER_BOTH,
  mode: Phaser.Scale.FIT,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: [MainScene]
};
