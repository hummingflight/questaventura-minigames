import { GameConfiguration } from '../configurations/gameConfiguration';
import { CollisionManager } from '../objects/collisionManager/collisionManager';
import { EndlessBackground } from '../objects/endlessBackground/endlessBackground';
import { InputManager } from '../objects/inputManager/inputManager';
import { PadsManager } from '../objects/padsManager/padsManager';
import { Player } from '../objects/player/player';
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

    let padStaticGroup = this.physics.add.staticGroup();
    this._padsManager = new PadsManager();
    this._padsManager.init(
      gameConfiguration.padsManager,
      gameConfiguration.gameView,
      padStaticGroup,
      this
    );

    let player = new Player(
      this,
      gameConfiguration.gameView.canvasWidth / 2,
      gameConfiguration.gameView.canvasHeight / 2,
      gameConfiguration.player.spriteKey,
    );
    this.add.existing(player);
    this.physics.add.existing(player);
    player.init(gameConfiguration.player);

    this._inputManager = new InputManager();
    this._inputManager.init(this, player);

    this._collisionManager = new CollisionManager();
    this._collisionManager.init(
      this,
      player,
      padStaticGroup
    );
  }

  update(time: number, delta: number): void
  {
    this._y -= 100 * delta * 0.001;
    this.cameras.main.scrollY = this._y;
    this._endlessBackground.setY(this._y);
    this._endlessBackground.update();
    this._padsManager.update(this._y);
    this._inputManager.update();
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
  private _padsManager: PadsManager;
  private _inputManager: InputManager;
  private _collisionManager: CollisionManager;
}
