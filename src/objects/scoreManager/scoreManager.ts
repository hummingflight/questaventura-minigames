import { ScoreManagerConfiguration } from "../../configurations/scoreManager/scoreManagerConfiguration";
import { IScoreManagerListener } from "./iScoreManagerListener";

export class ScoreManager
{
  private configuration: ScoreManagerConfiguration;
  private score: number;
  private initialHeight: number;
  private listeners: IScoreManagerListener[];

  public constructor()
  {
    this.listeners = [];
  }

  public initLevelConfiguration(scoreManagerConfiguration: ScoreManagerConfiguration, initialHeight: number): void
  {
    this.configuration = scoreManagerConfiguration;
    this.score = 0;
    this.initialHeight = initialHeight;
  }

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