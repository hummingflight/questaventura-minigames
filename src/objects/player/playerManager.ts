import { GameViewConfiguration } from "../../configurations/gameViewConfiguration/gameViewConfiguration";
import { PlayerConfiguration } from "../../configurations/player/playerConfiguration";
import { Player } from "./player";

export class PlayerManager
{
  private player: Player;

  /**
   * Gets the player.
   * 
   * @returns The player.
   */
  public getPlayer(): Player
  {
    return this.player;
  }

  public init(
    scene: Phaser.Scene,
    playerConfiguration: PlayerConfiguration,
    gameViewConfiguration: GameViewConfiguration
  ): void
  {
    this.player = new Player(
      scene,
      gameViewConfiguration.canvasWidth / 2,
      gameViewConfiguration.canvasHeight / 2,
      playerConfiguration.spriteKey,
    );

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
}