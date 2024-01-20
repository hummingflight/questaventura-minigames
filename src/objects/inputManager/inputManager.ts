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
   * The input plugin of the game.
   */
  private inputPlugin: Phaser.Input.InputPlugin;

  /**
   * The half width of the screen.
   */
  private halfScreenWidth: number;

  /**
   * Initialize this InputManager.
   * 
   * @param scene The scene of the game.
   * @param player The player of the game.
   */
  public init(
    scene: Phaser.Scene,
    player: Player,
    halfScreenWidth: number
  )
  {
    this.player = player;
    this.halfScreenWidth = halfScreenWidth;
    this.inputPlugin = scene.input;
    this.cursors = scene.input.keyboard.createCursorKeys();
    scene.input.addPointer();
  }

  /**
   * Updates the input manager. It should be called on every frame.
   */
  public update()
  {
    if (this.cursors.left.isDown || this.isPointerDownLeft())
    {
      this.player.moveLeft();
    }
    else if (this.cursors.right.isDown || this.isPointerDownRight())
    {
      this.player.moveRight();
    }
    else
    {
      this.player.stopXMovement();
    }
  }

  private isPointerDownLeft(): boolean
  {
    return this.inputPlugin.activePointer.isDown && this.inputPlugin.activePointer.x < this.halfScreenWidth;
  }

  private isPointerDownRight(): boolean
  {
    return this.inputPlugin.activePointer.isDown && this.inputPlugin.activePointer.x >= this.halfScreenWidth;
  }
}