import { IPlayerLivesListener } from "./iPlayerLivesListener";

/**
 * Class for managing the player lives.
 */
export class PlayerLives
{
  private lives: number;
  private listeners: IPlayerLivesListener[];

  /**
   * Initializes the player lives.
   * 
   * @param lives The initial number of lives.
   */
  public init(lives: number): void
  {
    this.lives = lives;
    this.listeners = [];
  }

  /**
   * Gets the number of lives.
   * 
   * @returns The number of lives.
   */
  public getLives(): number
  {
    return this.lives;
  }

  /**
   * Lose a life. Notifies the listeners.
   */
  public loseLife(): void
  {
    this.lives--;
    this.listeners.forEach((listener) => listener.onLoseLife(this.lives));
  }

  /**
   * Get a life. Notifies the listeners.
   */
  public getLife(): void
  {
    this.lives++;
    this.listeners.forEach((listener) => listener.onGetLife(this.lives));
  }

  /**
   * Adds a listener to the player lives.
   * 
   * @param listener The listener to add.
   */
  public addListener(listener: IPlayerLivesListener): void
  {
    this.listeners.push(listener);
  }
}