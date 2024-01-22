import { LayersDepthConfiguration } from "../../configurations/layersDepthConfiguration";
import { PlayerConfiguration } from "../../configurations/player/playerConfiguration";
import { AudioManager } from "../audioManager/audioManager";
import { EffectsManager } from "../effectsManager/effectsManager";
import { Pad } from "../padsManager/pad";
import { IPlayerListener } from "./iPlayerListener";
import { PlayerHearts } from "./playerHearts";
import { PlayerLives } from "./playerLives";
import { PlayerSounds } from "./playerSounds";
import { PlayerWarp } from "./playerWarp";

/**
 * Class that represents a player of the game.
 */
export class Player extends Phaser.Physics.Arcade.Sprite
{
  private canvasHeight: number;
  private playerConfiguration: PlayerConfiguration;
  private playerListeners: IPlayerListener[];

  private playerHearts: PlayerHearts;
  private playerLives: PlayerLives;
  private playerWarp: PlayerWarp;
  private playerSounds: PlayerSounds;
  private effectsManager: EffectsManager;

  public constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    initialLives: number,
    audioManager: AudioManager,
    effectsManager: EffectsManager
  )
  {
    super(scene, x, y, texture);
    this.setDepth(LayersDepthConfiguration.PLAYER);

    this.playerListeners = [];

    this.playerLives = new PlayerLives();
    this.playerLives.init(initialLives);

    this.playerHearts = new PlayerHearts();
    this.playerWarp = new PlayerWarp();
    this.playerSounds = new PlayerSounds(audioManager);

    this.effectsManager = effectsManager;
  }

  /**
   * Initialize this Player with the given parameters.
   * 
   * @param configuration The configuration of this Player.
   * @param canvasWidth The width of the canvas.
   * @param canvasHeight The height of the canvas.
   */
  public init(
    configuration: PlayerConfiguration,
    canvasWidth: number,
    canvasHeight: number
  ): void
  {
    this.playerConfiguration = configuration;
    this.canvasHeight = canvasHeight;
    this.setScale(configuration.scaleX, configuration.scaleY);
    this.refreshBody();
    
    this.playerHearts.init(configuration.numHearts);
    this.playerWarp.init(this, canvasWidth);
    this.playerSounds.init();
  }

  /**
   * Gets the PlayerLives class of this Player.
   * 
   * @returns The PlayerLives class of this Player. 
   */
  public getLives(): PlayerLives
  {
    return this.playerLives;
  }

  /**
   * Gets the PlayerHearts class of this Player.
   * 
   * @returns The PlayerHearts class of this Player. 
   */
  public getHearts(): PlayerHearts
  {
    return this.playerHearts;
  }

  /**
   * Updates the player logic.
   * 
   * @param cameraY The current Y position of the camera.
   */
  public update(cameraY: number)
  {
    if (this.isOutOfBounds(cameraY, this.canvasHeight))
    {
      this.playerLives.loseLife();
      this.playerListeners.forEach((listener) => listener.onPlayerDied());
    } 

    if (this.playerHearts.getNumHearts() <= 0)
    {
      this.playerLives.loseLife();
      this.playerListeners.forEach((listener) => listener.onPlayerDied());
    }

    this.playerWarp.update();
  }

  /**
   * Adds a listener to the player.
   * 
   * @param listener The listener to add.
   */
  public addPlayerListener(listener: IPlayerListener): void
  {
    this.playerListeners.push(listener);
  }

  /**
   * Moves the player to the left.
   */
  public moveLeft()
  {
    this.setVelocityX(-this.playerConfiguration.movementVelocity);
  }

  /**
   * Moves the player to the right.
   */
  public moveRight()
  {
    this.setVelocityX(this.playerConfiguration.movementVelocity);  
  }

  /**
   * Stops the player horizontal movement.
   */
  public stopXMovement()
  {
    this.setVelocityX(0);
  }

  /**
   * Called by the CollisionManager when the player collides with a pad.
   * 
   * @param pad The pad that the player collided with. 
   */
  public OnPadCollision(pad: Pad)
  {
    if (this.body.touching.down && this.body.velocity.y >= 0)
    {
      if (pad.getPadConfiguration().type == "dangerous")
        this.playerHearts.loseHeart();

      this.jump();
    }
  }

  /**
   * Indicates if the player is out of bounds (below the camera view).
   * 
   * @param currentViewTopValue The current top value of the camera view.
   * @param canvasHeight The height of the canvas.
   * 
   * @returns True if the player is out of bounds, false otherwise.
   */
  public isOutOfBounds(
    currentViewTopValue: number,
    canvasHeight: number
  ): boolean
  {
    return this.y > (currentViewTopValue + canvasHeight);
  }

  /**
   * Makes the player jump.
   */
  private jump()
  {
    this.setVelocityY(-this.playerConfiguration.jumpVelocity);
    this.playerSounds.playJumpSound();
    this.effectsManager.playJump(this.x, this.y + this.height / 2);
  }
}