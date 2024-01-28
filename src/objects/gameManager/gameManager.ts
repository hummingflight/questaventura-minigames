import { GameConfiguration } from "../../configurations/gameConfiguration";
import { LevelConfiguration } from "../../configurations/levelConfiguration";
import { AudioManager } from "../audioManager/audioManager";
import { CollisionManager } from "../collisionManager/collisionManager";
import { EffectsManager } from "../effectsManager/effectsManager";
import { EnviromentManager } from "../enviromentManager/enviromentManager";
import { InputManager } from "../inputManager/inputManager";
import { MonsterFactory } from "../monstersManager/MonsterFactory";
import { MonstersManager } from "../monstersManager/MonstersManager";
import { PadsManager } from "../padsManager/padsManager";
import { IPlayerListener } from "../player/iPlayerListener";
import { Player } from "../player/player";
import { PlayerManager } from "../player/playerManager";
import { IScoreManagerListener } from "../scoreManager/iScoreManagerListener";
import { ScoreManager } from "../scoreManager/scoreManager";
import { GameStatus } from "./gameStatus";
import { IGameManagerListener } from "./iGameManagerListener";

export class GameManager
{
  /**
   * Indicates if the game is won.
   */
  private gameStatus: GameStatus;

  /**
   * The game configuration.
   */
  private gameConfiguration: GameConfiguration;

  private nextLevelIdx = 0;
  private highestY: number = 0;
  private halfHeight: number = 0;
  private enviromentManager: EnviromentManager;
  private inputManager: InputManager;
  private scoreManager: ScoreManager;
  private padsManager: PadsManager;
  private playerManager: PlayerManager;
  private collisionManager: CollisionManager;
  private effectsManager: EffectsManager;
  private audioManager: AudioManager;
  private levelConfiguration: LevelConfiguration;
  private monstersFactory: MonsterFactory;
  private monstersManager: MonstersManager;
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

  /**
   * Gets the AudioManager of the game.
   * 
   * @returns The AudioManager of the game.
   */
  public getAudioManager(): AudioManager
  {
    return this.audioManager;
  }

  /**
   * Gets the PlayerManager of the game.
   * 
   * @returns The PlayerManager of the game.
   */
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

    // Create animations
    
    gameConfiguration.animations.forEach((animation) => {
      this.scene.anims.create(animation);
    });

    gameConfiguration.spriteSheetAnimations.forEach((spriteSheetAnimation) => {
      
      let settings: any = spriteSheetAnimation.settings;
      settings.key = spriteSheetAnimation.key;
      settings.frames = this.scene.anims.generateFrameNumbers(
        spriteSheetAnimation.spriteSheetKey,
        spriteSheetAnimation.framesSettings
      );

      this.scene.anims.create(settings);
    });        

    // Prepare Managers.
    this.effectsManager = new EffectsManager();
    this.effectsManager.init(this.scene, gameConfiguration.effects);

    this.enviromentManager = new EnviromentManager(this.scene);
    this.padsManager = new PadsManager(this.scene);
    this.scoreManager = new ScoreManager();

    this.audioManager = new AudioManager();
    this.audioManager.init(
      this.scene,
      gameConfiguration.audio
    );
    
    this.playerManager = new PlayerManager(
      this.scene,
      gameConfiguration.playerInitialLifes,
      this.audioManager,
      this.effectsManager
    );

    this.monstersFactory = new MonsterFactory();
    this.monstersFactory.init(
      this.scene,
      gameConfiguration.monsters,
      this.playerManager
    );

    this.monstersManager = new MonstersManager();   

    this.collisionManager = new CollisionManager();
    this.collisionManager.init(
      this.scene,
      this.getPlayer(),
      this.padsManager.getPhysicsStaticGroup(),
      this.monstersFactory.getMonstersGroup()
    );

