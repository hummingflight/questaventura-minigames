import { GameConfiguration } from "../configurations/gameConfiguration";
import { GameLoader } from "../loader/gameLoader";

export class LoaderScene extends Phaser.Scene
{
  private loadingText: Phaser.GameObjects.Image;
  private loadbarBg: Phaser.GameObjects.Image;
  private loadbar: Phaser.GameObjects.Image;
  private loadbarHeight: number = 0;
  private loadbarWidth: number = 0;

  constructor() {
    super({ key: 'LoaderScene' });
  }

  preload(): void {
    this.cameras.main.setBackgroundColor(0x009422);

    // Prepare the loading graphics
    this.prepareLoadingGraphics();
    this.load.on('progress', this.onProgress, this);
    this.load.on('complete', this.onProgressComplete, this);

    // Load the assets of the game
    let gameConfiguration: GameConfiguration = JSON.parse(
      this.game.cache.text.get('game-config')
    );

    let gameLoader: GameLoader = new GameLoader();
    gameLoader.load(gameConfiguration.loader, this.load);
  }

  create(): void {
    this.scene.start('MainScene');
  }

  private prepareLoadingGraphics(): void 
  {
    this.loadingText = this.add.image(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 - 80,
      'loading-text'
    );
    this.loadingText.setOrigin(0.5, 0.5);

    this.loadbarBg = this.add.image(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      'loadbar_bg'
    );
    this.loadbarBg.setOrigin(0.5, 0.5);

    this.loadbar = this.add.image(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      'loadbar_1'
    );
    this.loadbar.setOrigin(0.5, 0.5);

    this.loadbarHeight = this.loadbar.height;
    this.loadbarWidth = this.loadbar.width;
  }

  private onProgress(value: number): void
  {
    if (value < 0.33)
      this.loadbar.setTexture('loadbar_1');
    else if (value < 0.66)
      this.loadbar.setTexture('loadbar_2');
    else
      this.loadbar.setTexture('loadbar_3');

    this.loadbar.setCrop(0, 0, this.loadbarWidth * value, this.loadbarHeight);
    console.log(value);
  }

  private onProgressComplete(): void
  {
    this.loadbar.destroy();
    this.loadbarBg.destroy();
    this.loadingText.destroy();
  }
}