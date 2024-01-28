import { Player } from "../player/player";
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
   * Called when this IMonster instance collides with the player.
   *
   * @param player The player that this IMonster instance collided with. 
   */
  onPlayerCollision(player: Player): void;

  /**
   * Adds a listener to this IMonster instance.
   * 
   * @param listener The listener to add.
   */
  addMonsterListener(listener: IMonsterListener): void;
}