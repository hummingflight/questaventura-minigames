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
    
    this._halfHeight = gameConfiguration.gameView.canvasHeight / 2;
    this._y = this._halfHeight;

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

    this._player = new Player(
      this,
      gameConfiguration.gameView.canvasWidth / 2,
      gameConfiguration.gameView.canvasHeight / 2,
      gameConfiguration.player.spriteKey,
    );
    this._player.setOrigin(0.5, 0.5);
    this.add.existing(this._player);
    this.physics.add.existing(this._player);
    this._player.init(gameConfiguration.player);

    this._inputManager = new InputManager();
    this._inputManager.init(this, this._player);

    this._collisionManager = new CollisionManager();
    this._collisionManager.init(
      this,
      this._player,
      padStaticGroup
    );
  }

  update(time: number, delta: number): void
  {    
    if (this._player.y < this._y)
    {
      this._y = this._player.y;
    }
      
    let scrollY = this._y - this._halfHeight;
    this.cameras.main.scrollY = scrollY;
    this._endlessBackground.setY(scrollY);
    this._endlessBackground.update();
    this._padsManager.update(scrollY);
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
  private _halfHeight: number = 0;
  private _endlessBackground: EndlessBackground;
  private _padsManager: PadsManager;
  private _inputManager: InputManager;
  private _collisionManager: CollisionManager;
  private _player: Player;
}
