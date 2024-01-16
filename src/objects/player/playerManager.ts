import { GameViewConfiguration } from "../../configurations/gameViewConfiguration/gameViewConfiguration";
import { PlayerConfiguration } from "../../configurations/player/playerConfiguration";
import { Player } from "./player";

export class PlayerManager
{
  private player: Player;
  private playerConfiguration: PlayerConfiguration;
  private gameViewConfiguration: GameViewConfiguration;

  /**
   * Gets the player.
   * 
   * @returns The player.
   */
  public getPlayer(): Player
  {
    return this.player;
  }

  public constructor(scene: Phaser.Scene)
  {
    this.player = new Player(
      scene,
      0, 0,
      "",
    );
  }

  public init(
    scene: Phaser.Scene,
    playerConfiguration: PlayerConfiguration,
    gameViewConfiguration: GameViewConfiguration
  ): void
  {
    this.playerConfiguration = playerConfiguration;
    this.gameViewConfiguration = gameViewConfiguration;

    this.player.setPosition(
      gameViewConfiguration.canvasWidth / 2,
      gameViewConfiguration.canvasHeight / 2,
    );

    this.player.setTexture(playerConfiguration.spriteKey);
    this.player.setOrigin(0.5, 0.5);
    scene.add.existing(this.player);
    scene.physics.add.existing(this.player);

    this.player.init(
      playerConfiguration,
      gameViewConfiguration.canvasWidth,
      gameViewConfiguration.canvasHeight
    );
  }

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