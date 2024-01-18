import { ScoreManagerConfiguration } from "../../configurations/scoreManager/scoreManagerConfiguration";
import { IScoreManagerListener } from "./iScoreManagerListener";

/**
 * Manages the score of the game.
 */
export class ScoreManager
{
  private configuration: ScoreManagerConfiguration;
  private score: number;
  private initialHeight: number;
  private listeners: IScoreManagerListener[];

  /**
   * Gets the current score of the game.
   * 
   * @returns The score of the game.
   */
  public getScore(): number
  {
    return this.score;
  }

  /**
   * Instantiates a new ScoreManager.
   */
  public constructor()
  {
    this.listeners = [];
  }

  /**
   * Prepares the ScoreManager for a new level.
   * 
   * @param scoreManagerConfiguration The configuration of the score manager.
   * @param initialHeight The initial height of the player.
   */
  public initLevelConfiguration(
    scoreManagerConfiguration: ScoreManagerConfiguration,
    initialHeight: number
  ): void
  {
    this.configuration = scoreManagerConfiguration;
    this.score = 0;
    this.initialHeight = initialHeight;
  }

  /**
   * Updates this ScoreManager.
   * 
   * @param height The height of the player.
   */
  public update(height: number): void
  {
    this.score = Math.floor((this.initialHeight - height) * this.configuration.pointsPerHeightUnit);    
    if (this.score >= this.configuration.scoreToWin)
    {
      this.score = this.configuration.scoreToWin;
      this.listeners.forEach((listener) => listener.onScoreChanged(this.score));
      this.listeners.forEach((listener) => listener.onScoreReached(this.score));
      return;
    }
    
    this.listeners.forEach((listener) => listener.onScoreChanged(this.score));
  }

  /**
   * Adds a listener to the score manager.
   * 
   * @param listener The listener to add.
   */
  public addListener(listener: IScoreManagerListener): void
  {
    this.listeners.push(listener);
  }

  /**
   * Called by the GameManager when the level is reset.
   */
  public onLevelReset(): void
  {
    this.score = 0;
    this.listeners.forEach((listener) => listener.onScoreChanged(this.score));
  }
}