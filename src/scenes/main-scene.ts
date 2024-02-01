import { GameConfiguration } from '../configurations/gameConfiguration';
import { GameManager } from '../objects/gameManager/gameManager';
import { UiManager } from '../ui/uiManager/uiManager';

export class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('forest-bg-1', '../assets/images/forest-bg-1.png');    
  }

  create(): void {
    
    this.input.topOnly = true;

    let gameConfiguration: GameConfiguration = JSON.parse(
      this.game.cache.text.get('game-config')
    );    

    this._gameManager = GameManager.GetInstance();
    this._gameManager.prepareLevelScene(this);
    this._gameManager.startLevel(gameConfiguration.initialLevelIdx);

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
    this._gameManager.update(delta);
    this._uiManger.update();
  }
  
  private _gameManager: GameManager;
  private _uiManger: UiManager
}
