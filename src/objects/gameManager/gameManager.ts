import { GameConfiguration } from "../../configurations/gameConfiguration";
import { LevelConfiguration } from "../../configurations/levelConfiguration";
import { CollisionManager } from "../collisionManager/collisionManager";
import { EnviromentManager } from "../enviromentManager/enviromentManager";
import { InputManager } from "../inputManager/inputManager";
import { PadsManager } from "../padsManager/padsManager";
import { IPlayerListener } from "../player/iPlayerListener";
import { Player } from "../player/player";
import { PlayerManager } from "../player/playerManager";
import { IScoreManagerListener } from "../scoreManager/iScoreManagerListener";
import { ScoreManager } from "../scoreManager/scoreManager";
import { GameStatus } from "./gameStatus";
import { IGameManagerListener } from "./iGameManagerListener";

export class GameManager implements IScoreManagerListener, IPlayerListener
{
  /**
   * Indicates if the game is won.
   */
  private gameStatus: GameStatus;

  /**
   * The game configuration.
   */
  private gameConfiguration: GameConfiguration;

  private currentLevelIdx = -1;
  private highestY: number = 0;
  private halfHeight: number = 0;
  private enviromentManager: EnviromentManager;
  private inputManager: InputManager;
  private scoreManager: ScoreManager;
  private padsManager: PadsManager;
  private playerManager: PlayerManager;
  private collisionManager: CollisionManager;
  private levelConfiguration: LevelConfiguration;
  private scene: Phaser.Scene;

  /**
   * The listeners of the game manager.
   */
  private listeners: IGameManagerListener[];

  /**
   * Gets the InputManager of the game.
   *  
   * @returns The InputManager of the game.
   */
  public getInputManager(): InputManager
  {
    return this.inputManager;
  }

  /**
   * Gets the ScoreManager of the game.
   * 
   * @returns The ScoreManager of the game.
   */
  public getScoreManager(): ScoreManager
  {
    return this.scoreManager;
  }

  /**
   * Gets the PadsManager of the game.
   * 
   * @returns The PadsManager of the game.
   */
  public getPadsManager(): PadsManager
  {
    return this.padsManager;
  }

  /**
   * Gets the CollisionManager of the game.
   * 
   * @returns The CollisionManager of the game.
   */
  public getCollisionManager(): CollisionManager
  {
    return this.collisionManager;
  }

  public getPlayerManager(): PlayerManager
  {
    return this.playerManager;
  }

  /**
   * Gets the Player of the game.
   * 
   * @returns The Player of the game.
   */
  public getPlayer(): Player
  {
    return this.playerManager.getPlayer();
  }

  /**
   * Gets the current Y position of the player.
   * 
   * @returns The current Y position of the player.
   */
  public getPlayerY(): number
  {
    return this.playerManager.getPlayer().y;
  }

  /**
   * Gets the current Y position of the camera.
   * 
   * @returns The current Y position of the camera.
   */
  public getCameraY(): number
  {
    return this.scene.cameras.main.scrollY;
  }

  public onScoreChanged(score: number): void { }
  
  public onScoreReached(score: number): void
  {
    if (this.gameStatus !== GameStatus.RUNNING)
      return;

    this.gameStatus = GameStatus.STOPPED;
    this.listeners.forEach((listener) => listener.onGameWon());
  }

  public onPlayerDied(): void
  {
    if (this.gameStatus !== GameStatus.RUNNING)
      return;

    this.gameStatus = GameStatus.STOPPED;
    if (this.playerManager.getPlayer().getLives().getLives() > 0)
      this.resetLevel();
    else
      this.listeners.forEach((listener) => listener.onGameLost());
  }

  public startNextLevel(): void
  {
    this.currentLevelIdx++;
    if (this.currentLevelIdx >= this.gameConfiguration.levels.length)
      return;

    this.levelConfiguration = JSON.parse(
      this.scene.cache.text.get(this.gameConfiguration.levels[this.currentLevelIdx])
    );

    this.initLevel();
  }

  public init(
    gameConfiguration: GameConfiguration,
    scene: Phaser.Scene
  ): void
  {
    this.gameStatus = GameStatus.RUNNING;
    this.gameConfiguration = gameConfiguration;
    this.listeners = [];

    this.scene = scene;
    this.halfHeight = gameConfiguration.gameView.canvasHeight / 2;    

    this.enviromentManager = new EnviromentManager();
    this.padsManager = new PadsManager();
    this.playerManager = new PlayerManager(this.scene);
    this.collisionManager = new CollisionManager();
    this.scoreManager = new ScoreManager();

    this.inputManager = new InputManager();
    this.inputManager.init(
      this.scene,
      this.getPlayer()
    );

    // Setup the listeners.

    this.scoreManager.addListener(this);
    this.getPlayer().addPlayerListener(this);
  }

  public initLevel(): void
  {
    this.highestY = this.halfHeight;
    
    this.enviromentManager.init(
      this.scene,
      this.levelConfiguration.enviroment,
      this.gameConfiguration.gameView
    );

    this.padsManager.init(
      this.levelConfiguration.padsManager,
      this.gameConfiguration.gameView,
      this.scene
    );
    
    this.playerManager.init(
      this.scene,
      this.levelConfiguration.player,
      this.gameConfiguration.gameView
    );
    
    this.collisionManager.init(
      this.scene,
      this.getPlayer(),
      this.padsManager.getPhysicsStaticGroup()
    );
    
    this.scoreManager.init(
      this.levelConfiguration.scoreManager,
      this.getPlayerY()
    );
  }

  public update(): void
  {
    if (this.gameStatus !== GameStatus.RUNNING)
      return;

    // Update the highest Y.
    if (this.getPlayerY() < this.highestY)
      this.highestY = this.getPlayerY();
    
    let scrollY = this.highestY - this.halfHeight;

    this.scene.cameras.main.scrollY = scrollY;
    this.playerManager.update(scrollY);
    this.padsManager.update(scrollY);
    this.inputManager.update();
    this.scoreManager.update(this.highestY);
    this.enviromentManager.update(scrollY);
  }

  /**
   * Adds a listener to the game manager. 
   * 
   * @param listener The listener to add.
   */
  public addListener(listener: IGameManagerListener): void
  {
    this.listeners.push(listener);
  }

  /**
   * 
   */
  private resetLevel(): void
  {
    this.gameStatus = GameStatus.STOPPED;

    this.scene.cameras.main.once('camerafadeoutcomplete', function (camera: Phaser.Cameras.Scene2D.Camera) {
      this.resetGameManagers();
      this.gameStatus = GameStatus.RUNNING;
      camera.fadeIn(this.gameConfiguration.gameEffects.fadeIn);
    }, this);

    this.scene.cameras.main.once('camerafadeincomplete', function (camera: Phaser.Cameras.Scene2D.Camera) {      
    }, this);

    this.scene.cameras.main.fadeOut(this.gameConfiguration.gameEffects.fadeout);
  }

  private resetGameManagers()
  {
    this.highestY = this.halfHeight;
    this.scoreManager.onLevelReset();
    this.padsManager.onLevelReset();
    this.playerManager.onLevelReset();
  }
}