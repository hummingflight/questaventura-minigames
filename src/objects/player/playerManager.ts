import { GameViewConfiguration } from "../../configurations/gameViewConfiguration/gameViewConfiguration";
import { PlayerConfiguration } from "../../configurations/player/playerConfiguration";
import { AudioManager } from "../audioManager/audioManager";
import { EffectsManager } from "../effectsManager/effectsManager";
import { Player } from "./player";

/**
 * Manages the player instance of the game.
 */
export class PlayerManager
{
  private player: Player;
  private playerConfiguration: PlayerConfiguration;
  private gameViewConfiguration: GameViewConfiguration;

  /**
   * Gets the player instance.
   * 
   * @returns The player.
   */
  public getPlayer(): Player
  {
    return this.player;
  }

  /**
   * Instantiates a new PlayerManager.
   * 
   * @param scene The scene of the game. 
   * @param initialLives The initial lives of the player.
   */
  public constructor(
    scene: Phaser.Scene,
    initialLives: number,
    audioManager: AudioManager,
    effectsManager: EffectsManager
  )
  {
    this.player = new Player(
      scene,
      0, 0,
      "",
      initialLives,
      audioManager,
      effectsManager
    );
  }

  /**
   * Prepares the player for the given Level configuration. Called when a new
   * level is going to be started.
   *
   * @param scene The scene of the game.
   * @param playerConfiguration The player configuration of the level.
   * @param gameViewConfiguration The game view configuration of the level.
   */
  public initLevelConfiguration(
    scene: Phaser.Scene,
    playerConfiguration: PlayerConfiguration,
    gameViewConfiguration: GameViewConfiguration
  ): void
  {
    this.playerConfiguration = playerConfiguration;
    this.gameViewConfiguration = gameViewConfiguration;

    this.player.setTexture(playerConfiguration.spriteKey);
    this.player.setOrigin(0.5, 0.5);
    scene.add.existing(this.player);
    scene.physics.add.existing(this.player);

    this.player.init(
      playerConfiguration,
      gameViewConfiguration.canvasWidth,
      gameViewConfiguration.canvasHeight
    );

    this.player.body.reset(
      gameViewConfiguration.canvasWidth / 2,
      gameViewConfiguration.canvasHeight / 2,
    );
  }

  /**
   * Updates the player.
   * 
   * @param cameraY The Y Position (ScrollY) of the camera. 
   */
  public update(cameraY: number): void
  {
    this.player.update(cameraY);
  }

  /**
   * Called by the GameManager when the level is reset.
   */
  public onLevelReset(): void
  {
    this.player.getHearts().setNumHeart(this.playerConfiguration.numHearts);
    this.player.body.reset(
      this.gameViewConfiguration.canvasWidth / 2,
      this.gameViewConfiguration.canvasHeight / 2
    );
  }
}