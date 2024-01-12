/**
 * Interface that defines the methods that a class must implement to listen to
 * the player's hearts events.
 */
export interface IPlayerHeartsListener
{
  /**
   * Called when the player loses a heart.
   * 
   * @param hearts The number of hearts. 
   */
  onLoseHeart(hearts: number): void;

  /**
   * Called when the player gets a heart.
   * 
   * @param hearts The number of hearts. 
   */
  onGetHeart(hearts: number): void;

  /**
   * Called when the player's number of hearts change.
   * 
   * @param hearts The number of hearts. 
   */
  onHeartsChanged(hearts: number): void;
}