import { BootScene } from './scenes/boot-scene';
import { LoaderScene } from './scenes/loader-scene';
import { MainScene } from './scenes/main-scene';
import { MenuScene } from './scenes/menu-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'questaventura-minigame',
  url: 'https://hummingflight.com',
  version: '1.0',
  width: 1080,
  height: 1920,
  backgroundColor: 0x000000,
  type: Phaser.WEBGL,
  parent: 'phaser-game',
  autoCenter: Phaser.Scale.CENTER_BOTH,
  mode: Phaser.Scale.FIT,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: true
    }
  },
  scene: [BootScene, LoaderScene, MenuScene, MainScene]
};
