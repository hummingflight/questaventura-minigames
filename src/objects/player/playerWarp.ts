import { Player } from "./player";

export class PlayerWarp
{
  private player: Player;
  private canvasWidth: number;

  public init(player: Player, canvasWidth: number)
  {
    this.player = player;
    this.canvasWidth = canvasWidth;
  }

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