/**
 * Interface for listening to player lives events.
 */
export interface IPlayerLivesListener
{
  /**
   * Called when the player loses a life.
   * 
   * @param lives The number of lives left.
   */
  onLoseLife(lives: number): void;

  /**
   * Called when the player gets a life.
   * 
   * @param lives The number of lives left.
   */
  onGetLife(lives: number): void;

  /**
   * Called when the number of lives changes.
   * 
   * @param lives The number of lives left.
   */
  onLivesChanged(lives: number): void;
}