    this.inputManager = new InputManager();
    this.inputManager.init(
      this.scene,
      this.getPlayer(),
      gameConfiguration.gameView.canvasWidth * 0.5
    );
  }

  public startLevel(index: number): void
  {
    this.nextLevelIdx = index;
    this.startNextLevel();
  }

  /**
   * Indicates if there are more levels to play.
   * 
   * @returns True if there are more levels to play, false otherwise.
   */
  public hasMoreLevels(): boolean
  {
    return this.nextLevelIdx < this.gameConfiguration.levels.length;
  }

  public initLevel(levelIdx: number): void
  {
    this.levelConfiguration = JSON.parse(
      this.scene.cache.text.get(
        this.gameConfiguration.levels[levelIdx]
      )
    );

    this.highestY = this.halfHeight;
    let scrollY = this.highestY - this.halfHeight;
    this.scene.cameras.main.scrollY = scrollY;
    
    this.monstersManager.initLevelConfiguration(
      this.levelConfiguration.monstersManager,
      this.gameConfiguration.gameView,
      this.monstersFactory
    );
    
    this.enviromentManager.initLevelConfiguration(
      this.levelConfiguration.enviroment,
      this.gameConfiguration.gameView
    );

    this.padsManager.initLevelConfiguration(
      this.levelConfiguration.padsManager,
      this.gameConfiguration.gameView,
      this.scene
    );
    
    this.playerManager.initLevelConfiguration(
      this.scene,
      this.levelConfiguration.player,
      this.gameConfiguration.gameView
    );

    this.playerManager.pufPlayerToPosition(
      this.scene,
      this.gameConfiguration.gameView.canvasWidth / 2,
      this.gameConfiguration.gameView.canvasHeight / 2
    );
    
    this.scoreManager.initLevelConfiguration(
      this.levelConfiguration.scoreManager,
      this.getPlayerY()
    );

    this.scene.cameras.main.fadeIn(this.gameConfiguration.gameEffects.fadein);
  }

  public update(dt: number): void
  {
    if (this.gameStatus !== GameStatus.RUNNING)
      return;

    // Update the highest Y.
    if (this.getPlayerY() < this.highestY)
      this.highestY = this.getPlayerY();
    
    const scrollY = this.highestY - this.halfHeight;
    this.scene.cameras.main.scrollY = scrollY;
    this.playerManager.update(scrollY);
    this.padsManager.update(scrollY);
    this.inputManager.update();    
    this.enviromentManager.update(scrollY);
    this.monstersManager.update(scrollY, dt);    
    this.scoreManager.update(this.highestY);

    if (this.playerManager.getPlayer().isDead())
    {
      this.onPlayerDied();
      return;
    }

    if (this.scoreManager.hasReachedScore())
    {
      this.onScoreReached(this.scoreManager.getScore());
      return;
    }
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
   * Restarts the game from the first level.
   */
  public restartGame(): void
  {
    if (this.gameStatus === GameStatus.RESTARTING)
      return;

    this.gameStatus = GameStatus.RESTARTING;
    this.scene.cameras.main.once('camerafadeoutcomplete', function (camera: Phaser.Cameras.Scene2D.Camera) {
      this.scene.scene.restart();
    }, this);
    this.scene.cameras.main.fadeOut(this.gameConfiguration.gameEffects.fadeout);
  }

   /**
   * Starts the next level.
   */
   private startNextLevel(): void
   {
     if (this.nextLevelIdx >= this.gameConfiguration.levels.length)
       return;
 
     this.initLevel(this.nextLevelIdx);
     this.nextLevelIdx++;

     this.gameStatus = GameStatus.RUNNING;
   }

  /**
   * 
   */
  private resetLevel(): void
  {
    this.gameStatus = GameStatus.STOPPED;

    this.scene.cameras.main.once('camerafadeoutcomplete', function (camera: Phaser.Cameras.Scene2D.Camera) {
      
      this.resetGameManagers();

      this.playerManager.pufPlayerToPosition(
        this.scene,
        this.gameConfiguration.gameView.canvasWidth / 2,
        this.gameConfiguration.gameView.canvasHeight / 2
      );

      this.gameStatus = GameStatus.RUNNING;
      camera.fadeIn(this.gameConfiguration.gameEffects.fadein);
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
    this.monstersManager.onLevelReset();
  }

  private onScoreReached(score: number): void
  {
    if (this.gameStatus !== GameStatus.RUNNING)
      return;

    this.gameStatus = GameStatus.STOPPED;
    this.listeners.forEach((listener) => listener.onLevelWon());

    if (this.hasMoreLevels())
      this.startNextLevel();
    else
      this.listeners.forEach((listener) => listener.onGameWon());    
  }

  private onPlayerDied(): void
  {
    if (this.gameStatus !== GameStatus.RUNNING)
      return;

    this.gameStatus = GameStatus.STOPPED;
    if (this.playerManager.getPlayer().getLives().getLives() > 0)
      this.resetLevel();
    else
      this.listeners.forEach((listener) => listener.onGameLost());
  }
}