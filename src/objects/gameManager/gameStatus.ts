/**
 * Defines the status of the game.
 */
export enum GameStatus
{
  /**
   * The game is running.
   */
  RUNNING,

  /**
   * The game is won.
   */
  WON,

  /**
   * The game is lost.
   */
  LOST,

  /**
   * The game is paused.
   */
  PAUSED,

  /**
   * The game is stopped.
   */
  STOPPED,

  /**
   * The game is restarting.
   */
  RESTARTING
}