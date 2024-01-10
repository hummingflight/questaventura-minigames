import { GameConfiguration } from "../../configurations/gameConfiguration";
import { CollisionManager } from "../collisionManager/collisionManager";
import { EndlessBackground } from "../endlessBackground/endlessBackground";
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

  private highestY: number = 0;
  private halfHeight: number = 0;
  private endlessBackground: EndlessBackground;
  private inputManager: InputManager;
  private scoreManager: ScoreManager;
  private padsManager: PadsManager;
  private playerManager: PlayerManager;
  private collisionManager: CollisionManager;
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

    this.gameStatus = GameStatus.WON;
    this.listeners.forEach((listener) => listener.onGameWon());
  }

  public onPlayerDied(): void
  {
    if (this.gameStatus !== GameStatus.RUNNING)
      return;

    this.gameStatus = GameStatus.LOST;
    this.listeners.forEach((listener) => listener.onGameLost());
  }

  public init(gameConfiguration: GameConfiguration, scene: Phaser.Scene): void
  {
    this.gameStatus = GameStatus.RUNNING;
    this.gameConfiguration = gameConfiguration;
    this.listeners = [];

    this.scene = scene;
    this.halfHeight = gameConfiguration.gameView.canvasHeight / 2;
    this.highestY = this.halfHeight;

    // Setup the Managers.

    this.endlessBackground = new EndlessBackground(scene);
    this.endlessBackground.init(
      gameConfiguration.endlessBackground,
      gameConfiguration.gameView.canvasHeight
    );

    let padStaticGroup = scene.physics.add.staticGroup();
    this.padsManager = new PadsManager();
    this.padsManager.init(
      gameConfiguration.padsManager,
      gameConfiguration.gameView,
      padStaticGroup,
      scene
    );
    
    this.playerManager = new PlayerManager();
    this.playerManager.init(
      scene,
      gameConfiguration.player,
      gameConfiguration.gameView
    );

    this.inputManager = new InputManager();
    this.inputManager.init(scene, this.getPlayer());

    this.collisionManager = new CollisionManager();
    this.collisionManager.init(
      scene,
      this.getPlayer(),
      padStaticGroup
    );

    this.scoreManager = new ScoreManager();
    this.scoreManager.init(
      gameConfiguration.scoreManager,
      this.getPlayerY()
    );

    // Setup the listeners.

    this.scoreManager.addListener(this);
    this.getPlayer().addPlayerListener(this);
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
    this.endlessBackground.setY(scrollY);
    this.endlessBackground.update();
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
}