import { IPlayerHeartsListener } from "./iPlayerHeartsListener";

/**
 * Class that represents the player's hearts.
 */
export class PlayerHearts
{
  private hearts: number;
  private listeners: IPlayerHeartsListener[];

  /**
   * Instantiates a new PlayerHearts.
   */
  public constructor()
  {
    this.listeners = [];
  }

  /**
   * Initializes the player's hearts.
   * 
   * @param numHearts The number of hearts.
   */
  public init(numHearts: number): void
  {
    this.hearts = numHearts;
    this.listeners.forEach((listener) => listener.onHeartsChanged(this.hearts));
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
    this.listeners.forEach((listener) => listener.onHeartsChanged(this.hearts));
  }

  /**
   * Adds a new heart to the player.
   */
  public getHeart(): void
  {
    this.hearts++;
    this.listeners.forEach((listener) => listener.onGetHeart(this.hearts));
    this.listeners.forEach((listener) => listener.onHeartsChanged(this.hearts));
  }

  /**
   * Sets the number of hearts.
   * 
   * @param numHearts The number of hearts. 
   */
  public setNumHeart(numHearts: number): void
  {
    this.hearts = numHearts;
    this.listeners.forEach((listener) => listener.onHeartsChanged(this.hearts));
  }

  /**
   * Adds a listener to the player's hearts.
   * 
   * @param listener The listener to add.
   */
  public addListener(listener: IPlayerHeartsListener): void
  {
    this.listeners.push(listener);
  }
}