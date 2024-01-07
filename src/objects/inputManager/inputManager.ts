import { Player } from "../player/player";

export class InputManager
{
  private player: Player;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  public init(scene: Phaser.Scene, player: Player)
  {
    this.player = player;
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  public update()
  {
    if (this.cursors.left.isDown)
    {
      this.player.moveLeft();
    }
    else if (this.cursors.right.isDown)
    {
      this.player.moveRight();
    }
    else
    {
      this.player.stopXMovement();
    }
  }
}