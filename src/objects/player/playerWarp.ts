import { Player } from "./player";

/**
 * Class that handles the warping of the player. This class allows the player to
 * warp from one side of the screen to the other.
 */
export class PlayerWarp
{
  private player: Player;
  private canvasWidth: number;

  /**
   * Initializes the player warping.
   * 
   * @param player The player to warp.
   * @param canvasWidth The width of the canvas.
   */
  public init(player: Player, canvasWidth: number)
  {
    this.player = player;
    this.canvasWidth = canvasWidth;
  }

  /**
   * Updates the player position.
   */
  public update()
  {
    if (this.player.x < 0)
    {
      let prevVelocity = new Phaser.Math.Vector2(this.player.body.velocity);
      this.player.body.reset(this.canvasWidth - 10, this.player.y);
      this.player.setVelocity(prevVelocity.x, prevVelocity.y);
    }
    else if (this.player.x > this.canvasWidth)
    {
      let prevVelocity = new Phaser.Math.Vector2(this.player.body.velocity);
      this.player.body.reset(10, this.player.y);
      this.player.setVelocity(prevVelocity.x, prevVelocity.y);
    }
  }
}