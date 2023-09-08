import { GameConfiguration } from '../configurations/gameConfiguration';
import { EndlessBackground } from '../objects/endlessBackground/endlessBackground';
import { init_gamebox } from '../utilities/documentUtils';

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('forest-bg-1', '../assets/images/forest-bg-1.png');    
  }

  create(): void {
    
    let gameConfiguration: GameConfiguration = JSON.parse(
      this.game.cache.text.get('game-config')
    );

    this.prepareGameDivContainer();   
    
    this._endlessBackground = new EndlessBackground(this);
    this._endlessBackground.init(
      gameConfiguration.endlessBackground,
      1920
    );
  }

  update(time: number, delta: number): void
  {
    this._y += 100 * delta * 0.001;
    this.cameras.main.scrollY = this._y;
    this._endlessBackground.setY(this._y);
    this._endlessBackground.update();
  }

  private prepareGameDivContainer()
  {
    // The scale mode should fit the game's container.
    this.game.scale.scaleMode = Phaser.Scale.ScaleModes.FIT;

    // initialize the game's container.
    init_gamebox();
  }

  private _y: number = 0;
  private _endlessBackground: EndlessBackground;
}
