export interface IScoreManagerListener
{
  /**
   * Called when the score changes.
   * 
   * @param score The new score.
   */
  onScoreChanged(score: number): void

  /**
   * Called when the score reaches the score to wing.
   * 
   * @param score The score. 
   */
  onScoreReached(score: number): void;
}