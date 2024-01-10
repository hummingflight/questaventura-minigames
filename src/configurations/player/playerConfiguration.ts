export class PlayerConfiguration
{
  /**
   * The key of the image of the player.
   */
  public spriteKey: string;

  /**
   * The jump velocity of the player (pixels per second).
   */
  public jumpVelocity: number;

  /**
   * The scale of the player in the X axis.
   */
  public scaleX: number;

  /**
   * The scale of the player in the Y axis.
   */
  public scaleY: number;

  /**
   * The movement velocity in the X axis of the player (pixels per second).
   */
  public movementVelocity: number;

  /**
   * The number of initial lives.
   */
  public numLives: number;
}