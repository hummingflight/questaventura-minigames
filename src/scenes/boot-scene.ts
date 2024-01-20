import { init_gamebox } from "../utilities/documentUtils";

export class BootScene extends Phaser.Scene
{
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    // Load the game configuration file
    this.load.text('game-config', 'assets/configs/game_config.json');

    // Load the loading screen assets
    this.load.image('loading-text', 'assets/images/loading_text.png');
    this.load.image('loadbar_bg', 'assets/images/loadbar_bg.png');
    this.load.image('loadbar_1', 'assets/images/loadbar_1.png');
    this.load.image('loadbar_2', 'assets/images/loadbar_2.png');
    this.load.image('loadbar_3', 'assets/images/loadbar_3.png');
  }

  create(): void {
    this.prepareGameDivContainer();
    this.scene.start('LoaderScene');
  }

  private prepareGameDivContainer()
  {
    // The scale mode should fit the game's container.
    this.game.scale.scaleMode = Phaser.Scale.ScaleModes.FIT;

    // initialize the game's container.
    init_gamebox();
  }
}