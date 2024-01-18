/**
 * Interface that allows a class to listen to the GameManager's events.
 */
export interface IGameManagerListener
{
  /**
   * Called when the level is won.
   */
  onLevelWon(): void;

  /**
   * Called when the level is lost.
   */
  onLevelLost(): void;

  /**
   * Called when the game is won.
   */
  onGameWon(): void;

  /**
   * Called when the game is lost.
   */
  onGameLost(): void;
}