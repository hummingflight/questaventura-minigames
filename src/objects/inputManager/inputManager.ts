import { Player } from "../player/player";

/**
 * Manages the input of the game (keyboard, mouse, etc.).
 */
export class InputManager
{
  /**
   * The player instance of the game.
   */
  private player: Player;

  /**
   * The cursors of the game.
   */
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  /**
   * Initialize this InputManager.
   * 
   * @param scene The scene of the game.
   * @param player The player of the game.
   */
  public init(scene: Phaser.Scene, player: Player)
  {
    this.player = player;
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  /**
   * Updates the input manager. It should be called on every frame.
   */
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