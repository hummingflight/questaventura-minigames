import { GameConfiguration } from "../configurations/gameConfiguration";
import { GameLoader } from "../loader/gameLoader";

export class LoaderScene extends Phaser.Scene
{
  constructor() {
    super({ key: 'LoaderScene' });
  }

  preload(): void {
    let gameConfiguration: GameConfiguration = JSON.parse(
      this.game.cache.text.get('game-config')
    );

    let gameLoader: GameLoader = new GameLoader();
    gameLoader.load(gameConfiguration.loader, this.load);
  }

  create(): void {
    this.scene.start('MainScene');
  }
}