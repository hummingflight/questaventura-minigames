import { GameConfiguration } from '../configurations/gameConfiguration';
import { GameManager } from '../objects/gameManager/gameManager';
import { UiManager } from '../ui/uiManager/uiManager';
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

    this._gameManager = new GameManager();
    this._gameManager.init(gameConfiguration, this);
    this._gameManager.startNextLevel();

    this._uiManger = new UiManager();
    this._uiManger.init(
      this,
      gameConfiguration.gameView.canvasWidth,
      gameConfiguration.gameView.canvasHeight,
      this._gameManager
    );
  }

  update(time: number, delta: number): void
  {
    this._gameManager.update();
    this._uiManger.update();
  }

  private prepareGameDivContainer()
  {
    // The scale mode should fit the game's container.
    this.game.scale.scaleMode = Phaser.Scale.ScaleModes.FIT;

    // initialize the game's container.
    init_gamebox();
  }
  
  private _gameManager: GameManager;
  private _uiManger: UiManager
}
