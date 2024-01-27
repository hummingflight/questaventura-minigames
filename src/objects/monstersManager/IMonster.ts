import { IMonsterListener } from "./IMonsterListeners";

/**
 * Represents a monster in the game.
 */
export interface IMonster extends Phaser.Physics.Arcade.Sprite
{
  /**
   * Starts this IMonster instance.
   */
  start(): void;

  /**
   * Kills this IMonster instance, returning it to the pool.
   */
  kill(): void;

  /**
   * Adds a listener to this IMonster instance.
   * 
   * @param listener The listener to add.
   */
  addMonsterListener(listener: IMonsterListener): void;

  /**
   * Destroys this IMonster instance. If you want to reuse this instance, use
   * the kill method instead.
   */
  destroy(): void;
}