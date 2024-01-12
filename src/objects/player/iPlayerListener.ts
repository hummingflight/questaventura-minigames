/**
 * Interface for objects that listen to the player events.
 */
export interface IPlayerListener
{
  /**
   * Called when the player dies.
   */
  onPlayerDied(): void;
}