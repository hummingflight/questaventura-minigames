import { IPlayerHeartsListener } from "./iPlayerHeartsListener";

/**
 * Class that represents the player's hearts.
 */
export class PlayerHearts
{
  private hearts: number;
  private listeners: IPlayerHeartsListener[];

  public init(numHearts: number): void
  {
    this.hearts = numHearts;
    this.listeners = [];
  }

  /**
   * Gets the current number of hearts.
   * 
   * @returns The number of hearts.
   */
  public getNumHearts(): number
  {
    return this.hearts;
  }

  /**
   * Loses a heart.
   */
  public loseHeart(): void
  {
    this.hearts--;
    this.listeners.forEach((listener) => listener.onLoseHeart(this.hearts));
  }

  /**
   * Gets a heart.
   */
  public getHeart(): void
  {
    this.hearts++;
    this.listeners.forEach((listener) => listener.onGetHeart(this.hearts));
  }

  public addListener(listener: IPlayerHeartsListener): void
  {
    this.listeners.push(listener);
  }
}