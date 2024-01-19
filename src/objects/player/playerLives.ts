import { IPlayerLivesListener } from "./iPlayerLivesListener";

/**
 * Class for managing the player lives.
 */
export class PlayerLives
{
  private lives: number;
  private listeners: IPlayerLivesListener[];

  /**
   * Instantiates a new PlayerLives.
   */
  public constructor()
  {
    this.listeners = [];
  }

  /**
   * Initializes the player lives.
   * 
   * @param lives The initial number of lives.
   */
  public init(lives: number): void
  {
    this.lives = lives;
    this.listeners.forEach((listener) => listener.onLivesChanged(this.lives));
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
   * Lose a life.
   */
  public loseLife(): void
  {
    this.lives--;
    this.listeners.forEach((listener) => listener.onLoseLife(this.lives));
  }

  /**
   * Adds a life.
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